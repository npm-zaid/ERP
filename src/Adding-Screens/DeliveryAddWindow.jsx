import React, { useState } from 'react';

const DeliveryAddWindow = ({ newEntry, setNewEntry, handleModalSubmit, modal, isEditMode }) => {
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
    const totalArticle = lrRows.reduce((sum, row) => sum + (parseInt(row.article) || 0), 0);
    const totalWeight = lrRows.reduce((sum, row) => sum + (parseFloat(row.weight) || 0), 0);
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
          ...(prev.lrRows || []),
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
        lrRows: [...(prev.lrRows || []), ...newLrRows],
        fromBranch: newLrRows[0]?.toCity || prev.fromBranch,
        consigner: newLrRows[0]?.consignor || prev.consigner,
        consignee: newLrRows[0]?.consignee || prev.consignee,
        consignerGSTNO: newLrRows[0]?.consignorGstno || prev.consignerGSTNO,
        consigneeGSTNO: newLrRows[0]?.consigneeGstno || prev.consigneeGSTNO,
        pack: newLrRows[0]?.packaging || prev.pack,
        article: newLrRows[0]?.article || prev.article,
        weight: newLrRows[0]?.weight || prev.weight,
        amount: newLrRows[0]?.freight || prev.amount,
        description: newLrRows[0] ? `LR from ${newLrRows[0].fromCity} to ${newLrRows[0].toCity}` : prev.description,
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

      {/* Delivery Details Section */}
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
            {renderInputField('deliveryNo', newEntry.deliveryNo, { 
              type: 'text',
             
            })}
          </div>
          <div>
            {renderInputField('type', newEntry.type, {
              type: 'dropdown',
              options: ['Standard', 'Express'],
            })}
          </div>
          <div>
            {renderInputField('party', newEntry.party, {
              type: 'dropdown',
              options: [
                'ABC TRANSPORT',
                'ACF',
                'ACM',
                'ACM LOGISTICS',
                'AJAY TRANSPORT',
                'AK TRANSPORT',
                'ANAND',
                'ANMOL TRANPORT',
                'ASHIRWAD TRANSPORT CO.',
                'ASK TRANSPORT',
                'BASUDEV TRANSPORT',
              ],
            })}
          </div>
          <div>
            {renderInputField('fromBranch', newEntry.fromBranch, {
              type: 'dropdown',
              options: [
                'MUMBAI',
                'AHMEDABAD',
                'DELHI',
                'PUNE',
                'BANGALORE',
                'HYDERABAD',
                'KOLKATA',
                'CHENNAI',
                'SURAT',
                'NAGPUR',
              ],
            })}
          </div>
        </div>
      </div>

      {/* Party Information Section */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('partyAddress', newEntry.partyAddress, { type: 'textarea' })}
          </div>
          <div>
            {renderInputField('hireAccount', newEntry.hireAccount, {
              type: 'dropdown',
              options: ['ABC TRANSPORT', 'AJAY TRANSPORT'],
            })}
          </div>
          <div>
            {renderInputField('hire', newEntry.hire, {
              type: 'dropdown',
              options: ['Hire 1', 'Hire 2'],
            })}
          </div>
          <div>
            {renderInputField('account', newEntry.account, {
              type: 'dropdown',
              options: ['Account 1', 'Account 2'],
            })}
          </div>
          <div>
            {renderInputField('labour', newEntry.labour, {
              type: 'dropdown',
              options: ['Labour 1', 'Labour 2'],
            })}
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
          <span className="text-[12px] text-gray-600">Total LR: {(newEntry.lrRows || []).length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12px]">
            <thead className="sticky top-0 bg-gray-50">
              <tr className="border-b border-gray-200 bg-blue-100/50 text-nowrap">
                <th className="p-2 text-left font-medium text-gray-600">Center</th>
                <th className="p-2 text-left font-medium text-gray-600">LR No</th>
                <th className="p-2 text-left font-medium text-gray-600">LR Date</th>
                <th className="p-2 text-left font-medium text-gray-600">Bale No</th>
                <th className="p-2 text-left font-medium text-gray-600">From City</th>
                <th className="p-2 text-left font-medium text-gray-600">To City</th>
                <th className="p-2 text-left font-medium text-gray-600">Consignor</th>
                <th className="p-2 text-left font-medium text-gray-600">Consignee</th>
                <th className="p-2 text-left font-medium text-gray-600">Article</th>
                <th className="p-2 text-left font-medium text-gray-600">Short Art.</th>
                <th className="p-2 text-left font-medium text-gray-600">Weight</th>
                <th className="p-2 text-left font-medium text-gray-600">Freight</th>
                <th className="p-2 text-left font-medium text-gray-600">Freight By</th>
                <th className="p-2 text-left font-medium text-gray-600">Delete</th>
              </tr>
            </thead>
            <tbody>
              {(newEntry.lrRows || []).map((row, index) => (
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
                      value={row.baleNo || ''}
                      onChange={(e) => handleLrRowChange(index, 'baleNo', e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
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
                      value={row.consignor || ''}
                      onChange={(e) => handleLrRowChange(index, 'consignor', e.target.value)}
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
                      value={row.article || 0}
                      onChange={(e) => handleLrRowChange(index, 'article', e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={row.shortArt || 0}
                      onChange={(e) => handleLrRowChange(index, 'shortArt', e.target.value)}
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

      {/* Consignment Details Section */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
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

      {/* Freight Details Section */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
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
              options: ['FreightON'],
            })}
          </div>
        </div>
      </div>

      {/* Payment Details Section */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('cashBank', newEntry.cashBank, {
              type: 'dropdown',
              options: ['CASH', 'BANK'],
            })}
          </div>
          <div>
            {renderInputField('advance', newEntry.advance, { type: 'number' })}
          </div>
          <div>
            {renderInputField('cashBank2', newEntry.cashBank2, {
              type: 'dropdown',
              options: ['CASH', 'BANK'],
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

      {/* Additional Charges Section */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
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

      {/* Delivery Charges Section */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
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
              options: ['Type 1', 'Type 2'],
            })}
          </div>
          <div>
            {renderInputField('cashType', newEntry.cashType, {
              type: 'dropdown',
              options: ['CASH ON HAND'],
            })}
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
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
          <span>Save & Close</span>
        </button>
      </div>

      {/* LR Selection Modal */}
      {showLrModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-xl p-5 w-full max-w-6xl shadow-2xl max-h-[90vh] flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Select LRs</h3>
            <div className="flex-grow overflow-y-auto">
              <table className="w-full border-collapse text-[12px]">
                <thead className="sticky top-0 bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="p-2 text-left font-medium text-gray-600">Select</th>
                    <th className="p-2 text-left font-medium text-gray-600">Center</th>
                    <th className="p-2 text-left font-medium text-gray-600">LR No</th>
                    <th className="p-2 text-left font-medium text-gray-600">Date</th>
                    <th className="p-2 text-left font-medium text-gray-600">Bale No</th>
                    <th className="p-2 text-left font-medium text-gray-600">From City</th>
                    <th className="p-2 text-left font-medium text-gray-600">To City</th>
                    <th className="p-2 text-left font-medium text-gray-600">Consignor</th>
                    <th className="p-2 text-left font-medium text-gray-600">GSTNO</th>
                    <th className="p-2 text-left font-medium text-gray-600">Consignee</th>
                    <th className="p-2 text-left font-medium text-gray-600">GSTNO</th>
                    <th className="p-2 text-left font-medium text-gray-600">Article</th>
                    <th className="p-2 text-left font-medium text-gray-600">Short Art.</th>
                    <th className="p-2 text-left font-medium text-gray-600">Weight</th>
                    <th className="p-2 text-left font-medium text-gray-600">Freight</th>
                    <th className="p-2 text-left font-medium text-gray-600">Freight By</th>
                    <th className="p-2 text-left font-medium text-gray-600">SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  {availableLrs.map((lr) => (
                    <tr 
                      key={lr.lrNo} 
                      className={`border-b border-gray-100 ${availableLrs.indexOf(lr) % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-200`}
                    >
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={selectedLrs.some(item => item.lrNo === lr.lrNo)}
                          onChange={() => handleLrSelection(lr)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-400 rounded border-gray-300"
                        />
                      </td>
                      <td className="p-2 text-gray-700">{lr.centerName}</td>
                      <td className="p-2 text-gray-700">{lr.lrNo}</td>
                      <td className="p-2 text-gray-700">{lr.date}</td>
                      <td className="p-2 text-gray-700">{lr.baleNo}</td>
                      <td className="p-2 text-gray-700">{lr.fromCity}</td>
                      <td className="p-2 text-gray-700">{lr.toCity}</td>
                      <td className="p-2 text-gray-700">{lr.consignor}</td>
                      <td className="p-2 text-gray-700">{lr.consignorGstno}</td>
                      <td className="p-2 text-gray-700">{lr.consignee}</td>
                      <td className="p-2 text-gray-700">{lr.consigneeGstno}</td>
                      <td className="p-2 text-gray-700">{lr.article}</td>
                      <td className="p-2 text-gray-700">{lr.shortArt}</td>
                      <td className="p-2 text-gray-700">{lr.weight}</td>
                      <td className="p-2 text-gray-700">{lr.freight}</td>
                      <td className="p-2 text-gray-700">{lr.freightBy}</td>
                      <td className="p-2 text-gray-700">{lr.subTotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={addSelectedLrs}
                className="px-4 py-1.5 bg-blue-600 text-white text-[12px] font-medium rounded-md shadow-sm hover:bg-blue-700 transition-all duration-200"
              >
                Add Selected
              </button>
              <button
                onClick={() => setShowLrModal(false)}
                className="px-4 py-1.5 bg-gray-500 text-white text-[12px] font-medium rounded-md shadow-sm hover:bg-gray-600 transition-all duration-200"
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

export default DeliveryAddWindow;