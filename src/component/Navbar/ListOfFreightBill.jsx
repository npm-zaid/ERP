import React from 'react';
import TableLayout from '../TableLayout';

const ListOfFreightBill = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-01',
      accountName: 'ABC Enterprises',
      totalAmount: 12000,
      subTotal: 10000,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-02',
      accountName: 'XYZ Corp',
      totalAmount: 9500,
      subTotal: 8000,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-03',
      accountName: 'PQR Ltd',
      totalAmount: 15000,
      subTotal: 12500,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-04',
      accountName: 'LMN Industries',
      totalAmount: 8000,
      subTotal: 6500,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-05',
      accountName: 'RST Solutions',
      totalAmount: 18000,
      subTotal: 15000,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-06',
      accountName: 'UVW Traders',
      totalAmount: 11000,
      subTotal: 9000,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-07',
      accountName: 'GHI Enterprises',
      totalAmount: 14000,
      subTotal: 11500,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-08',
      accountName: 'JKL Corp',
      totalAmount: 10000,
      subTotal: 8200,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-09',
      accountName: 'MNO Ltd',
      totalAmount: 16000,
      subTotal: 13000,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-10',
      accountName: 'DEF Industries',
      totalAmount: 17000,
      subTotal: 14000,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Memo Date', field: 'memoDate' },
    { label: 'Account Name', field: 'accountName' },
    { label: 'Total Amount', field: 'totalAmount' },
    { label: 'SubTotal', field: 'subTotal' },
  ];

  const numericFields = ['totalAmount', 'subTotal'];

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
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      memoDate: '',
      accountName: 'ABC Enterprises',
      totalAmount: 0,
      subTotal: 0,
    },
    fieldMapping: (newEntry) => ({
      memoDate: newEntry.memoDate || '',
      accountName: newEntry.accountName || 'ABC Enterprises',
      totalAmount: newEntry.totalAmount || 0,
      subTotal: newEntry.subTotal || 0,
    }),
  };

  return (
    <TableLayout
      title="List of Freight Bill"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="freightBill"
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

export default ListOfFreightBill;