import React from 'react';
import TableLayout from '../TableLayout';

const ListOfContra = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      no: 'CN001',
      accountName: 'Cash Account',
      amount: 5000,
      narration: 'Transfer from Bank to Cash',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      no: 'CN002',
      accountName: 'Bank Account',
      amount: 7000,
      narration: 'Transfer from Cash to Bank',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      no: 'CN003',
      accountName: 'Petty Cash',
      amount: 2000,
      narration: 'Cash withdrawal for office expenses',
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      no: 'CN004',
      accountName: 'Savings Account',
      amount: 10000,
      narration: 'Transfer from Current to Savings',
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      no: 'CN005',
      accountName: 'Cash Account',
      amount: 3000,
      narration: 'Cash deposit to Bank',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      no: 'CN006',
      accountName: 'Bank Account',
      amount: 8000,
      narration: 'Transfer from Savings to Current',
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      no: 'CN007',
      accountName: 'Petty Cash',
      amount: 1500,
      narration: 'Cash withdrawal for travel expenses',
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      no: 'CN008',
      accountName: 'Cash Account',
      amount: 6000,
      narration: 'Transfer from Bank to Cash',
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      no: 'CN009',
      accountName: 'Bank Account',
      amount: 9000,
      narration: 'Cash deposit to Bank',
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      no: 'CN010',
      accountName: 'Savings Account',
      amount: 12000,
      narration: 'Transfer from Current to Savings',
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
    { label: 'Narration', field: 'narration' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = ['amount'];

  const fieldConfig = {
    accountName: {
      options: [
        'Cash Account',
        'Bank Account',
        'Petty Cash',
        'Savings Account',
        'Current Account',
      ],
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
      accountName: 'Cash Account',
      amount: 0,
      narration: '',
      createdBy: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      no: newEntry.no || '',
      accountName: newEntry.accountName || 'Cash Account',
      amount: newEntry.amount || 0,
      narration: newEntry.narration || '',
      createdBy: newEntry.createdBy || 'John Doe',
    }),
  };

  return (
    <TableLayout
      title="List of Contra"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="contra"
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

export default ListOfContra;