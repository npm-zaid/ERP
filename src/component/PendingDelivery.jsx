import React, { useState, useRef, useEffect } from 'react';

const PendingDelivery = () => {
  // State for filters (arrays for multi-selection)
  const [filters, setFilters] = useState({
    lrDate: ['All'],
    center: ['All'],
    toCity: ['All'],
    bookingBranch: ['All'],
    lrStatus: ['All'],
    branchName: ['All'],
  });

  // State for dropdown visibility
  const [openFilter, setOpenFilter] = useState(null);

  // Refs for dropdowns to handle click outside
  const filterRefs = useRef({});

  const deliveryData = [
    {
      lrDate: '08/05/2024',
      center: 'Mumbai',
      toCity: 'Delhi',
      bookingBranch: 'Mumbai Central',
      lrStatus: 'In Transit',
      branchName: 'Mumbai Branch',
    },
    {
      lrDate: '15/06/2024',
      center: 'Bangalore',
      toCity: 'Chennai',
      bookingBranch: 'Bangalore East',
      lrStatus: 'Pending',
      branchName: 'Bangalore Branch',
    },
    {
      lrDate: '20/07/2024',
      center: 'Hyderabad',
      toCity: 'Pune',
      bookingBranch: 'Hyderabad North',
      lrStatus: 'Delayed',
      branchName: 'Hyderabad Branch',
    },
    {
      lrDate: '25/08/2024',
      center: 'Kolkata',
      toCity: 'Guwahati',
      bookingBranch: 'Kolkata West',
      lrStatus: 'In Transit',
      branchName: 'Kolkata Branch',
    },
    {
      lrDate: '10/09/2024',
      center: 'Ahmedabad',
      toCity: 'Surat',
      bookingBranch: 'Ahmedabad South',
      lrStatus: 'Pending',
      branchName: 'Ahmedabad Branch',
    },
    {
      lrDate: '15/10/2024',
      center: 'Chennai',
      toCity: 'Coimbatore',
      bookingBranch: 'Chennai Central',
      lrStatus: 'Delivered',
      branchName: 'Chennai Branch',
    },
    {
      lrDate: '20/11/2024',
      center: 'Delhi',
      toCity: 'Jaipur',
      bookingBranch: 'Delhi North',
      lrStatus: 'In Transit',
      branchName: 'Delhi Branch',
    },
    {
      lrDate: '25/12/2024',
      center: 'Pune',
      toCity: 'Nagpur',
      bookingBranch: 'Pune East',
      lrStatus: 'Pending',
      branchName: 'Pune Branch',
    },
    {
      lrDate: '05/01/2025',
      center: 'Jaipur',
      toCity: 'Lucknow',
      bookingBranch: 'Jaipur West',
      lrStatus: 'Delayed',
      branchName: 'Jaipur Branch',
    },
    {
      lrDate: '10/02/2025',
      center: 'Surat',
      toCity: 'Vadodara',
      bookingBranch: 'Surat South',
      lrStatus: 'In Transit',
      branchName: 'Surat Branch',
    },
  ];

  // Get unique values for each field
  const getUniqueValues = (key) => {
    return ['All', ...new Set(deliveryData.map((item) => item[key]))];
  };

  // Filter data based on all active filters
  const filteredData = deliveryData.filter((item) => {
    return (
      (filters.lrDate.includes('All') || filters.lrDate.includes(item.lrDate)) &&
      (filters.center.includes('All') || filters.center.includes(item.center)) &&
      (filters.toCity.includes('All') || filters.toCity.includes(item.toCity)) &&
      (filters.bookingBranch.includes('All') || filters.bookingBranch.includes(item.bookingBranch)) &&
      (filters.lrStatus.includes('All') || filters.lrStatus.includes(item.lrStatus)) &&
      (filters.branchName.includes('All') || filters.branchName.includes(item.branchName))
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
    { label: 'LR Date', field: 'lrDate' },
    { label: 'Center', field: 'center' },
    { label: 'To City', field: 'toCity' },
    { label: 'Booking Branch', field: 'bookingBranch' },
    { label: 'LR Status', field: 'lrStatus' },
    { label: 'Branch Name', field: 'branchName' },
  ];

  return (
    <div className="w-full h-[72vh]  scroller overflow-y-scroll bg-gradient-to-br from-white to-red-50 rounded-xl shadow-2xl p-6">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-red-700 border-b-4 border-red-200 pb-3">
          Pending Delivery From Such Days
        </h2>
      </div>
      <div className="  rounded-lg">
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
                  className="grid grid-cols-6 py-3 border-b border-gray-200 hover:bg-red-100 transition duration-300 cursor-pointer animate-fade-in"
                >
                  <span className="text-gray-800 font-medium">{item.lrDate}</span>
                  <span className="text-gray-800">{item.center}</span>
                  <span className="text-gray-800">{item.toCity}</span>
                  <span className="text-gray-800">{item.bookingBranch}</span>
                  <span className="text-gray-800">{item.lrStatus}</span>
                  <span className="text-gray-800">{item.branchName}</span>
                </div>
              ))
            ) : (
              <div className="py-3 text-center text-gray-600">
                No deliveries found for the selected filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingDelivery;