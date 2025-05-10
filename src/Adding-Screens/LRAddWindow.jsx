import React from 'react';

const LRAddWindow = ({ newEntry, setNewEntry }) => {
  const updateCalculations = (updatedEntry) => {
    const items = updatedEntry.items || [];
    const totalArticle = items.reduce((sum, item) => sum + (parseInt(item.article) || 0), 0);
    const totalWeight = items.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);
    const freight = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    const subTotal =
      (parseFloat(updatedEntry.previousFreight) || 0) +
      freight +
      (parseFloat(updatedEntry.crossing) || 0) +
      (parseFloat(updatedEntry.docketCharge) || 0) +
      (parseFloat(updatedEntry.hamali) || 0) +
      (parseFloat(updatedEntry.detention) || 0) +
      (parseFloat(updatedEntry.doorCollection) || 0) +
      (parseFloat(updatedEntry.doorDelivery) || 0);
    const gstRate = parseFloat(updatedEntry.gstRate) || 0;
    const gstAmt = (subTotal * gstRate) / 100;
    const totalFreight = subTotal + gstAmt;
    return {
      ...updatedEntry,
      totalArticle,
      totalWeight,
      freight,
      subTotal,
      gstAmt,
      totalFreight,
    };
  };

  const handleInputChange = (field, value) => {
    setNewEntry((prev) => {
      const updatedEntry = { ...prev, [field]: value };
      return updateCalculations(updatedEntry);
    });
  };

  const handleItemChange = (index, field, value) => {
    setNewEntry((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      const updatedEntry = { ...prev, items: updatedItems };
      return updateCalculations(updatedEntry);
    });
  };

  const handleNestedChange = (category, field, value) => {
    setNewEntry((prev) => {
      const updatedEntry = {
        ...prev,
        [category]: {
          ...prev[category],
          [field]: value,
        },
      };
      return updateCalculations(updatedEntry);
    });
  };

  const addItemRow = () => {
    setNewEntry((prev) => {
      const updatedEntry = {
        ...prev,
        items: [
          ...prev.items,
          { article: 0, packaging: '', goodsContained: '', actualWeight: 0, weight: 0, rate: 0, freightOn: '', amount: 0 },
        ],
      };
      return updateCalculations(updatedEntry);
    });
  };

  const removeItemRow = (index) => {
    setNewEntry((prev) => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      const updatedEntry = { ...prev, items: updatedItems };
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

  const renderNestedInputField = (category, field, value, config = {}) => {
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
              onChange={(e) => handleNestedChange(category, field, e.target.value)}
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
            onChange={(e) => handleNestedChange(category, field, e.target.value)}
            className={`${inputClasses} h-16 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed`}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        ) : (
          <div className="relative">
            <input
              type={type}
              value={value || ''}
              onChange={(e) => handleNestedChange(category, field, e.target.value)}
              className={`${inputClasses} disabled:bg-gray-100 disabled:cursor-not-allowed`}
              placeholder={placeholder}
              readOnly={readOnly}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="text-sm ">
   
      {/* LR Details Section */}
      <div className="mb-2 bg-gray-200/60 p-2 rounded-lg ">
     
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('date', newEntry.date, { 
              type: 'text', 
              placeholder: 'dd/mm/yyyy',
              tooltip: 'Enter date in dd/mm/yyyy format'
            })}
          </div>
          <div>
            {renderInputField('type', newEntry.type, { 
              type: 'dropdown', 
              options: ['', 'Type1', 'Type2'] 
            })}
          </div>
          <div>
            {renderInputField('center', newEntry.center, { 
              type: 'dropdown', 
              options: ['', 'HEAD OFFICE', 'MUMBAI BRANCH', 'DELHI BRANCH'] 
            })}
          </div>
          <div>
            {renderInputField('delivery', newEntry.delivery, { 
              type: 'dropdown', 
              options: ['', 'Godown', 'TBB'] 
            })}
          </div>
          <div>
            {renderInputField('lrNo', newEntry.lrNo, { 
              tooltip: 'Enter LR number (e.g., LRXXXX)'
            })}
          </div>
        </div>
      </div>

      {/* Route Information Section */}
      <div className="mb-2 bg-gray-200/60 p-2 rounded-lg ">
    
        <div className="grid grid-cols-3 gap-3">
          <div>
            {renderInputField('fromCity', newEntry.fromCity, { 
              type: 'dropdown', 
              options: ['', 'MUMBAI', 'DELHI', 'PUNE', 'BANGALORE'] 
            })}
          </div>
          <div>
            {renderInputField('toCity', newEntry.toCity, { 
              type: 'dropdown', 
              options: ['', 'AHMEDABAD', 'KOTA', 'JAIPUR', 'SURAT', 'PUNE'] 
            })}
          </div>
          <div>
            {renderNestedInputField('billAccount', 'name', newEntry.billAccount?.name, { 
              type: 'dropdown', 
              options: ['', 'A HARILAL & CO. PVT LTD', 'ABC Corp', 'DEF Inc', 'GHI Ltd'] 
            })}
          </div>
        </div>
      </div>

      {/* Consignor Information Section */}
      <div className="mb-2 bg-gray-200/80 p-2 rounded-lg">
    
        <div className="grid grid-cols-4 gap-3">
          <div>
            {renderNestedInputField('consignor', 'name', newEntry.consignor?.name, { 
              type: 'dropdown', 
              options: ['', 'A HARILAL & CO. PVT LTD', 'ABC Corp', 'DEF Inc', 'GHI Ltd'] 
            })}
          </div>
          <div>
            {renderNestedInputField('consignor', 'gstno', newEntry.consignor?.gstno)}
          </div>
          <div>
            {renderNestedInputField('consignor', 'mobile', newEntry.consignor?.mobile)}
          </div>
          <div>
            {renderNestedInputField('billAccount', 'mobile', newEntry.billAccount?.mobile)}
          </div>
        </div>
      </div>

      {/* Consignee Information Section */}
      <div className="mb-2 bg-gray-200/80 p-2 rounded-lg">

        <div className="grid grid-cols-4 gap-3">
          <div>
            {renderNestedInputField('consignee', 'name', newEntry.consignee?.name, { 
              type: 'dropdown', 
              options: ['', 'A HARILAL & CO. PVT LTD', 'XYZ Ltd', 'PQR Ltd', 'STU Corp'] 
            })}
          </div>
          <div>
            {renderNestedInputField('consignee', 'gstno', newEntry.consignee?.gstno)}
          </div>
          <div>
            {renderNestedInputField('consignee', 'mobile', newEntry.consignee?.mobile)}
          </div>
          <div>
            {renderInputField('vehicleNo', newEntry.vehicleNo)}
          </div>
        </div>
      </div>

      {/* Items Table Section */}
      <div className="mb-2 bg-gray-200/80 p-2 rounded-lg">
     
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12px]">
            <thead className="sticky top-0 bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="p-2 text-left font-medium text-gray-600">Article</th>
                <th className="p-2 text-left font-medium text-gray-600">Packaging</th>
                <th className="p-2 text-left font-medium text-gray-600">Goods Contained</th>
                <th className="p-2 text-left font-medium text-gray-600">Actual Weight</th>
                <th className="p-2 text-left font-medium text-gray-600">Weight</th>
                <th className="p-2 text-left font-medium text-gray-600">Rate</th>
                <th className="p-2 text-left font-medium text-gray-600">Freight On</th>
                <th className="p-2 text-left font-medium text-gray-600">Amount</th>
                <th className="p-2 text-left font-medium text-gray-600">Delete</th>
              </tr>
            </thead>
            <tbody>
              {newEntry.items?.map((item, index) => (
                <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-200`}>
                  {['article', 'packaging', 'goodsContained', 'actualWeight', 'weight', 'rate', 'freightOn', 'amount'].map((field) => (
                    <td key={field} className="p-2">
                      <input
                        type={field.includes('Weight') || field === 'rate' || field === 'amount' || field === 'article' ? 'number' : 'text'}
                        value={item[field] || ''}
                        onChange={(e) => handleItemChange(index, field, e.target.value)}
                        className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                      />
                    </td>
                  ))}
                  <td className="p-2 text-center">
                    <button
                      onClick={() => removeItemRow(index)}
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
        <div className="mt-3">
          <button
            onClick={addItemRow}
            className="px-4 py-1.5 bg-blue-600 text-white text-[12px] font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all duration-200 flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>Add Row</span>
          </button>
        </div>
      </div>

      {/* Freight Details Section */}
      <div className="mb-2 bg-gray-200/80 p-2 rounded-lg">
    
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('actualWeight', newEntry.actualWeight, { type: 'number' })}
          </div>
          <div>
            {renderInputField('valueRs', newEntry.valueRs, { type: 'number' })}
          </div>
          <div>
            {renderInputField('previousFreight', newEntry.previousFreight, { type: 'number' })}
          </div>
          <div>
            {renderInputField('freight', newEntry.freight?.toFixed(2) || '0.00', { type: 'number', readOnly: true })}
          </div>
          <div>
            {renderInputField('status', newEntry.status, { 
              type: 'dropdown', 
              options: ['', 'Pending', 'Delivered', 'Cancelled'] 
            })}
          </div>
        </div>
      </div>

      {/* Additional Charges Section */}
      <div className="mb-2 bg-gray-200/80 p-2 rounded-lg">
 
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('invNo', newEntry.invNo)}
          </div>
          <div>
            {renderInputField('crossing', newEntry.crossing, { type: 'number' })}
          </div>
          <div>
            {renderInputField('docketCharge', newEntry.docketCharge, { type: 'number' })}
          </div>
          <div>
            {renderInputField('hamali', newEntry.hamali, { type: 'number' })}
          </div>
          <div>
            {renderInputField('detention', newEntry.detention, { type: 'number' })}
          </div>
        </div>
      </div>

      {/* Delivery Information Section */}
      <div className="mb-2 bg-gray-200/80 p-2 rounded-lg">

        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('deliveryAt', newEntry.deliveryAt)}
          </div>
          <div>
            {renderInputField('doorCollection', newEntry.doorCollection, { type: 'number' })}
          </div>
          <div>
            {renderInputField('doorDelivery', newEntry.doorDelivery, { type: 'number' })}
          </div>
          <div className="col-span-2">
            {renderInputField('narration', newEntry.narration, { type: 'textarea' })}
          </div>
        </div>
      </div>

      {/* Reference Numbers Section */}
      <div className="mb-2 bg-gray-200/80 p-2 rounded-lg">
   
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('bookingId', newEntry.bookingId)}
          </div>
          <div>
            {renderInputField('memoNo', newEntry.memoNo)}
          </div>
          <div>
            {renderInputField('deliveryNo', newEntry.deliveryNo)}
          </div>
          <div>
            {renderInputField('billNo', newEntry.billNo)}
          </div>
          <div></div>
        </div>
      </div>

      {/* Freight Breakdown Section */}
      <div className="mb-2 bg-gray-200/80 p-2 rounded-lg">

        <div className="grid grid-cols-4 gap-3 mb-3">
          <div></div>
          <div></div>
          <div>
            {renderInputField('subTotal', newEntry.subTotal?.toFixed(2) || '0.00', { type: 'number', readOnly: true })}
          </div>
          <div>
            {renderInputField('gstBy', newEntry.gstBy, { 
              type: 'dropdown', 
              options: ['', 'N/A', 'RCM', 'Forward'] 
            })}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-3">
          <div></div>
          <div></div>
          <div>
            {renderInputField('gstAmt', newEntry.gstAmt?.toFixed(2) || '0.00', { type: 'number', readOnly: true })}
          </div>
        
          <div>
            {renderInputField('gstRate', newEntry.gstRate, { type: 'number', placeholder: 'Enter GST Rate' })}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div></div>
         
          <div>
            {renderInputField('totalFreight', newEntry.totalFreight?.toFixed(2) || '0.00', { type: 'number', readOnly: true })}
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LRAddWindow;