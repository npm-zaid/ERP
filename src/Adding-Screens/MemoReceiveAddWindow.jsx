import React, { useState, useEffect } from 'react';

const MemoReceiveAddWindow = ({ newEntry, setNewEntry, handleModalSubmit, modal, isEditMode }) => {
  const [showLrModal, setShowLrModal] = useState(false);
  const [selectedLrs, setSelectedLrs] = useState([]);

  const availableLrs = [
    {
      centerName: "RAJ",
      lrNo: "17236",
      date: "02/05/2025",
      baleNo: "B001",
      packaging: "BAG",
      article: 2,
      shortArt: 0,
      freightBy: "To Pay",
      fromCity: "RAJKOT",
      toCity: "AHMEDABAD",
      consignor: "SHREE LOGISTICS",
      consignorGstno: "GSTIN1234567890",
      consignee: "K. Miter",
      consigneeGstno: "GSTIN0987654321",
      weight: 200,
      freight: 4000,
      subTotal: 4000
    },
    {
      centerName: "RAJ",
      lrNo: "17237",
      date: "03/05/2025",
      baleNo: "B002",
      packaging: "BOX",
      article: 1,
      shortArt: 0,
      freightBy: "Paid",
      fromCity: "SURAT",
      toCity: "PUNE",
      consignor: "AJAY TRANSPORT",
      consignorGstno: "GSTIN4567891230",
      consignee: "RAMESH & CO",
      consigneeGstno: "GSTIN7891234560",
      weight: 150,
      freight: 3000,
      subTotal: 3000
    },
    {
      centerName: "KOTA",
      lrNo: "17238",
      date: "04/05/2025",
      baleNo: "B003",
      packaging: "CARTON",
      article: 3,
      shortArt: 1,
      freightBy: "Consignee",
      fromCity: "KOTA",
      toCity: "MUMBAI",
      consignor: "KUMAR TRANSPORT",
      consignorGstno: "GSTIN3216549870",
      consignee: "FASHION HUB",
      consigneeGstno: "GSTIN6549873210",
      weight: 300,
      freight: 6000,
      subTotal: 6000
    }
  ];

  const updateCalculations = (updatedEntry) => {
    const lrRows = updatedEntry.lrRows || [];
    const totalFreight = lrRows.reduce((sum, row) => sum + (parseFloat(row.freight) || 0), 0);
    return {
      ...updatedEntry,
      totalFreight: totalFreight,
      totalArticles: lrRows.reduce((sum, row) => sum + (parseInt(row.article) || 0), 0),
      totalWeight: lrRows.reduce((sum, row) => sum + (parseFloat(row.weight) || 0), 0),
      totalShortArt: lrRows.reduce((sum, row) => sum + (parseInt(row.shortArt) || 0), 0),
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
            baleNo: '',
            fromCity: '',
            toCity: '',
            consignor: '',
            consignee: '',
            article: 0,
            shortArt: 0,
            weight: 0,
            freight: 0,
            freightBy: '',
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
      prev.some(item => item.lrNo === lr.lrNo)
        ? prev.filter(item => item.lrNo !== lr.lrNo)
        : [...prev, lr]
    );
  };

  const addSelectedLrs = () => {
    setNewEntry((prev) => {
      const newLrRows = selectedLrs.map((lr) => ({
        centerName: lr.centerName,
        lrNo: lr.lrNo,
        date: lr.date,
        baleNo: lr.baleNo,
        fromCity: lr.fromCity,
        toCity: lr.toCity,
        consignor: lr.consignor,
        consignee: lr.consignee,
        article: lr.article,
        shortArt: lr.shortArt,
        weight: lr.weight,
        freight: lr.freight,
        freightBy: lr.freightBy,
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
    const requiredFields = ['date'];
    const errors = requiredFields.filter((field) => !newEntry[field]);

    if (errors.length > 0) {
      alert(`Please fill required fields: ${errors.join(', ')}`);
      return;
    }

    if (newEntry.lrRows.length === 0) {
      alert('Please add at least one LR row.');
      return;
    }

    // Generate a common group ID for all related entries
    const groupId = newEntry.groupId || `group-${Date.now()}`;

    // Create entries for each LR row to ensure all data is properly displayed in the list
    const entries = newEntry.lrRows.map((lrRow, index) => {
      return {
        id: index === 0 ? (newEntry.id || Date.now().toString()) : `${Date.now()}-${index}`,
        groupId: groupId, // Add the group ID to track related entries
        selected: false,
        audited: false,
        date: newEntry.date,
        receiveNo: newEntry.memoNo,
        memo: `Memo ${newEntry.memoNo}`, // Generate a memo name based on the receiveNo
        center: lrRow.centerName,
        lrNo: lrRow.lrNo,
        lrDate: lrRow.date,
        baleNo: lrRow.baleNo,
        fromCity: lrRow.fromCity,
        city: lrRow.toCity,
        consignor: lrRow.consignor,
        consignee: lrRow.consignee,
        article: parseInt(lrRow.article) || 0,
        shortArt: parseInt(lrRow.shortArt) || 0,
        weight: parseFloat(lrRow.weight) || 0,
        freight: parseFloat(lrRow.freight) || 0,
        freightBy: lrRow.freightBy || 'TBB',
        narration: newEntry.narration || '',
        // Include all other relevant fields from the form
        totalFreight: newEntry.totalFreight || 0,
        balance: newEntry.balance || 0
      };
    });

    console.log('Submitting transformed memo entries with groupId:', groupId, entries);

    // Pass all entries to handleModalSubmit
    entries.forEach(entry => {
      handleModalSubmit(entry);
    });
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
          <label className="block text-gray-700 mb-1">Recipt No</label>
          {renderInputField('memoNo', newEntry.memoNo)}
        </div>
        <div></div>
        <div></div>
        <div></div>
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
              Get LR
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Delete</th>
                <th className="border border-gray-300 p-2">Center</th>
                <th className="border border-gray-300 p-2">LR No</th>
                <th className="border border-gray-300 p-2">LR Date</th>
                <th className="border border-gray-300 p-2">Bale No</th>
                <th className="border border-gray-300 p-2">From City</th>
                <th className="border border-gray-300 p-2">City</th>
                <th className="border border-gray-300 p-2">Consignor</th>
                <th className="border border-gray-300 p-2">Consignee</th>
                <th className="border border-gray-300 p-2">Article</th>
                <th className="border border-gray-300 p-2">Short Art.</th>
                <th className="border border-gray-300 p-2">Weight</th>
                <th className="border border-gray-300 p-2">Freight</th>
                <th className="border border-gray-300 p-2">Freight By</th>
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
                      value={row.baleNo}
                      onChange={(e) => handleLrRowChange(index, 'baleNo', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    />
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
                      value={row.consignor}
                      onChange={(e) => handleLrRowChange(index, 'consignor', e.target.value)}
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
                      value={row.article}
                      onChange={(e) => handleLrRowChange(index, 'article', e.target.value)}
                      className="w-full h-8 p-2 border border-gray-300 rounded focus:outline-none font-arial text-sm"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={row.shortArt}
                      onChange={(e) => handleLrRowChange(index, 'shortArt', e.target.value)}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">Narration</label>
          {renderInputField('narration', newEntry.narration, { type: 'textarea' })}
        </div>
        <div></div>
        <div></div>
        <div className="text-right">
          <label className="block text-gray-700 mb-1">Balance:</label>
          <input
            type="number"
            value={newEntry.balance || '0'}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div>
          <div className="mb-2">
            <label className="block text-gray-700 mb-1">Freight By</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-gray-700 text-xs">To Pay:</label>
                <input
                  type="number"
                  value={newEntry.lrRows.reduce((sum, row) => row.freightBy === 'To Pay' ? sum + (parseFloat(row.freight) || 0) : sum, 0).toFixed(2)}
                  readOnly
                  className="w-full p-1 border border-gray-300 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-xs">Paid:</label>
                <input
                  type="number"
                  value={newEntry.lrRows.reduce((sum, row) => row.freightBy === 'Paid' ? sum + (parseFloat(row.freight) || 0) : sum, 0).toFixed(2)}
                  readOnly
                  className="w-full p-1 border border-gray-300 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-xs">Consignee:</label>
                <input
                  type="number"
                  value={newEntry.lrRows.reduce((sum, row) => row.freightBy === 'Consignee' ? sum + (parseFloat(row.freight) || 0) : sum, 0).toFixed(2)}
                  readOnly
                  className="w-full p-1 border border-gray-300 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-xs">Consignor:</label>
                <input
                  type="number"
                  value={newEntry.lrRows.reduce((sum, row) => row.freightBy === 'Consignor' ? sum + (parseFloat(row.freight) || 0) : sum, 0).toFixed(2)}
                  readOnly
                  className="w-full p-1 border border-gray-300 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-xs">T.B.B.:</label>
                <input
                  type="number"
                  value={newEntry.lrRows.reduce((sum, row) => row.freightBy === 'T.B.B.' ? sum + (parseFloat(row.freight) || 0) : sum, 0).toFixed(2)}
                  readOnly
                  className="w-full p-1 border border-gray-300 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-xs">Total Freight:</label>
                <input
                  type="number"
                  value={newEntry.totalFreight.toFixed(2)}
                  readOnly
                  className="w-full p-1 border border-gray-300 rounded bg-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSaveAndClose}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
        >
          Save & Close
        </button>
        <button
          onClick={() => modal.setModal({ isOpen: false, type: '', data: null })}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>

      {showLrModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Select LRs</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Select</th>
                  <th className="border border-gray-300 p-2">Center</th>
                  <th className="border border-gray-300 p-2">LR No</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Bale No</th>
                  <th className="border border-gray-300 p-2">From City</th>
                  <th className="border border-gray-300 p-2">To City</th>
                  <th className="border border-gray-300 p-2">Consignor</th>
                  <th className="border border-gray-300 p-2">GSTNO</th>
                  <th className="border border-gray-300 p-2">Consignee</th>
                  <th className="border border-gray-300 p-2">GSTNO</th>
                  <th className="border border-gray-300 p-2">Article</th>
                  <th className="border border-gray-300 p-2">Short Art.</th>
                  <th className="border border-gray-300 p-2">Weight</th>
                  <th className="border border-gray-300 p-2">Freight</th>
                  <th className="border border-gray-300 p-2">Freight By</th>
                  <th className="border border-gray-300 p-2">SubTotal</th>
                </tr>
              </thead>
              <tbody>
                {availableLrs.map((lr) => (
                  <tr key={lr.lrNo} className="border border-gray-300">
                    <td className="border border-gray-300 p-2">
                      <input
                        type="checkbox"
                        checked={selectedLrs.some(item => item.lrNo === lr.lrNo)}
                        onChange={() => handleLrSelection(lr)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-400 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">{lr.centerName}</td>
                    <td className="border border-gray-300 p-2">{lr.lrNo}</td>
                    <td className="border border-gray-300 p-2">{lr.date}</td>
                    <td className="border border-gray-300 p-2">{lr.baleNo}</td>
                    <td className="border border-gray-300 p-2">{lr.fromCity}</td>
                    <td className="border border-gray-300 p-2">{lr.toCity}</td>
                    <td className="border border-gray-300 p-2">{lr.consignor}</td>
                    <td className="border border-gray-300 p-2">{lr.consignorGstno}</td>
                    <td className="border border-gray-300 p-2">{lr.consignee}</td>
                    <td className="border border-gray-300 p-2">{lr.consigneeGstno}</td>
                    <td className="border border-gray-300 p-2">{lr.article}</td>
                    <td className="border border-gray-300 p-2">{lr.shortArt}</td>
                    <td className="border border-gray-300 p-2">{lr.weight}</td>
                    <td className="border border-gray-300 p-2">{lr.freight}</td>
                    <td className="border border-gray-300 p-2">{lr.freightBy}</td>
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

export default MemoReceiveAddWindow;