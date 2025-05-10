import React, { useState } from 'react';
import AccountSelectionPopup from './AccountSelectionPopup';

const CashPaymentAddWindow = ({ onClose }) => {
  const [newEntry, setNewEntry] = useState({
    voucherType: 'Receipt',
    refType: 'LR',
    branch: '',
    date: '07/05/2025',
    refNo: '',
    oppAC: '',
    oppACBalance: 0,
    oppACBalanceType: '',
    oppACAmount: '',
    cashBank: '',
    cashBalance: 0,
    cashBalanceType: '',
    cashAmount: '',
    diffAC: '',
    diffACBalance: 0,
    diffACBalanceType: '',
    diffACAmount: '',
    diffAC2: '',
    diffAC2Balance: 0,
    diffAC2BalanceType: '',
    diffAC2Amount: '',
    docNo: '',
    docDate: '',
    narration: '',
  });

  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [showCashPopup, setShowCashPopup] = useState(false);
  const [accountType, setAccountType] = useState('');

  const accounts = [
    { accountName: 'A HARILAL & CO. PVT LTD', opening: 438103, crDb: 'Db', city: 'AHMEDABAD', mobile: '9876543210' },
    { accountName: 'CASH ON HAND', opening: 115333, crDb: 'Cr', city: 'AHMEDABAD', mobile: '' },
    { accountName: 'DISCOUNT A/C', opening: 0, crDb: 'Db', city: '', mobile: '' },
  ];

  const handleInputChange = (field, value) => {
    setNewEntry((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAccountSelect = (account) => {
    if (accountType === 'oppAC') {
      setNewEntry(prev => ({
        ...prev,
        oppAC: account.accountName,
        oppACBalance: Math.abs(account.opening),
        oppACBalanceType: account.crDb,
      }));
    } else if (accountType === 'cash') {
      setNewEntry(prev => ({
        ...prev,
        cashBank: account.accountName,
        cashBalance: Math.abs(account.opening),
        cashBalanceType: account.crDb,
      }));
    } else if (accountType === 'diffAC') {
      setNewEntry(prev => ({
        ...prev,
        diffAC: account.accountName,
        diffACBalance: Math.abs(account.opening),
        diffACBalanceType: account.crDb,
      }));
    } else if (accountType === 'diffAC2') {
      setNewEntry(prev => ({
        ...prev,
        diffAC2: account.accountName,
        diffAC2Balance: Math.abs(account.opening),
        diffAC2BalanceType: account.crDb,
      }));
    }
    setShowAccountPopup(false);
    setShowCashPopup(false);
  };

  const openAccountPopup = (type) => {
    setAccountType(type);
    if (type === 'cash') {
      setShowCashPopup(true);
    } else {
      setShowAccountPopup(true);
    }
  };

  const renderInputField = (label, field, value, config = {}) => {
    const { type = 'text', options = [], placeholder = '', readOnly = false, tooltip = '' } = config;
    const inputClasses = "w-full px-3 py-1.5 text-[13px] border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 bg-white hover:border-blue-300";
    const labelClasses = "text-[12px] text-gray-600 font-medium mb-1 flex items-center space-x-1";

    if (field === 'oppAC' || field === 'cashBank' || field === 'diffAC' || field === 'diffAC2') {
      return (
        <div className="relative group">
          <label className={labelClasses}>
            <span>{label}</span>
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
          <div className="flex items-center gap-2">
            <div className="flex-grow relative">
              <div 
                className={`${inputClasses} flex justify-between items-center cursor-pointer`}
                onClick={() => openAccountPopup(field)}
              >
                <span className={value ? 'text-black' : 'text-gray-400'}>
                  {value || 'Select Account'}
                </span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-gray-600 font-medium">Amount:</span>
              <input
                type="number"
                value={newEntry[`${field}Amount`] || ''}
                onChange={(e) => handleInputChange(`${field}Amount`, e.target.value)}
                className={`${inputClasses} w-24`}
                placeholder="--"
              />
              <span className="text-[12px] text-gray-600 font-medium">
                {field === 'oppAC' ? 'Cr' : 'Db'}
              </span>
            </div>
          </div>
          {(field === 'oppAC' && newEntry.oppACBalance) || 
           (field === 'cashBank' && newEntry.cashBalance) ||
           (field === 'diffAC' && newEntry.diffACBalance) ||
           (field === 'diffAC2' && newEntry.diffAC2Balance) ? (
            <div className="text-xs mt-1">
              <span className="text-gray-600">Balance: </span>
              <span className={newEntry[`${field}BalanceType`] === 'Db' ? 'text-red-600' : 'text-green-600'}>
                {newEntry[`${field}Balance`].toLocaleString('en-IN')} {newEntry[`${field}BalanceType`]}
              </span>
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div className="relative group">
        <label className={labelClasses}>
          <span>{label}</span>
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
              <option value="">{`Select ${label}`}</option>
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

  const handleSave = () => {
    console.log('Saving cash receipt:', newEntry);
    onClose();
  };

  return (
    <div className="w-full text-sm">
      {/* Section 1: Receipt Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Receipt Details</h3>
        <div className="grid grid-cols-5 gap-3">
          {renderInputField('Voucher Type', 'voucherType', newEntry.voucherType, { 
            type: 'dropdown', 
            options: ['Receipt'], 
            readOnly: true 
          })}
          {renderInputField('Date', 'date', newEntry.date, { 
            type: 'text', 
            placeholder: 'dd/mm/yyyy',
            readOnly: true,
            tooltip: 'Enter date in dd/mm/yyyy format'
          })}
          {renderInputField('Ref Type', 'refType', newEntry.refType, { 
            type: 'dropdown', 
            options: ['LR'] 
          })}
          {renderInputField('Branch', 'branch', newEntry.branch, { 
            type: 'dropdown', 
            options: ['AHMEDABAD'] 
          })}
          {renderInputField('Ref No', 'refNo', newEntry.refNo, { 
            type: 'text',
            placeholder: 'Enter reference number'
          })}
        </div>
      </div>

      {/* Section 2: Account Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Account Details</h3>
        <div className="space-y-4">
          {renderInputField('Opp. A/c', 'oppAC', newEntry.oppAC, { 
            tooltip: 'Select opposite account' 
          })}
          {renderInputField('Cash', 'cashBank', newEntry.cashBank, { 
            tooltip: 'Select cash account' 
          })}
          {renderInputField('Diff. A/c', 'diffAC', newEntry.diffAC, { 
            tooltip: 'Select difference account' 
          })}
          {renderInputField('Diff. A/c 2', 'diffAC2', newEntry.diffAC2, { 
            tooltip: 'Select second difference account' 
          })}
        </div>
      </div>

      {/* Section 3: Document Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Document Details</h3>
        <div className="grid grid-cols-5 gap-3">
          {renderInputField('Doc. No', 'docNo', newEntry.docNo, { 
            type: 'text',
            placeholder: 'Enter document number'
          })}
          {renderInputField('Doc. Date', 'docDate', newEntry.docDate, { 
            type: 'text',
            placeholder: 'dd/mm/yyyy'
          })}
        </div>
      </div>

      {/* Section 4: Narration */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Narration</h3>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">
            {renderInputField('Narration', 'narration', newEntry.narration, { 
              type: 'textarea',
              placeholder: 'Enter narration...'
            })}
          </div>
        </div>
      </div>
      <AccountSelectionPopup
        open={showAccountPopup}
        onClose={() => setShowAccountPopup(false)}
        onSelect={handleAccountSelect}
        accounts={accounts}
        title="Select Account"
      />
   
    </div>
  );
};

export default CashPaymentAddWindow;