import React from 'react';
import TableLayout from '../TableLayout';

const ListOfEstSalesInvoice = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      cashDebit: 'Cash',
      no: 'EST001',
      taxType: 'CGST',
      accountName: 'ABC Enterprises',
      salesAccount: 'Sales - Services',
      totalAmount: 15000,
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      cashDebit: 'Debit',
      no: 'EST002',
      taxType: 'SGST',
      accountName: 'XYZ Corp',
      salesAccount: 'Sales - Goods',
      totalAmount: 12000,
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      cashDebit: 'Cash',
      no: 'EST003',
      taxType: 'IGST',
      accountName: 'PQR Ltd',
      salesAccount: 'Sales - Services',
      totalAmount: 18000,
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      cashDebit: 'Debit',
      no: 'EST004',
      taxType: 'CGST',
      accountName: 'LMN Industries',
      salesAccount: 'Sales - Goods',
      totalAmount: 9000,
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      cashDebit: 'Cash',
      no: 'EST005',
      taxType: 'SGST',
      accountName: 'RST Solutions',
      salesAccount: 'Sales - Services',
      totalAmount: 20000,
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      cashDebit: 'Debit',
      no: 'EST006',
      taxType: 'IGST',
      accountName: 'UVW Traders',
      salesAccount: 'Sales - Goods',
      totalAmount: 11000,
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      cashDebit: 'Cash',
      no: 'EST007',
      taxType: 'CGST',
      accountName: 'GHI Enterprises',
      salesAccount: 'Sales - Services',
      totalAmount: 16000,
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      cashDebit: 'Debit',
      no: 'EST008',
      taxType: 'SGST',
      accountName: 'JKL Corp',
      salesAccount: 'Sales - Goods',
      totalAmount: 13000,
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      cashDebit: 'Cash',
      no: 'EST009',
      taxType: 'IGST',
      accountName: 'MNO Ltd',
      salesAccount: 'Sales - Services',
      totalAmount: 17000,
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      cashDebit: 'Debit',
      no: 'EST010',
      taxType: 'CGST',
      accountName: 'DEF Industries',
      salesAccount: 'Sales - Goods',
      totalAmount: 14000,
      createdBy: 'Anna Taylor',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'Cash/Debit', field: 'cashDebit' },
    { label: 'No', field: 'no' },
    { label: 'Tax Type', field: 'taxType' },
    { label: 'Account Name', field: 'accountName' },
    { label: 'Sales Account', field: 'salesAccount' },
    { label: 'Total Amount', field: 'totalAmount' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = ['totalAmount'];

  const fieldConfig = {
    cashDebit: {
      options: ['Cash', 'Debit'],
    },
    taxType: {
      options: ['CGST', 'SGST', 'IGST'],
    },
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
    salesAccount: {
      options: ['Sales - Goods', 'Sales - Services'],
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
      cashDebit: 'Cash',
      no: '',
      taxType: 'CGST',
      accountName: 'ABC Enterprises',
      salesAccount: 'Sales - Goods',
      totalAmount: 0,
      createdBy: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      cashDebit: newEntry.cashDebit || 'Cash',
      no: newEntry.no || '',
      taxType: newEntry.taxType || 'CGST',
      accountName: newEntry.accountName || 'ABC Enterprises',
      salesAccount: newEntry.salesAccount || 'Sales - Goods',
      totalAmount: newEntry.totalAmount || 0,
      createdBy: newEntry.createdBy || 'John Doe',
    }),
  };

  return (
    <TableLayout
      title="List of Estimated Sales Invoice"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="estSalesInvoice"
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

export default ListOfEstSalesInvoice;