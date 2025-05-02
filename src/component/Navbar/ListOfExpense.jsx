import React from 'react';
import TableLayout from '../TableLayout';

const ListOfExpense = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      no: 'EXP001',
      account: 'Fuel Expense',
      amount: 1200,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      no: 'EXP002',
      account: 'Maintenance Expense',
      amount: 3000,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      no: 'EXP003',
      account: 'Rent Expense',
      amount: 5000,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      no: 'EXP004',
      account: 'Utilities Expense',
      amount: 1500,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      no: 'EXP005',
      account: 'Travel Expense',
      amount: 2000,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      no: 'EXP006',
      account: 'Office Supplies',
      amount: 800,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      no: 'EXP007',
      account: 'Insurance Expense',
      amount: 4000,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      no: 'EXP008',
      account: 'Advertising Expense',
      amount: 2500,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      no: 'EXP009',
      account: 'Salaries Expense',
      amount: 10000,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      no: 'EXP010',
      account: 'Miscellaneous Expense',
      amount: 900,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'No', field: 'no' },
    { label: 'Account', field: 'account' },
    { label: 'Amount', field: 'amount' },
  ];

  const numericFields = ['amount'];

  const fieldConfig = {
    account: {
      options: [
        'Fuel Expense',
        'Maintenance Expense',
        'Rent Expense',
        'Utilities Expense',
        'Travel Expense',
        'Office Supplies',
        'Insurance Expense',
        'Advertising Expense',
        'Salaries Expense',
        'Miscellaneous Expense',
      ],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      date: '',
      no: '',
      account: 'Fuel Expense',
      amount: 0,
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      no: newEntry.no || '',
      account: newEntry.account || 'Fuel Expense',
      amount: newEntry.amount || 0,
    }),
  };

  return (
    <TableLayout
      title="List of Expense"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="expense"
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

export default ListOfExpense;