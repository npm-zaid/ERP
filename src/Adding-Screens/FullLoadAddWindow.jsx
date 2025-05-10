import React, { useState } from 'react';

const FullLoadAddWindow = ({ onClose }) => {
  const [newEntry, setNewEntry] = useState({
    date: '07/05/2025',
    branch: '',
    truckNo: '',
    owner: '',
    driver: '',
    fromCity: '',
    toCity: '',
    lrNo: '',
    loadType: '',
    weight: '',
    rate: '',
    freight: '',
    advance: '',
    balance: '',
    remark: '',
    partyAC: '',
    partyFreight: '',
    partyBalance: '',
    partyAdvance: '',
    partyRate: '',
    partyWeight: '',
    transporterAC: '',
    transporterFreight: '',
    transporterBalance: '',
    transporterAdvance: '',
    transporterRate: '',
    transporterWeight: '',
    shortageQty: '',
    shortageRate: '',
    shortageAmount: '',
    loadingDate: '',
    loadingTime: '',
    loadingQty: '',
    loadingWeight: '',
    unloadingDate: '',
    unloadingTime: '',
    unloadingQty: '',
    unloadingWeight: '',
    pumpDetails: [],
    expenseDetails: [],
    jvDetails: [],
    supplyDetails: [],
    paymentDetails: [],
    receiptDetails: [],
    bookingId: '',
    salesBillNo: '',
    supplementaryBillNo: '',
    transBillNo: '',
  });

  const [activeTab, setActiveTab] = useState('pumpDetails');

  const handleInputChange = (field, value) => {
    setNewEntry((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addRow = (section) => {
    setNewEntry((prev) => {
      const newRow = sectionFields[section].reduce((acc, field) => ({
        ...acc,
        [field.field]: field.type === 'number' ? 0 : '',
      }), {});
      return {
        ...prev,
        [section]: [...prev[section], newRow],
      };
    });
  };

  const handleRowChange = (section, index, field, value) => {
    setNewEntry((prev) => {
      const updatedRows = [...prev[section]];
      updatedRows[index] = { ...updatedRows[index], [field]: value };
      return { ...prev, [section]: updatedRows };
    });
  };

  const removeRow = (section, index) => {
    setNewEntry((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const renderInputField = (label, field, value, config = {}) => {
    const { type = 'text', options = [], placeholder = '', readOnly = false, tooltip = '' } = config;
    const inputClasses = "w-full px-3 py-1.5 text-[13px] border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 bg-white hover:border-blue-300";
    const labelClasses = "text-[12px] text-gray-600 font-medium mb-1 flex items-center space-x-1";

    return (
      <div className="relative group">
        <label className={labelClasses}>
          <span>{label}</span>
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
              <option value="">{`Select ${label}`}</option>
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
              className={`${inputClasses} disabled:bg-gray-100 disabled:cursor-not-allowed ${field === 'date' || field.includes('Date') ? 'pl-8' : ''}`}
              placeholder={placeholder}
              readOnly={readOnly}
            />
            {(field === 'date' || field.includes('Date')) && (
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

  const sectionFields = {
    pumpDetails: [
      { field: 'date', label: 'Date', type: 'text', icon: 'calendar' },
      { field: 'pump', label: 'Pump', type: 'text' },
      { field: 'ltr', label: 'Ltr', type: 'number' },
      { field: 'rate', label: 'Rate', type: 'number' },
      { field: 'amount', label: 'Amount', type: 'number' },
    ],
    expenseDetails: [
      { field: 'date', label: 'Date', type: 'text', icon: 'calendar' },
      { field: 'narration', label: 'Narration', type: 'text' },
      { field: 'amount', label: 'Amount', type: 'number' },
    ],
    jvDetails: [
      { field: 'date', label: 'Date', type: 'text', icon: 'calendar' },
      { field: 'narration', label: 'Narration', type: 'text' },
      { field: 'amount', label: 'Amount', type: 'number' },
    ],
    supplyDetails: [
      { field: 'date', label: 'Date', type: 'text', icon: 'calendar' },
      { field: 'narration', label: 'Narration', type: 'text' },
      { field: 'amount', label: 'Amount', type: 'number' },
    ],
    paymentDetails: [
      { field: 'date', label: 'Date', type: 'text', icon: 'calendar' },
      { field: 'narration', label: 'Narration', type: 'text' },
      { field: 'amount', label: 'Amount', type: 'number' },
      { field: 'type', label: 'Type', type: 'dropdown', options: ['Cash', 'Cheque', 'Online'] },
    ],
    receiptDetails: [
      { field: 'date', label: 'Date', type: 'text', icon: 'calendar' },
      { field: 'narration', label: 'Narration', type: 'text' },
      { field: 'amount', label: 'Amount', type: 'number' },
      { field: 'type', label: 'Type', type: 'dropdown', options: ['Cash', 'Cheque', 'Online'] },
    ],
  };

  const handleSave = () => {
    console.log('Saving full load:', newEntry);
    onClose();
  };

  return (
    <div className="w-full text-sm">
      {/* Section 1: Load Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Load Details</h3>
        <div className="grid grid-cols-5 gap-3">
          {renderInputField('Date', 'date', newEntry.date, { 
            type: 'text', 
            placeholder: 'dd/mm/yyyy',
            readOnly: true,
            tooltip: 'Enter date in dd/mm/yyyy format'
          })}
          {renderInputField('Branch', 'branch', newEntry.branch, { 
            type: 'dropdown', 
            options: ['AHMEDABAD'] 
          })}
          {renderInputField('Truck No', 'truckNo', newEntry.truckNo, { 
            type: 'text',
            placeholder: 'Enter truck number'
          })}
          {renderInputField('Owner', 'owner', newEntry.owner, { 
            type: 'text',
            placeholder: 'Enter owner name'
          })}
          {renderInputField('Driver', 'driver', newEntry.driver, { 
            type: 'text',
            placeholder: 'Enter driver name'
          })}
          {renderInputField('From City', 'fromCity', newEntry.fromCity, { 
            type: 'text',
            placeholder: 'Enter from city'
          })}
          {renderInputField('To City', 'toCity', newEntry.toCity, { 
            type: 'text',
            placeholder: 'Enter to city'
          })}
          {renderInputField('LR No', 'lrNo', newEntry.lrNo, { 
            type: 'text',
            placeholder: 'Enter LR number'
          })}
          {renderInputField('Load Type', 'loadType', newEntry.loadType, { 
            type: 'dropdown',
            options: ['Full Load', 'Part Load']
          })}
          {renderInputField('Weight', 'weight', newEntry.weight, { 
            type: 'number',
            placeholder: 'Enter weight'
          })}
          {renderInputField('Rate', 'rate', newEntry.rate, { 
            type: 'number',
            placeholder: 'Enter rate'
          })}
          {renderInputField('Freight', 'freight', newEntry.freight, { 
            type: 'number',
            placeholder: 'Enter freight amount'
          })}
          {renderInputField('Advance', 'advance', newEntry.advance, { 
            type: 'number',
            placeholder: 'Enter advance amount'
          })}
          {renderInputField('Balance', 'balance', newEntry.balance, { 
            type: 'number',
            placeholder: 'Enter balance amount'
          })}
        </div>
      </div>

      {/* Section 2: For Party */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">For Party</h3>
        <div className="grid grid-cols-5 gap-3">
          {renderInputField('Party A/c', 'partyAC', newEntry.partyAC, { 
            type: 'text',
            placeholder: 'Select party account'
          })}
          {renderInputField('Freight', 'partyFreight', newEntry.partyFreight, { 
            type: 'number',
            placeholder: 'Enter freight'
          })}
          {renderInputField('Balance', 'partyBalance', newEntry.partyBalance, { 
            type: 'number',
            placeholder: 'Enter balance'
          })}
          {renderInputField('Advance', 'partyAdvance', newEntry.partyAdvance, { 
            type: 'number',
            placeholder: 'Enter advance'
          })}
          {renderInputField('Rate', 'partyRate', newEntry.partyRate, { 
            type: 'number',
            placeholder: 'Enter rate'
          })}
          {renderInputField('Weight', 'partyWeight', newEntry.partyWeight, { 
            type: 'number',
            placeholder: 'Enter weight'
          })}
        </div>
      </div>

      {/* Section 3: For Transporter */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">For Transporter</h3>
        <div className="grid grid-cols-5 gap-3">
          {renderInputField('Transporter A/c', 'transporterAC', newEntry.transporterAC, { 
            type: 'text',
            placeholder: 'Select transporter account'
          })}
          {renderInputField('Freight', 'transporterFreight', newEntry.transporterFreight, { 
            type: 'number',
            placeholder: 'Enter freight'
          })}
          {renderInputField('Balance', 'transporterBalance', newEntry.transporterBalance, { 
            type: 'number',
            placeholder: 'Enter balance'
          })}
          {renderInputField('Advance', 'transporterAdvance', newEntry.transporterAdvance, { 
            type: 'number',
            placeholder: 'Enter advance'
          })}
          {renderInputField('Rate', 'transporterRate', newEntry.transporterRate, { 
            type: 'number',
            placeholder: 'Enter rate'
          })}
          {renderInputField('Weight', 'transporterWeight', newEntry.transporterWeight, { 
            type: 'number',
            placeholder: 'Enter weight'
          })}
        </div>
      </div>

      {/* Section 4: Shortage Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Shortage Details</h3>
        <div className="grid grid-cols-5 gap-3">
          {renderInputField('Qty', 'shortageQty', newEntry.shortageQty, { 
            type: 'number',
            placeholder: 'Enter quantity'
          })}
          {renderInputField('Rate', 'shortageRate', newEntry.shortageRate, { 
            type: 'number',
            placeholder: 'Enter rate'
          })}
          {renderInputField('Amount', 'shortageAmount', newEntry.shortageAmount, { 
            type: 'number',
            placeholder: 'Enter amount'
          })}
        </div>
      </div>

      {/* Section 5: Loading Detail */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Loading Detail</h3>
        <div className="grid grid-cols-5 gap-3">
          {renderInputField('Loading Date', 'loadingDate', newEntry.loadingDate, { 
            type: 'text',
            placeholder: 'dd/mm/yyyy'
          })}
          {renderInputField('Loading Time', 'loadingTime', newEntry.loadingTime, { 
            type: 'text',
            placeholder: 'HH:MM'
          })}
          {renderInputField('Loading Qty', 'loadingQty', newEntry.loadingQty, { 
            type: 'number',
            placeholder: 'Enter quantity'
          })}
          {renderInputField('Loading Weight', 'loadingWeight', newEntry.loadingWeight, { 
            type: 'number',
            placeholder: 'Enter weight'
          })}
          {renderInputField('Unloading Date', 'unloadingDate', newEntry.unloadingDate, { 
            type: 'text',
            placeholder: 'dd/mm/yyyy'
          })}
          {renderInputField('Unloading Time', 'unloadingTime', newEntry.unloadingTime, { 
            type: 'text',
            placeholder: 'HH:MM'
          })}
          {renderInputField('Unloading Qty', 'unloadingQty', newEntry.unloadingQty, { 
            type: 'number',
            placeholder: 'Enter quantity'
          })}
          {renderInputField('Unloading Weight', 'unloadingWeight', newEntry.unloadingWeight, { 
            type: 'number',
            placeholder: 'Enter weight'
          })}
        </div>
      </div>

      {/* Section 6: Remark */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Remark</h3>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">
            {renderInputField('Remark', 'remark', newEntry.remark, { 
              type: 'textarea',
              placeholder: 'Enter remark...'
            })}
          </div>
        </div>
      </div>

      {/* Section 7: Details Table */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Details</h3>
        <div className="flex space-x-2 mb-3">
          {Object.keys(sectionFields).map((section) => (
            <button
              key={section}
              onClick={() => setActiveTab(section)}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-md transition-all duration-200 ${
                activeTab === section
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              {section.replace('Details', '').replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={() => addRow(activeTab)}
            className="px-4 py-1.5 bg-blue-600 text-white text-[12px] font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all duration-200 flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>Add Row</span>
          </button>
          <span className="text-[12px] text-gray-600">Total Rows: {newEntry[activeTab].length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12px]">
            <thead className="sticky top-0 bg-gray-50">
              <tr className="border-b border-gray-200 bg-blue-100/50 text-nowrap">
                {sectionFields[activeTab].map((field) => (
                  <th key={field.field} className="p-2 text-left font-medium text-gray-600">{field.label}</th>
                ))}
                <th className="p-2 text-left font-medium text-gray-600">Delete</th>
              </tr>
            </thead>
            <tbody>
              {newEntry[activeTab].map((row, index) => (
                <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-200`}>
                  {sectionFields[activeTab].map((field) => (
                    <td key={field.field} className="p-2">
                      {field.type === 'dropdown' ? (
                        <div className="relative">
                          <select
                            value={row[field.field] || ''}
                            onChange={(e) => handleRowChange(activeTab, index, field.field, e.target.value)}
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
                            onChange={(e) => handleRowChange(activeTab, index, field.field, e.target.value)}
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
                          onChange={(e) => handleRowChange(activeTab, index, field.field, e.target.value)}
                          className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                        />
                      )}
                    </td>
                  ))}
                  <td className="p-2 text-center">
                    <button
                      onClick={() => removeRow(activeTab, index)}
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

      {/* Section 8: Bill Numbers */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Bill Numbers</h3>
        <div className="grid grid-cols-5 gap-3">
          {renderInputField('Booking Id', 'bookingId', newEntry.bookingId, { 
            type: 'text',
            placeholder: 'Enter booking ID'
          })}
          {renderInputField('Sales Bill No', 'salesBillNo', newEntry.salesBillNo, { 
            type: 'text',
            placeholder: 'Enter sales bill number'
          })}
          {renderInputField('Supplementary Bill No', 'supplementaryBillNo', newEntry.supplementaryBillNo, { 
            type: 'text',
            placeholder: 'Enter supplementary bill number'
          })}
          {renderInputField('Trans Bill No', 'transBillNo', newEntry.transBillNo, { 
            type: 'text',
            placeholder: 'Enter trans bill number'
          })}
        </div>
      </div>

     
    </div>
  );
};

export default FullLoadAddWindow;