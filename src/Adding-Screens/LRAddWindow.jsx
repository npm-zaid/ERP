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

  const renderNestedInputField = (category, field, value, config = {}) => {
    const { type = 'text', options = [], placeholder = '' } = config;
    const handleNestedChange = (e) => {
      const newValue = e.target.value;
      setNewEntry((prev) => {
        const updatedEntry = {
          ...prev,
          [category]: {
            ...prev[category],
            [field]: newValue,
          },
        };
        return updateCalculations(updatedEntry);
      });
    };

    switch (type) {
      case 'dropdown':
        return (
          <select
            value={value || ''}
            onChange={handleNestedChange}
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
            value={value || ''}
            onChange={handleNestedChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={placeholder}
            rows={3}
          />
        );
      default:
        return (
          <input
            type={type}
            value={value || ''}
            onChange={handleNestedChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={placeholder}
          />
        );
    }
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
    const { type = 'text', options = [], placeholder = '' } = config;
    switch (type) {
      case 'dropdown':
        return (
          <select
            value={value || ''}
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
            value={value || ''}
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
            value={value || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className="text-sm">
      <div className="grid grid-cols-5 gap-2 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">Date</label>
          {renderInputField('date', newEntry.date, { type: 'text', placeholder: 'dd/mm/yyyy' })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Type</label>
          {renderInputField('type', newEntry.type, { type: 'dropdown', options: ['', 'Type1', 'Type2'] })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Center</label>
          {renderInputField('center', newEntry.center, { type: 'dropdown', options: ['', 'HEAD OFFICE', 'MUMBAI BRANCH', 'DELHI BRANCH'] })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Delivery</label>
          {renderInputField('delivery', newEntry.delivery, { type: 'dropdown', options: ['', 'Godown', 'TBB'] })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">LR No</label>
          {renderInputField('lrNo', newEntry.lrNo)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">From City</label>
          {renderInputField('fromCity', newEntry.fromCity, { type: 'dropdown', options: ['', 'MUMBAI', 'DELHI', 'PUNE', 'BANGALORE'] })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">To City</label>
          {renderInputField('toCity', newEntry.toCity, { type: 'dropdown', options: ['', 'AHMEDABAD', 'KOTA', 'JAIPUR', 'SURAT', 'PUNE'] })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Bill Account</label>
          {renderNestedInputField('billAccount', 'name', newEntry.billAccount?.name, { type: 'dropdown', options: ['', 'A HARILAL & CO. PVT LTD', 'ABC Corp', 'DEF Inc', 'GHI Ltd'] })}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">Consignor</label>
          {renderNestedInputField('consignor', 'name', newEntry.consignor?.name, { type: 'dropdown', options: ['', 'A HARILAL & CO. PVT LTD', 'ABC Corp', 'DEF Inc', 'GHI Ltd'] })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">GSTNO</label>
          {renderNestedInputField('consignor', 'gstno', newEntry.consignor?.gstno)}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Consignor Mobile</label>
          {renderNestedInputField('consignor', 'mobile', newEntry.consignor?.mobile)}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Bill Mobile</label>
          {renderNestedInputField('billAccount', 'mobile', newEntry.billAccount?.mobile)}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">Consignee</label>
          {renderNestedInputField('consignee', 'name', newEntry.consignee?.name, { type: 'dropdown', options: ['', 'A HARILAL & CO. PVT LTD', 'XYZ Ltd', 'PQR Ltd', 'STU Corp'] })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">GSTNO</label>
          {renderNestedInputField('consignee', 'gstno', newEntry.consignee?.gstno)}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Consignee Mobile</label>
          {renderNestedInputField('consignee', 'mobile', newEntry.consignee?.mobile)}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Vehicle No</label>
          {renderInputField('vehicleNo', newEntry.vehicleNo)}
        </div>
      </div>

      <div className="mb-6 overflow-x-auto rounded shadow border border-gray-200 bg-white">
  <table className="min-w-full text-sm text-left border-collapse">
    <thead className="bg-gray-50 text-gray-700 font-semibold">
      <tr>
        <th className="p-3 border-b">Article</th>
        <th className="p-3 border-b">Packaging</th>
        <th className="p-3 border-b">Goods Contained</th>
        <th className="p-3 border-b">Actual Weight</th>
        <th className="p-3 border-b">Weight</th>
        <th className="p-3 border-b">Rate</th>
        <th className="p-3 border-b">FreightOn</th>
        <th className="p-3 border-b">Amount</th>
        <th className="p-3 border-b text-center">Delete</th>
      </tr>
    </thead>
    <tbody>
      {newEntry.items?.map((item, index) => (
        <tr key={index} className="border-b hover:bg-gray-50">
          {['article', 'packaging', 'goodsContained', 'actualWeight', 'weight', 'rate', 'freightOn', 'amount'].map((field) => (
            <td key={field} className="p-2">
              <input
                type={field.includes('Weight') || field === 'rate' || field === 'amount' || field === 'article' ? 'number' : 'text'}
                value={item[field] || ''}
                onChange={(e) => handleItemChange(index, field, e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
            </td>
          ))}
          <td className="p-2 text-center">
            <button
              onClick={() => removeItemRow(index)}
              className="text-red-500 hover:text-red-700 transition"
              title="Delete row"
            >
              <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className="p-4">
    <button
      onClick={addItemRow}
      className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
    >
      + Add Row
    </button>
  </div>
</div>


      <div className="grid grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">Actual Weight</label>
          {renderInputField('actualWeight', newEntry.actualWeight, { type: 'number' })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Value Rs.</label>
          {renderInputField('valueRs', newEntry.valueRs, { type: 'number' })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Previous Freight</label>
          {renderInputField('previousFreight', newEntry.previousFreight, { type: 'number' })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Freight</label>
          <input
            type="number"
            value={newEntry.freight?.toFixed(2) || '0.00'}
            readOnly
            className="w-full h-8 p-2 border border-gray-300 rounded bg-gray-100 font-arial text-sm"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Status</label>
          {renderInputField('status', newEntry.status, { type: 'dropdown', options: ['', 'Pending', 'Delivered', 'Cancelled'] })}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">INV. NO.</label>
          {renderInputField('invNo', newEntry.invNo)}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Crossing</label>
          {renderInputField('crossing', newEntry.crossing, { type: 'number' })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Docket Charge</label>
          {renderInputField('docketCharge', newEntry.docketCharge, { type: 'number' })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Hamali</label>
          {renderInputField('hamali', newEntry.hamali, { type: 'number' })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Detention</label>
          {renderInputField('detention', newEntry.detention, { type: 'number' })}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">Delivery At</label>
          {renderInputField('deliveryAt', newEntry.deliveryAt)}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Door Collection</label>
          {renderInputField('doorCollection', newEntry.doorCollection, { type: 'number' })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Door Delivery</label>
          {renderInputField('doorDelivery', newEntry.doorDelivery, { type: 'number' })}
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 mb-1">Narration</label>
          {renderInputField('narration', newEntry.narration, { type: 'textarea' })}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">Booking Id</label>
          {renderInputField('bookingId', newEntry.bookingId)}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Memo No</label>
          {renderInputField('memoNo', newEntry.memoNo)}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Delivery No</label>
          {renderInputField('deliveryNo', newEntry.deliveryNo)}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Bill No</label>
          {renderInputField('billNo', newEntry.billNo)}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-4">
        <div></div>
        <div className="text-right">
          <label className="block text-gray-700 mb-1">SUB TOTAL</label>
        </div>
        <div>
          <input
            type="number"
            value={newEntry.subTotal?.toFixed(2) || '0.00'}
            readOnly
            className="w-full h-8 p-2 border border-gray-300 rounded bg-gray-100 font-arial text-sm"
          />
        </div>
        <div className="text-right">
          <label className="block text-gray-700 mb-1">GST BY</label>
        </div>
        <div>
          {renderInputField('gstBy', newEntry.gstBy, { type: 'dropdown', options: ['', 'N/A', 'RCM', 'Forward'] })}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-4">
        <div></div>
        <div className="text-right">
          <label className="block text-gray-700 mb-1">GST AMT</label>
        </div>
        <div>
          <input
            type="number"
            value={newEntry.gstAmt?.toFixed(2) || '0.00'}
            readOnly
            className="w-full h-8 p-2 border border-gray-300 rounded bg-gray-100 font-arial text-sm"
          />
        </div>
        <div className="text-right">
          <label className="block text-gray-700 mb-1">GST Rate</label>
        </div>
        <div>
          {renderInputField('gstRate', newEntry.gstRate, { type: 'number', placeholder: 'Enter GST Rate' })}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-4">
        <div></div>
        <div className="text-right">
          <label className="block text-gray-700 mb-1">TOTAL FREIGHT</label>
        </div>
        <div>
          <input
            type="number"
            value={newEntry.totalFreight?.toFixed(2) || '0.00'}
            readOnly
            className="w-full h-8 p-2 border border-gray-300 rounded bg-gray-100 font-arial text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default LRAddWindow;