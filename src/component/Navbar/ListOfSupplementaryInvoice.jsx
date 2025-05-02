import React from 'react';
import TableLayout from '../TableLayout';

const ListOfSupplementaryInvoice = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      billNo: 'SUP001',
      billDate: '2025-05-01',
      partyName: 'ABC Enterprises',
      totalAmount: 10000,
    },
    {
      selected: false,
      audited: false,
      billNo: 'SUP002',
      billDate: '2025-05-02',
      partyName: 'XYZ Corp',
      totalAmount: 7500,
    },
    {
      selected: false,
      audited: false,
      billNo: 'SUP003',
      billDate: '2025-05-03',
      partyName: 'PQR Ltd',
      totalAmount: 12000,
    },
    {
      selected: false,
      audited: false,
      billNo: 'SUP004',
      billDate: '2025-05-04',
      partyName: 'LMN Industries',
      totalAmount: 9000,
    },
    {
      selected: false,
      audited: false,
      billNo: 'SUP005',
      billDate: '2025-05-05',
      partyName: 'RST Solutions',
      totalAmount: 15000,
    },
    {
      selected: false,
      audited: false,
      billNo: 'SUP006',
      billDate: '2025-05-06',
      partyName: 'UVW Traders',
      totalAmount: 8000,
    },
    {
      selected: false,
      audited: false,
      billNo: 'SUP007',
      billDate: '2025-05-07',
      partyName: 'GHI Enterprises',
      totalAmount: 11000,
    },
    {
      selected: false,
      audited: false,
      billNo: 'SUP008',
      billDate: '2025-05-08',
      partyName: 'JKL Corp',
      totalAmount: 9500,
    },
    {
      selected: false,
      audited: false,
      billNo: 'SUP009',
      billDate: '2025-05-09',
      partyName: 'MNO Ltd',
      totalAmount: 13000,
    },
    {
      selected: false,
      audited: false,
      billNo: 'SUP010',
      billDate: '2025-05-10',
      partyName: 'DEF Industries',
      totalAmount: 14000,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Bill No', field: 'billNo' },
    { label: 'Bill Date', field: 'billDate' },
    { label: 'Party Name', field: 'partyName' },
    { label: 'Total Amount', field: 'totalAmount' },
  ];

  const numericFields = ['totalAmount'];

  const fieldConfig = {
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
      billNo: '',
      billDate: '',
      partyName: 'ABC Enterprises',
      totalAmount: 0,
    },
    fieldMapping: (newEntry) => ({
      billNo: newEntry.billNo || '',
      billDate: newEntry.billDate || '',
      partyName: newEntry.partyName || 'ABC Enterprises',
      totalAmount: newEntry.totalAmount || 0,
    }),
  };

  return (
    <TableLayout
      title="List of Supplementary Invoice"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="supplementaryInvoice"
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

export default ListOfSupplementaryInvoice;