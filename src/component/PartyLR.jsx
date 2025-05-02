import React, { useState, useRef, useEffect } from 'react';

const PartyLR = () => {
  // State for filters (arrays for multi-selection)
  const [filters, setFilters] = useState({
    accountName: ['All'],
    lastLRDate: ['All'],
  });

  // State for dropdown visibility
  const [openFilter, setOpenFilter] = useState(null);

  // Refs for dropdowns to handle click outside
  const filterRefs = useRef({});

  const partyLRData = [
    { accountName: "parth electronics", lastLRDate: "31/03/2023" },
    { accountName: "smk co", lastLRDate: "22/01/2024" },
    { accountName: "LENOVA ENTERPRISE", lastLRDate: "20/02/2024" },
    { accountName: "KHODIYAR ELECTRONICS", lastLRDate: "28/02/2024" },
    { accountName: "SUGUNA FOODS PVT LTD", lastLRDate: "06/05/2024" },
    { accountName: "ORISSA ALLOY STEEL", lastLRDate: "04/05/2024" },
    { accountName: "FCI GHEVRA", lastLRDate: "27/05/2024" },
    { accountName: "PRATYKSHA DIES", lastLRDate: "27/05/2024" },
    { accountName: "FCI SHAKTINAGAR", lastLRDate: "27/07/2024" },
    { accountName: "BR ROADLINE", lastLRDate: "14/08/2024" },
  ];

  // Get unique values for each field
  const getUniqueValues = (key) => {
    return ['All', ...new Set(partyLRData.map((item) => item[key]))];
  };

  // Filter data based on all active filters
  const filteredData = partyLRData.filter((item) => {
    return (
      (filters.accountName.includes('All') || filters.accountName.includes(item.accountName)) &&
      (filters.lastLRDate.includes('All') || filters.lastLRDate.includes(item.lastLRDate))
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
    { label: 'Party Name', field: 'accountName' },
    { label: 'Last LR Date', field: 'lastLRDate' },
  ];

  return (
    <div className="bg-gradient-to-br w-full h-[72vh]  scroller overflow-y-scroll from-white to-gray-50 rounded-xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-5 border-b-4 border-indigo-200 pb-3">
        Party LR Not Created
      </h2>
      <div className="scroller relative rounded-lg">
        <div className="heading sticky top-0 z-10 bg-indigo-100 border-b border-indigo-200 py-3 px-2 flex justify-between items-center text-black font-bold ">
          {columns.map((column) => (
            <div key={column.field} className="relative flex justify-between items-center">
              <span>{column.label}</span>
              <button
                onClick={() => toggleFilterDropdown(column.field)}
                className="ml-2 text-gray-600 hover:text-indigo-600"
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
                      className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                      Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-sm items-center py-2 border-b border-gray-200 hover:bg-indigo-100 transition duration-300 cursor-pointer animate-fade-in"
          >
            <span className="text-gray-800 font-semibold ">{item.accountName}</span>
            <span className="text-gray-600  bg-gray-100 px-3 py-1 rounded-full">{item.lastLRDate}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartyLR;