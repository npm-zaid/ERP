import React, { useState, useRef, useEffect } from 'react';

const CreditDays = () => {
  // State for filters (arrays for multi-selection)
  const [filters, setFilters] = useState({
    billNo: ['All'],
    billDate: ['All'],
    billAmount: ['All'],
    dueDays: ['All'],
    closingAmount: ['All'],
    accountName: ['All'],
  });

  // State for dropdown visibility
  const [openFilter, setOpenFilter] = useState(null);

  // Refs for dropdowns to handle click outside
  const filterRefs = useRef({});

  const creditDaysData = [
    { billNo: "11", billDate: "08/05/2024", billAmount: "42,560.00", dueDays: "355.00", closingAmount: "16", accountName: "parth electronics" },
    { billNo: "22", billDate: "15/06/2024", billAmount: "15,300.50", dueDays: "320.00", closingAmount: "12", accountName: "smk co" },
    { billNo: "33", billDate: "20/07/2024", billAmount: "28,900.75", dueDays: "280.00", closingAmount: "8", accountName: "LENOVA ENTERPRISE" },
    { billNo: "44", billDate: "25/08/2024", billAmount: "19,450.25", dueDays: "250.00", closingAmount: "5", accountName: "KHODIYAR ELECTRONICS" },
    { billNo: "55", billDate: "10/09/2024", billAmount: "33,200.00", dueDays: "220.00", closingAmount: "3", accountName: "SUGUNA FOODS PVT LTD" },
    { billNo: "66", billDate: "15/10/2024", billAmount: "47,600.90", dueDays: "190.00", closingAmount: "1", accountName: "FCI GHEVRA" },
    { billNo: "77", billDate: "20/11/2024", billAmount: "22,800.30", dueDays: "160.00", closingAmount: "0", accountName: "PRATYKSHA DIES" },
    { billNo: "88", billDate: "25/12/2024", billAmount: "36,700.45", dueDays: "130.00", closingAmount: "2", accountName: "FCI SHAKTINAGAR" },
    { billNo: "99", billDate: "05/01/2025", billAmount: "14,900.10", dueDays: "100.00", closingAmount: "4", accountName: "BR ROADLINE" },
    { billNo: "100", billDate: "10/02/2025", billAmount: "29,300.80", dueDays: "70.00", closingAmount: "6", accountName: "GLOBAL TRANSPORT" },
  ];

  // Get unique values for each field
  const getUniqueValues = (key) => {
    return ['All', ...new Set(creditDaysData.map((item) => item[key]))];
  };

  // Filter data based on all active filters
  const filteredData = creditDaysData.filter((item) => {
    return (
      (filters.billNo.includes('All') || filters.billNo.includes(item.billNo)) &&
      (filters.billDate.includes('All') || filters.billDate.includes(item.billDate)) &&
      (filters.billAmount.includes('All') || filters.billAmount.includes(item.billAmount)) &&
      (filters.dueDays.includes('All') || filters.dueDays.includes(item.dueDays)) &&
      (filters.closingAmount.includes('All') || filters.closingAmount.includes(item.closingAmount)) &&
      (filters.accountName.includes('All') || filters.accountName.includes(item.accountName))
    );
  });

  // Handle checkbox change
  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[field];
      if (value === 'All') {
        return { ...prevFilters, [field]: ['All'] };
      } else if (currentValues.includes('All')) {
        const newValues = currentValues.filter((v) => v !== 'All');
        return { ...prevFilters, [field]: newValues.includes(value) ? newValues : [...newValues, value] };
      } else {
        const newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];
        return { ...prevFilters, [field]: newValues.length === 0 ? ['All'] : newValues };
      }
    });
  };

  // Clear filter for a specific field
  const clearFilter = (field) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: ['All'] }));
    setOpenFilter(null);
  };

  // Toggle filter dropdown
  const toggleFilterDropdown = (field) => {
    setOpenFilter(openFilter === field ? null : field);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openFilter && filterRefs.current[openFilter] && !filterRefs.current[openFilter].contains(event.target)) {
        setOpenFilter(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openFilter]);

  // Column headers with filter dropdowns
  const columns = [
    { label: 'Bill No', field: 'billNo' },
    { label: 'Bill Date', field: 'billDate' },
    { label: 'Bill Amount', field: 'billAmount' },
    { label: 'Due Days', field: 'dueDays' },
    { label: 'Closing Amount', field: 'closingAmount' },
    { label: 'Account Name', field: 'accountName' },
  ];

  return (
    <div className="w-full h-[72vh]  scroller overflow-y-scroll bg-gradient-to-br from-white to-red-50 rounded-xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold text-red-700 mb-5 border-b-4 border-red-200 pb-3">
        Credit Days Exceeded
      </h2>
      <div className="scroller  rounded-lg">
        <div className="min-w-max">
          <div className="grid grid-cols-6 text-gray-800 font-bold py-3 px-2 bg-red-100 border-b border-red-200 rounded-t-lg relative">
            {columns.map((column) => (
              <div key={column.field} className="relative">
                <span>{column.label}</span>
                <button
                  onClick={() => toggleFilterDropdown(column.field)}
                  className="ml-2 text-gray-600 hover:text-red-600"
                  title={`Filter by ${column.label}`}
                >
                  <i className="ri-filter-3-line"></i>
                </button>
                {openFilter === column.field && (
                  <div
                    ref={(el) => (filterRefs.current[column.field] = el)}
                    className="absolute z-10 mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-3 w-64 max-h-48 overflow-y-auto"
                  >
                    {getUniqueValues(column.field).map((value) => (
                      <div key={value} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`${column.field}-${value}`}
                          checked={filters[column.field].includes(value)}
                          onChange={() => handleFilterChange(column.field, value)}
                          className="mr-2"
                        />
                        <label htmlFor={`${column.field}-${value}`} className="text-gray-800">
                          {value}
                        </label>
                      </div>
                    ))}
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={() => clearFilter(column.field)}
                        className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => setOpenFilter(null)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="overflow-x-auto">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 py-2 text-sm border-b border-gray-200 hover:bg-red-100 transition duration-300 cursor-pointer animate-fade-in"
                >
                  <span className="text-gray-800">{item.billNo}</span>
                  <span className="text-gray-800">{item.billDate}</span>
                  <span className="text-gray-800">${item.billAmount}</span>
                  <span className="text-gray-800">{item.dueDays}</span>
                  <span className="text-gray-800">{item.closingAmount}</span>
                  <span className="text-gray-800">{item.accountName}</span>
                </div>
              ))
            ) : (
              <div className="py-3 text-center text-gray-600">
                No records found for the selected filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditDays;