import React from 'react';
import TableLayout from '../TableLayout';

const ListOfJournal = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      no: 'JN001',
      accountName: 'Rent Expense',
      amount: 5000,
      notSorted: 'No',
      narration: 'Monthly office rent payment',
      sortedAscending: 'Yes',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      no: 'JN002',
      accountName: 'Utilities Expense',
      amount: 2000,
      notSorted: 'Yes',
      narration: 'Electricity bill payment',
      sortedAscending: 'No',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      no: 'JN003',
      accountName: 'Salaries Expense',
      amount: 15000,
      notSorted: 'No',
      narration: 'Monthly salary disbursement',
      sortedAscending: 'Yes',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      no: 'JN004',
      accountName: 'Depreciation Expense',
      amount: 3000,
      notSorted: 'Yes',
      narration: 'Depreciation for equipment',
      sortedAscending: 'No',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      no: 'JN005',
      accountName: 'Advertising Expense',
      amount: 4000,
      notSorted: 'No',
      narration: 'Marketing campaign cost',
      sortedAscending: 'Yes',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      no: 'JN006',
      accountName: 'Travel Expense',
      amount: 2500,
      notSorted: 'Yes',
      narration: 'Business travel reimbursement',
      sortedAscending: 'No',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      no: 'JN007',
      accountName: 'Office Supplies',
      amount: 1000,
      notSorted: 'No',
      narration: 'Purchase of office stationery',
      sortedAscending: 'Yes',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      no: 'JN008',
      accountName: 'Insurance Expense',
      amount: 3500,
      notSorted: 'Yes',
      narration: 'Annual insurance premium',
      sortedAscending: 'No',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      no: 'JN009',
      accountName: 'Repairs Expense',
      amount: 2800,
      notSorted: 'No',
      narration: 'Vehicle repair costs',
      sortedAscending: 'Yes',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      no: 'JN010',
      accountName: 'Miscellaneous Expense',
      amount: 1500,
      notSorted: 'Yes',
      narration: 'Miscellaneous office expenses',
      sortedAscending: 'No',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'No', field: 'no' },
    { label: 'Account Name', field: 'accountName' },
    { label: 'Amount', field: 'amount' },
    { label: 'Not Sorted', field: 'notSorted' },
    { label: 'Narration', field: 'narration' },
    { label: 'Sorted Ascending', field: 'sortedAscending' },
  ];

  const numericFields = ['amount'];

  const fieldConfig = {
    accountName: {
      options: [
        'Rent Expense',
        'Utilities Expense',
        'Salaries Expense',
        'Depreciation Expense',
        'Advertising Expense',
        'Travel Expense',
        'Office Supplies',
        'Insurance Expense',
        'Repairs Expense',
        'Miscellaneous Expense',
      ],
    },
    notSorted: {
      options: ['Yes', 'No'],
    },
    sortedAscending: {
      options: ['Yes', 'No'],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      date: '',
      no: '',
      accountName: 'Rent Expense',
      amount: 0,
      notSorted: 'No',
      narration: '',
      sortedAscending: 'Yes',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      no: newEntry.no || '',
      accountName: newEntry.accountName || 'Rent Expense',
      amount: newEntry.amount || 0,
      notSorted: newEntry.notSorted || 'No',
      narration: newEntry.narration || '',
      sortedAscending: newEntry.sortedAscending || 'Yes',
    }),
  };

  return (
    <TableLayout
      title="List of Journal"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="journal"
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

export default ListOfJournal;