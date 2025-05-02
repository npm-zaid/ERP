import React from 'react';
import TableLayout from '../TableLayout';

const ListOfCreditNote = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      no: 'CN001',
      accountName: 'ABC Enterprises',
      amount: 3000,
      notSorted: 'Yes',
      narration: 'Credit note for defective goods return',
      sortedAscending: 'No',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      no: 'CN002',
      accountName: 'XYZ Corp',
      amount: 1500,
      notSorted: 'No',
      narration: 'Credit note for overbilling adjustment',
      sortedAscending: 'Yes',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      no: 'CN003',
      accountName: 'PQR Ltd',
      amount: 5000,
      notSorted: 'Yes',
      narration: 'Credit note for cancelled order',
      sortedAscending: 'No',
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      no: 'CN004',
      accountName: 'LMN Industries',
      amount: 2000,
      notSorted: 'No',
      narration: 'Credit note for damaged goods',
      sortedAscending: 'Yes',
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      no: 'CN005',
      accountName: 'RST Solutions',
      amount: 4000,
      notSorted: 'Yes',
      narration: 'Credit note for pricing error',
      sortedAscending: 'No',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      no: 'CN006',
      accountName: 'UVW Traders',
      amount: 2500,
      notSorted: 'No',
      narration: 'Credit note for returned goods',
      sortedAscending: 'Yes',
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      no: 'CN007',
      accountName: 'GHI Enterprises',
      amount: 3500,
      notSorted: 'Yes',
      narration: 'Credit note for service cancellation',
      sortedAscending: 'No',
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      no: 'CN008',
      accountName: 'JKL Corp',
      amount: 1800,
      notSorted: 'No',
      narration: 'Credit note for billing adjustment',
      sortedAscending: 'Yes',
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      no: 'CN009',
      accountName: 'MNO Ltd',
      amount: 2700,
      notSorted: 'Yes',
      narration: 'Credit note for defective product',
      sortedAscending: 'No',
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      no: 'CN010',
      accountName: 'DEF Industries',
      amount: 3200,
      notSorted: 'No',
      narration: 'Credit note for order cancellation',
      sortedAscending: 'Yes',
      createdBy: 'Anna Taylor',
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
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = ['amount'];

  const fieldConfig = {
    accountName: {
      options: [
        'ABC Enterprises',
        'XYZ Corp',
        'PQR Ltd',
        'LMN Industries',
        'RST Solutions',
        'UVW Traders',
        'GHI Enterprises',
        'JKL Corp',
        'MNO Ltd',
        'DEF Industries',
      ],
    },
    notSorted: {
      options: ['Yes', 'No'],
    },
    sortedAscending: {
      options: ['Yes', 'No'],
    },
    createdBy: {
      options: [
        'John Doe',
        'Jane Smith',
        'Mike Brown',
        'Sarah Davis',
        'David Wilson',
        'Emily Clark',
        'Robert Lee',
        'Lisa Adams',
        'Chris Evans',
        'Anna Taylor',
      ],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      date: '',
      no: '',
      accountName: 'ABC Enterprises',
      amount: 0,
      notSorted: 'Yes',
      narration: '',
      sortedAscending: 'No',
      createdBy: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      no: newEntry.no || '',
      accountName: newEntry.accountName || 'ABC Enterprises',
      amount: newEntry.amount || 0,
      notSorted: newEntry.notSorted || 'Yes',
      narration: newEntry.narration || '',
      sortedAscending: newEntry.sortedAscending || 'No',
      createdBy: newEntry.createdBy || 'John Doe',
    }),
  };

  return (
    <TableLayout
      title="List of Credit Note"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="creditNote"
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

export default ListOfCreditNote;