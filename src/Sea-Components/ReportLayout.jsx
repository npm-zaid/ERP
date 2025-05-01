import React, { useState, useEffect } from 'react';

const ReportLayout = ({ data, headers, title }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
    setSearchQuery('');
  }, [data]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) =>
      ['FileNo', 'BillOfLading', 'ContainerNo'].some(
        (key) =>
          item[key] &&
          item[key].toString().toLowerCase().includes(query)
      )
    );

    setFilteredData(filtered);
  };

  return (
    <div className="">
      <style>
        {`
          .table-container {
            max-height: 500px;
            overflow: auto;
          }
          .table-container table {
            width: 100%;
            border-collapse: collapse;
          }
          .table-container thead {
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: rgba(57, 123, 208, 0.2); /* #397BD0/20 */
            backdrop-filter: blur(8px);
           
          }
          .table-container th,
          .table-container td {
            padding: 0.5rem;
            text-align: left;
          }
          .table-container tbody tr {
            border-top: 1px solid #9ca3af; /* gray-400 */
           
          }
        
        `}
      </style>
      <div className="w-[75vw] sm:w-[84vw] bg-gray-100 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-[#397BD0] to-[#2e62a8] text-white py-3 px-4 rounded-lg shadow-md">
          <h2 className="text-2xl uppercase tracking-wider font-semibold flex items-center gap-2">
            
            {title}
          </h2>
          <span className="font-bold hidden md:block">DATE - {new Date().toLocaleDateString()}</span>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mb-5">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="File No. / Bill of Lading / Container No."
            className="w-full p-3 bg-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#397BD0] transition-all"
          />
          <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        </div>

        {/* Table */}
        <div className="table-container scroller h-[50vh]">
          {filteredData.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No results found for "{searchQuery}"</div>
          ) : (
            <table>
              <thead>
                <tr className="text-gray-900 text-sm font-semibold text-nowrap rounded-lg">
                  {headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, i) => (
                  <tr key={i} className=" text-[14px] text-gray-900 text-nowrap hover:bg-[#397BD0]/10  transition-all duration-300">
                    {Object.values(item).map((val, j) => (
                      <td key={j}>{val || '-'}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportLayout;