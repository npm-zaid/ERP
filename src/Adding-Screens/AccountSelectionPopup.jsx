import React, { useState, useEffect } from 'react';

const AccountSelectionPopup = ({
  open,
  onClose,
  accounts = [],
  onSelect,
  title = 'Select Account',
  showSearch = true,
  showBalance = true,
  showMobile = true,
  showCity = true,
  showCrDb = true,
  showOpening = true,
}) => {
  const [search, setSearch] = useState('');
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);

  useEffect(() => {
    if (!search) {
      setFilteredAccounts(accounts);
    } else {
      setFilteredAccounts(
        accounts.filter(
          (acc) =>
            acc.accountName?.toLowerCase().includes(search.toLowerCase()) ||
            acc.city?.toLowerCase().includes(search.toLowerCase()) ||
            acc.mobile?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, accounts]);

  const handleSelect = (account) => {
    if (onSelect) onSelect(account);
    if (onClose) onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl p-4 max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[14px] font-semibold text-gray-700">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-red-500 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {showSearch && (
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, city, or mobile..."
            className="w-full mb-3 px-3 py-1.5 text-[13px] border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 bg-white hover:border-blue-300"
            autoFocus
          />
        )}

        <div className="flex-grow overflow-y-auto">
          <table className="w-full border-collapse text-[12px]">
            <thead className="sticky top-0 bg-gray-50">
              <tr className="border-b border-gray-200 bg-blue-100/50 text-nowrap">
                <th className="p-2 text-left font-medium text-gray-600">Account Name</th>
                {showCity && <th className="p-2 text-left font-medium text-gray-600">City</th>}
                {showMobile && <th className="p-2 text-left font-medium text-gray-600">Mobile</th>}
                {showCrDb && <th className="p-2 text-left font-medium text-gray-600">Cr/Db</th>}
                {showOpening && <th className="p-2 text-right font-medium text-gray-600">Opening</th>}
                {showBalance && <th className="p-2 text-right font-medium text-gray-600">Balance</th>}
                <th className="p-2 text-right font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-400">No accounts found.</td>
                </tr>
              ) : (
                filteredAccounts.map((acc, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-200 cursor-pointer`}
                    onClick={() => handleSelect(acc)}
                  >
                    <td className="p-2 font-medium text-gray-800">{acc.accountName}</td>
                    {showCity && <td className="p-2 text-gray-600">{acc.city}</td>}
                    {showMobile && <td className="p-2 text-gray-600">{acc.mobile}</td>}
                    {showCrDb && (
                      <td className="p-2">
                        <span className={acc.crDb === 'Db' ? 'text-red-600' : 'text-green-600'}>
                          {acc.crDb}
                        </span>
                      </td>
                    )}
                    {showOpening && <td className="p-2 text-right text-gray-600">{acc.opening?.toLocaleString('en-IN')}</td>}
                    {showBalance && <td className="p-2 text-right text-gray-600">{(acc.balance ?? acc.opening)?.toLocaleString('en-IN')}</td>}
                    <td className="p-2 text-right">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white text-[11px] font-medium rounded-md hover:bg-blue-700 transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(acc);
                        }}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-300 text-gray-700 text-[13px] font-medium rounded-md hover:bg-gray-400 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSelectionPopup;