import React, { useState } from 'react';

const LRSelectionPopup = ({ isOpen, onClose, onSelect, multiple = false, onConfirm, selectedLrs = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const lrData = [
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

  const filteredLRs = lrData.filter((lr) =>
    Object.values(lr).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSelect = (lr) => {
    if (multiple) {
      onSelect(lr); // Toggle selection in parent component
    } else {
      onSelect(lr);
      onClose();
    }
  };

  const handleConfirm = () => {
    if (multiple && onConfirm) {
      onConfirm();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-4 w-[90vw] max-w-6xl z-10">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[14px] font-semibold text-gray-700">Select LR</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Search LR..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-1.5 text-[13px] border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          />
        </div>

        <div className="overflow-x-auto max-h-[400px] scroller">
          <table className="w-full border-collapse text-[12px]">
            <thead className="sticky top-0 bg-gray-50">
              <tr className="border-b border-gray-200 bg-blue-100/50 text-nowrap">
                <th className="p-2 text-left font-medium text-gray-600">Select</th>
                <th className="p-2 text-left font-medium text-gray-600">Center Name</th>
                <th className="p-2 text-left font-medium text-gray-600">LR No</th>
                <th className="p-2 text-left font-medium text-gray-600">Date</th>
                <th className="p-2 text-left font-medium text-gray-600">Packaging</th>
                <th className="p-2 text-left font-medium text-gray-600">Description</th>
                <th className="p-2 text-left font-medium text-gray-600">Article</th>
                <th className="p-2 text-left font-medium text-gray-600">Freight By</th>
                <th className="p-2 text-left font-medium text-gray-600">From City</th>
                <th className="p-2 text-left font-medium text-gray-600">To City</th>
                <th className="p-2 text-left font-medium text-gray-600">Consignor</th>
                <th className="p-2 text-left font-medium text-gray-600">GSTNO</th>
                <th className="p-2 text-left font-medium text-gray-600">Consignee</th>
                <th className="p-2 text-left font-medium text-gray-600">GSTNO</th>
                <th className="p-2 text-left font-medium text-gray-600">Actual Weight</th>
                <th className="p-2 text-left font-medium text-gray-600">Weight</th>
                <th className="p-2 text-left font-medium text-gray-600">Freight</th>
                <th className="p-2 text-left font-medium text-gray-600">SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {filteredLRs.map((lr, index) => (
                <tr
                  key={index}
                  onClick={() => !multiple && handleSelect(lr)}
                  className={`border-b border-gray-100 cursor-pointer ${
                    selectedLrs.some((selected) => selected.lrNo === lr.lrNo)
                      ? 'bg-blue-100'
                      : index % 2 === 0
                      ? 'bg-gray-50'
                      : 'bg-white'
                  } hover:bg-blue-50 transition-colors duration-200 text-nowrap `}
                >
                  <td className="p-2">
                  <div className="checkbox-wrapper-12">
                  <div className="cbx">
                    <input
                      type="checkbox"
                      checked={selectedLrs.some((selected) => selected.lrNo === lr.lrNo)}
                      onChange={() => handleSelect(lr)}
                      onClick={(e) => e.stopPropagation()} // Prevent row click from toggling checkbox
                      className="h-4 w-4 text-blue-600 focus:ring-blue-400 rounded border-gray-300"
                    />
                                 <label htmlFor="cbx-12"></label>
               <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                 <path d="M2 8.36364L6.23077 12L13 2"></path>
               </svg>
             </div>
             <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
               <defs>
                 <filter id="goo-12">
                   <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                     <feColorMatrix
                     in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                     result="goo-12"
                    />
                    <feBlend in="SourceGraphic" in2="goo-12" />
                  </filter>
                </defs>
              </svg>
             </div>
                  </td>
                  <td className="p-3 text-gray-700">{lr.centerName}</td>
                  <td className="p-3 text-gray-700">{lr.lrNo}</td>
                  <td className="p-3 text-gray-700">{lr.date}</td>
                  <td className="p-3 text-gray-700">{lr.packaging}</td>
                  <td className="p-3 text-gray-700">{lr.description}</td>
                  <td className="p-3 text-gray-700">{lr.article}</td>
                  <td className="p-3 text-gray-700">{lr.freightBy}</td>
                  <td className="p-3 text-gray-700">{lr.fromCity}</td>
                  <td className="p-3 text-gray-700">{lr.toCity}</td>
                  <td className="p-3 text-gray-700">{lr.consignor}</td>
                  <td className="p-3 text-gray-700">{lr.consignorGstno}</td>
                  <td className="p-3 text-gray-700">{lr.consignee}</td>
                  <td className="p-3 text-gray-700">{lr.consigneeGstno}</td>
                  <td className="p-3 text-gray-700">{lr.actualWeight}</td>
                  <td className="p-3 text-gray-700">{lr.weight}</td>
                  <td className="p-3 text-gray-700">{lr.freight}</td>
                  <td className="p-3 text-gray-700">{lr.subTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          {multiple ? (
            <>
              <button
                onClick={handleConfirm}
                className="px-4 py-1.5 bg-blue-600 text-white text-[13px] font-medium rounded-md hover:bg-blue-700 transition-all duration-200"
                disabled={selectedLrs.length === 0}
              >
                Add Selected
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-gray-300 text-gray-700 text-[13px] font-medium rounded-md hover:bg-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleSelect(filteredLRs.find((lr) => selectedLrs.some((selected) => selected.lrNo === lr.lrNo)))}
                className="px-4 py-1.5 bg-blue-600 text-white text-[13px] font-medium rounded-md hover:bg-blue-700 transition-all duration-200"
                disabled={selectedLrs.length === 0}
              >
                Select
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-gray-300 text-gray-700 text-[13px] font-medium rounded-md hover:bg-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LRSelectionPopup;