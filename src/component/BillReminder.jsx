import React, { useState, useRef, useEffect } from 'react';

const BillReminder = () => {
  const [isTableView, setIsTableView] = useState(false);
  // State for filters (arrays for multi-selection)
  const [filters, setFilters] = useState({
    id: ['All'],
    date: ['All'],
    time: ['All'],
    detail: ['All'],
    RTO: ['All'],
  });

  // State for dropdown visibility
  const [openFilter, setOpenFilter] = useState(null);

  // Refs for dropdowns to handle click outside
  const filterRefs = useRef({});

  const reminders = [
    {
      id: 'Electricity Bill',
      date: '25/04/2025',
      time: '10:00 AM',
      detail: 'Monthly Electricity Payment',
      RTO: '25/04/2025',
    },
    {
      id: 'Internet Bill',
      date: '30/04/2025',
      time: '12:00 PM',
      detail: 'Broadband Subscription',
      RTO: '30/04/2025',
    },
    {
      id: 'Water Bill',
      date: '05/05/2025',
      time: '09:00 AM',
      detail: 'Municipal Water Charges',
      RTO: '05/05/2025',
    },
    {
      id: 'Credit Card Bill',
      date: '10/05/2025',
      time: '03:00 PM',
      detail: 'Credit Card Payment',
      RTO: '10/05/2025',
    },
  ];

  // Get unique values for each field
  const getUniqueValues = (key) => {
    return ['All', ...new Set(reminders.map((item) => item[key]))];
  };

  // Filter data based on all active filters
  const filteredData = reminders.filter((item) => {
    return (
      (filters.id.includes('All') || filters.id.includes(item.id)) &&
      (filters.date.includes('All') || filters.date.includes(item.date)) &&
      (filters.time.includes('All') || filters.time.includes(item.time)) &&
      (filters.detail.includes('All') || filters.detail.includes(item.detail)) &&
      (filters.RTO.includes('All') || filters.RTO.includes(item.RTO))
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

  const toggleView = () => {
    setIsTableView(!isTableView);
  };

  // Column headers with filter dropdowns
  const columns = [
    { label: 'Name', field: 'id' },
    { label: 'Reminder Date', field: 'date' },
    { label: 'Reminder Time', field: 'time' },
    { label: 'Detail', field: 'detail' },
    { label: 'RTO', field: 'RTO' },
  ];

  return (
    <div className="relative p-4 w-full h-[72vh] overflow-scroll scroller bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6 sticky bg-gray-200/20 backdrop-blur-xl top-0 left-0">
        <h2 className="text-2xl font-bold text-black">Bill Reminder</h2>
        <button
          onClick={toggleView}
          className="p-3 px-4 bg-[#397BD0] text-white rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {isTableView ? <i className="ri-file-list-line"></i> : <i className="ri-file-list-fill"></i>}
        </button>
      </div>
      {isTableView ? (
        <div className="">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-purple-50">
                {columns.map((column, index) => (
                  <th
                    key={column.field}
                    className={`p-4 border-b-2 border-blue-200 text-gray-700 font-semibold ${index === 0 ? 'rounded-tl-lg' : ''} ${index === columns.length - 1 ? 'rounded-tr-lg' : ''}`}
                  >
                    <div className="relative flex items-center justify-between">
                      <span>{column.label}</span>
                      <button
                        onClick={() => toggleFilterDropdown(column.field)}
                        className="ml-2 text-gray-600 hover:text-blue-600"
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
                              className="p-2 bg-[#397BD0] text-white rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                              Filter
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((reminder) => (
                <tr key={reminder.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-4 border-b border-gray-400">{reminder.id}</td>
                  <td className="p-4 border-b border-gray-400">{reminder.date}</td>
                  <td className="p-4 border-b border-gray-400">{reminder.time}</td>
                  <td className="p-4 border-b border-gray-400">{reminder.detail}</td>
                  <td className="p-4 border-b border-gray-400">{reminder.RTO}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="py-3 text-center text-gray-600">
              No reminders found for the selected filters.
            </div>
          )}
        </div>
      ) : (
        <div className="p-2">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className="flex justify-between mb-3 items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
            >
              <div>
                <p className="text-lg font-semibold text-black italic">{reminder.id}</p>
                <p className="text-gray-600">{reminder.detail}</p>
              </div>
              <div className="text-right">
                <p className="text-md font-medium text-black">{reminder.date}</p>
                <p className="text-sm text-gray-600">{reminder.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BillReminder;