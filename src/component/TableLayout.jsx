


import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import LRAddWindow from '../Adding-Screens/LRAddWindow';
import MemoAddWindow from '../Adding-Screens/MemoAddWindow';

import MemoReceiveAddWindow from '../Adding-Screens/MemoReceiveAddWindow';
import DeliveryAddWindow from '../Adding-Screens/DeliveryAddWindow';
import CashReceiptAddWindow from '../Adding-Screens/CashReceiptAddWindow';
import SalesInvoiceAddWindow from '../Adding-Screens/SalesInvoiceAddWindow';
import TransportBillAddWindow from '../Adding-Screens/TransportBillAddWindow';
import AddAccountWindow from '../Adding-Screens/AddAccountWindow';
import CashPaymentAddWindow from '../Adding-Screens/CashPaymentAddWindow';
import FullLoadAddWindow from '../Adding-Screens/FullLoadAddWindow';

const TableLayout = ({
  title,
  columns,
  initialData,
  numericFields = [],
  showAdd ,
  showEdit ,
  showView ,
  showDelete ,
  showRefresh ,
  showPrint ,
  showAudit ,
  showField ,
  showExportExcel ,
  showExportPDF ,
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
    if (key === 'audited') return ['All', 'Audited', 'Not Audited'];
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
      if (field === 'audited') return { ...prevPending, [field]: value };
      const currentValues = prevPending[field];
      if (value === 'All') return { ...prevPending, [field]: ['All'] };
      const newValues = currentValues.includes('All')
        ? currentValues.filter((v) => v !== 'All')
        : currentValues;
      return {
        ...prevPending,
        [field]: newValues.includes(value)
          ? newValues.filter((v) => v !== value)
          : [...newValues, value].length === 0
          ? ['All']
          : [...newValues, value],
      };
    });
  };

  const applyFilters = () => {
    setFilters({ ...pendingFilters });
    setOpenFilter(null);
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openFilter]);

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

  const handleGo = () => {
    console.log('GO button clicked with date range:', startDate, 'to', endDate);
  };

  const handleAdd = () => {
    setModal({ isOpen: true, type: 'add', data: null });
    setNewEntry(windowConfig.initialState || {
      ...columns.reduce((acc, col) => ({ ...acc, [col.field]: '' }), { selected: false }),
      ...(componentType === 'lr' ? {
        consignor: { name: '', gstno: '', mobile: '', address: '' },
        consignee: { name: '', gstno: '', mobile: '', address: '' },
        billAccount: { name: '', gstno: '', mobile: '', address: '' },
        items: [{ article: 0, packaging: '', goodsContained: '', actualWeight: 0, weight: 0, rate: 0, freightOn: '', amount: 0 }],
        totalArticle: 0,
        totalWeight: 0,
        actualWeight: 0,
        freight: 0,
        subTotal: 0,
        gstAmt: 0,
        totalFreight: 0,
      } : {}),
    });
  };

  const handleEdit = () => {
    const selectedRows = data.filter((item) => item.selected);
    if (selectedRows.length !== 1) {
      alert('Ek hi row select karo edit ke liye.');
      return;
    }
    if (selectedRows[0].audited) {
      alert('Yeh row audited hai, modify nahi kar sakte.');
      return;
    }
    const selectedRow = selectedRows[0];
    setModal({ isOpen: true, type: 'edit', data: selectedRow });
    switch (componentType) {
      case 'lr':
        setNewEntry({
          ...windowConfig.initialState,
          id: selectedRow.id,
          date: selectedRow.lrDate || '',
          lrNo: selectedRow.lrNo || '',
          center: selectedRow.center || '',
          delivery: selectedRow.delivery || '',
          fromCity: selectedRow.fromCity || '',
          toCity: selectedRow.toCity || '',
          consignor: {
            name: selectedRow.consignorName || '',
            gstno: selectedRow.consignor?.gstno || '',
            mobile: selectedRow.consignor?.mobile || '',
            address: selectedRow.consignor?.address || '',
          },
          consignee: {
            name: selectedRow.consigneeName || '',
            gstno: selectedRow.consignee?.gstno || '',
            mobile: selectedRow.consignee?.mobile || '',
            address: selectedRow.consignee?.address || '',
          },
          billAccount: {
            name: selectedRow.billAccount?.name || selectedRow.consignorName || '',
            gstno: selectedRow.billAccount?.gstno || '',
            mobile: selectedRow.billAccount?.mobile || '',
            address: selectedRow.billAccount?.address || '',
          },
          vehicleNo: selectedRow.vehicleNo || '',
          items: selectedRow.items || [
            {
              article: selectedRow.totalArticle || 0,
              packaging: '',
              goodsContained: '',
              actualWeight: 0,
              weight: selectedRow.totalWeight || 0,
              rate: 0,
              freightOn: '',
              amount: selectedRow.totalFreight || 0,
            },
          ],
          totalArticle: selectedRow.totalArticle || 0,
          totalWeight: selectedRow.totalWeight || 0,
          actualWeight: selectedRow.actualWeight || 0,
          valueRs: selectedRow.valueRs || 0,
          invNo: selectedRow.invNo || '',
          previousFreight: selectedRow.previousFreight || 0,
          freight: selectedRow.freight || selectedRow.totalFreight || 0,
          crossing: selectedRow.crossing || 0,
          docketCharge: selectedRow.docketCharge || 0,
          hamali: selectedRow.hamali || 0,
          detention: selectedRow.detention || 0,
          doorCollection: selectedRow.doorCollection || 0,
          doorDelivery: selectedRow.doorDelivery || 0,
          deliveryAt: selectedRow.deliveryAt || '',
          narration: selectedRow.narration || '',
          bookingId: selectedRow.bookingId || '',
          memoNo: selectedRow.memoNo || '',
          deliveryNo: selectedRow.deliveryNo || '',
          billNo: selectedRow.billNo || '',
          subTotal: selectedRow.subTotal || selectedRow.totalFreight || 0,
          gstBy: selectedRow.gstBy || '',
          gstRate: selectedRow.gstRate || '',
          gstAmt: selectedRow.gstAmt || 0,
          totalFreight: selectedRow.totalFreight || 0,
          status: selectedRow.status || '',
        });
        break;
      case 'memo':
        setNewEntry({
          ...windowConfig.initialState,
          id: selectedRow.id,
          date: selectedRow.date || '',
          driver: selectedRow.driver || '',
          agent: selectedRow.agent || '',
          branch: selectedRow.branch || '',
          memoNo: selectedRow.memoNo || '',
          fromCity: selectedRow.fromCity || '',
          toCity: selectedRow.toCity || '',
          vehicleNo: selectedRow.vehicleNo || '',
          paymentType: selectedRow.paymentType || '',
          advanced: selectedRow.advanced || 0,
          lrRows: selectedRow.lrRows || [
            {
              centerName: selectedRow.centerName || '',
              lrNo: selectedRow.lrNo || '',
              date: selectedRow.lrDate || '',
              packaging: selectedRow.packaging || '',
              description: selectedRow.description || '',
              article: selectedRow.article || 0,
              freightBy: selectedRow.freightBy || '',
              fromCity: selectedRow.fromCity || '',
              toCity: selectedRow.toCity || '',
              consignee: selectedRow.consignee || '',
              acWeight: selectedRow.acWeight || 0,
              weight: selectedRow.weight || 0,
              freight: selectedRow.freight || 0,
            },
          ],
          city: selectedRow.city || '',
          totalArticle: selectedRow.totalArticle || 0,
          totalAcWeight: selectedRow.totalAcWeight || 0,
          totalWeight: selectedRow.totalWeight || 0,
          totalFreight: selectedRow.totalFreight || 0,
          narration: selectedRow.narration || '',
          balance: selectedRow.balance || 0,
        });
        break;
      default:
        setNewEntry({
          ...selectedRow,
          selected: false,
        });
        break;
    }
    console.log('Initialized newEntry for edit:', newEntry);
  };

  const handleView = () => {
    const selectedRows = data.filter((item) => item.selected);
    if (selectedRows.length !== 1) {
      alert('Ek hi row select karo view ke liye.');
      return;
    }
    setModal({ isOpen: true, type: 'view', data: selectedRows[0] });
  };

  const handleDelete = () => {
    const selectedRows = data.filter((item) => item.selected);
    if (selectedRows.length === 0) {
      alert('Kam se kam ek row select karo delete ke liye.');
      return;
    }
    if (selectedRows.some((row) => row.audited)) {
      alert('Audited rows delete nahi kar sakte.');
      return;
    }
    if (window.confirm(`Kya aap ${selectedRows.length} row(s) delete karna chahte hain?`)) {
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
    window.print();
  };

  const handleAudit = () => {
    const selectedRows = data.filter((item) => item.selected);
    if (selectedRows.length === 0) {
      alert('Kam se kam ek row select karo audit ke liye.');
      return;
    }
    setData((prevData) =>
      prevData.map((item) =>
        item.selected && !item.audited ? { ...item, audited: true, selected: false } : item
      )
    );
    alert('Selected rows audited ho gaye.');
  };

  const handleField = () => {
    console.log(`Toggling extra fields for ${title}`);
    alert('Field functionality triggered.');
  };

  const handleModalSubmit = ( ) => {
    const updatedEntry = {
      ...newEntry,
      selected: false,
      audited: false,
      ...(windowConfig.fieldMapping ? windowConfig.fieldMapping(newEntry) : {}),
    
    };

  

    console.log('Updated entry:', updatedEntry);    // Log the updated entry to the console
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

  const handleInputChange = (field, value) => {
    setNewEntry((prev) => ({ ...prev, [field]: value }));
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
    if (componentType === 'lr' && (modal.type === 'add' || modal.type === 'edit')) {
      return (
        <LRAddWindow
          newEntry={newEntry}
          setNewEntry={setNewEntry}
        />
      );
    }
    if (componentType === 'memo' && (modal.type === 'add' || modal.type === 'edit')) {
      return (
        <MemoAddWindow
          newEntry={newEntry}
          setNewEntry={setNewEntry}
        />
      );
    }
    if (componentType === 'memoreceive' && (modal.type === 'add' || modal.type === 'edit')) {
      return (
        <MemoReceiveAddWindow
          newEntry={newEntry}
          setNewEntry={setNewEntry}
        />
      );
    }
    if (componentType === 'delivery' && (modal.type === 'add' || modal.type === 'edit')) {
      return (
        <DeliveryAddWindow
          newEntry={newEntry}
          setNewEntry={setNewEntry}
        />
      );
    }
    if (componentType === 'cashReceipt' && (modal.type === 'add' || modal.type === 'edit')) {
      return (
        <CashReceiptAddWindow
          newEntry={newEntry}
          setNewEntry={setNewEntry}
        />
      );
    }
    if (componentType === 'salesInvoice' && (modal.type === 'add' || modal.type === 'edit')) {
      return (
        <SalesInvoiceAddWindow
          newEntry={newEntry}
          setNewEntry={setNewEntry}
        />
      );
    }
    if (componentType === 'transportBill' && (modal.type === 'add' || modal.type === 'edit')) {
      return (
        <TransportBillAddWindow
          newEntry={newEntry}
          setNewEntry={setNewEntry}
        />
      );
    }
    if (componentType === 'account' && (modal.type === 'add' || modal.type === 'edit')) {
      return (
        <AddAccountWindow
          newEntry={newEntry}
          setNewEntry={setNewEntry}
        />
      );
    }
    if (componentType === 'cashPayment' && (modal.type === 'add' || modal.type === 'edit')) {
      return (
        <CashPaymentAddWindow
          newEntry={newEntry}
          setNewEntry={setNewEntry}
        />
      );
    }
    if (componentType === 'fullLoad' && (modal.type === 'add' || modal.type === 'edit')) {
      return (
        <FullLoadAddWindow
          newEntry={newEntry}
          setNewEntry={setNewEntry}
        />
      );
    }
    
    if (modal.type === 'view') {
      return (
        <div className="space-y-3 ">
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
      );
    }
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg text-sm p-6 transform transition-all duration-300">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Entry</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleModalSubmit();
          }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {columns
                .filter((col) => col.field !== 'selected' && col.field !== 'audited')
                .map((col) => (
                  <div key={col.field} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      {col.label}
                    </label>
                    {renderInputField(col.field, newEntry[col.field] || '', {
                      type: numericFields.includes(col.field) ? 'number' : 'text',
                      placeholder: `Enter ${col.label}`,
                      onChange: (value) => handleInputChange(col.field, value),
                      className:
                        'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-sm',
                    })}
                  </div>
                ))}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setModal({ isOpen: false, type: '', data: null })}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              >
                {modal.type === 'add' ? 'Add Entry' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
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
      console.error('PDF generate karne mein error:', error);
      alert('PDF generate nahi hua.');
    }
  };

  return (
    <div className="relative p-6 w-full h-[85vh] overflow-hidden bg-white shadow-xl rounded-xl border border-gray-200">
<div className="mb-3 w-fit">
  <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wider mb-1">{title}</h2>
  <div className="h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#3b5998] to-transparent"></div>
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
        className="p-2 bg-blue-500/90 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all duration-200"
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
          className="bg-blue-500/90 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all duration-200 p-2"
          title="Add"
        >
          <i className="ri-add-line"></i>
        </button>
      )}
      {showEdit && (
        <button
          onClick={handleEdit}
          className="p-2 bg-blue-500/90 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all duration-200"
          title="Edit"
        >
          <i className="ri-edit-line"></i>
        </button>
      )}
      {showView && (
        <button
          onClick={handleView}
          className="p-2 bg-blue-500/90 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all duration-200"
          title="View"
        >
          <i className="ri-eye-line"></i>
        </button>
      )}
      {showDelete && (
        <button
          onClick={handleDelete}
          className="p-2 bg-red-500/90 text-white rounded-lg hover:bg-red-600 shadow-md transition-all duration-200"
          title="Delete"
        >
          <i className="ri-delete-bin-line"></i>
        </button>
      )}
      {showRefresh && (
        <button
          onClick={handleRefresh}
          className="p-2 bg-blue-500/90 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all duration-200"
          title="Refresh"
        >
          <i className="ri-refresh-line"></i>
        </button>
      )}
      {showPrint && (
        <button
          onClick={handlePrint}
          className="p-2 bg-blue-500/90 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all duration-200"
          title="Print"
        >
          <i className="ri-printer-line"></i>
        </button>
      )}
      {showAudit && (
        <button
          onClick={handleAudit}
          className="p-2 bg-blue-500/90 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all duration-200"
          title="Audit"
        >
          <i className="ri-file-lock-line"></i>
        </button>
      )}
      {showField && (
        <button
          onClick={handleField}
          className="p-2 bg-blue-500/90 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all duration-200"
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
          <i className="ri-file-excel-2-line"></i>
        </button>
      )}
      {showExportPDF && (
        <button
          onClick={handleExportPDF}
          className="p-2 bg-red-500/90 text-white rounded-lg hover:bg-red-600 shadow-md transition-all duration-200"
          title="Export to PDF"
        >
          <i className="ri-file-ppt-line"></i>
        </button>
      )}
    </div>
  </div>
</div>

<div className="overflow-scroll scroller h-[53vh]">
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="bg-gradient-to-r from-blue-100 to-blue-200 sticky top-0 z-10 text-nowrap">
        {columns.map((column, index) => (
          <th
            key={column.field}
            className={`p-3 border-b border-gray-200 text-gray-700 font-semibold text-sm ${index === 0 ? 'rounded-tl-lg' : ''} ${index === columns.length - 1 ? 'rounded-tr-lg' : ''}`}
          >
            <div className="flex relative items-center space-x-2">
              {column.label === 'A' ? (             
                <div className="checkbox-wrapper-12">
                <div className="cbx">
                  <input
                    type="checkbox"
                    id="cbx-12"
                    checked={filteredData.length > 0 && filteredData.every((item) => item.selected || item.audited)}
                    onChange={(e) => handleSelectAllRows(e.target.checked)}
                  />
                  <label htmlFor="cbx-12"></label>
                  <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                    <path d="M2 8.36364L6.23077 12L13 2"></path>
                  </svg>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <defs>
                    <filter id="goo-12">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                      <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                        result="goo-12"
                      />
                      <feBlend in="SourceGraphic" in2="goo-12" />
                    </filter>
                  </defs>
                </svg>
              </div>
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
          key={item.id || index}
          className={`${
            item.audited
              ? 'bg-yellow-100'
              : index % 2 === 0
              ? 'bg-white'
              : 'bg-gray-50'
          } hover:bg-blue-50 text-nowrap transition-all duration-200 border-b border-gray-100`}
        >
          {columns.map((column) => (
            <td key={column.field} className="p-2 text-zinc-800 text-[14px]">
              <div className="flex items-center">
                {column.field === 'selected' ? (
                  item.audited ? (
                    <i
                      className="ri-lock-line text-red-600 cursor-pointer"
                      title="Click to Unaudit"
                      onClick={() => handleToggleAudit(index)}
                    ></i>
                  ) : (
                 <div className="checkbox-wrapper-12">
                <div className="cbx">
                    <input

                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleRowSelect(index)}
                     
                    />
                          <label htmlFor="cbx-12"></label>
               <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                 <path d="M2 8.36364L6.23077 12L13 2"></path>
               </svg>
             </div>
             <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
               <defs>
                 <filter id="goo-12">
                   <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                     <feColorMatrix
                     in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                     result="goo-12"
                    />
                    <feBlend in="SourceGraphic" in2="goo-12" />
                  </filter>
                </defs>
              </svg>
             </div>
                  )
                ) : column.field === 'audited' ? (
                  item.audited ? 'Yes' : 'No'
                ) : numericFields.includes(column.field) ? (
                  <span className={item[column.field] < 0 ? 'text-red-600' : 'text-green-600'}>
                    {Math.abs(parseFloat(item[column.field]) || 0).toFixed(2)}
                  </span>
                ) : (
                  item[column.field] || ''
                )}
              </div>
            </td>
          ))}
        </tr>
      ))}
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


// import React, { useState, useRef, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { motion, AnimatePresence } from 'framer-motion';
// import LRAddWindow from '../Adding-Screens/LRAddWindow';
// import MemoAddWindow from '../Adding-Screens/MemoAddWindow';
// import MemoReceiveAddWindow from '../Adding-Screens/MemoReceiveAddWindow';
// import DeliveryAddWindow from '../Adding-Screens/DeliveryAddWindow';
// import CashReceiptAddWindow from '../Adding-Screens/CashReceiptAddWindow';
// import SalesInvoiceAddWindow from '../Adding-Screens/SalesInvoiceAddWindow';
// import TransportBillAddWindow from '../Adding-Screens/TransportBillAddWindow';
// import AddAccountWindow from '../Adding-Screens/AddAccountWindow';
// import CashPaymentAddWindow from '../Adding-Screens/CashPaymentAddWindow';
// import FullLoadAddWindow from '../Adding-Screens/FullLoadAddWindow';

// const TableLayout = ({
//   title,
//   columns,
//   initialData,
//   numericFields = [],
//   showAdd,
//   showEdit,
//   showView,
//   showDelete,
//   showRefresh,
//   showPrint,
//   showAudit,
//   showField,
//   showExportExcel,
//   showExportPDF,
//   fieldConfig = {},
//   windowConfig = {},
//   componentType = 'default',
// }) => {
//   const [data, setData] = useState(initialData);
//   const [filters, setFilters] = useState(
//     columns.reduce((acc, col) => ({
//       ...acc,
//       [col.field]: col.field === 'audited' ? 'All' : ['All'],
//     }), {})
//   );
//   const [pendingFilters, setPendingFilters] = useState(
//     columns.reduce((acc, col) => ({
//       ...acc,
//       [col.field]: col.field === 'audited' ? 'All' : ['All'],
//     }), {})
//   );
//   const [openFilter, setOpenFilter] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [modal, setModal] = useState({ isOpen: false, type: '', data: null });
//   const [newEntry, setNewEntry] = useState(
//     windowConfig.initialState || {
//       ...columns.reduce((acc, col) => ({ ...acc, [col.field]: '' }), { selected: false }),
//     }
//   );

//   const filterRefs = useRef({});

//   useEffect(() => {
//     setData(initialData);
//   }, [initialData]);

//   const getUniqueValues = (key) => {
//     if (key === 'audited') return ['All', 'Audited', 'Not Audited'];
//     return ['All', ...new Set(data.map((item) => item[key]?.toString() || ''))];
//   };

//   const parseDate = (dateStr) => {
//     if (!dateStr) return null;
//     const [day, month, year] = dateStr.split('/');
//     return new Date(`${year}-${month}-${day}`);
//   };

//   const filteredData = data.filter((item) => {
//     const matchesSearch = searchTerm
//       ? Object.values(item).some((value) =>
//           value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       : true;

//     const itemDate = parseDate(item.lrDate || item.date);
//     const start = startDate ? new Date(startDate) : null;
//     const end = endDate ? new Date(endDate) : null;
//     const matchesDate =
//       (!start || !itemDate || itemDate >= start) &&
//       (!end || !itemDate || itemDate <= end);

//     const matchesFilters = columns.every((col) => {
//       if (col.field === 'audited') {
//         const filterValue = filters[col.field];
//         if (filterValue === 'All') return true;
//         if (filterValue === 'Audited') return item.audited === true;
//         if (filterValue === 'Not Audited') return item.audited === false;
//         return true;
//       }
//       return filters[col.field].includes('All') || filters[col.field].includes(item[col.field]?.toString());
//     });

//     return matchesSearch && matchesDate && matchesFilters;
//   });

//   const totals = numericFields.reduce((acc, field) => {
//     acc[field] = filteredData.reduce((sum, item) => sum + (parseFloat(item[field]) || 0), 0);
//     return acc;
//   }, {});

//   const handleFilterChange = (field, value) => {
//     setPendingFilters((prevPending) => {
//       if (field === 'audited') return { ...prevPending, [field]: value };
//       const currentValues = prevPending[field];
//       if (value === 'All') return { ...prevPending, [field]: ['All'] };
//       const newValues = currentValues.includes('All')
//         ? currentValues.filter((v) => v !== 'All')
//         : currentValues;
//       return {
//         ...prevPending,
//         [field]: newValues.includes(value)
//           ? newValues.filter((v) => v !== value)
//           : [...newValues, value].length === 0
//           ? ['All']
//           : [...newValues, value],
//       };
//     });
//   };

//   const applyFilters = () => {
//     setFilters({ ...pendingFilters });
//     setOpenFilter(null);
//   };

//   const clearFilter = (field) => {
//     setPendingFilters((prevPending) => ({
//       ...prevPending,
//       [field]: field === 'audited' ? 'All' : ['All'],
//     }));
//   };

//   const toggleFilterDropdown = (field) => {
//     setOpenFilter(openFilter === field ? null : field);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (openFilter && filterRefs.current[openFilter] && !filterRefs.current[openFilter].contains(event.target)) {
//         setOpenFilter(null);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [openFilter]);

//   const handleRowSelect = (index) => {
//     setData((prevData) => {
//       const newData = [...prevData];
//       newData[index] = { ...newData[index], selected: !newData[index].selected };
//       return newData;
//     });
//   };

//   const handleSelectAllRows = (checked) => {
//     setData((prevData) =>
//       prevData.map((item) => ({
//         ...item,
//         selected: checked && !item.audited,
//       }))
//     );
//   };

//   const handleToggleAudit = (index) => {
//     setData((prevData) => {
//       const newData = [...prevData];
//       newData[index] = { ...newData[index], audited: !newData[index].audited };
//       return newData;
//     });
//   };

//   const handleGo = () => {
//     console.log('GO button clicked with date range:', startDate, 'to', endDate);
//   };

//   const handleAdd = () => {
//     setModal({ isOpen: true, type: 'add', data: null });
//     setNewEntry(windowConfig.initialState || {
//       ...columns.reduce((acc, col) => ({ ...acc, [col.field]: '' }), { selected: false }),
//       ...(componentType === 'lr' ? {
//         consignor: { name: '', gstno: '', mobile: '', address: '' },
//         consignee: { name: '', gstno: '', mobile: '', address: '' },
//         billAccount: { name: '', gstno: '', mobile: '', address: '' },
//         items: [{ article: 0, packaging: '', goodsContained: '', actualWeight: 0, weight: 0, rate: 0, freightOn: '', amount: 0 }],
//         totalArticle: 0,
//         totalWeight: 0,
//         actualWeight: 0,
//         freight: 0,
//         subTotal: 0,
//         gstAmt: 0,
//         totalFreight: 0,
//       } : {}),
//     });
//   };

//   const handleEdit = () => {
//     const selectedRows = data.filter((item) => item.selected);
//     if (selectedRows.length !== 1) {
//       alert('Ek hi row select karo edit ke liye.');
//       return;
//     }
//     if (selectedRows[0].audited) {
//       alert('Yeh row audited hai, modify nahi kar sakte.');
//       return;
//     }
//     const selectedRow = selectedRows[0];
//     setModal({ isOpen: true, type: 'edit', data: selectedRow });
//     switch (componentType) {
//       case 'lr':
//         setNewEntry({
//           ...windowConfig.initialState,
//           id: selectedRow.id,
//           date: selectedRow.lrDate || '',
//           lrNo: selectedRow.lrNo || '',
//           center: selectedRow.center || '',
//           delivery: selectedRow.delivery || '',
//           fromCity: selectedRow.fromCity || '',
//           toCity: selectedRow.toCity || '',
//           consignor: {
//             name: selectedRow.consignorName || '',
//             gstno: selectedRow.consignor?.gstno || '',
//             mobile: selectedRow.consignor?.mobile || '',
//             address: selectedRow.consignor?.address || '',
//           },
//           consignee: {
//             name: selectedRow.consigneeName || '',
//             gstno: selectedRow.consignee?.gstno || '',
//             mobile: selectedRow.consignee?.mobile || '',
//             address: selectedRow.consignee?.address || '',
//           },
//           billAccount: {
//             name: selectedRow.billAccount?.name || selectedRow.consignorName || '',
//             gstno: selectedRow.billAccount?.gstno || '',
//             mobile: selectedRow.billAccount?.mobile || '',
//             address: selectedRow.billAccount?.address || '',
//           },
//           vehicleNo: selectedRow.vehicleNo || '',
//           items: selectedRow.items || [
//             {
//               article: selectedRow.totalArticle || 0,
//               packaging: '',
//               goodsContained: '',
//               actualWeight: 0,
//               weight: selectedRow.totalWeight || 0,
//               rate: 0,
//               freightOn: '',
//               amount: selectedRow.totalFreight || 0,
//             },
//           ],
//           totalArticle: selectedRow.totalArticle || 0,
//           totalWeight: selectedRow.totalWeight || 0,
//           actualWeight: selectedRow.actualWeight || 0,
//           valueRs: selectedRow.valueRs || 0,
//           invNo: selectedRow.invNo || '',
//           previousFreight: selectedRow.previousFreight || 0,
//           freight: selectedRow.freight || selectedRow.totalFreight || 0,
//           crossing: selectedRow.crossing || 0,
//           docketCharge: selectedRow.docketCharge || 0,
//           hamali: selectedRow.hamali || 0,
//           detention: selectedRow.detention || 0,
//           doorCollection: selectedRow.doorCollection || 0,
//           doorDelivery: selectedRow.doorDelivery || 0,
//           deliveryAt: selectedRow.deliveryAt || '',
//           narration: selectedRow.narration || '',
//           bookingId: selectedRow.bookingId || '',
//           memoNo: selectedRow.memoNo || '',
//           deliveryNo: selectedRow.deliveryNo || '',
//           billNo: selectedRow.billNo || '',
//           subTotal: selectedRow.subTotal || selectedRow.totalFreight || 0,
//           gstBy: selectedRow.gstBy || '',
//           gstRate: selectedRow.gstRate || '',
//           gstAmt: selectedRow.gstAmt || 0,
//           totalFreight: selectedRow.totalFreight || 0,
//           status: selectedRow.status || '',
//         });
//         break;
//       case 'memo':
//         setNewEntry({
//           ...windowConfig.initialState,
//           id: selectedRow.id,
//           date: selectedRow.date || '',
//           driver: selectedRow.driver || '',
//           agent: selectedRow.agent || '',
//           branch: selectedRow.branch || '',
//           memoNo: selectedRow.memoNo || '',
//           fromCity: selectedRow.fromCity || '',
//           toCity: selectedRow.toCity || '',
//           vehicleNo: selectedRow.vehicleNo || '',
//           paymentType: selectedRow.paymentType || '',
//           advanced: selectedRow.advanced || 0,
//           lrRows: selectedRow.lrRows || [
//             {
//               centerName: selectedRow.centerName || '',
//               lrNo: selectedRow.lrNo || '',
//               date: selectedRow.lrDate || '',
//               packaging: selectedRow.packaging || '',
//               description: selectedRow.description || '',
//               article: selectedRow.article || 0,
//               freightBy: selectedRow.freightBy || '',
//               fromCity: selectedRow.fromCity || '',
//               toCity: selectedRow.toCity || '',
//               consignee: selectedRow.consignee || '',
//               acWeight: selectedRow.acWeight || 0,
//               weight: selectedRow.weight || 0,
//               freight: selectedRow.freight || 0,
//             },
//           ],
//           city: selectedRow.city || '',
//           totalArticle: selectedRow.totalArticle || 0,
//           totalAcWeight: selectedRow.totalAcWeight || 0,
//           totalWeight: selectedRow.totalWeight || 0,
//           totalFreight: selectedRow.totalFreight || 0,
//           narration: selectedRow.narration || '',
//           balance: selectedRow.balance || 0,
//         });
//         break;
//       default:
//         setNewEntry({
//           ...selectedRow,
//           selected: false,
//         });
//         break;
//     }
//     console.log('Initialized newEntry for edit:', newEntry);
//   };

//   const handleView = () => {
//     const selectedRows = data.filter((item) => item.selected);
//     if (selectedRows.length !== 1) {
//       alert('Ek hi row select karo view ke liye.');
//       return;
//     }
//     setModal({ isOpen: true, type: 'view', data: selectedRows[0] });
//   };

//   const handleDelete = () => {
//     const selectedRows = data.filter((item) => item.selected);
//     if (selectedRows.length === 0) {
//       alert('Kam se kam ek row select karo delete ke liye.');
//       return;
//     }
//     if (selectedRows.some((row) => row.audited)) {
//       alert('Audited rows delete nahi kar sakte.');
//       return;
//     }
//     if (window.confirm(`Kya aap ${selectedRows.length} row(s) delete karna chahte hain?`)) {
//       setData((prevData) => prevData.filter((item) => !item.selected));
//     }
//   };

//   const handleRefresh = () => {
//     setData(initialData);
//     setFilters(
//       columns.reduce((acc, col) => ({
//         ...acc,
//         [col.field]: col.field === 'audited' ? 'All' : ['All'],
//       }), {})
//     );
//     setPendingFilters(
//       columns.reduce((acc, col) => ({
//         ...acc,
//         [col.field]: col.field === 'audited' ? 'All' : ['All'],
//       }), {})
//     );
//     setSearchTerm('');
//     setStartDate('');
//     setEndDate('');
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const handleAudit = () => {
//     const selectedRows = data.filter((item) => item.selected);
//     if (selectedRows.length === 0) {
//       alert('Kam se kam ek row select karo audit ke liye.');
//       return;
//     }
//     setData((prevData) =>
//       prevData.map((item) =>
//         item.selected && !item.audited ? { ...item, audited: true, selected: false } : item
//       )
//     );
//     alert('Selected rows audited ho gaye.');
//   };

//   const handleField = () => {
//     console.log(`Toggling extra fields for ${title}`);
//     alert('Field functionality triggered.');
//   };

//   const handleModalSubmit = () => {
//     const updatedEntry = {
//       ...newEntry,
//       selected: false,
//       audited: false,
//       ...(windowConfig.fieldMapping ? windowConfig.fieldMapping(newEntry) : {}),
//     };

//     console.log('Updated entry:', updatedEntry);
//     if (modal.type === 'add') {
//       setData((prevData) => [updatedEntry, ...prevData]);
//     } else if (modal.type === 'edit') {
//       setData((prevData) =>
//         prevData.map((item) =>
//           item.selected ? { ...updatedEntry, selected: false } : item
//         )
//       );
//     }
//     setModal({ isOpen: false, type: '', data: null });
//   };

//   const handleInputChange = (field, value) => {
//     setNewEntry((prev) => ({ ...prev, [field]: value }));
//   };

//   const renderInputField = (field, value, config = {}) => {
//     const { type = 'text', options = [], placeholder = '' } = config;
//     switch (type) {
//       case 'dropdown':
//         return (
//           <select
//             value={value}
//             onChange={(e) => handleInputChange(field, e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         );
//       case 'textarea':
//         return (
//           <textarea
//             value={value}
//             onChange={(e) => handleInputChange(field, e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder={placeholder}
//             rows={3}
//           />
//         );
//       default:
//         return (
//           <input
//             type={type}
//             value={value}
//             onChange={(e) => handleInputChange(field, e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder={placeholder}
//           />
//         );
//     }
//   };

//   const renderModalContent = () => {
//     if (componentType === 'lr' && (modal.type === 'add' || modal.type === 'edit')) {
//       return (
//         <LRAddWindow
//           newEntry={newEntry}
//           setNewEntry={setNewEntry}
//         />
//       );
//     }
//     if (componentType === 'memo' && (modal.type === 'add' || modal.type === 'edit')) {
//       return (
//         <MemoAddWindow
//           newEntry={newEntry}
//           setNewEntry={setNewEntry}
//         />
//       );
//     }
//     if (componentType === 'memoreceive' && (modal.type === 'add' || modal.type === 'edit')) {
//       return (
//         <MemoReceiveAddWindow
//           newEntry={newEntry}
//           setNewEntry={setNewEntry}
//         />
//       );
//     }
//     if (componentType === 'delivery' && (modal.type === 'add' || modal.type === 'edit')) {
//       return (
//         <DeliveryAddWindow
//           newEntry={newEntry}
//           setNewEntry={setNewEntry}
//         />
//       );
//     }
//     if (componentType === 'cashReceipt' && (modal.type === 'add' || modal.type === 'edit')) {
//       return (
//         <CashReceiptAddWindow
//           newEntry={newEntry}
//           setNewEntry={setNewEntry}
//         />
//       );
//     }
//     if (componentType === 'salesInvoice' && (modal.type === 'add' || modal.type === 'edit')) {
//       return (
//         <SalesInvoiceAddWindow
//           newEntry={newEntry}
//           setNewEntry={setNewEntry}
//         />
//       );
//     }
//     if (componentType === 'transportBill' && (modal.type === 'add' || modal.type === 'edit')) {
//       return (
//         <TransportBillAddWindow
//           newEntry={newEntry}
//           setNewEntry={setNewEntry}
//         />
//       );
//     }
//     if (componentType === 'account' && (modal.type === 'add' || modal.type === 'edit')) {
//       return (
//         <AddAccountWindow
//           newEntry={newEntry}
//           setNewEntry={setNewEntry}
//         />
//       );
//     }
//     if (componentType === 'cashPayment' && (modal.type === 'add' || modal.type === 'edit')) {
//       return (
//         <CashPaymentAddWindow
//           newEntry={newEntry}
//           setNewEntry={setNewEntry}
//         />
//       );
//     }
//     if (componentType === 'fullLoad' && (modal.type === 'add' || modal.type === 'edit')) {
//       return (
//         <FullLoadAddWindow
//           newEntry={newEntry}
//           setNewEntry={setNewEntry}
//         />
//       );
//     }
//     if (modal.type === 'view') {
//       return (
//         <motion.div
//           className="space-y-3"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           {columns
//             .filter((col) => col.field !== 'selected')
//             .map((col) => (
//               <p key={col.field}>
//                 <strong>{col.label}:</strong>{' '}
//                 {numericFields.includes(col.field)
//                   ? parseFloat(modal.data[col.field]).toFixed(2)
//                   : col.field === 'audited'
//                   ? modal.data[col.field]
//                     ? 'Yes'
//                     : 'No'
//                   : modal.data[col.field]}
//               </p>
//             ))}
//         </motion.div>
//       );
//     }
//     return (
//       <motion.div
//         className="bg-white rounded-lg text-sm p-6"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.8, opacity: 0 }}
//         transition={{ duration: 0.3, ease: "easeOut" }}
//       >
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Entry</h2>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleModalSubmit();
//           }}
//         >
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <AnimatePresence>
//               {columns
//                 .filter((col) => col.field !== 'selected' && col.field !== 'audited')
//                 .map((col, index) => (
//                   <motion.div
//                     key={col.field}
//                     className="flex flex-col"
//                     initial={{ opacity: 0, y: 30, scale: 0.8, rotate: -5 }}
//                     animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
//                     exit={{ opacity: 0, y: -30, scale: 0.8, rotate: 5 }}
//                     transition={{
//                       duration: 0.4,
//                       delay: index * 0.1,
//                       type: 'spring',
//                       stiffness: 120,
//                       damping: 15,
//                     }}
//                     whileHover={{
//                       y: -5,
//                       boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
//                       transition: { duration: 0.2 },
//                     }}
//                   >
//                     <label className="text-sm font-medium text-gray-700 mb-1">
//                       {col.label}
//                     </label>
//                     {renderInputField(col.field, newEntry[col.field] || '', {
//                       type: numericFields.includes(col.field) ? 'number' : 'text',
//                       placeholder: `Enter ${col.label}`,
//                     })}
//                   </motion.div>
//                 ))}
//             </AnimatePresence>
//           </div>
//           <div className="flex justify-end space-x-3">
//             <motion.button
//               type="button"
//               onClick={() => setModal({ isOpen: false, type: '', data: null })}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md focus:outline-none"
//               whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ duration: 0.2 }}
//             >
//               Cancel
//             </motion.button>
//             <motion.button
//               type="submit"
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md focus:outline-none"
//               whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ duration: 0.2 }}
//             >
//               {modal.type === 'add' ? 'Add Entry' : 'Save Changes'}
//             </motion.button>
//           </div>
//         </form>
//       </motion.div>
//     );
//   };

//   const handleExportExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, `${title} Data`);
//     XLSX.writeFile(workbook, `${title}.xlsx`);
//   };

//   const handleExportPDF = () => {
//     try {
//       const doc = new jsPDF();
//       doc.text(title, 10, 10);
//       const tableData = filteredData.map((item) =>
//         columns
//           .filter((col) => col.field !== 'selected')
//           .map((col) => {
//             const value = item[col.field];
//             return numericFields.includes(col.field) ? parseFloat(value).toFixed(2) : value;
//           })
//       );
//       autoTable(doc, {
//         head: [columns.filter((col) => col.field !== 'selected').map((col) => col.label)],
//         body: tableData,
//         startY: 20,
//         theme: 'grid',
//         styles: { fontSize: 8, cellPadding: 2 },
//         headStyles: { fillColor: [220, 38, 38], textColor: 255 },
//       });
//       doc.save(`${title}.pdf`);
//     } catch (error) {
//       console.error('PDF generate karne mein error:', error);
//       alert('PDF generate nahi hua.');
//     }
//   };

//   // Button animation variants
//   const buttonVariants = {
//     initial: { scale: 0, opacity: 0 },
//     animate: (index) => ({
//       scale: 1,
//       opacity: 1,
//       transition: { delay: index * 0.05, duration: 0.3, type: 'spring', stiffness: 120 },
//     }),
//     hover: (custom) => ({
//       scale: 1.1,
//       rotate: custom === 'delete' || custom === 'exportPDF' ? 5 : -5,
//       boxShadow:
//         custom === 'delete' || custom === 'exportPDF'
//           ? '0 6px 20px rgba(239, 68, 68, 0.5)'
//           : custom === 'exportExcel'
//           ? '0 6px 20px rgba(34, 197, 94, 0.5)'
//           : '0 6px 20px rgba(59, 89, 152, 0.5)',
//       transition: { duration: 0.2 },
//     }),
//     tap: { scale: 0.9, transition: { duration: 0.1, type: 'spring', stiffness: 200 } },
//   };

//   // Input animation variants
//   const inputVariants = {
//     initial: { x: -20, opacity: 0 },
//     animate: { x: 0, opacity: 1, transition: { duration: 0.4 } },
//     hover: { scale: 1.02, boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: { duration: 0.2 } },
//     focus: {
//       borderColor: '#3b5998',
//       scale: 1.03,
//       transition: { duration: 0.2, repeat: 1, repeatType: 'reverse' },
//     },
//   };

//   // Search input variants
//   const searchVariants = {
//     initial: { x: 20, opacity: 0 },
//     animate: { x: 0, opacity: 1, transition: { duration: 0.4 } },
//     hover: { scale: 1.02, boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: { duration: 0.2 } },
//     focus: {
//       borderColor: '#3b5998',
//       scale: 1.03,
//       transition: { duration: 0.2, repeat: 1, repeatType: 'reverse' },
//     },
//   };

//   // GO button variants
//   const goButtonVariants = {
//     initial: { scale: 0, opacity: 0 },
//     animate: { scale: 1, opacity: 1, transition: { duration: 0.3, type: 'spring', stiffness: 150 } },
//     hover: {
//       scale: 1.15,
//       rotate: 10,
//       boxShadow: '0 6px 20px rgba(59, 89, 152, 0.7)',
//       transition: { duration: 0.2 },
//     },
//     tap: {
//       scale: 0.85,
//       backgroundColor: '#8b9dc3',
//       transition: { duration: 0.1, type: 'spring', stiffness: 200 },
//     },
//   };

//   return (
//     <motion.div
//       className="relative p-6 w-full h-[85vh] overflow-hidden bg-white shadow-xl rounded-xl border border-gray-200"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="mb-3 w-fit">
//         <motion.h2
//           className="text-3xl font-bold text-gray-800 uppercase tracking-wider mb-1"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           {title.split('').map((char, index) => (
//             <motion.span
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05, duration: 0.3 }}
//             >
//               {char}
//             </motion.span>
//           ))}
//         </motion.h2>
//         <motion.div
//           className="h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#3b5998] to-transparent"
//           initial={{ scaleX: 0 }}
//           animate={{ scaleX: 1 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//         />
//       </div>
//       <motion.div
//         className="flex flex-col md:flex-row justify-between items-center mb-6 bg-gradient-to-r from-blue-50 to-blue-100 sticky top-0 z-10 border-b border-gray-200 p-4 rounded-t-xl"
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.4 }}
//       >
//         <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
//           <div className="flex items-center space-x-3">
//             <motion.input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
//               placeholder="dd-mm-yyyy"
//               variants={inputVariants}
//               initial="initial"
//               animate="animate"
//               whileHover="hover"
//               whileFocus="focus"
//             />
//             <span className="text-gray-600 font-medium">to</span>
//             <motion.input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
//               placeholder="dd-mm-yyyy"
//               variants={inputVariants}
//               initial="initial"
//               animate="animate"
//               whileHover="hover"
//               whileFocus="focus"
//             />
//             <motion.button
//               onClick={handleGo}
//               className="p-2 btn-donate"
//               variants={goButtonVariants}
//               initial="initial"
//               animate="animate"
//               whileHover="hover"
//               whileTap="tap"
//             >
//               GO
//             </motion.button>
//           </div>
//           <motion.input
//             type="text"
//             placeholder="Fast Search"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
//             variants={searchVariants}
//             initial="initial"
//             animate="animate"
//             whileHover="hover"
//             whileFocus="focus"
//           />
//           <div className="flex space-x-2">
//             {showAdd && (
//               <motion.button
//                 onClick={handleAdd}
//                 className="btn-donate p-2"
//                 title="Add"
//                 variants={buttonVariants}
//                 initial="initial"
//                 animate={buttonVariants.animate(0)}
//                 whileHover={buttonVariants.hover('add')}
//                 whileTap="tap"
//               >
//                 <i className="ri-add-line"></i>
//               </motion.button>
//             )}
//             {showEdit && (
//               <motion.button
//                 onClick={handleEdit}
//                 className="p-2 btn-donate"
//                 title="Edit"
//                 variants={buttonVariants}
//                 initial="initial"
//                 animate={buttonVariants.animate(1)}
//                 whileHover={buttonVariants.hover('edit')}
//                 whileTap="tap"
//               >
//                 <i className="ri-edit-line"></i>
//               </motion.button>
//             )}
//             {showView && (
//               <motion.button
//                 onClick={handleView}
//                 className="p-2 btn-donate"
//                 title="View"
//                 variants={buttonVariants}
//                 initial="initial"
//                 animate={buttonVariants.animate(2)}
//                 whileHover={buttonVariants.hover('view')}
//                 whileTap="tap"
//               >
//                 <i className="ri-eye-line"></i>
//               </motion.button>
//             )}
//             {showDelete && (
//               <motion.button
//                 onClick={handleDelete}
//                 className="p-2 btn-donate2"
//                 title="Delete"
//                 variants={buttonVariants}
//                 initial="initial"
//                 animate={buttonVariants.animate(3)}
//                 whileHover={buttonVariants.hover('delete')}
//                 whileTap="tap"
//               >
//                 <i className="ri-delete-bin-line"></i>
//               </motion.button>
//             )}
//             {showRefresh && (
//               <motion.button
//                 onClick={handleRefresh}
//                 className="p-2 btn-donate"
//                 title="Refresh"
//                 variants={buttonVariants}
//                 initial="initial"
//                 animate={buttonVariants.animate(4)}
//                 whileHover={buttonVariants.hover('refresh')}
//                 whileTap="tap"
//               >
//                 <i className="ri-refresh-line"></i>
//               </motion.button>
//             )}
//             {showPrint && (
//               <motion.button
//                 onClick={handlePrint}
//                 className="p-2 btn-donate"
//                 title="Print"
//                 variants={buttonVariants}
//                 initial="initial"
//                 animate={buttonVariants.animate(5)}
//                 whileHover={buttonVariants.hover('print')}
//                 whileTap="tap"
//               >
//                 <i className="ri-printer-line"></i>
//               </motion.button>
//             )}
//             {showAudit && (
//               <motion.button
//                 onClick={handleAudit}
//                 className="p-2 btn-donate"
//                 title="Audit"
//                 variants={buttonVariants}
//                 initial="initial"
//                 animate={buttonVariants.animate(6)}
//                 whileHover={buttonVariants.hover('audit')}
//                 whileTap="tap"
//               >
//                 <i className="ri-file-lock-line"></i>
//               </motion.button>
//             )}
//             {showField && (
//               <motion.button
//                 onClick={handleField}
//                 className="p-2 btn-donate"
//                 title="Field"
//                 variants={buttonVariants}
//                 initial="initial"
//                 animate={buttonVariants.animate(7)}
//                 whileHover={buttonVariants.hover('field')}
//                 whileTap="tap"
//               >
//                 <i className="ri-layout-column-line"></i>
//               </motion.button>
//             )}
//             {showExportExcel && (
//               <motion.button
//                 onClick={handleExportExcel}
//                 className="p-2 btn-donate3"
//                 title="Export to Excel"
//                 variants={buttonVariants}
//                 initial="initial"
//                 animate={buttonVariants.animate(8)}
//                 whileHover={buttonVariants.hover('exportExcel')}
//                 whileTap="tap"
//               >
//                 <i className="ri-file-excel-2-line"></i>
//               </motion.button>
//             )}
//             {showExportPDF && (
//               <motion.button
//                 onClick={handleExportPDF}
//                 className="p-2 btn-donate2"
//                 title="Export to PDF"
//                 variants={buttonVariants}
//                 initial="initial"
//                 animate={buttonVariants.animate(9)}
//                 whileHover={buttonVariants.hover('exportPDF')}
//                 whileTap="tap"
//               >
//                 <i className="ri-file-ppt-line"></i>
//               </motion.button>
//             )}
//           </div>
//         </div>
//       </motion.div>

//       <div className="overflow-scroll scroller h-[53vh]">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gradient-to-r from-blue-100 to-blue-200 sticky top-0 z-10 text-nowrap">
//               {columns.map((column, index) => (
//                 <motion.th
//                   key={column.field}
//                   className={`p-3 border-b border-gray-200 text-gray-700 font-semibold text-sm ${index === 0 ? 'rounded-tl-lg' : ''} ${index === columns.length - 1 ? 'rounded-tr-lg' : ''}`}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1, duration: 0.3 }}
//                 >
//                   <div className="flex relative items-center space-x-2">
//                     {column.label === 'A' ? (
//                       <div className="checkbox-wrapper-12">
//                         <div className="cbx">
//                           <input
//                             type="checkbox"
//                             id="cbx-12"
//                             checked={filteredData.length > 0 && filteredData.every((item) => item.selected || item.audited)}
//                             onChange={(e) => handleSelectAllRows(e.target.checked)}
//                           />
//                           <label htmlFor="cbx-12"></label>
//                           <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
//                             <path d="M2 8.36364L6.23077 12L13 2"></path>
//                           </svg>
//                         </div>
//                         <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
//                           <defs>
//                             <filter id="goo-12">
//                               <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
//                               <feColorMatrix
//                                 in="blur"
//                                 mode="matrix"
//                                 values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
//                                 result="goo-12"
//                               />
//                               <feBlend in="SourceGraphic" in2="goo-12" />
//                             </filter>
//                           </defs>
//                         </svg>
//                       </div>
//                     ) : (
//                       <>
//                         {column.label.includes('Date') ? (
//                           <i className="ri-calendar-line text-blue-600"></i>
//                         ) : (
//                           <i className="ri-file-text-line text-blue-600"></i>
//                         )}
//                         <span>{column.label}</span>
//                         <motion.button
//                           onClick={() => toggleFilterDropdown(column.field)}
//                           className="ml-2 text-gray-500 hover:text-blue-600 transition-all duration-200"
//                           title={`Filter by ${column.label}`}
//                           whileHover={{ scale: 1.2, rotate: 90 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <i className="ri-filter-3-line"></i>
//                         </motion.button>
//                         <AnimatePresence>
//                           {openFilter === column.field && (
//                             <motion.div
//                               ref={(el) => (filterRefs.current[column.field] = el)}
//                               className="absolute z-20 mt-2 left-0 top-8 bg-white scroller border border-gray-200 rounded-lg shadow-xl p-4 w-64 max-h-48 overflow-y-auto"
//                               initial={{ opacity: 0, y: -10 }}
//                               animate={{ opacity: 1, y: 0 }}
//                               exit={{ opacity: 0, y: -10 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               {column.field === 'audited' ? (
//                                 <>
//                                   {getUniqueValues(column.field).map((value) => (
//                                     <motion.div
//                                       key={value}
//                                       className="flex items-center mb-2"
//                                       initial={{ opacity: 0, x: -10 }}
//                                       animate={{ opacity: 1, x: 0 }}
//                                       transition={{ delay: 0.1 }}
//                                     >
//                                       <input
//                                         type="radio"
//                                         id={`${column.field}-${value}`}
//                                         name={column.field}
//                                         checked={pendingFilters[column.field] === value}
//                                         onChange={() => handleFilterChange(column.field, value)}
//                                         className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-400 rounded"
//                                       />
//                                       <label htmlFor={`${column.field}-${value}`} className="text-gray-700">
//                                         {value}
//                                       </label>
//                                     </motion.div>
//                                   ))}
//                                 </>
//                               ) : (
//                                 <>
//                                   {getUniqueValues(column.field).map((value) => (
//                                     <motion.div
//                                       key={value}
//                                       className="flex items-center mb-2"
//                                       initial={{ opacity: 0, x: -10 }}
//                                       animate={{ opacity: 1, x: 0 }}
//                                       transition={{ delay: 0.1 }}
//                                     >
//                                       <input
//                                         type="checkbox"
//                                         id={`${column.field}-${value}`}
//                                         checked={pendingFilters[column.field].includes(value)}
//                                         onChange={() => handleFilterChange(column.field, value)}
//                                         className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-400 rounded"
//                                       />
//                                       <label htmlFor={`${column.field}-${value}`} className="text-gray-700">
//                                         {value}
//                                       </label>
//                                     </motion.div>
//                                   ))}
//                                 </>
//                               )}
//                               <div className="flex justify-end sticky bottom-0 gap-2 mt-3">
//                                 <motion.button
//                                   onClick={() => clearFilter(column.field)}
//                                   className="p-2 px-4 bg-gray-200 text-gray-700 rounded-lg"
//                                   whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}
//                                   whileTap={{ scale: 0.95 }}
//                                   transition={{ duration: 0.2 }}
//                                 >
//                                   Clear
//                                 </motion.button>
//                                 <motion.button
//                                   onClick={applyFilters}
//                                   className="p-2 px-4 bg-blue-600 text-white rounded-lg"
//                                   whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
//                                   whileTap={{ scale: 0.95 }}
//                                   transition={{ duration: 0.2 }}
//                                 >
//                                   Filter
//                                 </motion.button>
//                               </div>
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </>
//                     )}
//                   </div>
//                 </motion.th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item, index) => (
//               <motion.tr
//                 key={item.id || index}
//                 className={`${
//                   item.audited
//                     ? 'bg-yellow-100'
//                     : index % 2 === 0
//                     ? 'bg-white'
//                     : 'bg-gray-50'
//                 } hover:bg-blue-50 text-nowrap transition-all duration-200 border-b border-gray-100`}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05, duration: 0.3 }}
//                 whileHover={{ scale: 1.01 }}
//               >
//                 {columns.map((column) => (
//                   <td key={column.field} className="p-2 text-zinc-800 text-[14px]">
//                     <div className="flex items-center">
//                       {column.field === 'selected' ? (
//                         item.audited ? (
//                           <motion.i
//                             className="ri-lock-line text-red-600 cursor-pointer"
//                             title="Click to Unaudit"
//                             onClick={() => handleToggleAudit(index)}
//                             whileHover={{ scale: 1.2 }}
//                             transition={{ duration: 0.2 }}
//                           ></motion.i>
//                         ) : (
//                           <div className="checkbox-wrapper-12">
//                             <div className="cbx">
//                               <input
//                                 type="checkbox"
//                                 checked={item.selected}
//                                 onChange={() => handleRowSelect(index)}
//                               />
//                               <label htmlFor="cbx-12"></label>
//                               <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
//                                 <path d="M2 8.36364L6.23077 12L13 2"></path>
//                               </svg>
//                             </div>
//                             <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
//                               <defs>
//                                 <filter id="goo-12">
//                                   <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
//                                   <feColorMatrix
//                                     in="blur"
//                                     mode="matrix"
//                                     values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
//                                     result="goo-12"
//                                   />
//                                   <feBlend in="SourceGraphic" in2="goo-12" />
//                                 </filter>
//                               </defs>
//                             </svg>
//                           </div>
//                         )
//                       ) : column.field === 'audited' ? (
//                         item.audited ? 'Yes' : 'No'
//                       ) : numericFields.includes(column.field) ? (
//                         <span className={item[column.field] < 0 ? 'text-red-600' : 'text-green-600'}>
//                           {Math.abs(parseFloat(item[column.field]) || 0).toFixed(2)}
//                         </span>
//                       ) : (
//                         item[column.field] || ''
//                       )}
//                     </div>
//                   </td>
//                 ))}
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//         {filteredData.length === 0 && (
//           <motion.div
//             className="py-4 text-center text-gray-500 bg-white"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             No entries found for the selected filters or search.
//           </motion.div>
//         )}
//       </div>

