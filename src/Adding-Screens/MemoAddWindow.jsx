import React, { useState } from 'react';
import LRSelectionPopup from './LRSelectionPopup';

const MemoAddWindow = ({ newEntry, setNewEntry, handleModalSubmit, modal, isEditMode }) => {
  const [showLrModal, setShowLrModal] = useState(false);
  const [selectedLrs, setSelectedLrs] = useState([]);

  const updateCalculations = (updatedEntry) => {
    const lrRows = updatedEntry.lrRows || [];
    const totalArticle = lrRows.reduce((sum, row) => sum + (parseInt(row.article) || 0), 0);
    const totalAcWeight = lrRows.reduce((sum, row) => sum + (parseFloat(row.acWeight) || 0), 0);
    const totalWeight = lrRows.reduce((sum, row) => sum + (parseFloat(row.weight) || 0), 0);
    const totalFreight = lrRows.reduce((sum, row) => sum + (parseFloat(row.freight) || 0), 0);
    
    return {
      ...updatedEntry,
      totalArticle,
      totalAcWeight,
      totalWeight,
      totalFreight,
      toPay: lrRows.reduce((sum, row) => row.freightBy === 'To Pay' ? sum + (parseFloat(row.freight) || 0) : sum, 0),
      paid: lrRows.reduce((sum, row) => row.freightBy === 'Paid' ? sum + (parseFloat(row.freight) || 0) : sum, 0),
      memoFreight: totalFreight,
    };
  };

  const handleInputChange = (field, value) => {
    setNewEntry((prev) => {
      const updatedEntry = { ...prev, [field]: value };
      return updateCalculations(updatedEntry);
    });
  };

  const handleLrRowChange = (index, field, value) => {
    setNewEntry((prev) => {
      const updatedLrRows = [...prev.lrRows];
      updatedLrRows[index] = { ...updatedLrRows[index], [field]: value };
      const updatedEntry = { ...prev, lrRows: updatedLrRows };
      return updateCalculations(updatedEntry);
    });
  };

  const addLrRow = () => {
    setNewEntry((prev) => {
      const updatedEntry = {
        ...prev,
        lrRows: [
          ...prev.lrRows,
          {
            centerName: '',
            lrNo: '',
            date: '',
            packaging: '',
            description: '',
            article: 0,
            freightBy: '',
            fromCity: '',
            toCity: '',
            consignee: '',
            acWeight: 0,
            weight: 0,
            freight: 0,
          },
        ],
      };
      return updateCalculations(updatedEntry);
    });
  };

  const removeLrRow = (index) => {
    setNewEntry((prev) => {
      const updatedLrRows = prev.lrRows.filter((_, i) => i !== index);
      const updatedEntry = { ...prev, lrRows: updatedLrRows };
      return updateCalculations(updatedEntry);
    });
  };

  const handleLrSelect = (lr) => {
    setSelectedLrs((prev) =>
      prev.some((item) => item.lrNo === lr.lrNo)
        ? prev.filter((item) => item.lrNo !== lr.lrNo)
        : [...prev, lr]
    );
  };

  const addSelectedLrs = () => {
    setNewEntry((prev) => {
      const newLrRows = selectedLrs.map((lr) => ({
        centerName: lr.centerName,
        lrNo: lr.lrNo,
        date: lr.date,
        packaging: lr.packaging,
        description: lr.description,
        article: lr.article,
        freightBy: lr.freightBy,
        fromCity: lr.fromCity,
        toCity: lr.toCity,
        consignee: lr.consignee,
        acWeight: lr.actualWeight,
        weight: lr.weight,
        freight: lr.freight,
      }));
      const updatedEntry = {
        ...prev,
        lrRows: [...prev.lrRows, ...newLrRows],
      };
      return updateCalculations(updatedEntry);
    });
    setSelectedLrs([]);
    setShowLrModal(false);
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
    handleModalSubmit();
  };

  return (
    <div className="text-sm">
      {/* Header Section */}
      <div className="flex justify-between items-center my-4">
        <button
          onClick={() => setShowLrModal(true)}
          className="px-4 py-1.5 bg-blue-600 text-white text-[12px] font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all duration-200 flex items-center space-x-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <span>Auto Add LR</span>
        </button>
      </div>

      {/* Memo Details Section */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('date', newEntry.date, { 
              type: 'text', 
              placeholder: 'dd/mm/yyyy',
              tooltip: 'Enter date in dd/mm/yyyy format'
            })}
          </div>
          <div>
            {renderInputField('driver', newEntry.driver, { 
              type: 'dropdown', 
              options: ['', 'MAHESHBHAI', 'RAJESH', 'SANJAY'] 
            })}
          </div>
          <div>
            {renderInputField('agent', newEntry.agent, { 
              type: 'dropdown', 
              options: ['', 'AJAY TRANSPORT', 'SHREE LOGISTICS', 'KUMAR TRANSPORT'] 
            })}
          </div>
          <div>
            {renderInputField('branch', newEntry.branch, { 
              type: 'dropdown', 
              options: ['', '7', '8', '9'] 
            })}
          </div>
          <div>
            {renderInputField('memoNo', newEntry.memoNo, { 
              tooltip: 'Enter memo number (e.g., MEMOXXX)'
            })}
          </div>
        </div>
      </div>

      {/* Route Information Section */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('fromCity', newEntry.fromCity, { 
              type: 'dropdown', 
              options: ['', 'KOTA', 'RAJKOT', 'AHMEDABAD'] 
            })}
          </div>
          <div>
            {renderInputField('toCity', newEntry.toCity, { 
              type: 'dropdown', 
              options: ['', 'K. Miter', 'SURAT', 'PUNE'] 
            })}
          </div>
          <div>
            {renderInputField('vehicleNo', newEntry.vehicleNo)}
          </div>
          <div>
            {renderInputField('paymentType', newEntry.paymentType, { 
              type: 'dropdown', 
              options: ['', 'Cash/Bank', 'Credit'] 
            })}
          </div>
          <div>
            {renderInputField('advanced', newEntry.advanced, { type: 'number' })}
          </div>
        </div>
      </div>

      {/* LR Rows Section */}
      <div className="bg-gray-200/60 p-2 rounded-lg my-8">
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={addLrRow}
            className="px-4 py-1.5 bg-blue-600 text-white text-[12px] font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all duration-200 flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>Add LR</span>
          </button>
          <span className="text-[12px] text-gray-600">Total LR: {newEntry.lrRows.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12px]">
            <thead className="sticky top-0 bg-gray-50">
              <tr className="border-b border-gray-200 bg-blue-100/50 text-nowrap">
                <th className="p-2 text-left font-medium text-gray-600">Center Name</th>
                <th className="p-2 text-left font-medium text-gray-600">LR No</th>
                <th className="p-2 text-left font-medium text-gray-600">Date</th>
                <th className="p-2 text-left font-medium text-gray-600">Packaging</th>
                <th className="p-2 text-left font-medium text-gray-600">Description</th>
                <th className="p-2 text-left font-medium text-gray-600">Article</th>
                <th className="p-2 text-left font-medium text-gray-600">Freight By</th>
                <th className="p-2 text-left font-medium text-gray-600">From City</th>
                <th className="p-2 text-left font-medium text-gray-600">To City</th>
                <th className="p-2 text-left font-medium text-gray-600">Consignee</th>
                <th className="p-2 text-left font-medium text-gray-600">Ac. Weight</th>
                <th className="p-2 text-left font-medium text-gray-600">Weight</th>
                <th className="p-2 text-left font-medium text-gray-600">Freight</th>
                <th className="p-2 text-left font-medium text-gray-600">Delete</th>
              </tr>
            </thead>
            <tbody>
              {newEntry.lrRows.map((row, index) => (
                <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-200`}>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.centerName || ''}
                      onChange={(e) => handleLrRowChange(index, 'centerName', e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.lrNo || ''}
                      onChange={(e) => handleLrRowChange(index, 'lrNo', e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
                  </td>
                  <td className="p-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={row.date || ''}
                        onChange={(e) => handleLrRowChange(index, 'date', e.target.value)}
                        className="w-full px-2 py-1 pl-8 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                        placeholder="dd/mm/yyyy"
                      />
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                      </span>
                    </div>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.packaging || ''}
                      onChange={(e) => handleLrRowChange(index, 'packaging', e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.description || ''}
                      onChange={(e) => handleLrRowChange(index, 'description', e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={row.article || 0}
                      onChange={(e) => handleLrRowChange(index, 'article', e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
                  </td>
                  <td className="p-2">
                    <div className="relative">
                      <select
                        value={row.freightBy || ''}
                        onChange={(e) => handleLrRowChange(index, 'freightBy', e.target.value)}
                        className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="To Pay">To Pay</option>
                        <option value="Paid">Paid</option>
                        <option value="Consignee">Consignee</option>
                        <option value="Consignor">Consignor</option>
                        <option value="T.B.B.">T.B.B.</option>
                      </select>
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </span>
                    </div>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.fromCity || ''}
                      onChange={(e) => handleLrRowChange(index, 'fromCity', e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.toCity || ''}
                      onChange={(e) => handleLrRowChange(index, 'toCity', e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.consignee || ''}
                      onChange={(e) => handleLrRowChange(index, 'consignee', e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={row.acWeight || 0}
                      onChange={(e) => handleLrRowChange(index, 'acWeight', e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={row.weight || 0}
                      onChange={(e) => handleLrRowChange(index, 'weight', e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={row.freight || 0}
                      onChange={(e) => handleLrRowChange(index, 'freight', e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => removeLrRow(index)}
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

      {/* Summary Section */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <div className="grid grid-cols-4 gap-3">
          <div>
            {renderInputField('city', newEntry.city)}
          </div>
          <div>
            {renderInputField('totalWeight', newEntry.totalWeight.toFixed(2), { type: 'number', readOnly: true })}
          </div>
          <div>
            {renderInputField('totalArticle', newEntry.totalArticle, { type: 'number', readOnly: true })}
          </div>
          <div>
            {renderInputField('totalFreight', newEntry.totalFreight.toFixed(2), { type: 'number', readOnly: true })}
          </div>
        </div>
      </div>

      {/* Totals Section */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <div className="grid grid-cols-4 gap-3">
          <div></div>
          <div>
            {renderInputField('totalArticle', newEntry.totalArticle, { type: 'number', readOnly: true })}
          </div>
          <div>
            {renderInputField('totalAcWeight', newEntry.totalAcWeight.toFixed(2), { type: 'number', readOnly: true })}
          </div>
          <div>
            {renderInputField('totalWeight', newEntry.totalWeight.toFixed(2), { type: 'number', readOnly: true })}
          </div>
        </div>
      </div>

      {/* Freight Breakdown Section */}
      <div className="mb-4 bg-gray-200/60 p-2 rounded-lg">
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div></div>
          <div>
            {renderInputField('toPay', newEntry.toPay.toFixed(2), { type: 'number', readOnly: true })}
          </div>
          <div>
            {renderInputField('paid', newEntry.paid.toFixed(2), { type: 'number', readOnly: true })}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div></div>
          <div>
            {renderInputField('consigneeFreight', newEntry.lrRows.reduce((sum, row) => row.freightBy === 'Consignee' ? sum + (parseFloat(row.freight) || 0) : sum, 0).toFixed(2), { type: 'number', readOnly: true })}
          </div>
          <div>
            {renderInputField('consignorFreight', newEntry.lrRows.reduce((sum, row) => row.freightBy === 'Consignor' ? sum + (parseFloat(row.freight) || 0) : sum, 0).toFixed(2), { type: 'number', readOnly: true })}
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <div className="grid grid-cols-3 gap-3">
          <div></div>
          <div></div>
          <div>
            {renderInputField('memoFreight', newEntry.memoFreight.toFixed(2), { type: 'number', readOnly: true })}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div></div>
          <div></div>
          <div className="">
            {renderInputField('narration', newEntry.narration, { type: 'textarea' })}
          </div>
        </div>
      </div>

      {/* LR Selection Popup */}
      <LRSelectionPopup
        isOpen={showLrModal}
        onClose={() => {
          setShowLrModal(false);
          setSelectedLrs([]);
        }}
        onSelect={handleLrSelect}
        multiple={true}
        onConfirm={addSelectedLrs}
        selectedLrs={selectedLrs}
      />
    </div>
  );
};

export default MemoAddWindow;