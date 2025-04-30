import React, { useState, useRef, useEffect } from 'react';

const TruckReminder = () => {
  const [isTableView, setIsTableView] = useState(false);
  // State for filters (arrays for multi-selection)
  const [filters, setFilters] = useState({
    id: ['All'],
    type: ['All'],
    date: ['All'],
    detail: ['All'],
    RTO: ['All'],
  });

  // State for dropdown visibility
  const [openFilter, setOpenFilter] = useState(null);

  // Refs for dropdowns to handle click outside
  const filterRefs = useRef({});

  const reminders = [
    { id: 'AP 39 TR 9555', type: 'Truck National Permit Reminder', date: '20/04/2025', detail: 'Truck National Perm', RTO: '20/04/2025' },
    { id: 'MH 04 GR 1234', type: 'Insurance Renewal Reminder', date: '15/05/2025', detail: 'Insurance Renewal', RTO: '15/05/2025' },
    { id: 'AP 39 TR 9555', type: 'Truck National Permit Reminder', date: '20/04/2025', detail: 'Truck National Perm', RTO: '20/04/2025' },
    { id: 'MH 04 GR 1234', type: 'Insurance Renewal Reminder', date: '15/05/2025', detail: 'Insurance Renewal', RTO: '15/05/2025' },
    { id: 'AP 39 TR 9555', type: 'Truck National Permit Reminder', date: '20/04/2025', detail: 'Truck National Perm', RTO: '20/04/2025' },
    { id: 'MH 04 GR 1234', type: 'Insurance Renewal Reminder', date: '15/05/2025', detail: 'Insurance Renewal', RTO: '15/05/2025' },
  ];

  // Deduplicate reminders for unique keys in table rendering
  const uniqueReminders = Array.from(
    new Map(reminders.map((item) => [`${item.id}-${item.type}-${item.date}`, item])).values()
  );

  // Get unique values for each field (excluding "All")
  const getUniqueValues = (key) => {
    return [...new Set(reminders.map((item) => item[key]))];
  };

  // Filter data based on all active filters
  const filteredData = uniqueReminders.filter((item) => {
    return (
      (filters.id.includes('All') || filters.id.includes(item.id)) &&
      (filters.type.includes('All') || filters.type.includes(item.type)) &&
      (filters.date.includes('All') || filters.date.includes(item.date)) &&
      (filters.detail.includes('All') || filters.detail.includes(item.detail)) &&
      (filters.RTO.includes('All') || filters.RTO.includes(item.RTO))
    );
  });

  // Handle checkbox change for individual values
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

  // Handle "Select All" checkbox change
  const handleSelectAll = (field, uniqueValues, checked) => {
    setFilters((prevFilters) => {
      if (checked) {
        // Select all unique values (excluding "All")
        return { ...prevFilters, [field]: [...uniqueValues] };
      } else {
        // Deselect all, revert to "All"
        return { ...prevFilters, [field]: ['All'] };
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
    { label: 'Reminder Type', field: 'type' },
    { label: 'Reminder Date', field: 'date' },
    { label: 'Detail', field: 'detail' },
    { label: 'RTO', field: 'RTO' },
  ];

  return (
    <div className="relative p-4 w-full h-[81vh] overflow-y-scroll scroller bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6 sticky bg-gray-200/20 backdrop-blur-xl top-0 left-0">
        <h2 className="text-2xl font-bold text-black">
          Truck Reminder
        </h2>
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
                          {/* Select All Checkbox */}
                          <div className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              id={`${column.field}-select-all`}
                              checked={
                                !filters[column.field].includes('All') &&
                                getUniqueValues(column.field).every((value) => filters[column.field].includes(value))
                              }
                              onChange={(e) => handleSelectAll(column.field, getUniqueValues(column.field), e.target.checked)}
                              className="mr-2"
                            />
                            <label htmlFor={`${column.field}-select-all`} className="text-gray-800 font-semibold">
                              Select All
                            </label>
                          </div>
                          {/* Individual Checkboxes */}
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
              {filteredData.map((reminder, index) => (
                <tr key={`${reminder.id}-${reminder.type}-${index}`} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-4 border-b border-gray-400">{reminder.id}</td>
                  <td className="p-4 border-b border-gray-400">{reminder.type}</td>
                  <td className="p-4 border-b border-gray-400">{reminder.date}</td>
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
          {reminders.map((reminder, index) => (
            <div
              key={`${reminder.id}-${index}`}
              className="flex justify-between mb-3 items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
            >
              <div>
                <p className="text-lg font-semibold text-black italic">{reminder.id}</p>
                <p className="text-gray-600">{reminder.detail}</p>
              </div>
              <div className="text-right">
                <p className="text-md font-medium text-black">{reminder.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TruckReminder;