//       <AnimatePresence>
//         {modal.isOpen && (
//           <motion.div
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <motion.div
//               className="bg-white rounded-lg p-6 w-full max-w-6xl shadow-2xl max-h-[90vh] overflow-y-auto scroller"
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//             >
//               <h3 className="text-3xl uppercase tracking-wider font-bold text-gray-800 py-2 mb-3 border-b border-zinc-800">
//                 {modal.type === 'add' ? `Add ${title.split(' ')[1]} Entry` : modal.type === 'edit' ? `Edit ${title.split(' ')[1]} Entry` : `View ${title.split(' ')[1]} Entry`}
//               </h3>
//               {modal.type === 'view' ? (
//                 <motion.div
//                   className="space-y-3"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {columns
//                     .filter((col) => col.field !== 'selected')
//                     .map((col) => (
//                       <p key={col.field}>
//                         <strong>{col.label}:</strong>{' '}
//                         {numericFields.includes(col.field)
//                           ? parseFloat(modal.data[col.field]).toFixed(2)
//                           : col.field === 'audited'
//                           ? modal.data[col.field]
//                             ? 'Yes'
//                             : 'No'
//                           : modal.data[col.field]}
//                       </p>
//                     ))}
//                 </motion.div>
//               ) : (
//                 renderModalContent()
//               )}
//               <div className="flex justify-end mt-6 sticky bottom-0">
//                 <div className="flex gap-2 justify-end">
//                   {modal.type !== 'view' && (
//                     <motion.button
//                       onClick={handleModalSubmit}
//                       className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                       whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
//                       whileTap={{ scale: 0.95 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       Save
//                     </motion.button>
//                   )}
//                   <motion.button
//                     onClick={() => setModal({ isOpen: false, type: '', data: null })}
//                     className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                     whileHover={{ scale: 1.05, boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
//                     whileTap={{ scale: 0.95 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     {modal.type === 'view' ? 'Close' : 'Cancel'}
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// export default TableLayout;