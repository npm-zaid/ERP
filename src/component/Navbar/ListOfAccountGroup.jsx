import React from 'react';
import TableLayout from '../TableLayout';

const ListOfAccountGroup = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      accountGroup: 'Bank Accounts (Banks)',
      groupUnder: 'Balance Sheet',
      groupType: 'EA',
      orderNo: 1,
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      accountGroup: 'Bank OCC a/c',
      groupUnder: 'Balance Sheet',
      groupType: 'EB',
      orderNo: 2,
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      accountGroup: 'Bank OD A/c',
      groupUnder: 'Balance Sheet',
      groupType: 'EC',
      orderNo: 3,
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      accountGroup: 'BROKER',
      groupUnder: 'Sundry Debtors (A/cs Receivable)',
      groupType: 'CD',
      orderNo: 4,
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      accountGroup: 'Cash-in-hand',
      groupUnder: 'Balance Sheet',
      groupType: 'CA',
      orderNo: 5,
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      accountGroup: 'Sundry Creditors',
      groupUnder: 'Balance Sheet',
      groupType: 'CB',
      orderNo: 6,
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      accountGroup: 'Sales Account',
      groupUnder: 'Income (Revenue)',
      groupType: 'SA',
      orderNo: 7,
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      accountGroup: 'Purchase Account',
      groupUnder: 'Expenses',
      groupType: 'PA',
      orderNo: 8,
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      accountGroup: 'Fixed Assets',
      groupUnder: 'Balance Sheet',
      groupType: 'FA',
      orderNo: 9,
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      accountGroup: 'Investments',
      groupUnder: 'Balance Sheet',
      groupType: 'IA',
      orderNo: 10,
      createdBy: 'Admin User',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Account Group', field: 'accountGroup' },
    { label: 'Group Under', field: 'groupUnder' },
    { label: 'Group Type', field: 'groupType' },
    { label: 'Order No', field: 'orderNo' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = ['orderNo'];

  const fieldConfig = {
    groupUnder: {
      options: [
        'Balance Sheet',
        'Income (Revenue)',
        'Expenses',
        'Sundry Debtors (A/cs Receivable)',
        'Sundry Creditors',
      ],
    },
    groupType: {
      options: ['EA', 'EB', 'EC', 'CD', 'CA', 'CB', 'SA', 'PA', 'FA', 'IA'],
    },
    createdBy: {
      options: ['Jay Bhavani Transport', 'Admin User', 'Finance Team', 'Guest User'],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      accountGroup: '',
      groupUnder: 'Balance Sheet',
      groupType: 'EA',
      orderNo: 0,
      createdBy: 'Jay Bhavani Transport',
    },
    fieldMapping: (newEntry) => ({
      accountGroup: newEntry.accountGroup || '',
      groupUnder: newEntry.groupUnder || 'Balance Sheet',
      groupType: newEntry.groupType || 'EA',
      orderNo: parseInt(newEntry.orderNo) || 0,
      createdBy: newEntry.createdBy || 'Jay Bhavani Transport',
    }),
  };

  return (
    <TableLayout
      title="List of Account Group"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="account-group"
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

export default ListOfAccountGroup;