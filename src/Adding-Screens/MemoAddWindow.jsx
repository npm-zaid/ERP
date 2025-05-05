import React, { useState } from 'react';

const MemoAddWindow = ({ newEntry, setNewEntry, handleModalSubmit, modal, isEditMode }) => {
  const [showLrModal, setShowLrModal] = useState(false);
  const [selectedLrs, setSelectedLrs] = useState([]);

  const availableLrs = [
    {
      centerName: "RAJ",
      lrNo: "17236",
      date: "02/05/2025",
      packaging: "BAG",
      description: "",
      article: 2,
      freightBy: "To Pay",
      fromCity: "RAJKOT",
      toCity: "AHMEDABAD",
      consignor: "SHREE LOGISTICS",
      consignorGstno: "GSTIN1234567890",
      consignee: "K. Miter",
      consigneeGstno: "GSTIN0987654321",
      actualWeight: 200,
      weight: 200,
      freight: 4000,
      subTotal: 4000
    },
    {
      centerName: "RAJ",
      lrNo: "17237",
      date: "03/05/2025",
      packaging: "BOX",
      description: "Electronics",
      article: 1,
      freightBy: "Paid",
      fromCity: "SURAT",
      toCity: "PUNE",
      consignor: "AJAY TRANSPORT",
      consignorGstno: "GSTIN4567891230",
      consignee: "RAMESH & CO",
      consigneeGstno: "GSTIN7891234560",
      actualWeight: 150,
      weight: 150,
      freight: 3000,
      subTotal: 3000
    },
    {
      centerName: "KOTA",
      lrNo: "17238",
      date: "04/05/2025",
      packaging: "CARTON",
      description: "Clothing",
      article: 3,
      freightBy: "Consignee",
      fromCity: "KOTA",
      toCity: "MUMBAI",
      consignor: "KUMAR TRANSPORT",
      consignorGstno: "GSTIN3216549870",
      consignee: "FASHION HUB",
      consigneeGstno: "GSTIN6549873210",
      actualWeight: 300,
      weight: 300,
      freight: 6000,
      subTotal: 6000
    }
  ];

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

  const handleLrSelection = (lr) => {
    setSelectedLrs((prev) =>
      prev.includes(lr)
        ? prev.filter((item) => item !== lr)
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
        lrRows: [...prev.lrRows, ...newLrRows]
      };
      return updateCalculations(updatedEntry);
    });
    setSelectedLrs([]);
    setShowLrModal(false);
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

  const onSubmit = () => {
    const requiredFields = ['date', 'driver', 'agent'];
    const errors = requiredFields.filter((field) => !newEntry[field]);

    if (errors.length > 0) {
      alert(`Please fill required fields: ${errors.join(', ')}`);
      return;
    }

    if (newEntry.lrRows.length === 0) {
      alert('Please add at least one LR row.');
      return;
    }

    console.log('Submitting memo entry:', {
      id: newEntry.id,
      date: newEntry.date,
      driver: newEntry.driver,
      agent: newEntry.agent,
      center: newEntry.center,
      lrRows: newEntry.lrRows,
      totalArticle: newEntry.totalArticle,
      totalAcWeight: newEntry.totalAcWeight,
      totalWeight: newEntry.totalWeight,
      totalFreight: newEntry.totalFreight,
    });
    handleModalSubmit();
  };

  const handleSaveAndClose = () => {
    onSubmit();
    modal.setModal({ isOpen: false, type: '', data: null });
  };

  return (
    <div className="font-arial text-sm">
      <div className="grid grid-cols-5 gap-2 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">Date</label>
          {renderInputField('date', newEntry.date, { type: 'text', placeholder: 'dd/mm/yyyy' })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Driver</label>
          {renderInputField('driver', newEntry.driver, { type: 'dropdown', options: ['', 'MAHESHBHAI', 'RAJESH', 'SANJAY'] })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Agent</label>
          {renderInputField('agent', newEntry.agent, { type: 'dropdown', options: ['', 'AJAY TRANSPORT', 'SHREE LOGISTICS', 'KUMAR TRANSPORT'] })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Branch</label>
          {renderInputField('branch', newEntry.branch, { type: 'dropdown', options: ['', '7', '8', '9'] })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Memo No</label>
          {renderInputField('memoNo', newEntry.memoNo)}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">From City</label>
          {renderInputField('fromCity', newEntry.fromCity, { type: 'dropdown', options: ['', 'KOTA', 'RAJKOT', 'AHMEDABAD'] })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">To City</label>
          {renderInputField('toCity', newEntry.toCity, { type: 'dropdown', options: ['', 'K. Miter', 'SURAT', 'PUNE'] })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Vehicle No</label>
          {renderInputField('vehicleNo', newEntry.vehicleNo)}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Payment Type</label>
          {renderInputField('paymentType', newEntry.paymentType, { type: 'dropdown', options: ['', 'Cash/Bank', 'Credit'] })}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Advanced</label>
          {renderInputField('advanced', newEntry.advanced, { type: 'number' })}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={addLrRow}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add LR
            </button>
            <button
              onClick={() => setShowLrModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Auto Add LR
            </button>
          </div>
          <span>Balance: {newEntry.balance || '0'}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Delete</th>
                <th className="border border-gray-300 p-2">Center Name</th>
                <th className="border border-gray-300 p-2">LR No</th>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Packaging</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Article</th>
                <th className="border border-gray-300 p-2">Freight By</th>
                <th className="border border-gray-300 p-2">From City</th>
                <th className="border border-gray-300 p-2">To City</th>
                <th className="border border-gray-300 p-2">Consignee</th>
                <th className="border border-gray-300 p-2">Ac. Weight</th>
                <th className="border border-gray-300 p-2">Weight</th>
                <th className="border border-gray-300 p-2">Freight</th>
              </tr>
            </thead>
            <tbody>
              {newEntry.lrRows.map((row, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => removeLrRow(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={row.centerName}
                      onChange={(e) => handleLrRowChange(index, 'centerName', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={row.lrNo}
                      onChange={(e) => handleLrRowChange(index, 'lrNo', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={row.date}
                      onChange={(e) => handleLrRowChange(index, 'date', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                      placeholder="dd/mm/yyyy"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={row.packaging}
                      onChange={(e) => handleLrRowChange(index, 'packaging', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) => handleLrRowChange(index, 'description', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={row.article}
                      onChange={(e) => handleLrRowChange(index, 'article', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select
                      value={row.freightBy}
                      onChange={(e) => handleLrRowChange(index, 'freightBy', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    >
                      <option value="">Select</option>
                      <option value="To Pay">To Pay</option>
                      <option value="Paid">Paid</option>
                      <option value="Consignee">Consignee</option>
                      <option value="Consignor">Consignor</option>
                      <option value="T.B.B.">T.B.B.</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={row.fromCity}
                      onChange={(e) => handleLrRowChange(index, 'fromCity', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={row.toCity}
                      onChange={(e) => handleLrRowChange(index, 'toCity', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={row.consignee}
                      onChange={(e) => handleLrRowChange(index, 'consignee', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={row.acWeight}
                      onChange={(e) => handleLrRowChange(index, 'acWeight', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={row.weight}
                      onChange={(e) => handleLrRowChange(index, 'weight', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={row.freight}
                      onChange={(e) => handleLrRowChange(index, 'freight', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-2">
          <span>Total LR: {newEntry.lrRows.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">City</label>
          {renderInputField('city', newEntry.city)}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Weight</label>
          <input
            type="number"
            value={newEntry.totalWeight.toFixed(2)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Article</label>
          <input
            type="number"
            value={newEntry.totalArticle}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Freight</label>
          <input
            type="number"
            value={newEntry.totalFreight.toFixed(2)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        <div></div>
        <div>
          <label className="block text-gray-700 mb-1">Total Article</label>
          <input
            type="number"
            value={newEntry.totalArticle}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Total Ac. Weight</label>
          <input
            type="number"
            value={newEntry.totalAcWeight.toFixed(2)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Total Weight</label>
          <input
            type="number"
            value={newEntry.totalWeight.toFixed(2)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        <div></div>
        <div className="text-right">
          <label className="block text-gray-700 mb-1">Freight By</label>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">To Pay:</label>
          <input
            type="number"
            value={newEntry.lrRows.reduce((sum, row) => row.freightBy === 'To Pay' ? sum + (parseFloat(row.freight) || 0) : sum, 0).toFixed(2)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Paid:</label>
          <input
            type="number"
            value={newEntry.lrRows.reduce((sum, row) => row.freightBy === 'Paid' ? sum + (parseFloat(row.freight) || 0) : sum, 0).toFixed(2)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Narration</label>
          {renderInputField('narration', newEntry.narration, { type: 'textarea' })}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        <div></div>
        <div></div>
        <div>
          <label className="block text-gray-700 mb-1">Consignee:</label>
          <input
            type="number"
            value={newEntry.lrRows.reduce((sum, row) => row.freightBy === 'Consignee' ? sum + (parseFloat(row.freight) || 0) : sum, 0).toFixed(2)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Consignor:</label>
          <input
            type="number"
            value={newEntry.lrRows.reduce((sum, row) => row.freightBy === 'Consignor' ? sum + (parseFloat(row.freight) || 0) : sum, 0).toFixed(2)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Memo Freight:</label>
          <input
            type="number"
            value={newEntry.totalFreight.toFixed(2)}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
      </div>

      {showLrModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Select LRs</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Select</th>
                  <th className="border border-gray-300 p-2">Center Name</th>
                  <th className="border border-gray-300 p-2">LR No</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Packaging</th>
                  <th className="border border-gray-300 p-2">Description</th>
                  <th className="border border-gray-300 p-2">Article</th>
                  <th className="border border-gray-300 p-2">Freight By</th>
                  <th className="border border-gray-300 p-2">From City</th>
                  <th className="border border-gray-300 p-2">To City</th>
                  <th className="border border-gray-300 p-2">Consignor</th>
                  <th className="border border-gray-300 p-2">GSTNO</th>
                  <th className="border border-gray-300 p-2">Consignee</th>
                  <th className="border border-gray-300 p-2">GSTNO</th>
                  <th className="border border-gray-300 p-2">Actual Weight</th>
                  <th className="border border-gray-300 p-2">Weight</th>
                  <th className="border border-gray-300 p-2">Freight</th>
                  <th className="border border-gray-300 p-2">SubTotal</th>
                </tr>
              </thead>
              <tbody>
                {availableLrs.map((lr, index) => (
                  <tr key={index} className="border border-gray-300">
                    <td className="border border-gray-300 p-2">
                      <input
                        type="checkbox"
                        checked={selectedLrs.includes(lr)}
                        onChange={() => handleLrSelection(lr)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-400 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">{lr.centerName}</td>
                    <td className="border border-gray-300 p-2">{lr.lrNo}</td>
                    <td className="border border-gray-300 p-2">{lr.date}</td>
                    <td className="border border-gray-300 p-2">{lr.packaging}</td>
                    <td className="border border-gray-300 p-2">{lr.description}</td>
                    <td className="border border-gray-300 p-2">{lr.article}</td>
                    <td className="border border-gray-300 p-2">{lr.freightBy}</td>
                    <td className="border border-gray-300 p-2">{lr.fromCity}</td>
                    <td className="border border-gray-300 p-2">{lr.toCity}</td>
                    <td className="border border-gray-300 p-2">{lr.consignor}</td>
                    <td className="border border-gray-300 p-2">{lr.consignorGstno}</td>
                    <td className="border border-gray-300 p-2">{lr.consignee}</td>
                    <td className="border border-gray-300 p-2">{lr.consigneeGstno}</td>
                    <td className="border border-gray-300 p-2">{lr.actualWeight}</td>
                    <td className="border border-gray-300 p-2">{lr.weight}</td>
                    <td className="border border-gray-300 p-2">{lr.freight}</td>
                    <td className="border border-gray-300 p-2">{lr.subTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                onClick={addSelectedLrs}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              >
                Add Selected
              </button>
              <button
                onClick={() => setShowLrModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoAddWindow;