import React from 'react';
import TableLayout from '../TableLayout';

const ListOfTruckExpense = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      expNo: 'EX001',
      expDate: '2025-05-01',
      truckNo: 'MH04AB1234',
      accountName: 'Fuel',
      amount: 1500,
    },
    {
      selected: false,
      audited: false,
      expNo: 'EX002',
      expDate: '2025-05-02',
      truckNo: 'DL01CD5678',
      accountName: 'Maintenance',
      amount: 2500,
    },
    {
      selected: false,
      audited: false,
      expNo: 'EX003',
      expDate: '2025-05-03',
      truckNo: 'KA05EF9012',
      accountName: 'Toll',
      amount: 300,
    },
    {
      selected: false,
      audited: false,
      expNo: 'EX004',
      expDate: '2025-05-04',
      truckNo: 'TN07GH3456',
      accountName: 'Fuel',
      amount: 1800,
    },
    {
      selected: false,
      audited: false,
      expNo: 'EX005',
      expDate: '2025-05-05',
      truckNo: 'WB09IJ7890',
      accountName: 'Insurance',
      amount: 5000,
    },
    {
      selected: false,
      audited: false,
      expNo: 'EX006',
      expDate: '2025-05-06',
      truckNo: 'TG03KL1234',
      accountName: 'Maintenance',
      amount: 2200,
    },
    {
      selected: false,
      audited: false,
      expNo: 'EX007',
      expDate: '2025-05-07',
      truckNo: 'GJ01MN5678',
      accountName: 'Toll',
      amount: 400,
    },
    {
      selected: false,
      audited: false,
      expNo: 'EX008',
      expDate: '2025-05-08',
      truckNo: 'MH12OP9012',
      accountName: 'Fuel',
      amount: 1600,
    },
    {
      selected: false,
      audited: false,
      expNo: 'EX009',
      expDate: '2025-05-09',
      truckNo: 'RJ05QR3456',
      accountName: 'Driver Allowance',
      amount: 1000,
    },
    {
      selected: false,
      audited: false,
      expNo: 'EX010',
      expDate: '2025-05-10',
      truckNo: 'GJ09ST7890',
      accountName: 'Maintenance',
      amount: 2700,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Exp No', field: 'expNo' },
    { label: 'Exp Date', field: 'expDate' },
    { label: 'Truck No', field: 'truckNo' },
    { label: 'Account Name', field: 'accountName' },
    { label: 'Amount', field: 'amount' },
  ];

  const numericFields = ['amount'];

  const fieldConfig = {
    truckNo: {
      options: [
        'MH04AB1234',
        'DL01CD5678',
        'KA05EF9012',
        'TN07GH3456',
        'WB09IJ7890',
        'TG03KL1234',
        'GJ01MN5678',
        'MH12OP9012',
        'RJ05QR3456',
        'GJ09ST7890',
      ],
    },
    accountName: {
      options: [
        'Fuel',
        'Maintenance',
        'Toll',
        'Insurance',
        'Driver Allowance',
      ],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      expNo: '',
      expDate: '',
      truckNo: 'MH04AB1234',
      accountName: 'Fuel',
      amount: 0,
    },
    fieldMapping: (newEntry) => ({
      expNo: newEntry.expNo || '',
      expDate: newEntry.expDate || '',
      truckNo: newEntry.truckNo || 'MH04AB1234',
      accountName: newEntry.accountName || 'Fuel',
      amount: newEntry.amount || 0,
    }),
  };

  return (
    <TableLayout
      title="List of Truck Expense"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="truckExpense"
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

export default ListOfTruckExpense;