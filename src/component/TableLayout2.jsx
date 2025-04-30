import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const TableLayout2 = ({
  title,
  columns,
  initialData,
  numericFields = [],
  showBack = true,
  showForward = true,
  showRefresh = true,
  showPrint = true,
  showGroupwise = true,
  showMerge = true,
  showAudit = true,
  showExportExcel = true,
  showExportPDF = true,
  showFIFO = true,
  showMSME = true,
}) => {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.field]: ['All'] }), {})
  );
  const [pendingFilters, setPendingFilters] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.field]: ['All'] }), {})
  );
  const [openFilter, setOpenFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [modal, setModal] = useState({ isOpen: false, type: '', data: null });
  const [newEntry, setNewEntry] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.field]: '' }), { selected: false })
  );

  const filterRefs = useRef({});

  // Get unique values for each field
  const getUniqueValues = (key) => {
    return ['All', ...new Set(data.map((item) => item[key]?.toString() || ''))];
  };

  // Filter and sort data
  const filteredData = [...data].filter((item) => {
    const matchesSearch = Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesDate =
      (!startDate || new Date(item.date || '') >= new Date(startDate)) &&
      (!endDate || new Date(item.date || '') <= new Date(endDate));
    return (
      matchesSearch &&
      matchesDate &&
      columns.every((col) =>
        filters[col.field].includes('All') ||
        filters[col.field].includes(item[col.field]?.toString())
      )
    );
  });

  // Calculate totals for numeric fields
  const totals = numericFields.reduce((acc, field) => {
    acc[field] = filteredData.reduce((sum, item) => sum + (parseFloat(item[field]) || 0), 0);
    return acc;
  }, {});

  // Handle checkbox change for individual values in pending filters
  const handleFilterChange = (field, value) => {
    setPendingFilters((prevPending) => {
      const currentValues = prevPending[field];
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

  // Handle "Select All" checkbox change in pending filters
  const handleSelectAll = (field, uniqueValues, checked) => {
    setPendingFilters((prevPending) => {
      if (checked) {
        return { ...prevPending, [field]: [...uniqueValues] };
      } else {
        return { ...prevPending, [field]: ['All'] };
      }
    });
  };

  // Apply filters when "Filter" button is clicked
  const applyFilters = () => {
    setFilters({ ...pendingFilters });
    setOpenFilter(null);
  };

  // Toggle row selection
  const handleRowSelect = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Clear filter for a specific field
  const clearFilter = (field) => {
    setPendingFilters((prevPending) => ({ ...prevPending, [field]: ['All'] }));
  };

  // Toggle filter dropdown
  const toggleFilterDropdown = (field) => {
    setOpenFilter(openFilter === field ? null : field);
  };

  // Close dropdown when clicking outside
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

  // Apply date range
  const handleGo = () => {
    // Filtering is handled in filteredData
  };

  // Operation Handlers
  const handleBack = () => {
    console.log('Back action triggered');
    alert('Back functionality triggered. Check console for details.');
  };

  const handleForward = () => {
    console.log('Forward action triggered');
    alert('Forward functionality triggered. Check console for details.');
  };

  const handleRefresh = () => {
    setData(initialData);
    setFilters(columns.reduce((acc, col) => ({ ...acc, [col.field]: ['All'] }), {}));
    setPendingFilters(columns.reduce((acc, col) => ({ ...acc, [col.field]: ['All'] }), {}));
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };

  const handlePrint = () => {
    console.log(`Printing table data for ${title}:`, filteredData);
    alert('Print functionality triggered. Check console for data.');
  };

  const handleGroupwise = () => {
    console.log(`Groupwise action for ${title}`);
    alert('Groupwise functionality triggered. Check console for details.');
  };

  const handleMerge = () => {
    console.log(`Merge action for ${title}`);
    alert('Merge functionality triggered. Check console for details.');
  };

  const handleAudit = () => {
    const selectedRows = data.filter((item) => item.selected);
    if (selectedRows.length === 0) {
      alert('Please select at least one row to audit.');
      return;
    }
    console.log(`Audit action for ${title}:`, selectedRows);
    alert('Audit action triggered. Check console for details.');
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `${title} Data`);
    XLSX.writeFile(workbook, `${title}.xlsx`);
  };

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text(title, 10, 10);

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

      doc.save(`${title}.pdf`);
    } catch (error) {
      console.error(`Error generating PDF for ${title}:`, error);
      alert('Failed to generate PDF. Please check the console for more details.');
    }
  };

  // FIFO: Sort by invoiceDate (earliest first)
  const applyFIFO = () => {
    const sortedData = [...filteredData].sort((a, b) => new Date(a.invoiceDate) - new Date(b.invoiceDate));
    setData(sortedData);
  };

  // MSME: Prioritize MSME vendors (shorter payment cycle)
  const applyMSME = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a.isMSME && !b.isMSME) return -1;
      if (!a.isMSME && b.isMSME) return 1;
      return new Date(a.dueDate || a.date) - new Date(b.dueDate || b.date);
    });
    setData(sortedData);
  };

  return (
    <div className="relative p-6 w-full h-[85vh] overflow-hidden bg-white shadow-xl rounded-xl border border-gray-200">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-gradient-to-r from-blue-50 to-blue-100 sticky top-0 z-10 border-b border-gray-200 p-4 rounded-t-xl">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              placeholder="dd-mm-yyyy"
            />
            <span className="text-gray-600 font-medium">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
              placeholder="dd-mm-yyyy"
            />
            <button
              onClick={handleGo}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all duration-200"
            >
              GO
            </button>
          </div>
          <input
            type="text"
            placeholder="Fast Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          />
          <div className="flex space-x-2">
            {showBack && (
              <button
                onClick={handleBack}
                className="p-2 px-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 shadow-md transition-all duration-200"
                title="Back"
              >
                <i className="ri-arrow-left-line"></i>
              </button>
            )}
            {showForward && (
              <button
                onClick={handleForward}
                className="p-2 px-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 shadow-md transition-all duration-200"
                title="Forward"
              >
                <i className="ri-arrow-right-line"></i>
              </button>
            )}
            {showRefresh && (
              <button
                onClick={handleRefresh}
                className="p-2 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-all duration-200"
                title="Refresh"
              >
                <i className="ri-refresh-line"></i>
              </button>
            )}
            {showPrint && (
              <button
                onClick={handlePrint}
                className="p-2 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-all duration-200"
                title="Print"
              >
                <i className="ri-printer-line"></i>
              </button>
            )}
            {showGroupwise && (
              <button
                onClick={handleGroupwise}
                className="p-2 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-all duration-200"
                title="Groupwise"
              >
                <i className="ri-group-line"></i>
              </button>
            )}
            {showMerge && (
              <button
                onClick={handleMerge}
                className="p-2 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-all duration-200"
                title="Merge"
              >
                <i className="ri-merge-cells-horizontal"></i>
              </button>
            )}
            {showAudit && (
              <button
                onClick={handleAudit}
                className="p-2 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-all duration-200"
                title="Audit"
              >
                <i className="ri-file-shield-line"></i>
              </button>
            )}
            {showExportExcel && (
              <button
                onClick={handleExportExcel}
                className="p-2 px-3 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md transition-all duration-200"
                title="Export to Excel"
              >
                <i className="ri-file-excel-line"></i>
              </button>
            )}
            {showExportPDF && (
              <button
                onClick={handleExportPDF}
                className="p-2 px-3 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md transition-all duration-200"
                title="Export to PDF"
              >
                <i className="ri-file-pdf-line"></i>
              </button>
            )}
            {showFIFO && (
              <button
                onClick={applyFIFO}
                className="p-2 px-3 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md transition-all duration-200"
                title="Apply FIFO"
              >
               <i class="ri-stack-line"></i>
              </button>
            )}
            {showMSME && (
              <button
                onClick={applyMSME}
                className="p-2 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-all duration-200"
                title="Apply MSME Priority"
              >
                <i className="ri-user-star-line"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Table Container */}
      <div className=" overflow-y-scroll overflow-x-scroll w-full scroller max-h-[calc(85vh-120px)]">
      <table className="text-left ">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200 sticky top-0 z-10">
              {columns.map((column, index) => (
                <th
                  key={column.field}
                  className={`p-3 border-b border-gray-200 text-gray-700 font-semibold text-sm ${index === 0 ? 'rounded-tl-lg' : ''} ${index === columns.length - 1 ? 'rounded-tr-lg' : ''}`}
                >
                  <div className="flex items-center space-x-2">
                    {column.label === 'A' ? (
                      <i className="ri-checkbox-line text-blue-600"></i>
                    ) : column.label.includes('Date') ? (
                      <i className="ri-calendar-line text-blue-600"></i>
                    ) : (
                      <i className="ri-file-text-line text-blue-600"></i>
                    )}
                    <span>{column.label}</span>
                    <button
                      onClick={() => toggleFilterDropdown(column.field)}
                      className="ml-2 text-gray-500 hover:text-blue-600 transition-all duration-200"
                      title={`Filter by ${column.label}`}
                    >
                      <i className="ri-filter-3-line"></i>
                    </button>
                    {openFilter === column.field && (
                      <div
                        ref={(el) => (filterRefs.current[column.field] = el)}
                        className="absolute z-20 mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-64 max-h-48 overflow-y-auto"
                      >
                        <div className="flex items-center mb-3">
                          <input
                            type="checkbox"
                            id={`${column.field}-select-all`}
                            checked={
                              !pendingFilters[column.field].includes('All') &&
                              getUniqueValues(column.field).every((value) => pendingFilters[column.field].includes(value))
                            }
                            onChange={(e) => handleSelectAll(column.field, getUniqueValues(column.field), e.target.checked)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-400 rounded"
                          />
                          <label htmlFor={`${column.field}-select-all`} className="text-gray-700 font-medium">
                            Select All
                          </label>
                        </div>
                        {getUniqueValues(column.field).map((value) => (
                          <div key={value} className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id={`${column.field}-${value}`}
                              checked={pendingFilters[column.field].includes(value)}
                              onChange={() => handleFilterChange(column.field, value)}
                              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-400 rounded"
                            />
                            <label htmlFor={`${column.field}-${value}`} className="text-gray-700">
                              {value}
                            </label>
                          </div>
                        ))}
                        <div className="flex justify-end gap-2 mt-3">
                          <button
                            onClick={() => clearFilter(column.field)}
                            className="p-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                          >
                            Clear
                          </button>
                          <button
                            onClick={applyFilters}
                            className="p-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                          >
                            Filter
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-blue-50 transition-all duration-200 border-b border-gray-100 ${
                  item.locked ? 'bg-red-50' : ''
                }`}
              >
                {columns.map((column) => (
                  <td key={column.field} className="p-3 text-gray-700">
                    <div className="flex items-center">
                      {column.field === 'selected' ? (
                        <input
                          type="checkbox"
                          checked={item.selected}
                          onChange={() => handleRowSelect(data.indexOf(item))}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-400 rounded"
                        />
                      ) : numericFields.includes(column.field) ? (
                        <span className={item[column.field] < 0 ? 'text-red-600' : 'text-green-600'}>
                          {Math.abs(parseFloat(item[column.field]) || 0).toFixed(2)}{' '}
                          {item[column.field] < 0 ? 'Cr' : 'Db'}
                        </span>
                      ) : (
                        <>
                          {item.locked && <i className="ri-lock-line text-red-500 mr-2"></i>}
                          {item[column.field] || ''}
                        </>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {numericFields.length > 0 && (
              <tr className="bg-blue-100 font-semibold">
                {columns.map((column) => (
                  <td key={column.field} className="p-3 text-gray-700">
                    {numericFields.includes(column.field) ? (
                      <span className={totals[column.field] < 0 ? 'text-red-600' : 'text-green-600'}>
                        {Math.abs(totals[column.field]).toFixed(2)}{' '}
                        {totals[column.field] < 0 ? 'Cr' : 'Db'}
                      </span>
                    ) : column.field === 'selected' ? (
                      ''
                    ) : (
                      ''
                    )}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="py-4 text-center text-gray-500 bg-white">
            No entries found for the selected filters or search.
          </div>
        )}
      </div>
    </div>
  );
};

export default TableLayout2;