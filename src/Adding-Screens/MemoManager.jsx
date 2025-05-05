import React, { useState } from 'react';

const MemoManager = () => {
  // State for form data (newEntry) and submitted memos (memos)
  const [newEntry, setNewEntry] = useState({
    date: '',
    driver: '',
    agent: '',
    branch: '',
    memoNo: '',
    fromCity: '',
    toCity: '',
    vehicleNo: '',
    paymentType: '',
    advanced: 0,
    lrRows: [],
    city: '',
    narration: '',
    totalArticle: 0,
    totalAcWeight: 0,
    totalWeight: 0,
    totalFreight: 0,
    balance: 0,
  });
  const [memos, setMemos] = useState([]); // List of submitted memos
  const [showLrModal, setShowLrModal] = useState(false);
  const [selectedLrs, setSelectedLrs] = useState([]);

  // Sample LR data for Auto Add LR functionality
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
      subTotal: 4000,
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
      subTotal: 3000,
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
      subTotal: 6000,
    },
  ];

  // Function to update calculations (totalArticle, totalWeight, etc.)
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

  // Handle input changes for form fields
  const handleInputChange = (field, value) => {
    setNewEntry((prev) => {
      const updatedEntry = { ...prev, [field]: value };
      return updateCalculations(updatedEntry);
    });
  };

  // Handle changes in LR rows
  const handleLrRowChange = (index, field, value) => {
    setNewEntry((prev) => {
      const updatedLrRows = [...prev.lrRows];
      updatedLrRows[index] = { ...updatedLrRows[index], [field]: value };
      const updatedEntry = { ...prev, lrRows: updatedLrRows };
      return updateCalculations(updatedEntry);
    });
  };

  // Add a new LR row
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

  // Remove an LR row
  const removeLrRow = (index) => {
    setNewEntry((prev) => {
      const updatedLrRows = prev.lrRows.filter((_, i) => i !== index);
      const updatedEntry = { ...prev, lrRows: updatedLrRows };
      return updateCalculations(updatedEntry);
    });
  };

  // Handle LR selection in Auto Add LR modal
  const handleLrSelection = (lr) => {
    setSelectedLrs((prev) =>
      prev.includes(lr) ? prev.filter((item) => item !== lr) : [...prev, lr]
    );
  };

  // Add selected LRs to lrRows
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
        consignors: lr.consignor,
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

  // Render input fields (text, dropdown, textarea)
  const renderInputField = (field, value, config = {}) => {
    const { type = 'text', options = [], placeholder = '' } = config;
    switch (type) {
      case 'dropdown':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
            className="w-full p-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
            className="w-full p-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder={placeholder}
          />
        );
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    const requiredFields = ['date', 'driver', 'agent'];
    const errors = requiredFields.filter((field) => !newEntry[field]);

    if (errors.length > 0) {
      alert(`Yeh fields bharo: ${errors.join(', ')}`);
      return;
    }

    if (newEntry.lrRows.length === 0) {
      alert('Kam se kam ek LR row add karo.');
      return;
    }

    // Add the new entry to memos list
    setMemos((prev) => [
      {
        id: prev.length + 1,
        date: newEntry.date,
        driver: newEntry.driver,
        agent: newEntry.agent,
        branch: newEntry.branch,
        memoNo: newEntry.memoNo,
        fromCity: newEntry.fromCity,
        toCity: newEntry.toCity,
        vehicleNo: newEntry.vehicleNo,
        paymentType: newEntry.paymentType,
        advanced: newEntry.advanced,
        lrRows: [...newEntry.lrRows],
        city: newEntry.city,
        narration: newEntry.narration,
        totalArticle: newEntry.totalArticle,
        totalAcWeight: newEntry.totalAcWeight,
        totalWeight: newEntry.totalWeight,
        totalFreight: newEntry.totalFreight,
        balance: newEntry.balance,
      },
      ...prev,
    ]);

    // Reset the form after submission
    setNewEntry({
      date: '',
      driver: '',
      agent: '',
      branch: '',
      memoNo: '',
      fromCity: '',
      toCity: '',
      vehicleNo: '',
      paymentType: '',
      advanced: 0,
      lrRows: [],
      city: '',
      narration: '',
      totalArticle: 0,
      totalAcWeight: 0,
      totalWeight: 0,
      totalFreight: 0,
      balance: 0,
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Memo Manager</h2>

        {/* Form Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New Memo</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Date</label>
              {renderInputField('date', newEntry.date, { type: 'text', placeholder: 'dd/mm/yyyy' })}
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Driver</label>
              {renderInputField('driver', newEntry.driver, {
                type: 'dropdown',
                options: ['', 'MAHESHBHAI', 'RAJESH', 'SANJAY'],
              })}
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Agent</label>
              {renderInputField('agent', newEntry.agent, {
                type: 'dropdown',
                options: ['', 'AJAY TRANSPORT', 'SHREE LOGISTICS', 'KUMAR TRANSPORT'],
              })}
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Branch</label>
              {renderInputField('branch', newEntry.branch, { type: 'dropdown', options: ['', '7', '8', '9'] })}
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Memo No</label>
              {renderInputField('memoNo', newEntry.memoNo)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">From City</label>
              {renderInputField('fromCity', newEntry.fromCity, {
                type: 'dropdown',
                options: ['', 'KOTA', 'RAJKOT', 'AHMEDABAD'],
              })}
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">To City</label>
              {renderInputField('toCity', newEntry.toCity, {
                type: 'dropdown',
                options: ['', 'K. Miter', 'SURAT', 'PUNE'],
              })}
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Vehicle No</label>
              {renderInputField('vehicleNo', newEntry.vehicleNo)}
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Payment Type</label>
              {renderInputField('paymentType', newEntry.paymentType, {
                type: 'dropdown',
                options: ['', 'Cash/Bank', 'Credit'],
              })}
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Advanced</label>
              {renderInputField('advanced', newEntry.advanced, { type: 'number' })}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={addLrRow}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
                >
                  Add LR
                </button>
                <button
                  onClick={() => setShowLrModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
                >
                  Auto Add LR
                </button>
              </div>
              <span className="text-gray-600">Balance: {newEntry.balance || '0'}</span>
            </div>

            <div className="overflow-x-auto border rounded-lg shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-gray-700">
                    <th className="p-3 text-sm font-medium">Delete</th>
                    <th className="p-3 text-sm font-medium">Center Name</th>
                    <th className="p-3 text-sm font-medium">LR No</th>
                    <th className="p-3 text-sm font-medium">Date</th>
                    <th className="p-3 text-sm font-medium">Packaging</th>
                    <th className="p-3 text-sm font-medium">Description</th>
                    <th className="p-3 text-sm font-medium">Article</th>
                    <th className="p-3 text-sm font-medium">Freight By</th>
                    <th className="p-3 text-sm font-medium">From City</th>
                    <th className="p-3 text-sm font-medium">To City</th>
                    <th className="p-3 text-sm font-medium">Consignee</th>
                    <th className="p-3 text-sm font-medium">Ac. Weight</th>
                    <th className="p-3 text-sm font-medium">Weight</th>
                    <th className="p-3 text-sm font-medium">Freight</th>
                  </tr>
                </thead>
                <tbody>
                  {newEntry.lrRows.map((row, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-3">
                        <button
                          onClick={() => removeLrRow(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.centerName || ''}
                          onChange={(e) => handleLrRowChange(index, 'centerName', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.lrNo || ''}
                          onChange={(e) => handleLrRowChange(index, 'lrNo', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.date || ''}
                          onChange={(e) => handleLrRowChange(index, 'date', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder="dd/mm/yyyy"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.packaging || ''}
                          onChange={(e) => handleLrRowChange(index, 'packaging', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.description || ''}
                          onChange={(e) => handleLrRowChange(index, 'description', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={row.article || 0}
                          onChange={(e) => handleLrRowChange(index, 'article', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </td>
                      <td className="p-3">
                        <select
                          value={row.freightBy || ''}
                          onChange={(e) => handleLrRowChange(index, 'freightBy', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                          <option value="">Select</option>
                          <option value="To Pay">To Pay</option>
                          <option value="Paid">Paid</option>
                          <option value="Consignee">Consignee</option>
                          <option value="Consignor">Consignor</option>
                          <option value="T.B.B.">T.B.B.</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.fromCity || ''}
                          onChange={(e) => handleLrRowChange(index, 'fromCity', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.toCity || ''}
                          onChange={(e) => handleLrRowChange(index, 'toCity', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={row.consignee || ''}
                          onChange={(e) => handleLrRowChange(index, 'consignee', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={row.acWeight || 0}
                          onChange={(e) => handleLrRowChange(index, 'acWeight', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={row.weight || 0}
                          onChange={(e) => handleLrRowChange(index, 'weight', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={row.freight || 0}
                          onChange={(e) => handleLrRowChange(index, 'freight', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {newEntry.lrRows.length === 0 && (
                <div className="p-4 text-center text-gray-500">Koi LR rows nahi hain. Add karo!</div>
              )}
            </div>

            <div className="mt-2 text-gray-600">Total LR: {newEntry.lrRows.length}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">City</label>
              {renderInputField('city', newEntry.city)}
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Weight</label>
              <input
                type="number"
                value={newEntry.totalWeight.toFixed(2) || '0.00'}
                readOnly
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Article</label>
              <input
                type="number"
                value={newEntry.totalArticle || 0}
                readOnly
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Freight</label>
              <input
                type="number"
                value={newEntry.totalFreight.toFixed(2) || '0.00'}
                readOnly
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div></div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Total Article</label>
              <input
                type="number"
                value={newEntry.totalArticle || 0}
                readOnly
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Total Ac. Weight</label>
              <input
                type="number"
                value={newEntry.totalAcWeight.toFixed(2) || '0.00'}
                readOnly
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Total Weight</label>
              <input
                type="number"
                value={newEntry.totalWeight.toFixed(2) || '0.00'}
                readOnly
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div></div>
            <div className="text-right">
              <label className="block text-gray-600 mb-1 text-sm font-medium">Freight By</label>
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">To Pay:</label>
              <input
                type="number"
                value={newEntry.lrRows
                  .reduce((sum, row) => (row.freightBy === 'To Pay' ? sum + (parseFloat(row.freight) || 0) : sum), 0)
                  .toFixed(2)}
                readOnly
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Paid:</label>
              <input
                type="number"
                value={newEntry.lrRows
                  .reduce((sum, row) => (row.freightBy === 'Paid' ? sum + (parseFloat(row.freight) || 0) : sum), 0)
                  .toFixed(2)}
                readOnly
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Narration</label>
              {renderInputField('narration', newEntry.narration, { type: 'textarea' })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div></div>
            <div></div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Consignee:</label>
              <input
                type="number"
                value={newEntry.lrRows
                  .reduce((sum, row) => (row.freightBy === 'Consignee' ? sum + (parseFloat(row.freight) || 0) : sum), 0)
                  .toFixed(2)}
                readOnly
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Consignor:</label>
              <input
                type="number"
                value={newEntry.lrRows
                  .reduce((sum, row) => (row.freightBy === 'Consignor' ? sum + (parseFloat(row.freight) || 0) : sum), 0)
                  .toFixed(2)}
                readOnly
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Memo Freight:</label>
              <input
                type="number"
                value={newEntry.totalFreight.toFixed(2) || '0.00'}
                readOnly
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 shadow-sm"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md"
            >
              Submit Memo
            </button>
          </div>
        </div>

        {/* Table Section: List of Memos */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">List of Memos</h3>
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-50 text-gray-700">
                  <th className="p-3 text-sm font-medium">ID</th>
                  <th className="p-3 text-sm font-medium">Date</th>
                  <th className="p-3 text-sm font-medium">Driver</th>
                  <th className="p-3 text-sm font-medium">Agent</th>
                  <th className="p-3 text-sm font-medium">Memo No</th>
                  <th className="p-3 text-sm font-medium">From City</th>
                  <th className="p-3 text-sm font-medium">To City</th>
                  <th className="p-3 text-sm font-medium">Vehicle No</th>
                  <th className="p-3 text-sm font-medium">Total Article</th>
                  <th className="p-3 text-sm font-medium">Total Weight</th>
                  <th className="p-3 text-sm font-medium">Total Freight</th>
                </tr>
              </thead>
              <tbody>
                {memos.map((memo) => (
                  <tr key={memo.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 text-gray-600">{memo.id}</td>
                    <td className="p-3 text-gray-600">{memo.date}</td>
                    <td className="p-3 text-gray-600">{memo.driver}</td>
                    <td className="p-3 text-gray-600">{memo.agent}</td>
                    <td className="p-3 text-gray-600">{memo.memoNo}</td>
                    <td className="p-3 text-gray-600">{memo.fromCity}</td>
                    <td className="p-3 text-gray-600">{memo.toCity}</td>
                    <td className="p-3 text-gray-600">{memo.vehicleNo}</td>
                    <td className="p-3 text-gray-600">{memo.totalArticle}</td>
                    <td className="p-3 text-gray-600">{memo.totalWeight.toFixed(2)}</td>
                    <td className="p-3 text-gray-600">{memo.totalFreight.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {memos.length === 0 && (
              <div className="p-4 text-center text-gray-500">Koi memos nahi hain. Submit karo!</div>
            )}
          </div>
        </div>

        {/* Auto Add LR Modal */}
        {showLrModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-6xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Select LRs</h3>
              <div className="overflow-x-auto border rounded-lg shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-50 text-gray-700">
                      <th className="p-3 text-sm font-medium">Select</th>
                      <th className="p-3 text-sm font-medium">Center Name</th>
                      <th className="p-3 text-sm font-medium">LR No</th>
                      <th className="p-3 text-sm font-medium">Date</th>
                      <th className="p-3 text-sm font-medium">Packaging</th>
                      <th className="p-3 text-sm font-medium">Description</th>
                      <th className="p-3 text-sm font-medium">Article</th>
                      <th className="p-3 text-sm font-medium">Freight By</th>
                      <th className="p-3 text-sm font-medium">From City</th>
                      <th className="p-3 text-sm font-medium">To City</th>
                      <th className="p-3 text-sm font-medium">Consignor</th>
                      <th className="p-3 text-sm font-medium">GSTNO</th>
                      <th className="p-3 text-sm font-medium">Consignee</th>
                      <th className="p-3 text-sm font-medium">GSTNO</th>
                      <th className="p-3 text-sm font-medium">Actual Weight</th>
                      <th className="p-3 text-sm font-medium">Weight</th>
                      <th className="p-3 text-sm font-medium">Freight</th>
                      <th className="p-3 text-sm font-medium">SubTotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableLrs.map((lr, index) => (
                      <tr key={index} className="border-t hover:bg-gray-50">
                        <td className="p-3">
                          <input
                            type="checkbox"
                            checked={selectedLrs.includes(lr)}
                            onChange={() => handleLrSelection(lr)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                          />
                        </td>
                        <td className="p-3 text-gray-600">{lr.centerName}</td>
                        <td className="p-3 text-gray-600">{lr.lrNo}</td>
                        <td className="p-3 text-gray-600">{lr.date}</td>
                        <td className="p-3 text-gray-600">{lr.packaging}</td>
                        <td className="p-3 text-gray-600">{lr.description}</td>
                        <td className="p-3 text-gray-600">{lr.article}</td>
                        <td className="p-3 text-gray-600">{lr.freightBy}</td>
                        <td className="p-3 text-gray-600">{lr.fromCity}</td>
                        <td className="p-3 text-gray-600">{lr.toCity}</td>
                        <td className="p-3 text-gray-600">{lr.consignor}</td>
                        <td className="p-3 text-gray-600">{lr.consignorGstno}</td>
                        <td className="p-3 text-gray-600">{lr.consignee}</td>
                        <td className="p-3 text-gray-600">{lr.consigneeGstno}</td>
                        <td className="p-3 text-gray-600">{lr.actualWeight}</td>
                        <td className="p-3 text-gray-600">{lr.weight}</td>
                        <td className="p-3 text-gray-600">{lr.freight}</td>
                        <td className="p-3 text-gray-600">{lr.subTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={addSelectedLrs}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
                >
                  Add Selected
                </button>
                <button
                  onClick={() => setShowLrModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all shadow-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoManager;