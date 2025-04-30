
import React, { createContext, useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [filters, setFilters] = useState({});
  const [pendingFilters, setPendingFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [modal, setModal] = useState({ isOpen: false, type: '', data: null });
  const [newEntry, setNewEntry] = useState({});
  const [columns, setColumns] = useState([]);
  const [numericFields, setNumericFields] = useState([]);
  const filterRefs = useRef({});

  // Initialize data when initialData changes
  useEffect(() => {
    if (initialData.length > 0 && data.length === 0) {
      setData(initialData);
    }
  }, [initialData]);

  const getUniqueValues = (key) => {
    if (key === 'audited') {
      return ['All', 'Audited', 'Not Audited'];
    }
    return ['All', ...new Set(data.map((item) => item[key]?.toString() || ''))];
  };

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = searchTerm
      ? Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    const itemDate = parseDate(item.date || item.billDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const matchesDate =
      (!start || !itemDate || itemDate >= start) &&
      (!end || !itemDate || itemDate <= end);

    const matchesFilters = columns.every((col) => {
      if (col.field === 'audited') {
        const filterValue = filters[col.field];
        if (filterValue === 'All') return true;
        if (filterValue === 'Audited') return item.audited === true;
        if (filterValue === 'Not Audited') return item.audited === false;
        return true;
      }
      return filters[col.field]?.includes('All') || filters[col.field]?.includes(item[col.field]?.toString());
    });

    return matchesSearch && matchesDate && matchesFilters;
  });

  const totals = numericFields.reduce((acc, field) => {
    acc[field] = filteredData.reduce((sum, item) => sum + (parseFloat(item[field]) || 0), 0);
    return acc;
  }, {});

  const handleFilterChange = (field, value) => {
    setPendingFilters((prevPending) => {
      if (field === 'audited') {
        return { ...prevPending, [field]: value };
      }
      const currentValues = prevPending[field] || [];
      if (value === 'All') {
        return { ...prevPending, [field]: ['All'] };
      } else if (currentValues.includes('All')) {
        const newValues = currentValues.filter((v) => v !== 'All');
        return { ...prevPending, [field]: newValues.includes(value) ? newValues : [...newValues, value] };
      } else {
        const newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];
        return { ...prevPending, [field]: newValues.length === 0 ? ['All'] : newValues };
      }
    });
  };

  const handleSelectAll = (field, uniqueValues, checked) => {
    setPendingFilters((prevPending) => {
      if (checked) {
        return { ...prevPending, [field]: [...uniqueValues] };
      } else {
        return { ...prevPending, [field]: ['All'] };
      }
    });
  };

  const applyFilters = () => {
    setFilters({ ...pendingFilters });
    setOpenFilter(null);
  };

  const handleRowSelect = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], selected: !newData[index].selected };
      return newData;
    });
  };

  const handleSelectAllRows = (checked) => {
    setData((prevData) =>
      prevData.map((item) => ({
        ...item,
        selected: checked && !item.audited,
      }))
    );
  };

  const handleToggleAudit = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], audited: !newData[index].audited };
      return newData;
    });
  };

  const clearFilter = (field) => {
    setPendingFilters((prevPending) => ({
      ...prevPending,
      [field]: field === 'audited' ? 'All' : ['All'],
    }));
  };

  const toggleFilterDropdown = (field) => {
    setOpenFilter(openFilter === field ? null : field);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openFilter && filterRefs.current[openFilter] && !filterRefs.current[openFilter].contains(event.target)) {
        setOpenFilter(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openFilter]);

  const handleGo = () => {};

  const handleAdd = (defaultEntry) => {
    setModal({ isOpen: true, type: 'add', data: null });
    setNewEntry(defaultEntry);
  };

  const handleEdit = () => {
    const selectedRows = data.filter((item) => item.selected);
    if (selectedRows.length !== 1) {
      alert('Please select exactly one row to edit.');
      return;
    }
    if (selectedRows[0].audited) {
      alert('This row has been audited and cannot be modified.');
      return;
    }
    setModal({ isOpen: true, type: 'edit', data: selectedRows[0] });
    setNewEntry({ ...selectedRows[0], selected: false, audited: false });
  };

  const handleView = () => {
    const selectedRows = data.filter((item) => item.selected);
    if (selectedRows.length !== 1) {
      alert('Please select exactly one row to view.');
      return;
    }
    setModal({ isOpen: true, type: 'view', data: selectedRows[0] });
  };

  const handleDelete = () => {
    const selectedRows = data.filter((item) => item.selected);
    if (selectedRows.length === 0) {
      alert('Please select at least one row to delete.');
      return;
    }
    if (selectedRows.some((row) => row.audited)) {
      alert('Audited rows cannot be deleted.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete ${selectedRows.length} row(s)?`)) {
      setData((prevData) => prevData.filter((item) => !item.selected));
    }
  };

  const handleRefresh = () => {
    setData(initialData);
    setFilters(columns.reduce((acc, col) => ({ ...acc, [col.field]: col.field === 'audited' ? 'All' : ['All'] }), {}));
    setPendingFilters(columns.reduce((acc, col) => ({ ...acc, [col.field]: col.field === 'audited' ? 'All' : ['All'] }), {}));
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };

  const handlePrint = () => {
    console.log(`Printing table data:`, filteredData);
    alert('Print functionality triggered. Check console for data.');
  };

  const handleAudit = () => {
    const selectedRows = data.filter((item) => item.selected);
    if (selectedRows.length === 0) {
      alert('Please select at least one row to audit.');
      return;
    }
    setData((prevData) =>
      prevData.map((item) =>
        item.selected && !item.audited ? { ...item, audited: true, selected: false } : item
      )
    );
    alert('Selected rows have been audited.');
  };

  const handleField = () => {
    console.log(`Toggling extra fields`);
    alert('Field functionality triggered. Check console for details.');
  };

  const handleModalSubmit = () => {
    const updatedEntry = { ...newEntry, selected: false, audited: false };
    if (modal.type === 'add') {
      setData((prevData) => [updatedEntry, ...prevData]);
    } else if (modal.type === 'edit') {
      setData((prevData) =>
        prevData.map((item) =>
          item.selected ? { ...updatedEntry, selected: false } : item
        )
      );
    }
    setModal({ isOpen: false, type: '', data: null });
  };

  const handleModalSaveAndClose = () => {
    handleModalSubmit();
    setModal({ isOpen: false, type: '', data: null });
  };

  const handleInputChange = (field, value) => {
    setNewEntry((prev) => ({ ...prev, [field]: value }));
  };

  const renderInputField = (field, value, config = {}) => {
    const { type = 'text', options = [] } = config;
    switch (type) {
      case 'dropdown':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
        );
      default:
        return (
          <input
            type={type}
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        );
    }
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `TableData`);
    XLSX.writeFile(workbook, `TableData.xlsx`);
  };

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text('Table Data', 10, 10);
      const tableData = filteredData.map((item) =>
        columns
          .filter((col) => col.field !== 'selected')
          .map((col) => {
            const value = item[col.field];
            return numericFields.includes(col.field) ? parseFloat(value).toFixed(2) : value;
          })
      );
      autoTable(doc, {
        head: [columns.filter((col) => col.field !== 'selected').map((col) => col.label)],
        body: tableData,
        startY: 20,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [220, 38, 38], textColor: 255 },
      });
      doc.save(`TableData.pdf`);
    } catch (error) {
      console.error(`Error generating PDF:`, error);
      alert('Failed to generate PDF. Please check the console for more details.');
    }
  };

  const contextValue = {
    data,
    setData,
    initialData,
    setInitialData,
    filters,
    setFilters,
    pendingFilters,
    setPendingFilters,
    openFilter,
    setOpenFilter,
    searchTerm,
    setSearchTerm,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    modal,
    setModal,
    newEntry,
    setNewEntry,
    columns,
    setColumns,
    numericFields,
    setNumericFields,
    filterRefs,
    getUniqueValues,
    parseDate,
    filteredData,
    totals,
    handleFilterChange,
    handleSelectAll,
    applyFilters,
    handleRowSelect,
    handleSelectAllRows,
    handleToggleAudit,
    clearFilter,
    toggleFilterDropdown,
    handleGo,
    handleAdd,
    handleEdit,
    handleView,
    handleDelete,
    handleRefresh,
    handlePrint,
    handleAudit,
    handleField,
    handleModalSubmit,
    handleModalSaveAndClose,
    handleInputChange,
    renderInputField,
    handleExportExcel,
    handleExportPDF,
  };

  return <TableContext.Provider value={contextValue}>{children}</TableContext.Provider>;
};
