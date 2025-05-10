import React, { useState } from 'react';

const TransportBillAddWindow = ({ newEntry, setNewEntry, handleModalSubmit, modal, isEditMode }) => {
  const GST_RATE = 0.05; // 5% GST, adjustable if needed
  const [showModal, setShowModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Sample LR data (this would typically come from an API or a parent component)
  const lrData = [
    {
      centerName: 'Mumbai Hub',
      lrNo: 'LR001',
      lrDate: '01/05/2025',
      consigner: 'Shree Logistics',
      consignee: 'K. Miter',
      truckNo: 'MH04AB1234',
      weight: 500,
      fromCity: 'Mumbai',
      toCity: 'Delhi',
      sortedAscending: 'Yes',
      article: 10,
      rate: 20,
      charge1: 50,
      charge2: 30,
    },
    {
      centerName: 'Ahmedabad Hub',
      lrNo: 'LR002',
      lrDate: '02/05/2025',
      consigner: 'Ajay Transport',
      consignee: 'Ramesh & Co',
      truckNo: 'GJ01CD5678',
      weight: 750,
      fromCity: 'Ahmedabad',
      toCity: 'Pune',
      sortedAscending: 'No',
      article: 15,
      rate: 15,
      charge1: 40,
      charge2: 25,
    },
    {
      centerName: 'Delhi Hub',
      lrNo: 'LR003',
      lrDate: '03/05/2025',
      consigner: 'XYZ Logistics',
      consignee: 'Suresh Traders',
      truckNo: 'DL01EF9012',
      weight: 1000,
      fromCity: 'Delhi',
      toCity: 'Bangalore',
      sortedAscending: 'Yes',
      article: 20,
      rate: 18,
      charge1: 60,
      charge2: 35,
    },
  ];

  const rowFields = [
    { field: 'centerName', label: 'Center Name', type: 'text' },
    { field: 'lrNo', label: 'L.R. No', type: 'text' },
    { field: 'lrDate', label: 'L.R. Date', type: 'text', icon: 'calendar' },
    { field: 'consigner', label: 'Consigner', type: 'text' },
    { field: 'consignee', label: 'Consignee', type: 'text' },
    { field: 'truckNo', label: 'Truck No', type: 'text' },
    { field: 'weight', label: 'Weight', type: 'number' },
    { field: 'fromCity', label: 'From City', type: 'text' },
    { field: 'toCity', label: 'To City', type: 'text' },
    { field: 'sortedAscending', label: 'Sorted Ascending', type: 'dropdown', options: ['Yes', 'No'] },
    { field: 'article', label: 'Article', type: 'number' },
    { field: 'rate', label: 'Rate', type: 'number' },
    { field: 'charge1', label: 'Charge1', type: 'number' },
    { field: 'charge2', label: 'Charge2', type: 'number' },
    { field: 'totalFreight', label: 'Total Freight', type: 'number', readOnly: true },
  ];

  const handleInputChange = (field, value) => {
    setNewEntry((prev) => {
      const updatedEntry = { ...prev, [field]: value };
      if (field === 'expenseRate') {
        const rate = parseFloat(value) || 0;
        updatedEntry.expenseAmount = rate; // Assuming Amount is directly tied to Rate for simplicity
      }
      return updateCalculations(updatedEntry);
    });
  };

  const renderInputField = (field, value, config = {}) => {
    const { type = 'text', options = [], placeholder = '', readOnly = false, tooltip = '' } = config;
    const inputClasses = "w-full px-3 py-1.5 text-[13px] border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 bg-white hover:border-blue-300";
    const labelClasses = "text-[12px] text-gray-600 font-medium mb-1 flex items-center space-x-1";

    return (
      <div className="relative group">
        <label className={labelClasses}>
          <span>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</span>
          {tooltip && (
            <span className="text-gray-400 cursor-help group-hover:text-blue-500 transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 16H9v-2h2v2zm1-4.83V13H8v-1.83c0-.46.18-.9.52-1.24l1.41-1.41c.34-.34.52-.78.52-1.24 0-.96-.78-1.75-1.75-1.75S7 6.32 7 7.28H5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 .46-.18.9-.52 1.24l-1.41 1.41c-.34.34-.52.78-.52 1.24z"/>
              </svg>
              <span className="absolute left-0 top-6 bg-gray-800 text-white text-[11px] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                {tooltip}
              </span>
            </span>
          )}
        </label>
        {type === 'dropdown' ? (
          <div className="relative">
            <select
              value={value || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={`${inputClasses} appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed`}
              disabled={readOnly}
            >
              <option value="">{`Select ${field}`}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </span>
          </div>
        ) : type === 'textarea' ? (
          <textarea
            value={value || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className={`${inputClasses} h-16 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed`}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        ) : (
          <div className="relative">
            <input
              type={type}
              value={value || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={`${inputClasses} disabled:bg-gray-100 disabled:cursor-not-allowed ${field === 'date' ? 'pl-8' : ''}`}
              placeholder={placeholder}
              readOnly={readOnly}
            />
            {field === 'date' && (
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  const updateCalculations = (updatedEntry) => {
    const rows = updatedEntry.rows || [];
    const updatedRows = rows.map(row => {
      const rate = parseFloat(row.rate) || 0;
      const charge1 = parseFloat(row.charge1) || 0;
      const charge2 = parseFloat(row.charge2) || 0;
      const subTotal = rate + charge1 + charge2;
      const gst = subTotal * GST_RATE;
      const totalFreight = subTotal + gst;

      // Split GST into CGST, SGST, or IGST based on taxType and from/to cities
      let cgst = 0, sgst = 0, igst = 0;
      if (updatedEntry.taxType === 'GST') {
        if (row.fromCity === row.toCity) {
          // Same state: Split GST into CGST and SGST
          cgst = gst / 2;
          sgst = gst / 2;
        } else {
          // Different states: Apply IGST
          igst = gst;
        }
      }

      return {
        ...row,
        subTotal,
        gst,
        cgst,
        sgst,
        igst,
        totalFreight,
      };
    });

    const totalArticle = updatedRows.reduce((sum, row) => sum + (parseInt(row.article) || 0), 0);
    const totalWeight = updatedRows.reduce((sum, row) => sum + (parseFloat(row.weight) || 0), 0);
    const taxableAmount = updatedRows.reduce((sum, row) => sum + (parseFloat(row.subTotal) || 0), 0);
    const totalGST = updatedRows.reduce((sum, row) => sum + (parseFloat(row.gst) || 0), 0);
    const totalCGST = updatedRows.reduce((sum, row) => sum + (parseFloat(row.cgst) || 0), 0);
    const totalSGST = updatedRows.reduce((sum, row) => sum + (parseFloat(row.sgst) || 0), 0);
    const totalIGST = updatedRows.reduce((sum, row) => sum + (parseFloat(row.igst) || 0), 0);
    const itemFreight = updatedRows.reduce((sum, row) => sum + (parseFloat(row.totalFreight) || 0), 0);
    const expenseAmount = parseFloat(updatedEntry.expenseAmount) || 0;
    const totalAmount = itemFreight + expenseAmount;

    return {
      ...updatedEntry,
      rows: updatedRows,
      totalArticle,
      totalWeight,
      taxableAmount,
      totalGST,
      totalCGST,
      totalSGST,
      totalIGST,
      itemFreight,
      amount: itemFreight,
      totalAmount,
    };
  };

  const handleRowChange = (index, field, value) => {
    setNewEntry((prev) => {
      const updatedRows = [...prev.rows];
      updatedRows[index] = { ...updatedRows[index], [field]: value };
      const updatedEntry = { ...prev, rows: updatedRows };
      return updateCalculations(updatedEntry);
    });
  };

  const addRow = () => {
    setNewEntry((prev) => {
      const newRow = rowFields.reduce((acc, field) => ({
        ...acc,
        [field.field]: field.type === 'number' ? 0 : '',
      }), {});
      const updatedEntry = {
        ...prev,
        rows: [...(prev.rows || []), newRow],
      };
      return updateCalculations(updatedEntry);
    });
  };

  const removeRow = (index) => {
    setNewEntry((prev) => {
      const updatedRows = prev.rows.filter((_, i) => i !== index);
      const updatedEntry = { ...prev, rows: updatedRows };
      return updateCalculations(updatedEntry);
    });
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleAddSelectedLRs = () => {
    setNewEntry((prev) => {
      const newRows = selectedRows.map((index) => lrData[index]);
      const updatedRows = [...(prev.rows || []), ...newRows];
      const updatedEntry = { ...prev, rows: updatedRows };
      return updateCalculations(updatedEntry);
    });
    setShowModal(false);
    setSelectedRows([]);
  };

  const handleSubmit = () => {
    const updatedEntry = updateCalculations(newEntry);
    handleModalSubmit(updatedEntry);
  };

  return (
    <div className="text-sm">
      {/* Section 1: Bill Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Bill Details</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('date', newEntry.date, { 
              type: 'text', 
              placeholder: 'dd/mm/yyyy',
              tooltip: 'Enter date in dd/mm/yyyy format'
            })}
          </div>
          <div>
            {renderInputField('cashDebit', newEntry.cashDebit, {
              type: 'dropdown',
              options: ['Cash', 'Debit', 'Credit'],
            })}
          </div>
          <div>
            {renderInputField('no', newEntry.no, { 
              type: 'text',
              tooltip: 'Enter bill number'
            })}
          </div>
          <div>
            {renderInputField('taxType', newEntry.taxType, {
              type: 'dropdown',
              options: ['GST', 'VAT', 'TAX FREE'],
            })}
          </div>
          <div>
            {renderInputField('accountName', newEntry.accountName, {
              type: 'dropdown',
              options: [
                'ABC Corp',
                'XYZ Ltd',
                'DEF Inc',
                'GHI LLC',
                'JKL Enterprises',
                'MNO Group',
                'PQR Solutions',
                'STU Technologies',
                'VWX Industries',
                'YZ Systems',
              ],
            })}
          </div>
          <div>
            {renderInputField('billType', newEntry.billType, {
              type: 'dropdown',
              options: ['Standard', 'Proforma'],
            })}
          </div>
          <div>
            {renderInputField('salesAccount', newEntry.salesAccount, {
              type: 'dropdown',
              options: ['Sales - General', 'Sales - Retail', 'Sales - Wholesale', 'Sales - Services'],
            })}
          </div>
        </div>
      </div>

      {/* Section 2: Additional Bill Info */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Additional Bill Info</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('billType', newEntry.billType, {
              type: 'dropdown',
              options: ['Lr', 'Non-Lr'],
            })}
          </div>
          <div>
            {renderInputField('bookCode', newEntry.bookCode, { type: 'text' })}
          </div>
          <div>
            {renderInputField('balance', newEntry.balance, { type: 'number', readOnly: true })}
          </div>
          <div>
            {renderInputField('centerName', newEntry.centerName, { type: 'text' })}
          </div>
        </div>
      </div>

      {/* Section 3: LR Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">LR Details</h3>
        <div className="flex justify-between items-center mb-3">
          <div className="flex space-x-2">
            <button
              onClick={addRow}
              className="px-4 py-1.5 bg-blue-600 text-white text-[12px] font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all duration-200 flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>Add LR</span>
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-1.5 bg-green-600 text-white text-[12px] font-medium rounded-md shadow-sm hover:bg-green-700 transition-all duration-200 flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <span>Get LR</span>
            </button>
          </div>
          <span className="text-[12px] text-gray-600">Total LR: {(newEntry.rows || []).length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12px]">
            <thead className="sticky top-0 bg-gray-50">
              <tr className="border-b border-gray-200 bg-blue-100/50 text-nowrap">
                {rowFields.map((field) => (
                  <th key={field.field} className="p-2 text-left font-medium text-gray-600">{field.label}</th>
                ))}
                <th className="p-2 text-left font-medium text-gray-600">Delete</th>
              </tr>
            </thead>
            <tbody>
              {(newEntry.rows || []).map((row, index) => (
                <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-200`}>
                  {rowFields.map((field) => (
                    <td key={field.field} className="p-2">
                      {field.type === 'dropdown' ? (
                        <div className="relative">
                          <select
                            value={row[field.field] || ''}
                            onChange={(e) => handleRowChange(index, field.field, e.target.value)}
                            className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 appearance-none"
                          >
                            <option value="">Select</option>
                            {(field.options || []).map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                          </span>
                        </div>
                      ) : field.icon === 'calendar' ? (
                        <div className="relative">
                          <input
                            type="text"
                            value={row[field.field] || ''}
                            onChange={(e) => handleRowChange(index, field.field, e.target.value)}
                            className="w-full px-2 py-1 pl-8 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                            placeholder="dd/mm/yyyy"
                          />
                          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                          </span>
                        </div>
                      ) : (
                        <input
                          type={field.type || 'text'}
                          value={row[field.field] || ''}
                          onChange={(e) => handleRowChange(index, field.field, e.target.value)}
                          className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                          readOnly={field.readOnly || false}
                        />
                      )}
                    </td>
                  ))}
                  <td className="p-2 text-center">
                    <button
                      onClick={() => removeRow(index)}
                      className="text-red-500 hover:text-red-700 transition-all duration-200"
                      title="Delete row"
                    >
                      <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 4: Totals Display */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Totals</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            <label className="text-[12px] text-gray-600 font-medium mb-1">Total LR</label>
            <div className="px-3 py-1.5 text-[13px] border border-gray-200 rounded-md bg-gray-100">{(newEntry.rows || []).length}</div>
          </div>
          <div>
            <label className="text-[12px] text-gray-600 font-medium mb-1">Total Article</label>
            <div className="px-3 py-1.5 text-[13px] border border-gray-200 rounded-md bg-gray-100">{newEntry.totalArticle || 0}</div>
          </div>
          <div>
            <label className="text-[12px] text-gray-600 font-medium mb-1">Total Weight</label>
            <div className="px-3 py-1.5 text-[13px] border border-gray-200 rounded-md bg-gray-100">{newEntry.totalWeight || 0}</div>
          </div>
          <div>
            <label className="text-[12px] text-gray-600 font-medium mb-1">Taxable Amount</label>
            <div className="px-3 py-1.5 text-[13px] border border-gray-200 rounded-md bg-gray-100">{newEntry.taxableAmount || 0}</div>
          </div>
          <div>
            <label className="text-[12px] text-gray-600 font-medium mb-1">Item Freight</label>
            <div className="px-3 py-1.5 text-[13px] border border-gray-200 rounded-md bg-gray-100">{newEntry.itemFreight || 0}</div>
          </div>
          <div>
            <label className="text-[12px] text-gray-600 font-medium mb-1">Total GST</label>
            <div className="px-3 py-1.5 text-[13px] border border-gray-200 rounded-md bg-gray-100">{newEntry.totalGST || 0}</div>
          </div>
          <div>
            <label className="text-[12px] text-gray-600 font-medium mb-1">Total Amount</label>
            <div className="px-3 py-1.5 text-[13px] border border-gray-200 rounded-md bg-gray-100">{newEntry.totalAmount || 0}</div>
          </div>
        </div>
      </div>

      {/* Section 5: Expenses and Taxes */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Expenses and Taxes</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('expenseName', newEntry.expenseName, {
              type: 'dropdown',
              options: ['Service Charge', 'Packaging Fee', 'Insurance', 'Other'],
            })}
          </div>
          <div>
            {renderInputField('expenseAccount', newEntry.expenseAccount, {
              type: 'dropdown',
              options: ['Expense - General', 'Expense - Service', 'Expense - Insurance'],
            })}
          </div>
          <div>
            {renderInputField('expenseRate', newEntry.expenseRate, { type: 'number' })}
          </div>
          <div>
            {renderInputField('expenseAmount', newEntry.expenseAmount, { type: 'number', readOnly: true })}
          </div>
          <div></div>
          {newEntry.taxType === 'GST' && (
            <>
              <div>
                <label className="text-[12px] text-gray-600 font-medium mb-1">Total CGST</label>
                <div className="px-3 py-1.5 text-[13px] border border-gray-200 rounded-md bg-gray-100">{newEntry.totalCGST || 0}</div>
              </div>
              <div>
                <label className="text-[12px] text-gray-600 font-medium mb-1">Total SGST</label>
                <div className="px-3 py-1.5 text-[13px] border border-gray-200 rounded-md bg-gray-100">{newEntry.totalSGST || 0}</div>
              </div>
              <div>
                <label className="text-[12px] text-gray-600 font-medium mb-1">Total IGST</label>
                <div className="px-3 py-1.5 text-[13px] border border-gray-200 rounded-md bg-gray-100">{newEntry.totalIGST || 0}</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Get LR Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-11/12 max-h-[80vh] overflow-y-auto">
            <h3 className="text-[14px] font-semibold text-gray-700 mb-3">Select LRs</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[12px]">
                <thead className="sticky top-0 bg-gray-50">
                  <tr className="border-b border-gray-200 bg-blue-100/50 text-nowrap">
                    <th className="p-2 text-left font-medium text-gray-600">Select</th>
                    {rowFields.map((field) => (
                      <th key={field.field} className="p-2 text-left font-medium text-gray-600">{field.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lrData.map((row, index) => (
                    <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-200`}>
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(index)}
                          onChange={() => handleSelectRow(index)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      {rowFields.map((field) => (
                        <td key={field.field} className="p-2">{row[field.field]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedRows([]);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 text-[13px] font-medium rounded-md hover:bg-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSelectedLRs}
                className="px-4 py-2 bg-blue-600 text-white text-[13px] font-medium rounded-md hover:bg-blue-700 transition-all duration-200"
                disabled={selectedRows.length === 0}
              >
                Add Selected LRs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section 6: Additional Information */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Additional Information</h3>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">
            {renderInputField('narration', newEntry.narration, { type: 'textarea' })}
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white text-[13px] font-medium rounded-md shadow-sm hover:bg-green-700 transition-all duration-200 flex items-center space-x-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span>Save Bill</span>
        </button>
      </div>
    </div>
  );
};

export default TransportBillAddWindow;