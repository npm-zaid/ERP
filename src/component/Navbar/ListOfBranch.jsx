import React from 'react';
import TableLayout from '../TableLayout';

const ListOfBranch = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      branch: 'Mumbai Central',
      branchCode: 'MUM001',
      account: 'Bank Accounts (Banks)',
      contact: '+91-22-12345678',
      email: 'mumbai.central@jaybhavani.com',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      branch: 'Delhi North',
      branchCode: 'DEL002',
      account: 'Sundry Debtors',
      contact: '+91-11-98765432',
      email: 'delhi.north@jaybhavani.com',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      branch: 'Bangalore South',
      branchCode: 'BAN003',
      account: 'Cash-in-hand',
      contact: '+91-80-55556666',
      email: 'bangalore.south@jaybhavani.com',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      branch: 'Chennai East',
      branchCode: 'CHE004',
      account: 'Bank OCC a/c',
      contact: '+91-44-77778888',
      email: 'chennai.east@jaybhavani.com',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      branch: 'Kolkata West',
      branchCode: 'KOL005',
      account: 'Sundry Creditors',
      contact: '+91-33-22223333',
      email: 'kolkata.west@jaybhavani.com',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      branch: 'Hyderabad Central',
      branchCode: 'HYD006',
      account: 'Fixed Assets',
      contact: '+91-40-44445555',
      email: 'hyderabad.central@jaybhavani.com',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      branch: 'Ahmedabad North',
      branchCode: 'AHM007',
      account: 'Bank OD A/c',
      contact: '+91-79-66667777',
      email: 'ahmedabad.north@jaybhavani.com',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      branch: 'Pune West',
      branchCode: 'PUN008',
      account: 'Sales Account',
      contact: '+91-20-88889999',
      email: 'pune.west@jaybhavani.com',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      branch: 'Jaipur East',
      branchCode: 'JAI009',
      account: 'Purchase Account',
      contact: '+91-141-11112222',
      email: 'jaipur.east@jaybhavani.com',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      branch: 'Surat South',
      branchCode: 'SUR010',
      account: 'Investments',
      contact: '+91-261-33334444',
      email: 'surat.south@jaybhavani.com',
      createdBy: 'Finance Team',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Branch', field: 'branch' },
    { label: 'Branch Code', field: 'branchCode' },
    { label: 'Account', field: 'account' },
    { label: 'Contact', field: 'contact' },
    { label: 'Email', field: 'email' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = [];

  const fieldConfig = {
    account: {
      options: [
        'Bank Accounts (Banks)',
        'Sundry Debtors',
        'Cash-in-hand',
        'Bank OCC a/c',
        'Sundry Creditors',
        'Fixed Assets',
        'Bank OD A/c',
        'Sales Account',
        'Purchase Account',
        'Investments',
      ],
    },
    createdBy: {
      options: ['Jay Bhavani Transport', 'Admin User', 'Finance Team', 'Guest User'],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      branch: '',
      branchCode: '',
      account: 'Bank Accounts (Banks)',
      contact: '',
      email: '',
      createdBy: 'Jay Bhavani Transport',
    },
    fieldMapping: (newEntry) => ({
      branch: newEntry.branch || '',
      branchCode: newEntry.branchCode || '',
      account: newEntry.account || 'Bank Accounts (Banks)',
      contact: newEntry.contact || '',
      email: newEntry.email || '',
      createdBy: newEntry.createdBy || 'Jay Bhavani Transport',
    }),
  };

  return (
    <TableLayout
      title="List of Branch"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="branch"
      showAdd={true}
      showEdit={true}
      showView={true}
      showDelete={true}
      showRefresh={true}
      showPrint={true}
      showAudit={true}
      showField={true}
      showExportExcel={true}
      showExportPDF={true}
    />
  );
};

export default ListOfBranch;