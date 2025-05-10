import React, { useState } from 'react';

const CentralizedAddWindow = ({
  newEntry,
  setNewEntry,
  handleModalSubmit,
  modal,
  isEditMode,
  componentType,
  fieldConfig = {},
  rowConfig = {},
  modalConfig = {},
  calculationLogic,
  labels = {},
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Default labels (can be overridden via props)
  const defaultLabels = {
    title: 'Add Entry',
    autoAddButton: 'Auto Add',
    addRowButton: 'Add Row',
    totalRowsLabel: 'Total Rows',
    section1: 'Details',
    section2: 'Party Information',
    section3: 'Rows',
    section4: 'Consignment Details',
    section5: 'Freight Details',
    section6: 'Payment Details',
    section7: 'Additional Charges',
    section8: 'Delivery Charges',
    section9: 'Additional Information',
    saveButton: 'Save & Close',
    modalTitle: 'Select Entries',
    modalAddButton: 'Add Selected',
    modalCancelButton: 'Cancel',
  };

  const mergedLabels = { ...defaultLabels, ...labels };

  // Default row fields (can be overridden via rowConfig)
  const defaultRowFields = [
    { field: 'centerName', label: 'Center', type: 'text' },
    { field: 'lrNo', label: 'LR No', type: 'text' },
    { field: 'date', label: 'Date', type: 'text', icon: 'calendar' },
    { field: 'baleNo', label: 'Bale No', type: 'text' },
    { field: 'fromCity', label: 'From City', type: 'text' },
    { field: 'toCity', label: 'To City', type: 'text' },
    { field: 'consignor', label: 'Consignor', type: 'text' },
    { field: 'consignee', label: 'Consignee', type: 'text' },
    { field: 'article', label: 'Article', type: 'number' },
    { field: 'shortArt', label: 'Short Art.', type: 'number' },
    { field: 'weight', label: 'Weight', type: 'number' },
    { field: 'freight', label: 'Freight', type: 'number' },
    { field: 'freightBy', label: 'Freight By', type: 'dropdown', options: ['To Pay', 'Paid', 'Consignee', 'Consignor', 'T.B.B.'] },
  ];

  const rowFields = rowConfig.fields || defaultRowFields;

  // Default modal data (can be overridden via modalConfig)
  const defaultModalData = [];

  const modalData = modalConfig.data || defaultModalData;
  const modalFields = rowConfig.fields || defaultRowFields;

  // Update calculations using provided logic or default
  const updateCalculations = (updatedEntry) => {
    if (calculationLogic) {
      return calculationLogic(updatedEntry);
    }
    const rows = updatedEntry.rows || [];
    const totalArticle = rows.reduce((sum, row) => sum + (parseInt(row.article) || 0), 0);
    const totalWeight = rows.reduce((sum, row) => sum + (parseFloat(row.weight) || 0), 0);
    const amount = parseFloat(updatedEntry.amount) || 0;
    const advance = parseFloat(updatedEntry.advance) || 0;
    const advance2 = parseFloat(updatedEntry.advance2) || 0;
    const balance = amount - (advance + advance2);

    return {
      ...updatedEntry,
      totalArticle,
      totalWeight,
      balance: balance >= 0 ? balance : 0,
    };
  };

  const handleInputChange = (field, value) => {
    setNewEntry((prev) => {
      const updatedEntry = { ...prev, [field]: value };
      return updateCalculations(updatedEntry);
    });
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

  const handleRowSelection = (row) => {
    setSelectedRows((prev) =>
      prev.some(item => item[modalFields[1]?.field] === row[modalFields[1]?.field])
        ? prev.filter(item => item[modalFields[1]?.field] !== row[modalFields[1]?.field])
        : [...prev, row]
    );
  };

  const addSelectedRows = () => {
    setNewEntry((prev) => {
      const newRows = selectedRows.map((row) =>
        modalFields.reduce((acc, field) => ({
          ...acc,
          [field.field]: row[field.field],
        }), {})
      );
      const updatedEntry = {
        ...prev,
        rows: [...(prev.rows || []), ...newRows],
        ...(modalConfig.mapFieldsToEntry ? modalConfig.mapFieldsToEntry(newRows, prev) : {}),
      };
      return updateCalculations(updatedEntry);
    });
    setSelectedRows([]);
    setShowModal(false);
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

  const handleSubmit = () => {
    const updatedEntry = { ...newEntry };
    handleModalSubmit(updatedEntry);
  };

  return (
    <div className="text-sm">
      {/* Header Section */}
      <div className="flex justify-between items-center my-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-1.5 bg-blue-600 text-white text-[12px] font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all duration-200 flex items-center space-x-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <span>{mergedLabels.autoAddButton}</span>
        </button>
      </div>

      {/* Section 1: Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">{mergedLabels.section1}</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('date', newEntry.date, { 
              type: 'text', 
              placeholder: 'dd/mm/yyyy',
              tooltip: 'Enter date in dd/mm/yyyy format'
            })}
          </div>
          <div>
            {renderInputField(`${componentType}No`, newEntry[`${componentType}No`], { 
              type: 'text',
              tooltip: `Enter ${componentType} number`
            })}
          </div>
          <div>
            {renderInputField('type', newEntry.type, {
              type: 'dropdown',
              options: fieldConfig.type?.options || [],
            })}
          </div>
          <div>
            {renderInputField('party', newEntry.party, {
              type: 'dropdown',
              options: fieldConfig.party?.options || [],
            })}
          </div>
          <div>
            {renderInputField('fromBranch', newEntry.fromBranch, {
              type: 'dropdown',
              options: fieldConfig.fromBranch?.options || [],
            })}
          </div>
        </div>
      </div>

      {/* Section 2: Party Information */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">{mergedLabels.section2}</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('partyAddress', newEntry.partyAddress, { type: 'textarea' })}
          </div>
          <div>
            {renderInputField('hireAccount', newEntry.hireAccount, {
              type: 'dropdown',
              options: fieldConfig.hireAccount?.options || [],
            })}
          </div>
          <div>
            {renderInputField('hire', newEntry.hire, {
              type: 'dropdown',
              options: fieldConfig.hire?.options || [],
            })}
          </div>
          <div>
            {renderInputField('account', newEntry.account, {
              type: 'dropdown',
              options: fieldConfig.account?.options || [],
            })}
          </div>
          <div>
            {renderInputField('labour', newEntry.labour, {
              type: 'dropdown',
              options: fieldConfig.labour?.options || [],
            })}
          </div>
        </div>
      </div>

      {/* Section 3: Rows */}
      <div className="bg-gray-200/60 p-2 rounded-lg my-8">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">{mergedLabels.section3}</h3>
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={addRow}
            className="px-4 py-1.5 bg-blue-600 text-white text-[12px] font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all duration-200 flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>{mergedLabels.addRowButton}</span>
          </button>
          <span className="text-[12px] text-gray-600">{mergedLabels.totalRowsLabel}: {(newEntry.rows || []).length}</span>
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

      {/* Section 4: Consignment Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">{mergedLabels.section4}</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('consigner', newEntry.consigner, { type: 'text' })}
          </div>
          <div>
            {renderInputField('consignee', newEntry.consignee, { type: 'text' })}
          </div>
          <div>
            {renderInputField('consignerGSTNO', newEntry.consignerGSTNO, { type: 'text' })}
          </div>
          <div>
            {renderInputField('consigneeGSTNO', newEntry.consigneeGSTNO, { type: 'text' })}
          </div>
          <div>
            {renderInputField('pack', newEntry.pack, { type: 'text' })}
          </div>
        </div>
      </div>

      {/* Section 5: Freight Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">{mergedLabels.section5}</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('description', newEntry.description, { type: 'textarea' })}
          </div>
          <div>
            {renderInputField('article', newEntry.article, { type: 'number' })}
          </div>
          <div>
            {renderInputField('weight', newEntry.weight, { type: 'number' })}
          </div>
          <div>
            {renderInputField('rate', newEntry.rate, { type: 'number' })}
          </div>
          <div>
            {renderInputField('freightOn', newEntry.freightOn, {
              type: 'dropdown',
              options: fieldConfig.freightOn?.options || [],
            })}
          </div>
        </div>
      </div>

      {/* Section 6: Payment Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">{mergedLabels.section6}</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('cashBank', newEntry.cashBank, {
              type: 'dropdown',
              options: fieldConfig.cashBank?.options || [],
            })}
          </div>
          <div>
            {renderInputField('advance', newEntry.advance, { type: 'number' })}
          </div>
          <div>
            {renderInputField('cashBank2', newEntry.cashBank2, {
              type: 'dropdown',
              options: fieldConfig.cashBank2?.options || [],
            })}
          </div>
          <div>
            {renderInputField('advance2', newEntry.advance2, { type: 'number' })}
          </div>
          <div>
            {renderInputField('balance', newEntry.balance, { type: 'number', readOnly: true })}
          </div>
        </div>
      </div>

      {/* Section 7: Additional Charges */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">{mergedLabels.section7}</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('amount', newEntry.amount, { type: 'number' })}
          </div>
          <div>
            {renderInputField('preRate', newEntry.preRate, { type: 'number' })}
          </div>
          <div>
            {renderInputField('totalArticle', newEntry.totalArticle ?? 0, { type: 'number', readOnly: true })}
          </div>
          <div>
            {renderInputField('totalWeight', newEntry.totalWeight ?? 0, { type: 'number', readOnly: true })}
          </div>
          <div>
            {renderInputField('hamali', newEntry.hamali, { type: 'number' })}
          </div>
        </div>
      </div>

      {/* Section 8: Delivery Charges */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">{mergedLabels.section8}</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('serviceCharge', newEntry.serviceCharge, { type: 'number' })}
          </div>
          <div>
            {renderInputField('discountKasar', newEntry.discountKasar, { type: 'number' })}
          </div>
          <div>
            {renderInputField('deliveryFreight', newEntry.deliveryFreight, { type: 'number' })}
          </div>
          <div>
            {renderInputField('deliveryType', newEntry.deliveryType, {
              type: 'dropdown',
              options: fieldConfig.deliveryType?.options || [],
            })}
          </div>
          <div>
            {renderInputField('cashType', newEntry.cashType, {
              type: 'dropdown',
              options: fieldConfig.cashType?.options || [],
            })}
          </div>
        </div>
      </div>

      {/* Section 9: Additional Information */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">{mergedLabels.section9}</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('deliveryAt', newEntry.deliveryAt, { type: 'text' })}
          </div>
          <div>
            {renderInputField('note', newEntry.note, { type: 'textarea' })}
          </div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {/* Save & Close Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white text-[13px] font-medium rounded-md shadow-sm hover:bg-green-700 transition-all duration-200 flex items-center space-x-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span>{mergedLabels.saveButton}</span>
        </button>
      </div>

      {/* Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl p-5 w-full max-w-6xl shadow-2xl max-h-[90vh] flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{mergedLabels.modalTitle}</h3>
            <div className="flex-grow overflow-y-auto">
              <table className="w-full border-collapse text-[12px]">
                <thead className="sticky top-0 bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="p-2 text-left font-medium text-gray-600">Select</th>
                    {modalFields.map((field) => (
                      <th key={field.field} className="p-2 text-left font-medium text-gray-600">{field.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modalData.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-200`}
                    >
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={selectedRows.some(item => item[modalFields[1]?.field] === row[modalFields[1]?.field])}
                          onChange={() => handleRowSelection(row)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-400 rounded border-gray-300"
                        />
                      </td>
                      {modalFields.map((field) => (
                        <td key={field.field} className="p-2 text-gray-700">{row[field.field]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={addSelectedRows}
                className="px-4 py-1.5 bg-blue-600 text-white text-[12px] font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all duration-200"
              >
                {mergedLabels.modalAddButton}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 bg-gray-500 text-white text-[12px] font-medium rounded-md shadow-sm hover:bg-gray-600 transition-all duration-200"
              >
                {mergedLabels.modalCancelButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CentralizedAddWindow;