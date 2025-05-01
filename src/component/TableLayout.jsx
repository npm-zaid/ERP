import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const TableLayout = ({
  title,
  columns,
  initialData,
  numericFields = [],
  showAdd,
  showEdit,
  showView,
  showDelete,
  showRefresh,
  showPrint,
  showAudit,
  showField,
  showExportExcel,
  showExportPDF,
  fieldConfig = {},
  windowConfig = {},
  componentType = 'default',
}) => {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState(
    columns.reduce((acc, col) => ({
      ...acc,
      [col.field]: col.field === 'audited' ? 'All' : ['All'],
    }), {})
  );
  const [pendingFilters, setPendingFilters] = useState(
    columns.reduce((acc, col) => ({
      ...acc,
      [col.field]: col.field === 'audited' ? 'All' : ['All'],
    }), {})
  );
  const [openFilter, setOpenFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [modal, setModal] = useState({ isOpen: false, type: '', data: null });
  const [newEntry, setNewEntry] = useState(
    windowConfig.initialState || {
      ...columns.reduce((acc, col) => ({ ...acc, [col.field]: '' }), { selected: false }),
    }
  );

  const filterRefs = useRef({});

  useEffect(() => {
    setData(initialData);
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

    const itemDate = parseDate(item.lrDate || item.date);
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
      return filters[col.field].includes('All') || filters[col.field].includes(item[col.field]?.toString());
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

  const handleGo = () => {
    console.log('GO button clicked with date range:', startDate, 'to', endDate);
  };

  const handleAdd = () => {
    setModal({ isOpen: true, type: 'add', data: null });
    setNewEntry(windowConfig.initialState || {
      ...columns.reduce((acc, col) => ({ ...acc, [col.field]: '' }), { selected: false }),
    });
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
    setNewEntry({
      ...windowConfig.initialState,
      date: selectedRows[0].lrDate || selectedRows[0].date,
      lrNo: selectedRows[0].lrNo,
      center: selectedRows[0].center,
      consignee: {
        fromCity: selectedRows[0].fromCity || '',
        toCity: selectedRows[0].toCity || '',
        gstno: '',
        name: selectedRows[0].consigneeName || '',
        mobile: '',
        address: '',
      },
      billAccount: {
        gstno: '',
        name: selectedRows[0].consignorName || '',
        mobile: '',
        address: '',
      },
      items: [
        {
          article: selectedRows[0].totalArticle || 0,
          packaging: '',
          goodsContained: '',
          actualWeight: 0,
          weight: selectedRows[0].totalWeight || 0,
          rate: 0,
          freightOn: '',
          amount: selectedRows[0].totalFreight || 0,
        },
      ],
      freight: selectedRows[0].totalFreight || 0,
      subTotal: selectedRows[0].totalFreight || 0,
      totalFreight: selectedRows[0].totalFreight || 0,
    });
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
    setFilters(
      columns.reduce((acc, col) => ({
        ...acc,
        [col.field]: col.field === 'audited' ? 'All' : ['All'],
      }), {})
    );
    setPendingFilters(
      columns.reduce((acc, col) => ({
        ...acc,
        [col.field]: col.field === 'audited' ? 'All' : ['All'],
      }), {})
    );
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };

  const handlePrint = () => {
    console.log(`Printing table data for ${title}:`, filteredData);
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
    console.log(`Toggling extra fields for ${title}`);
    alert('Field functionality triggered. Check console for details.');
  };

  const handleModalSubmit = () => {
    const updatedEntry = {
      ...newEntry,
      selected: false,
      audited: false,
      ...(windowConfig.fieldMapping ? windowConfig.fieldMapping(newEntry) : {}),
    };

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

  const handleNestedInputChange = (category, field, value) => {
    setNewEntry((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleItemChange = (index, field, value) => {
    setNewEntry((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      const subTotal = updatedItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
      const gstAmt = (subTotal * (parseFloat(prev.gstRate) || 0)) / 100;
      const totalFreight =
        subTotal +
        gstAmt +
        (parseFloat(prev.crossing) || 0) +
        (parseFloat(prev.docketCharge) || 0) +
        (parseFloat(prev.hamali) || 0) +
        (parseFloat(prev.detention) || 0) +
        (parseFloat(prev.doorCollection) || 0) +
        (parseFloat(prev.doorDelivery) || 0);
      return {
        ...prev,
        items: updatedItems,
        subTotal,
        gstAmt,
        totalFreight,
      };
    });
  };

  const addItemRow = () => {
    setNewEntry((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { article: 0, packaging: '', goodsContained: '', actualWeight: 0, weight: 0, rate: 0, freightOn: '', amount: 0 },
      ],
    }));
  };

  const removeItemRow = (index) => {
    setNewEntry((prev) => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      const subTotal = updatedItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
      const gstAmt = (subTotal * (parseFloat(prev.gstRate) || 0)) / 100;
      const totalFreight =
        subTotal +
        gstAmt +
        (parseFloat(prev.crossing) || 0) +
        (parseFloat(prev.docketCharge) || 0) +
        (parseFloat(prev.hamali) || 0) +
        (parseFloat(prev.detention) || 0) +
        (parseFloat(prev.doorCollection) || 0) +
        (parseFloat(prev.doorDelivery) || 0);
      return {
        ...prev,
        items: updatedItems,
        subTotal,
        gstAmt,
        totalFreight,
      };
    });
  };

  const renderInputField = (field, value, config = {}) => {
    const { type = 'text', options = [], placeholder = '' } = config;
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
            placeholder={placeholder}
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
            placeholder={placeholder}
          />
        );
    }
  };

  const renderModalContent = () => {
    switch (componentType) {
      case 'lr':
        return (
          <div className="min-h-screen text-[14px]  bg-gray-50 flex justify-center items-center   ">
          <div className="w-full  space-y-8 ">
            {/* General Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-800">General Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {[
                  { label: 'Date', field: 'date', type: 'date' },
                  { label: 'LR No', field: 'lrNo', type: 'text', placeholder: 'Auto-generated' },
                  {
                    label: 'Center',
                    field: 'center',
                    type: 'dropdown',
                    options: fieldConfig.center?.options || [],
                  },
                  {
                    label: 'Type',
                    field: 'type',
                    type: 'dropdown',
                    options: fieldConfig.type?.options || [],
                  },
                ].map(({ label, field, type, options, placeholder }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {renderInputField(field, newEntry[field], { type, options, placeholder })}
                  </div>
                ))}
              </div>
    
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {[
                  {
                    label: 'Freight By',
                    field: 'freightBy',
                    type: 'dropdown',
                    options: fieldConfig.freightBy?.options || [],
                  },
                  {
                    label: 'Delivery',
                    field: 'delivery',
                    type: 'dropdown',
                    options: fieldConfig.delivery?.options || [],
                  },
                  { label: 'Invoice No', field: 'invNo', type: 'text' },
                ].map(({ label, field, type, options }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {renderInputField(field, newEntry[field], { type, options })}
                  </div>
                ))}
              </div>
            </div>
    
            {/* Consignee Details */}
            <div className="border-t border-gray-200 pt-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-800">Consignee Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'From City', field: 'fromCity', options: fieldConfig.fromCity?.options || [] },
                  { label: 'To City', field: 'toCity', options: fieldConfig.toCity?.options || [] },
                  { label: 'GST No', field: 'gstno', type: 'text' },
                  { label: 'Name', field: 'name', type: 'text' },
                  { label: 'Mobile', field: 'mobile', type: 'text' },
                  { label: 'Address', field: 'address', type: 'text' },
                ].map(({ label, field, type, options }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {type === 'text' ? (
                      <input
                        type="text"
                        value={newEntry.consignee?.[field] || ''}
                        onChange={(e) => handleNestedInputChange('consignee', field, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      />
                    ) : (
                      <select
                        value={newEntry.consignee?.[field] || ''}
                        onChange={(e) => handleNestedInputChange('consignee', field, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      >
                        <option value="">Select {label}</option>
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
    
            {/* Bill Account Details */}
            <div className="border-t border-gray-200 pt-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-800">Bill Account Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'GST No', field: 'gstno' },
                  { label: 'Name', field: 'name' },
                  { label: 'Mobile', field: 'mobile' },
                  { label: 'Address', field: 'address' },
                ].map(({ label, field }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      type="text"
                      value={newEntry.billAccount?.[field] || ''}
                      onChange={(e) => handleNestedInputChange('billAccount', field, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                ))}
              </div>
            </div>
    
            {/* Items Table */}
            <div className="border-t border-gray-200 pt-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-800">Items</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      {[
                        'Article',
                        'Packaging',
                        'Goods Contained',
                        'Actual Weight',
                        'Weight',
                        'Rate',
                        'Freight On',
                        'Amount',
                        'Actions',
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(newEntry.items || []).map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {[
                          'article',
                          'packaging',
                          'goodsContained',
                          'actualWeight',
                          'weight',
                          'rate',
                          'freightOn',
                          'amount',
                        ].map((field) => (
                          <td key={field} className="p-4 border-b border-gray-200">
                            <input
                              type={field.includes('Weight') || field === 'article' || field === 'rate' || field === 'amount' ? 'number' : 'text'}
                              value={item[field]}
                              onChange={(e) => handleItemChange(index, field, e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                          </td>
                        ))}
                        <td className="p-4 border-b border-gray-200">
                          <button
                            onClick={() => removeItemRow(index)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={addItemRow}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Item
              </button>
            </div>
    
            {/* Additional Fields */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {[
                  { label: 'Value Rs', field: 'valueRs', type: 'number' },
                  { label: 'Previous Freight', field: 'previousFreight', type: 'number' },
                  { label: 'Freight', field: 'freight', type: 'number' },
                  {
                    label: 'Narration',
                    field: 'narration',
                    type: 'textarea',
                    placeholder: 'Enter narration',
                  },
                ].map(({ label, field, type, placeholder }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {renderInputField(field, newEntry[field], { type, placeholder })}
                  </div>
                ))}
              </div>
    
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {[
                  { label: 'Crossing', field: 'crossing', type: 'number' },
                  { label: 'Docket Charge', field: 'docketCharge', type: 'number' },
                  { label: 'Hamali', field: 'hamali', type: 'number' },
                  { label: 'Detention', field: 'detention', type: 'number' },
                ].map(({ label, field, type }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {renderInputField(field, newEntry[field], { type })}
                  </div>
                ))}
              </div>
    
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {[
                  { label: 'Door Collection', field: 'doorCollection', type: 'number' },
                  { label: 'Door Delivery', field: 'doorDelivery', type: 'number' },
                  { label: 'Booking ID', field: 'bookingId', type: 'text' },
                  { label: 'Memo No', field: 'memoNo', type: 'text' },
                ].map(({ label, field, type }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {renderInputField(field, newEntry[field], { type })}
                  </div>
                ))}
              </div>
    
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {[
                  { label: 'Delivery No', field: 'deliveryNo', type: 'text' },
                  { label: 'Bill No', field: 'billNo', type: 'text' },
                  { label: 'Sub Total', field: 'subTotal', type: 'number', readOnly: true },
                  { label: 'GST By', field: 'gstBy', type: 'text' },
                ].map(({ label, field, type, readOnly }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {readOnly ? (
                      <input
                        type="number"
                        value={newEntry[field] || 0}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    ) : (
                      renderInputField(field, newEntry[field], { type })
                    )}
                  </div>
                ))}
              </div>
    
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'GST Rate', field: 'gstRate', type: 'text' },
                  { label: 'GST Amount', field: 'gstAmt', type: 'number', readOnly: true },
                  { label: 'Total Freight', field: 'totalFreight', type: 'number', readOnly: true },
                ].map(({ label, field, type, readOnly }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {readOnly ? (
                      <input
                        type="number"
                        value={newEntry[field] || 0}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    ) : (
                      renderInputField(field, newEntry[field], { type })
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        );
      case 'memo':
        return (
          <div className="min-h-screen text-[14px] bg-gray-50 flex justify-center items-center ">
      <div className="w-full   space-y-8">
        {/* General Information */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-800">Memo Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
            {[
              { label: 'Date', field: 'date', type: 'date' },
              { label: 'Memo No', field: 'memoNo', type: 'text', placeholder: 'Auto-generated' },
              {
                label: 'To Branch',
                field: 'toBranch',
                type: 'dropdown',
                options: fieldConfig.toBranch?.options || [],
              },
              {
                label: 'Vehicle',
                field: 'vehicle',
                type: 'dropdown',
                options: fieldConfig.vehicle?.options || [],
              },
              {
                label: 'Driver',
                field: 'driver',
                type: 'dropdown',
                options: fieldConfig.driver?.options || [],
              },
              { label: 'K. Miter', field: 'kMiter', type: 'text' },
            ].map(({ label, field, type, options, placeholder }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                {renderInputField(field, newEntry[field] || '', { type, options, placeholder })}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
            {[
              {
                label: 'Agent',
                field: 'agent',
                type: 'dropdown',
                options: fieldConfig.agent?.options || [],
              },
              {
                label: 'Hire',
                field: 'hire',
                type: 'dropdown',
                options: fieldConfig.hire?.options || [],
              },
              {
                label: 'Cash/Bank',
                field: 'cashBank',
                type: 'dropdown',
                options: fieldConfig.cashBank?.options || [],
              },
            ].map(({ label, field, type, options }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                {renderInputField(field, newEntry[field], { type, options })}
              </div>
            ))}
            <div className="col-span-3 flex items-center space-x-4">
              <button
                onClick={() => handleInputChange('addLr', !newEntry.addLr)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Lr
              </button>
              <button
                onClick={() => handleInputChange('autoAddLr', !newEntry.autoAddLr)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Auto Add Lr
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="border-t border-gray-200 pt-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-800">Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {[
                    'Center Name',
                    'Lr No',
                    'Date',
                    'Packaging',
                    'Description',
                    'Article',
                    'FreightBy',
                    'From City',
                  ].map((header) => (
                    <th
                      key={header}
                      className="p-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  {[
                    {
                      field: 'center',
                      type: 'dropdown',
                      options: fieldConfig.center?.options || [],
                    },
                    { field: 'memoNo', type: 'text' },
                    { field: 'date', type: 'date' },
                    {
                      field: 'packaging',
                      type: 'dropdown',
                      options: fieldConfig.packaging?.options || [],
                    },
                    { field: 'description', type: 'text' },
                    { field: 'article', type: 'number' },
                    {
                      field: 'freightBy',
                      type: 'dropdown',
                      options: fieldConfig.freightBy?.options || [],
                    },
                    {
                      field: 'fromCity',
                      type: 'dropdown',
                      options: fieldConfig.fromCity?.options || [],
                    },
                  ].map(({ field, type, options }, index) => (
                    <td key={field} className="p-4 border-b border-gray-200">
                      {renderInputField(field, newEntry[field] || '', { type, options })}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-800">Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            {[
              { label: 'Total Lr', field: 'totalLr' },
              { label: 'Total Article', field: 'totalArticle' },
              { label: 'Total Ac. Weight', field: 'totalAcWeight' },
              { label: 'Total Weight', field: 'totalWeight' },
              { label: 'Freight By Article', field: 'freightByArticle' },
            ].map(({ label, field }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="text"
                  value={newEntry[field] || ''}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'To Pay', field: 'toPay', type: 'number' },
              { label: 'Paid', field: 'paid', type: 'number' },
              {
                label: 'Balance',
                field: 'balance',
                type: 'text',
                readOnly: true,
                value: (parseFloat(newEntry.toPay || 0) - parseFloat(newEntry.paid || 0)).toFixed(2),
              },
            ].map(({ label, field, type, readOnly, value }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                {readOnly ? (
                  <input
                    type="text"
                    value={value || ''}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                ) : (
                  renderInputField(field, newEntry[field], { type })
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: 'Consignee', field: 'consignee', type: 'text' },
              { label: 'Consignor', field: 'consignor', type: 'text' },
            ].map(({ label, field, type }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                {renderInputField(field, newEntry[field] || '', { type })}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                label: 'Narration',
                field: 'narration',
                type: 'textarea',
                placeholder: 'Enter narration',
              },
              { label: 'Memo Freight', field: 'memoFreight', type: 'number' },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                {renderInputField(field, newEntry[field], { type, placeholder })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
        );
      case 'memoreceive':
        return (
          <div className="min-h-screen text-[14px] bg-gray-50 flex justify-center items-center ">
          <div className="w-full  bg-white space-y-8">
            {/* General Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-800">Receive Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Date', field: 'date', type: 'date' },
                  {
                    label: 'Receive No',
                    field: 'receiveNo',
                    type: 'text',
                    placeholder: 'Auto-generated',
                  },
                  { label: 'Memo', field: 'memo', type: 'text' },
                ].map(({ label, field, type, placeholder }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {renderInputField(field, newEntry[field] || '', { type, placeholder })}
                  </div>
                ))}
              </div>
            </div>
    
            {/* Items Table */}
            <div className="border-t border-gray-200 pt-6 space-y-6">
              <h2 className="text-lg font-bold text-gray-800">Items</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      {[
                        'Center',
                        'Lr No',
                        'Lr Date',
                        'Bale No',
                        'From City',
                        'City',
                        'Consignor',
                        'Consignee',
                        'Article',
                        'Short Art',
                        'Weight',
                        'Freight',
                        'Freight By',
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-4 text-left text-sm font-medium text-gray-700 border-b border-gray-200"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(newEntry.items || [
                      {
                        center: '',
                        lrNo: '',
                        lrDate: '',
                        baleNo: '',
                        fromCity: '',
                        city: '',
                        consignor: '',
                        consignee: '',
                        article: 0,
                        shortArt: 0,
                        weight: 0,
                        freight: 0,
                        freightBy: '',
                      },
                    ]).map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {[
                          {
                            field: 'center',
                            type: 'dropdown',
                            options: fieldConfig.center?.options || ['HEAD OFFICE', 'MUMBAI', 'DELHI'],
                          },
                          { field: 'lrNo', type: 'text' },
                          { field: 'lrDate', type: 'date' },
                          { field: 'baleNo', type: 'text' },
                          {
                            field: 'fromCity',
                            type: 'dropdown',
                            options: fieldConfig.fromCity?.options || ['MUMBAI', 'DELHI', 'PUNE'],
                          },
                          {
                            field: 'city',
                            type: 'dropdown',
                            options: fieldConfig.toCity?.options || ['AHMEDABAD', 'KOTA', 'JAIPUR'],
                          },
                          { field: 'consignor', type: 'text' },
                          { field: 'consignee', type: 'text' },
                          { field: 'article', type: 'number' },
                          { field: 'shortArt', type: 'number' },
                          { field: 'weight', type: 'number' },
                          { field: 'freight', type: 'number' },
                          {
                            field: 'freightBy',
                            type: 'dropdown',
                            options: fieldConfig.freightBy?.options || ['TBB'],
                          },
                        ].map(({ field, type, options }) => (
                          <td key={field} className="p-4 border-b border-gray-200">
                            {renderInputField(`items[${index}].${field}`, item[field], { type, options })}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
    
            {/* Additional Fields */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-800">Summary</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
                {[
                  {
                    label: 'Narration',
                    field: 'narration',
                    type: 'textarea',
                    placeholder: 'Enter narration',
                  },
                  {
                    label: 'Balance',
                    field: 'balance',
                    type: 'number',
                    readOnly: true,
                    value: (parseFloat(newEntry.toPay || 0) - parseFloat(newEntry.paid || 0)).toFixed(2),
                  },
                ].map(({ label, field, type, placeholder, readOnly, value }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {readOnly ? (
                      <input
                        type="number"
                        value={value || ''}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    ) : (
                      renderInputField(field, newEntry[field] || '', { type, placeholder })
                    )}
                  </div>
                ))}
              </div>
    
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'To Pay', field: 'toPay', type: 'number' },
                  { label: 'Paid', field: 'paid', type: 'number' },
                  { label: 'Consignee', field: 'consignee', type: 'text' },
                  { label: 'Consignor', field: 'consignor', type: 'text' },
                ].map(({ label, field, type }) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    {renderInputField(field, newEntry[field] || '', { type })}
                  </div>
                ))}
              </div>
    
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Freight</label>
                  <input
                    type="number"
                    value={(newEntry.items || []).reduce((sum, item) => sum + (parseFloat(item.freight) || 0), 0)}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      case 'delivery':
          return(
            <div className="min-h-screen text-[14px] bg-gray-50 flex justify-center items-center ">
          <div className="w-full  bg-white space-y-8"> 
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {modal.type === 'add' ? 'Add Delivery of L.R.' : modal.type === 'edit' ? 'Edit Delivery of L.R.' : 'View Delivery of L.R.'}
              </h3>
              {modal.type === 'view' ? (
                <div className="space-y-3">
                  {columns
                    .filter((col) => col.field !== 'selected')
                    .map((col) => (
                      <p key={col.field}>
                        <strong>{col.label}:</strong>{' '}
                        {col.field === 'audited'
                          ? modal.data[col.field]
                            ? 'Yes'
                            : 'No'
                          : modal.data[col.field]}
                      </p>
                    ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Top Section */}
                  <div className="grid grid-cols-4 gap-4 border-b pb-4">
                    <div>
                      <label className="block text-gray-700 font-medium">Lr no</label>
                      {renderInputField('lrNo', newEntry.lrNo, { type: 'text' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium"></label>
                      <button
                        onClick={() => alert('Get LR functionality not implemented')}
                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Get LR
                      </button>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Delivery Date</label>
                      {renderInputField('date', newEntry.date, { type: 'date' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Delivery No</label>
                      {renderInputField('deliveryNo', newEntry.deliveryNo, { type: 'text', placeholder: 'Auto-generated' })}
                    </div>
                  </div>
  
                  {/* Party Section */}
                  <div className="border-b pb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Party</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium">Party</label>
                        {renderInputField('party', newEntry.party, { type: 'dropdown', options: fieldConfig.party.options })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Party Address</label>
                        {renderInputField('partyAddress', newEntry.partyAddress, { type: 'text' })}
                      </div>
                    </div>
                  </div>
  
                  {/* Vehical Section */}
                  <div className="border-b pb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Vehical</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium">Hire Account</label>
                        {renderInputField('hireAccount', newEntry.hireAccount, { type: 'dropdown', options: fieldConfig.hireAccount.options })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Hire</label>
                        {renderInputField('hire', newEntry.hire, { type: 'dropdown', options: fieldConfig.hire.options })}
                      </div>
                    </div>
                  </div>
  
                  {/* Cash/Bank Section */}
                  <div className="border-b pb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Cash/Bank</h4>
                    <div className="grid grid-cols-5 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium">Cash/Bank</label>
                        {renderInputField('cashBank', newEntry.cashBank, { type: 'dropdown', options: fieldConfig.cashBank.options })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Advance</label>
                        {renderInputField('advance', newEntry.advance, { type: 'number' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Cash/Bank 2</label>
                        {renderInputField('cashBank2', newEntry.cashBank2, { type: 'dropdown', options: fieldConfig.cashBank2.options })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Advance 2</label>
                        {renderInputField('advance2', newEntry.advance2, { type: 'number' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Balance</label>
                        <input
                          type="text"
                          value={(parseFloat(newEntry.advance || 0) - parseFloat(newEntry.advance2 || 0)).toFixed(2)}
                          readOnly
                          className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
  
                  {/* Consigner/Consignee Section */}
                  <div className="border-b pb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Consigner/Consignee</h4>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium">Consigner</label>
                        {renderInputField('consigner', newEntry.consigner, { type: 'text' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Consignee</label>
                        {renderInputField('consignee', newEntry.consignee, { type: 'text' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Consigner GSTNO</label>
                        {renderInputField('consignerGSTNO', newEntry.consignerGSTNO, { type: 'text' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Consignee GSTNO</label>
                        {renderInputField('consigneeGSTNO', newEntry.consigneeGSTNO, { type: 'text' })}
                      </div>
                    </div>
                  </div>
  
                  {/* Pack/Description/Article Section */}
                  <div className="border-b pb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Pack/Description/Article</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium">Pack</label>
                        {renderInputField('pack', newEntry.pack, { type: 'text' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Description</label>
                        {renderInputField('description', newEntry.description, { type: 'text' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Article</label>
                        {renderInputField('article', newEntry.article, { type: 'number' })}
                      </div>
                    </div>
                  </div>
  
                  {/* Article/Weight/Rate/FreightON Section */}
                  <div className="border-b pb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Article/Weight/Rate/FreightON</h4>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium">Article</label>
                        {renderInputField('article', newEntry.article, { type: 'number' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Weight</label>
                        {renderInputField('weight', newEntry.weight, { type: 'number' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Rate</label>
                        {renderInputField('rate', newEntry.rate, { type: 'number' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">FreightON</label>
                        {renderInputField('freightOn', newEntry.freightOn, { type: 'dropdown', options: fieldConfig.freightOn.options })}
                      </div>
                    </div>
                  </div>
  
                  {/* Amount/Pre.Rate/Total Article/Total Weight Section */}
                  <div className="border-b pb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Amount/Pre.Rate/Total</h4>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium">Amount</label>
                        {renderInputField('amount', newEntry.amount, { type: 'number' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Pre. Rate</label>
                        {renderInputField('preRate', newEntry.preRate, { type: 'number' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Total Article</label>
                        {renderInputField('totalArticle', newEntry.totalArticle, { type: 'number' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Total Weight</label>
                        {renderInputField('totalWeight', newEntry.totalWeight, { type: 'number' })}
                      </div>
                    </div>
                  </div>
  
                  {/* Charges Section */}
                  <div className="border-b pb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Charges</h4>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium">Hamali</label>
                        {renderInputField('hamali', newEntry.hamali, { type: 'number' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Service Charge</label>
                        {renderInputField('serviceCharge', newEntry.serviceCharge, { type: 'number' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Discount(Kasar)</label>
                        {renderInputField('discountKasar', newEntry.discountKasar, { type: 'number' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Delivery Freight</label>
                        {renderInputField('deliveryFreight', newEntry.deliveryFreight, { type: 'number' })}
                      </div>
                    </div>
                  </div>
  
                  {/* Delivery Details Section */}
                  <div className="border-b pb-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Delivery Details</h4>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium">Delivery Type</label>
                        {renderInputField('deliveryType', newEntry.deliveryType, { type: 'dropdown', options: fieldConfig.deliveryType.options })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Cash Type</label>
                        {renderInputField('cashType', newEntry.cashType, { type: 'dropdown', options: fieldConfig.cashType.options })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Account</label>
                        {renderInputField('account', newEntry.account, { type: 'dropdown', options: fieldConfig.account.options })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Labour</label>
                        {renderInputField('labour', newEntry.labour, { type: 'dropdown', options: fieldConfig.labour.options })}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-gray-700 font-medium">Delivery At</label>
                        {renderInputField('deliveryAt', newEntry.deliveryAt, { type: 'text' })}
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">Note</label>
                        {renderInputField('note', newEntry.note, { type: 'textarea', placeholder: 'Enter note' })}
                      </div>
                    </div>
                  </div>
  
                  {/* Right Column for Totals */}
                  <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-4"></div>
                    <div className="border-l pl-4">
                      <div className="space-y-2">
                        <div>
                          <label className="block text-gray-700 font-medium">Total Article :</label>
                          {renderInputField('totalArticle', newEntry.totalArticle, { type: 'number' })}
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium">Total Weight :</label>
                          {renderInputField('totalWeight', newEntry.totalWeight, { type: 'number' })}
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium">Hamali :</label>
                          {renderInputField('hamali', newEntry.hamali, { type: 'number' })}
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium">Service Charge :</label>
                          {renderInputField('serviceCharge', newEntry.serviceCharge, { type: 'number' })}
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium">Discount(Kasar) :</label>
                          {renderInputField('discountKasar', newEntry.discountKasar, { type: 'number' })}
                        </div>
                        <div>
                          <label className="block text-gray-700 font-medium">Delivery Freight :</label>
                          {renderInputField('deliveryFreight', newEntry.deliveryFreight, { type: 'number' })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
  
              <div className="flex justify-between mt-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => alert('Print functionality not implemented')}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Print
                  </button>
                </div>
                <div className="flex gap-2">
                  {modal.type !== 'view' && (
                    <>
                      <button
                        onClick={handleModalSubmit}
                        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleModalSaveAndClose}
                        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Save & Close
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setModal({ isOpen: false, type: '', data: null })}
                    className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    {modal.type === 'view' ? 'Close' : 'Cancel'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          )
      case 'fullload':
        return(
          <div className="min-h-screen text-[14px] bg-gray-50 flex justify-center items-center ">
          <div className="w-full  bg-white space-y-8">
         
           
            {modal.type === 'view' ? (
              <div className="space-y-3">
                {columns
                  .filter((col) => col.field !== 'selected')
                  .map((col) => (
                    <p key={col.field}>
                      <strong>{col.label}:</strong>{' '}
                      {col.field === 'audited'
                        ? modal.data[col.field]
                          ? 'Yes'
                          : 'No'
                        : modal.data[col.field]}
                    </p>
                  ))}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Top Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Date</label>
                    {renderInputField('lrDate', newEntry.lrDate, { type: 'date' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Type</label>
                    {renderInputField('type', newEntry.type, { type: 'dropdown', options: fieldConfig.type.options })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Lr No</label>
                    {renderInputField('lrNo', newEntry.lrNo, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Vehicle No</label>
                    {renderInputField('vehicleNo', newEntry.vehicleNo, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Driver</label>
                    {renderInputField('driver', newEntry.driver, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium"></label>
                    <button
                      onClick={() => alert('Get LR functionality not implemented')}
                      className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Get LR
                    </button>
                  </div>
                </div>

                {/* Freight and Transporter Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Freight By</label>
                    {renderInputField('freightBy', newEntry.freightBy, { type: 'dropdown', options: fieldConfig.freightBy.options })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Transporter</label>
                    {renderInputField('transporter', newEntry.transporter, { type: 'dropdown', options: fieldConfig.transporter.options })}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium">For Party</label>
                    {renderInputField('forParty', newEntry.forParty, { type: 'dropdown', options: fieldConfig.forParty.options })}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium">For Transporter</label>
                    {renderInputField('forTransporter', newEntry.forTransporter, { type: 'dropdown', options: fieldConfig.forTransporter.options })}
                  </div>
                </div>

                {/* Weight Details Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Gross Wt.</label>
                    {renderInputField('grossWt', newEntry.grossWt, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Tare Wt.</label>
                    {renderInputField('tareWt', newEntry.tareWt, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Loading Wt.</label>
                    {renderInputField('loadingWt', newEntry.loadingWt, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Unloading Wt.</label>
                    {renderInputField('unloadingWt', newEntry.unloadingWt, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Freight On</label>
                    {renderInputField('freightOn', newEntry.freightOn, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Weight</label>
                    {renderInputField('weight', newEntry.weight, { type: 'number' })}
                  </div>
                </div>

                {/* Party Details Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Party Rate</label>
                    {renderInputField('partyRate', newEntry.partyRate, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Party Freight</label>
                    {renderInputField('partyFreight', newEntry.partyFreight, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Hamali</label>
                    {renderInputField('hamali', newEntry.hamali, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Detention</label>
                    {renderInputField('detention', newEntry.detention, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">P Total</label>
                    <input
                      type="text"
                      value={(parseFloat(newEntry.partyFreight || 0) + parseFloat(newEntry.hamali || 0) + parseFloat(newEntry.detention || 0)).toFixed(2)}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                  <div></div>
                </div>

                {/* Transporter Details Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Trans Rate</label>
                    {renderInputField('transRate', newEntry.transRate, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Trans Freight</label>
                    {renderInputField('transFreight', newEntry.transFreight, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Commission</label>
                    {renderInputField('commission', newEntry.commission, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">TDS %</label>
                    {renderInputField('tdsPer', newEntry.tdsPer, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">TDS Amt</label>
                    {renderInputField('tdsAmt', newEntry.tdsAmt, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">T Total</label>
                    <input
                      type="text"
                      value={(parseFloat(newEntry.transFreight || 0) + parseFloat(newEntry.commission || 0) - parseFloat(newEntry.tdsAmt || 0)).toFixed(2)}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                </div>

                {/* Shortage Details Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Shortage</label>
                    {renderInputField('shortage', newEntry.shortage, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Allowed</label>
                    {renderInputField('allowed', newEntry.allowed, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Rate</label>
                    {renderInputField('rate', newEntry.rate, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">T Amount</label>
                    {renderInputField('tAmount', newEntry.tAmount, { type: 'number' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Net Party</label>
                    <input
                      type="text"
                      value={(parseFloat(newEntry.pTotal || 0) - parseFloat(newEntry.tAmount || 0)).toFixed(2)}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Net Trans</label>
                    <input
                      type="text"
                      value={(parseFloat(newEntry.tTotal || 0) - parseFloat(newEntry.tAmount || 0)).toFixed(2)}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                </div>

                {/* Difference Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div className="col-span-5"></div>
                  <div>
                    <label className="block text-gray-700 font-medium">Difference</label>
                    <input
                      type="text"
                      value={(parseFloat(newEntry.netParty || 0) - parseFloat(newEntry.netTrans || 0)).toFixed(2)}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                </div>

                {/* Route and Description Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">From City</label>
                    {renderInputField('fromCity', newEntry.fromCity, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">To City</label>
                    {renderInputField('toCity', newEntry.toCity, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">KM</label>
                    {renderInputField('km', newEntry.km, { type: 'number' })}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium">Description</label>
                    {renderInputField('description', newEntry.description, { type: 'textarea', placeholder: 'Enter description' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Article/Qty</label>
                    {renderInputField('articleQty', newEntry.articleQty, { type: 'number' })}
                  </div>
                </div>

                {/* Consignor/Consignee Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Consignor</label>
                    {renderInputField('consigner', newEntry.consigner, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Consignee</label>
                    {renderInputField('consignee', newEntry.consignee, { type: 'text' })}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium">Name</label>
                    {renderInputField('name', newEntry.name, { type: 'text' })}
                  </div>
                  <div className="col-span-2">
                    <label className="block text-gray-700 font-medium">Party</label>
                    {renderInputField('party', newEntry.party, { type: 'text' })}
                  </div>
                </div>

                {/* Note Section */}
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-5">
                    <label className="block text-gray-700 font-medium">Note</label>
                    {renderInputField('note', newEntry.note, { type: 'textarea', placeholder: 'Enter note' })}
                  </div>
                  <div></div>
                </div>

                {/* Booking and Bill Details */}
                <div className="grid grid-cols-6 gap-4 border-t pt-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Booking Id</label>
                    {renderInputField('bookingId', '', { type: 'text', placeholder: 'Auto-generated' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Sales Bill No</label>
                    {renderInputField('salesBillNo', '', { type: 'text', placeholder: 'Auto-generated' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Supplementary Bill No</label>
                    {renderInputField('supplementaryBillNo', '', { type: 'text', placeholder: 'Auto-generated' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Trans Bill No</label>
                    {renderInputField('transBillNo', '', { type: 'text', placeholder: 'Auto-generated' })}
                  </div>
                  <div className="col-span-2"></div>
                </div>
              </div>
            )}

          
          </div>
        </div>
        )
        case 'salesInvoice':
        return(
          <div className="min-h-screen text-[14px] bg-gray-50 flex justify-center items-center ">
          <div className="w-full  bg-white space-y-8">
          
           
            {modal.type === 'view' ? (
              <div className="space-y-3">
                {columns
                  .filter((col) => col.field !== 'selected')
                  .map((col) => (
                    <p key={col.field}>
                      <strong>{col.label}:</strong>{' '}
                      {col.field === 'audited'
                        ? modal.data[col.field]
                          ? 'Yes'
                          : 'No'
                        : modal.data[col.field]}
                    </p>
                  ))}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Top Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Bill Date</label>
                    {renderInputField('date', newEntry.date, { type: 'date' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">C/D</label>
                    {renderInputField('cashDebit', newEntry.cashDebit, { type: 'dropdown', options: fieldConfig.cashDebit.options })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Book Code</label>
                    {renderInputField('bookCode', newEntry.bookCode, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Bill No</label>
                    {renderInputField('no', newEntry.no, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Bill Type</label>
                    {renderInputField('billType', newEntry.billType, { type: 'dropdown', options: ['Lr', 'Non Lr'] })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Invoice No</label>
                    {renderInputField('invoiceNo', '', { type: 'text', placeholder: 'Auto-generated' })}
                  </div>
                </div>

                {/* Account Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Account</label>
                    {renderInputField('accountName', newEntry.accountName, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Party</label>
                    {renderInputField('party', '', { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Balance</label>
                    {renderInputField('balance', newEntry.balance, { type: 'number' })}
                  </div>
                  <div className="col-span-2 flex items-center">
                    <label className="block text-gray-700 font-medium mr-2">Get Only Bill Party?</label>
                    <input type="checkbox" checked={true} className="h-4 w-4 text-blue-600 focus:ring-blue-400 rounded" />
                  </div>
                  <div>
                    <button
                      onClick={() => alert('Get LR functionality not implemented')}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                    >
                      Get Lr
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={handleAdd}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                    >
                      Add Lr
                    </button>
                  </div>
                </div>

                {/* Bill of Supply Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Bill of Supply</label>
                    {renderInputField('invtype', newEntry.invtype, { type: 'dropdown', options: fieldConfig.invtype.options })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Tax Type</label>
                    {renderInputField('taxType', newEntry.taxType, { type: 'dropdown', options: fieldConfig.taxType.options })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Sales Alc</label>
                    {renderInputField('salesAccount', newEntry.salesAccount, { type: 'dropdown', options: fieldConfig.salesAccount.options })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Consigner</label>
                    {renderInputField('consigner', newEntry.consigner, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Truck No</label>
                    {renderInputField('truckNo', newEntry.truckNo, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">HSN/SAC</label>
                    {renderInputField('hsnSac', newEntry.hsnSac, { type: 'text' })}
                  </div>
                </div>

                {/* Center and Route Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Center Name</label>
                    {renderInputField('centerName', newEntry.centerName, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">L.R. No</label>
                    {renderInputField('lrNo', newEntry.lrNo, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">L.R. Date</label>
                    {renderInputField('lrDate', newEntry.lrDate, { type: 'date' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Del. Date</label>
                    {renderInputField('delDate', newEntry.delDate, { type: 'date' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Consignee</label>
                    {renderInputField('consignee', newEntry.consignee, { type: 'text' })}
                  </div>
                  <div></div>
                </div>

                {/* City and Article Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">From City</label>
                    {renderInputField('fromCity', newEntry.fromCity, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">To City</label>
                    {renderInputField('toCity', newEntry.toCity, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Article</label>
                    {renderInputField('article', newEntry.article, { type: 'number' })}
                  </div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>

                {/* Totals Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Total Lr</label>
                    <input
                      type="text"
                      value={0}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Total Article</label>
                    <input
                      type="text"
                      value={newEntry.article}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Total Weight</label>
                    <input
                      type="text"
                      value={newEntry.weight}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Taxable Amount</label>
                    <input
                      type="text"
                      value={newEntry.taxableAmount}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Item Freight</label>
                    <input
                      type="text"
                      value={newEntry.itemFreight}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                  <div></div>
                </div>

                {/* Expense and Discount Section */}
                <div className="grid grid-cols-6 gap-4 border-b pb-4">
                  <div className="col-span-4">
                    <label className="block text-gray-700 font-medium">Narration</label>
                    {renderInputField('narration', newEntry.narration, { type: 'textarea', placeholder: 'Enter narration' })}
                  </div>
                  <div className="col-span-2">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 border">Expense and Taxes</th>
                          <th className="p-2 border">Account Name</th>
                          <th className="p-2 border">Rate</th>
                          <th className="p-2 border">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border">DISCOUNT</td>
                          <td className="p-2 border">DISCOUNT A/C</td>
                          <td className="p-2 border">
                            {renderInputField('rate', newEntry.rate, { type: 'number' })}
                          </td>
                          <td className="p-2 border">
                            {renderInputField('amount', newEntry.amount, { type: 'number' })}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 border">ROUND OFF</td>
                          <td className="p-2 border">DISCOUNT A/C</td>
                          <td className="p-2 border">0</td>
                          <td className="p-2 border">0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Total Bill Amount Section */}
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-5"></div>
                  <div>
                    <label className="block text-gray-700 font-medium">Total Bill Amount</label>
                    <input
                      type="text"
                      value={(parseFloat(newEntry.totalAmount || 0) + parseFloat(newEntry.amount || 0)).toFixed(2)}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            )}

            
          </div>
        </div>
        )   

        case 'transpoterbill':
          return(
            <div className="min-h-screen text-[14px] bg-gray-50 flex justify-center items-center ">
          <div className="w-full  bg-white space-y-8">
            
              {modal.type === 'view' ? (
                <div className="space-y-3">
                  {columns
                    .filter((col) => col.field !== 'selected')
                    .map((col) => (
                      <p key={col.field}>
                        <strong>{col.label}:</strong>{' '}
                        {col.field === 'audited'
                          ? modal.data[col.field]
                            ? 'Yes'
                            : 'No'
                          : modal.data[col.field]}
                      </p>
                    ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Top Section */}
                  <div className="grid grid-cols-6 gap-4 border-b pb-4">
                    <div>
                      <label className="block text-gray-700 font-medium">Bill Date</label>
                      {renderInputField('billDate', newEntry.billDate, { type: 'date' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">C/D</label>
                      {renderInputField('cashDebit', newEntry.cashDebit, { type: 'dropdown', options: fieldConfig.cashDebit.options })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Bill No</label>
                      {renderInputField('billNo', newEntry.billNo, { type: 'text' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Bill Type</label>
                      {renderInputField('billType', newEntry.billType, { type: 'dropdown', options: ['Lr', 'Non Lr'] })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Invoice No</label>
                      {renderInputField('invoiceNo', '', { type: 'text', placeholder: 'Auto-generated' })}
                    </div>
                    <div></div>
                  </div>
  
                  {/* Account Section */}
                  <div className="grid grid-cols-6 gap-4 border-b pb-4">
                    <div>
                      <label className="block text-gray-700 font-medium">Account</label>
                      {renderInputField('accountName', newEntry.accountName, { type: 'text' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Party</label>
                      {renderInputField('party', newEntry.party, { type: 'text' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Doc No</label>
                      {renderInputField('docNo', newEntry.docNo, { type: 'text' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Doc Date</label>
                      {renderInputField('docDate', newEntry.docDate, { type: 'date' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Balance</label>
                      {renderInputField('balance', newEntry.balance, { type: 'number' })}
                    </div>
                    <div>
                      <button
                        onClick={() => alert('Get LR functionality not implemented')}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full mt-6"
                      >
                        Get Lr
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={handleAdd}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full mt-6"
                      >
                        Add Lr
                      </button>
                    </div>
                  </div>
  
                  {/* Bill of Supply Section */}
                  <div className="grid grid-cols-6 gap-4 border-b pb-4">
                    <div>
                      <label className="block text-gray-700 font-medium">Bill of Supply</label>
                      {renderInputField('invtype', newEntry.invtype, { type: 'dropdown', options: fieldConfig.invtype.options })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Tax Type</label>
                      {renderInputField('taxType', newEntry.taxType, { type: 'dropdown', options: fieldConfig.taxType.options })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Sales Alc</label>
                      {renderInputField('salesAccount', newEntry.salesAccount, { type: 'dropdown', options: fieldConfig.salesAccount.options })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">HSN/SAC</label>
                      {renderInputField('hsnSac', newEntry.hsnSac, { type: 'text' })}
                    </div>
                    <div></div>
                    <div></div>
                  </div>
  
                  {/* Center and Route Section */}
                  <div className="grid grid-cols-6 gap-4 border-b pb-4">
                    <div>
                      <label className="block text-gray-700 font-medium">Center Name</label>
                      {renderInputField('centerName', newEntry.centerName, { type: 'text' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">L.R. No</label>
                      {renderInputField('lrNo', newEntry.lrNo, { type: 'text' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">L.R. Date</label>
                      {renderInputField('lrDate', newEntry.lrDate, { type: 'date' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Consigner</label>
                      {renderInputField('consigner', newEntry.consigner, { type: 'text' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Consignee</label>
                      {renderInputField('consignee', newEntry.consignee, { type: 'text' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Truck No</label>
                      {renderInputField('truckNo', newEntry.truckNo, { type: 'text' })}
                    </div>
                  </div>
  
                  {/* City and Article Section */}
                  <div className="grid grid-cols-6 gap-4 border-b pb-4">
                    <div>
                      <label className="block text-gray-700 font-medium">From City</label>
                      {renderInputField('fromCity', newEntry.fromCity, { type: 'text' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">To City</label>
                      {renderInputField('toCity', newEntry.toCity, { type: 'text' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Article</label>
                      {renderInputField('article', newEntry.article, { type: 'number' })}
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Rate</label>
                      {renderInputField('rate', newEntry.rate, { type: 'number' })}
                    </div>
                    <div></div>
                    <div></div>
                  </div>
  
                  {/* Totals Section */}
                  <div className="grid grid-cols-6 gap-4 border-b pb-4">
                    <div>
                      <label className="block text-gray-700 font-medium">Total Lr</label>
                      <input
                        type="text"
                        value={0}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Total Article</label>
                      <input
                        type="text"
                        value={newEntry.article}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Total Weight</label>
                      <input
                        type="text"
                        value={newEntry.weight}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Taxable Amount</label>
                      <input
                        type="text"
                        value={newEntry.taxableAmount}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Item Freight</label>
                      <input
                        type="text"
                        value={newEntry.itemFreight}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                      />
                    </div>
                    <div></div>
                  </div>
  
                  {/* Expense and Discount Section */}
                  <div className="grid grid-cols-6 gap-4 border-b pb-4">
                    <div className="col-span-4">
                      <label className="block text-gray-700 font-medium">Narration</label>
                      {renderInputField('narration', newEntry.narration, { type: 'textarea', placeholder: 'Enter narration' })}
                    </div>
                    <div className="col-span-2">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2 border">Expense and Taxes</th>
                            <th className="p-2 border">Account Name</th>
                            <th className="p-2 border">Rate</th>
                            <th className="p-2 border">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-2 border">DISCOUNT</td>
                            <td className="p-2 border">DISCOUNT A/C</td>
                            <td className="p-2 border">
                              {renderInputField('expenseRate', newEntry.expenseRate, { type: 'number' })}
                            </td>
                            <td className="p-2 border">
                              {renderInputField('expenseAmount', newEntry.expenseAmount, { type: 'number' })}
                            </td>
                          </tr>
                          <tr>
                            <td className="p-2 border">ROUND OFF</td>
                            <td className="p-2 border">DISCOUNT A/C</td>
                            <td className="p-2 border">0</td>
                            <td className="p-2 border">0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
  
                  {/* Total Bill Amount Section */}
                  <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-5"></div>
                    <div>
                      <label className="block text-gray-700 font-medium">Total Bill Amount</label>
                      <input
                        type="text"
                        value={(parseFloat(newEntry.totalAmount || 0) + parseFloat(newEntry.expenseAmount || 0)).toFixed(2)}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              )}
  
            
            </div>
          </div>
          )

          case 'cashPayment':
            return(
              <div className="min-h-screen text-[14px] bg-gray-50 flex justify-center items-center ">
          <div className="w-full  bg-white space-y-8">
           
            {modal.type === 'view' ? (
              <div className="space-y-3">
                {columns
                  .filter((col) => col.field !== 'selected')
                  .map((col) => (
                    <p key={col.field}>
                      <strong>{col.label}:</strong>{' '}
                      {col.field === 'audited'
                        ? modal.data[col.field]
                          ? 'Yes'
                          : 'No'
                        : modal.data[col.field]}
                    </p>
                  ))}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Top Section */}
                <div className="grid grid-cols-5 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Voucher Type</label>
                    {renderInputField('voucherType', newEntry.voucherType, { type: 'dropdown', options: fieldConfig.voucherType.options })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Date</label>
                    {renderInputField('date', newEntry.date, { type: 'date' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Ref Type</label>
                    {renderInputField('refType', newEntry.refType, { type: 'dropdown', options: fieldConfig.refType.options })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Branch</label>
                    {renderInputField('branch', newEntry.branch, { type: 'dropdown', options: fieldConfig.branch.options })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Ref No</label>
                    {renderInputField('no', newEntry.no, { type: 'text' })}
                  </div>
                </div>

                {/* Vehicle Section */}
                <div className="grid grid-cols-5 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Vehicle</label>
                    {renderInputField('vehicle', newEntry.vehicle, { type: 'text' })}
                  </div>
                  <div className="col-span-2"></div>
                  <div>
                    <button
                      onClick={() => alert('Get LR functionality not implemented')}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full mt-6"
                    >
                      Get LR
                    </button>
                  </div>
                  <div></div>
                </div>

                {/* Accounts Section */}
                <div className="grid grid-cols-5 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Opp. A/C</label>
                    {renderInputField('oppAC', newEntry.oppAC, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Balance</label>
                    <input
                      type="text"
                      value={newEntry.balance}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Amount</label>
                    {renderInputField('amount', newEntry.amount, { type: 'number' })}
                  </div>
                  <div className="col-span-2"></div>
                </div>

                {/* Cash Section */}
                <div className="grid grid-cols-5 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Cash</label>
                    {renderInputField('cashAccount', newEntry.cashAccount, { type: 'dropdown', options: fieldConfig.cashAccount.options })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Balance</label>
                    <input
                      type="text"
                      value={0}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Amount</label>
                    {renderInputField('cashAmount', newEntry.cashAmount, { type: 'number' })}
                  </div>
                  <div className="col-span-2"></div>
                </div>

                {/* Diff A/C Section */}
                <div className="grid grid-cols-5 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Diff A/C</label>
                    {renderInputField('diffAccount', newEntry.diffAccount, { type: 'dropdown', options: fieldConfig.diffAccount.options })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Balance</label>
                    <input
                      type="text"
                      value={0}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Amount</label>
                    {renderInputField('diffAmount', newEntry.diffAmount, { type: 'number' })}
                  </div>
                  <div className="col-span-2"></div>
                </div>

                {/* Diff A/C 2 Section */}
                <div className="grid grid-cols-5 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Diff A/C 2</label>
                    {renderInputField('diffAccount2', newEntry.diffAccount2, { type: 'dropdown', options: fieldConfig.diffAccount.options })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Balance</label>
                    <input
                      type="text"
                      value={0}
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Amount</label>
                    {renderInputField('diffAmount2', newEntry.diffAmount2, { type: 'number' })}
                  </div>
                  <div className="col-span-2"></div>
                </div>

                {/* Doc Section */}
                <div className="grid grid-cols-5 gap-4 border-b pb-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Doc. No.</label>
                    {renderInputField('docNo', newEntry.docNo, { type: 'text' })}
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Doc. Date</label>
                    {renderInputField('docDate', newEntry.docDate, { type: 'date' })}
                  </div>
                  <div className="col-span-3"></div>
                </div>

                {/* Narration Section */}
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-5">
                    <label className="block text-gray-700 font-medium">Narration</label>
                    {renderInputField('narration', newEntry.narration, { type: 'textarea', placeholder: 'Enter narration' })}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
            )
      default:
        return (
          <div className="min-h-screen bg-gray-50 flex justify-center items-center ">
      <div className="w-full  bg-white space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Dynamic Form</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {columns
            .filter((col) => col.field !== 'selected' && col.field !== 'audited')
            .map((col) => (
              <div key={col.field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{col.label}</label>
                {renderInputField(col.field, newEntry[col.field] || '', {
                  type: numericFields.includes(col.field) ? 'number' : 'text',
                  placeholder: `Enter ${col.label}`,
                })}
              </div>
            ))}
        </div>
      </div>
    </div>
        );
    }
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

  return (
    <div className="relative p-6 w-full h-[85vh] overflow-hidden bg-white shadow-xl rounded-xl border border-gray-200">
<div className=' mb-3 w-fit  '>
<h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wider mb-1 ">{title}</h2>
<div className="h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#3b5998] to-transparent "></div>
</div>
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
            {showAdd && (
              <button
                onClick={handleAdd}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-all duration-200"
                title="Add"
              >
                <i className="ri-add-line"></i>
              </button>
            )}
            {showEdit && (
              <button
                onClick={handleEdit}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-all duration-200"
                title="Edit"
              >
                <i className="ri-edit-line"></i>
              </button>
            )}
            {showView && (
              <button
                onClick={handleView}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-all duration-200"
                title="View"
              >
                <i className="ri-eye-line"></i>
              </button>
            )}
            {showDelete && (
              <button
                onClick={handleDelete}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition-all duration-200"
                title="Delete"
              >
                <i className="ri-delete-bin-line"></i>
              </button>
            )}
            {showRefresh && (
              <button
                onClick={handleRefresh}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-all duration-200"
                title="Refresh"
              >
                <i className="ri-refresh-line"></i>
              </button>
            )}
            {showPrint && (
              <button
                onClick={handlePrint}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-all duration-200"
                title="Print"
              >
                <i className="ri-printer-line"></i>
              </button>
            )}
            {showAudit && (
              <button
                onClick={handleAudit}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-all duration-200"
                title="Audit"
              >
                <i class="ri-file-lock-line"></i>
              </button>
            )}
            {showField && (
              <button
                onClick={handleField}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-all duration-200"
                title="Field"
              >
                <i className="ri-layout-column-line"></i>
              </button>
            )}
            {showExportExcel && (
              <button
                onClick={handleExportExcel}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition-all duration-200"
                title="Export to Excel"
              >
                <i class="ri-file-excel-2-line"></i>
              </button>
            )}
            {showExportPDF && (
              <button
                onClick={handleExportPDF}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition-all duration-200"
                title="Export to PDF"
              >
               <i class="ri-file-ppt-line"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-scroll scroller h-[53vh]">
        <table className="w-full text-left border-collapse ">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200 sticky top-0 z-10 text-nowrap">
              {columns.map((column, index) => (
                <th
                  key={column.field}
                  className={`p-3 border-b border-gray-200 text-gray-700 font-semibold text-sm ${index === 0 ? 'rounded-tl-lg' : ''} ${index === columns.length - 1 ? 'rounded-tr-lg' : ''}`}
                >
                  <div className="flex relative items-center space-x-2">
                    {column.label === 'A' ? (
                      <input
                        type="checkbox"
                        checked={filteredData.length > 0 && filteredData.every((item) => item.selected || item.audited)}
                        onChange={(e) => handleSelectAllRows(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-400 rounded"
                      />
                    ) : (
                      <>
                        {column.label.includes('Date') ? (
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
                          // window filter
                          <div
                            ref={(el) => (filterRefs.current[column.field] = el)}
                            className="absolute z-20 mt-2 left-0 top-8 bg-white scroller border border-gray-200 rounded-lg shadow-xl p-4 w-64 max-h-48 overflow-y-auto"
                          >
                            {column.field === 'audited' ? (
                              <>
                                {getUniqueValues(column.field).map((value) => (
                                  <div key={value} className="flex items-center mb-2">
                                    <input
                                      type="radio"
                                      id={`${column.field}-${value}`}
                                      name={column.field}
                                      checked={pendingFilters[column.field] === value}
                                      onChange={() => handleFilterChange(column.field, value)}
                                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-400 rounded"
                                    />
                                    <label htmlFor={`${column.field}-${value}`} className="text-gray-700">
                                      {value}
                                    </label>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <>
                              {/* window data */}
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
                              </>
                            )}
                          {/* btn */}
                            <div className="flex justify-end sticky bottom-0 gap-2 mt-3">
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
                      </>
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
                  item.audited
                    ? 'bg-yellow-100'
                    : index % 2 === 0
                    ? 'bg-white'
                    : 'bg-gray-50'
                } hover:bg-blue-50 text-nowrap  transition-all duration-200 border-b border-gray-100`}
              >
                {columns.map((column) => (
                  <td key={column.field} className="p-2  text-zinc-800 text-[14px]">
                    <div className="flex items-center">
                      {column.field === 'selected' ? (
                        item.audited ? (
                          <i
                            className="ri-lock-line text-red-600 cursor-pointer"
                            title="Click to Unaudit"
                            onClick={() => handleToggleAudit(index)}
                          ></i>
                        ) : (
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => handleRowSelect(index)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-400 rounded"
                          />
                        )
                      ) : column.field === 'audited' ? (
                        item.audited ? 'Yes' : 'No'
                      ) : numericFields.includes(column.field) ? (
                        <span className={item[column.field] < 0 ? 'text-red-600' : 'text-green-600'}>
                          {Math.abs(parseFloat(item[column.field]) || 0).toFixed(2)}{' '}
                          {item[column.field] < 0 ? 'Cr' : 'Db'}
                        </span>
                      ) : (
                        item[column.field] || ''
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {numericFields.length > 0 && (
              <tr className="font-semibold">
                {columns.map((column) => (
                  <td key={column.field} className="p-3 text-gray-700">
                    {numericFields.includes(column.field) ? (
                      <span className={totals[column.field] < 0 ? 'text-red-600' : 'text-green-600'}>
                        {Math.abs(totals[column.field]).toFixed(2)}{' '}
                        {totals[column.field] < 0 ? 'Cr' : 'Db'}
                      </span>
                    ) : column.field === 'selected' || column.field === 'audited' ? (
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

      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl shadow-2xl max-h-[90vh] overflow-y-auto scroller">
            <h3 className="text-3xl uppercase tracking-wider font-bold text-gray-800 py-2 mb-3 border-b border-zinc-800">
              {modal.type === 'add' ? `Add ${title.split(' ')[1]} Entry` : modal.type === 'edit' ? `Edit ${title.split(' ')[1]} Entry` : `View ${title.split(' ')[1]} Entry`}
            </h3>
            {modal.type === 'view' ? (
              <div className="space-y-3">
                {columns
                  .filter((col) => col.field !== 'selected')
                  .map((col) => (
                    <p key={col.field}>
                      <strong>{col.label}:</strong>{' '}
                      {numericFields.includes(col.field)
                        ? parseFloat(modal.data[col.field]).toFixed(2)
                        : col.field === 'audited'
                        ? modal.data[col.field]
                          ? 'Yes'
                          : 'No'
                        : modal.data[col.field]}
                    </p>
                  ))}
              </div>
            ) : (
              renderModalContent()
            )}

            <div className="flex justify-end mt-6  sticky bottom-0">
             
              <div className="flex gap-2 justify-end">
                {modal.type !== 'view' && (
                  <>
                    <button
                      onClick={handleModalSubmit}
                      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                  
                  </>
                )}
                <button
                  onClick={() => setModal({ isOpen: false, type: '', data: null })}
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  {modal.type === 'view' ? 'Close' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableLayout;