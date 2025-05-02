import React from 'react';
import TableLayout from '../TableLayout';

const StockInward = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      vouNo: 'SIN001',
      date: '2025-05-01',
      cashDebit: 'Cash',
      taxType: 'CGST',
      partyName: 'ABC Enterprises',
      amount: 10000,
      qty: 50,
    },
    {
      selected: false,
      audited: false,
      vouNo: 'SIN002',
      date: '2025-05-02',
      cashDebit: 'Debit',
      taxType: 'SGST',
      partyName: 'XYZ Corp',
      amount: 8000,
      qty: 40,
    },
    {
      selected: false,
      audited: false,
      vouNo: 'SIN003',
      date: '2025-05-03',
      cashDebit: 'Cash',
      taxType: 'IGST',
      partyName: 'PQR Ltd',
      amount: 12000,
      qty: 60,
    },
    {
      selected: false,
      audited: false,
      vouNo: 'SIN004',
      date: '2025-05-04',
      cashDebit: 'Debit',
      taxType: 'CGST',
      partyName: 'LMN Industries',
      amount: 9000,
      qty: 45,
    },
    {
      selected: false,
      audited: false,
      vouNo: 'SIN005',
      date: '2025-05-05',
      cashDebit: 'Cash',
      taxType: 'SGST',
      partyName: 'RST Solutions',
      amount: 15000,
      qty: 75,
    },
    {
      selected: false,
      audited: false,
      vouNo: 'SIN006',
      date: '2025-05-06',
      cashDebit: 'Debit',
      taxType: 'IGST',
      partyName: 'UVW Traders',
      amount: 11000,
      qty: 55,
    },
    {
      selected: false,
      audited: false,
      vouNo: 'SIN007',
      date: '2025-05-07',
      cashDebit: 'Cash',
      taxType: 'CGST',
      partyName: 'GHI Enterprises',
      amount: 13000,
      qty: 65,
    },
    {
      selected: false,
      audited: false,
      vouNo: 'SIN008',
      date: '2025-05-08',
      cashDebit: 'Debit',
      taxType: 'SGST',
      partyName: 'JKL Corp',
      amount: 9500,
      qty: 48,
    },
    {
      selected: false,
      audited: false,
      vouNo: 'SIN009',
      date: '2025-05-09',
      cashDebit: 'Cash',
      taxType: 'IGST',
      partyName: 'MNO Ltd',
      amount: 14000,
      qty: 70,
    },
    {
      selected: false,
      audited: false,
      vouNo: 'SIN010',
      date: '2025-05-10',
      cashDebit: 'Debit',
      taxType: 'CGST',
      partyName: 'DEF Industries',
      amount: 16000,
      qty: 80,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Vou No', field: 'vouNo' },
    { label: 'Date', field: 'date' },
    { label: 'C/D', field: 'cashDebit' },
    { label: 'Tax Type', field: 'taxType' },
    { label: 'Party Name', field: 'partyName' },
    { label: 'Amount', field: 'amount' },
    { label: 'Qty.', field: 'qty' },
  ];

  const numericFields = ['amount', 'qty'];

  const fieldConfig = {
    cashDebit: {
      options: ['Cash', 'Debit'],
    },
    taxType: {
      options: ['CGST', 'SGST', 'IGST'],
    },
    partyName: {
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
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      vouNo: '',
      date: '',
      cashDebit: 'Cash',
      taxType: 'CGST',
      partyName: 'ABC Enterprises',
      amount: 0,
      qty: 0,
    },
    fieldMapping: (newEntry) => ({
      vouNo: newEntry.vouNo || '',
      date: newEntry.date || '',
      cashDebit: newEntry.cashDebit || 'Cash',
      taxType: newEntry.taxType || 'CGST',
      partyName: newEntry.partyName || 'ABC Enterprises',
      amount: newEntry.amount || 0,
      qty: newEntry.qty || 0,
    }),
  };

  return (
    <TableLayout
      title="Stock Inward"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="stockInward"
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

export default StockInward;