import React, { useState } from 'react';

const AddAccountWindow = ({ newEntry, setNewEntry, handleModalSubmit, modal, isEditMode }) => {
  const [formData, setFormData] = useState({
    name: '', codeAlias: '', avcGroup: '', regType: '', transport: '', address: '', address2: '', address3: '',
    city: '', state: '', area: '', pin: '', phone: '', mobile: '', email: '', gstByTrans: '',
    contactPerson: '', contactPerson2: '', mobile2: '', fax: '', website: '', birthDate: '', weddingDate: '',
    message: '', bankName: '', branchName: '', bankAccNo: '', ifscCode: '', bankAddress: '', isLocked: false,
    capitalPercent: '', profitPercent: '', lossPercent: '', depreciationPercent: '', depreciationAvc: '',
    loanInterest: '', interestPayPercent: '', interestAvc: '', gstNo: '', panNo: '', aadharNo: '', avcNo: '',
    msmeNo: '', msmeType: '', creditLimit: '', creditDays: '', balance: '', balanceMethod: '', crDb: ''
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setNewEntry((prev) => ({
      ...prev,
      [field]: value,
    }));
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
        ) : type === 'checkbox' ? (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleInputChange(field, e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        ) : (
          <div className="relative">
            <input
              type={type}
              value={value || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={`${inputClasses} disabled:bg-gray-100 disabled:cursor-not-allowed ${field === 'birthDate' || field === 'weddingDate' ? 'pl-8' : ''}`}
              placeholder={placeholder}
              readOnly={readOnly}
            />
            {(field === 'birthDate' || field === 'weddingDate') && (
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
    if (!formData.name) {
      alert("Name is required!");
      return;
    }
    handleModalSubmit(formData);
  };

  return (
    <div className="text-sm w-full">
      {/* Section 1: Basic Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Basic Details</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('name', formData.name, { 
              type: 'text', 
              tooltip: 'Enter the account name (required)'
            })}
          </div>
          <div>
            {renderInputField('codeAlias', formData.codeAlias, { type: 'text' })}
          </div>
          <div>
            {renderInputField('avcGroup', formData.avcGroup, {
              type: 'dropdown',
              options: ['Sundry Debtors (A/Cs Receivable)', 'Corporate', 'SME', 'Retail'],
            })}
          </div>
          <div>
            {renderInputField('regType', formData.regType, {
              type: 'dropdown',
              options: ['Regular', 'Unregistered'],
            })}
          </div>
          <div>
            {renderInputField('transport', formData.transport, {
              type: 'dropdown',
              options: ['Self', 'Third Party'],
            })}
          </div>
          <div className="col-span-2">
            {renderInputField('address', formData.address, { type: 'text' })}
          </div>
          <div>
            {renderInputField('address2', formData.address2, { type: 'text' })}
          </div>
          <div>
            {renderInputField('address3', formData.address3, { type: 'text' })}
          </div>
          <div></div>
          <div>
            {renderInputField('city', formData.city, {
              type: 'dropdown',
              options: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Ahmedabad'],
            })}
          </div>
          <div>
            {renderInputField('state', formData.state, {
              type: 'dropdown',
              options: ['Maharashtra', 'Delhi', 'Karnataka', 'Gujarat'],
            })}
          </div>
          <div>
            {renderInputField('area', formData.area, {
              type: 'dropdown',
              options: ['Downtown', 'Suburbs', 'Industrial'],
            })}
          </div>
          <div>
            {renderInputField('pin', formData.pin, { type: 'text' })}
          </div>
          <div>
            {renderInputField('gstByTrans', formData.gstByTrans, {
              type: 'dropdown',
              options: ['Yes', 'No'],
            })}
          </div>
          <div>
            {renderInputField('phone', formData.phone, { type: 'text' })}
          </div>
          <div>
            {renderInputField('mobile', formData.mobile, { type: 'text' })}
          </div>
          <div>
            {renderInputField('email', formData.email, { type: 'email' })}
          </div>
          <div>
            {renderInputField('gstNo', formData.gstNo, { type: 'text' })}
          </div>
          <div>
            {renderInputField('avcType', formData.avcType, {
              type: 'dropdown',
              options: ['Type A', 'Type B'],
            })}
          </div>
          <div>
            {renderInputField('panNo', formData.panNo, { type: 'text' })}
          </div>
          <div>
            {renderInputField('aadharNo', formData.aadharNo, { type: 'text' })}
          </div>
          <div>
            {renderInputField('avcNo', formData.avcNo, { type: 'text' })}
          </div>
          <div>
            {renderInputField('msmeNo', formData.msmeNo, { type: 'text' })}
          </div>
          <div>
            {renderInputField('msmeType', formData.msmeType, {
              type: 'dropdown',
              options: ['Micro', 'Small', 'Medium'],
            })}
          </div>
          <div>
            {renderInputField('creditLimit', formData.creditLimit, { type: 'number' })}
          </div>
          <div>
            {renderInputField('creditDays', formData.creditDays, { type: 'number' })}
          </div>
          <div>
            {renderInputField('balance', formData.balance, { type: 'number' })}
          </div>
          <div>
            {renderInputField('balanceMethod', formData.balanceMethod, {
              type: 'dropdown',
              options: ['Bill By Bill', 'FIFO', 'LIFO'],
            })}
          </div>
          <div>
            {renderInputField('crDb', formData.crDb, {
              type: 'dropdown',
              options: ['Cr', 'Db'],
            })}
          </div>
        </div>
      </div>

      {/* Section 2: Personal Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Personal Details</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('contactPerson', formData.contactPerson, { type: 'text' })}
          </div>
          <div>
            {renderInputField('contactPerson2', formData.contactPerson2, { type: 'text' })}
          </div>
          <div>
            {renderInputField('mobile2', formData.mobile2, { type: 'text' })}
          </div>
          <div>
            {renderInputField('fax', formData.fax, { type: 'text' })}
          </div>
          <div>
            {renderInputField('website', formData.website, { type: 'text' })}
          </div>
          <div>
            {renderInputField('birthDate', formData.birthDate, { type: 'text' })}
          </div>
          <div>
            {renderInputField('weddingDate', formData.weddingDate, { type: 'text' })}
          </div>
          <div>
            {renderInputField('message', formData.message, { type: 'text' })}
          </div>
          <div>
            {renderInputField('isLocked', formData.isLocked, { type: 'checkbox' })}
          </div>
          <div></div>
          <div>
            {renderInputField('bankName', formData.bankName, { type: 'text' })}
          </div>
          <div>
            {renderInputField('branchName', formData.branchName, { type: 'text' })}
          </div>
          <div>
            {renderInputField('bankAccNo', formData.bankAccNo, { type: 'text' })}
          </div>
          <div>
            {renderInputField('ifscCode', formData.ifscCode, { type: 'text' })}
          </div>
          <div>
            {renderInputField('bankAddress', formData.bankAddress, { type: 'text' })}
          </div>
        </div>
      </div>

      {/* Section 3: Other Details */}
      <div className="bg-gray-200/60 p-2 rounded-lg mb-4">
        <h3 className="text-[13px] font-semibold text-gray-700 mb-2">Other Details</h3>
        <div className="grid grid-cols-5 gap-3">
          <div>
            {renderInputField('capitalPercent', formData.capitalPercent, { type: 'number' })}
          </div>
          <div>
            {renderInputField('profitPercent', formData.profitPercent, { type: 'number' })}
          </div>
          <div>
            {renderInputField('lossPercent', formData.lossPercent, { type: 'number' })}
          </div>
          <div>
            {renderInputField('depreciationPercent', formData.depreciationPercent, { type: 'number' })}
          </div>
          <div>
            {renderInputField('depreciationAvc', formData.depreciationAvc, {
              type: 'dropdown',
              options: ['Account A', 'Account B'],
            })}
          </div>
          <div>
            {renderInputField('loanInterest', formData.loanInterest, { type: 'number' })}
          </div>
          <div>
            {renderInputField('interestPayPercent', formData.interestPayPercent, { type: 'number' })}
          </div>
          <div>
            {renderInputField('interestAvc', formData.interestAvc, {
              type: 'dropdown',
              options: ['Account X', 'Account Y'],
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccountWindow;