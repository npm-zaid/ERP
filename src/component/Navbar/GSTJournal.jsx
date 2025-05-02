import React from 'react';
import TableLayout from '../TableLayout';

const GSTJournal = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      no: 'GSTJ001',
      name: 'ABC Enterprises',
      type: 'CGST',
      amount: 2500,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      no: 'GSTJ002',
      name: 'XYZ Corp',
      type: 'SGST',
      amount: 3000,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      no: 'GSTJ003',
      name: 'PQR Ltd',
      type: 'IGST',
      amount: 4000,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      no: 'GSTJ004',
      name: 'LMN Industries',
      type: 'CGST',
      amount: 2000,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      no: 'GSTJ005',
      name: 'RST Solutions',
      type: 'SGST',
      amount: 3500,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      no: 'GSTJ006',
      name: 'UVW Traders',
      type: 'IGST',
      amount: 2800,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      no: 'GSTJ007',
      name: 'GHI Enterprises',
      type: 'CGST',
      amount: 4500,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      no: 'GSTJ008',
      name: 'JKL Corp',
      type: 'SGST',
      amount: 3200,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      no: 'GSTJ009',
      name: 'MNO Ltd',
      type: 'IGST',
      amount: 2700,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      no: 'GSTJ010',
      name: 'DEF Industries',
      type: 'CGST',
      amount: 5000,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'No', field: 'no' },
    { label: 'Name', field: 'name' },
    { label: 'Type', field: 'type' },
    { label: 'Amount', field: 'amount' },
  ];

  const numericFields = ['amount'];

  const fieldConfig = {
    name: {
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
    type: {
      options: ['CGST', 'SGST', 'IGST'],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      date: '',
      no: '',
      name: 'ABC Enterprises',
      type: 'CGST',
      amount: 0,
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      no: newEntry.no || '',
      name: newEntry.name || 'ABC Enterprises',
      type: newEntry.type || 'CGST',
      amount: newEntry.amount || 0,
    }),
  };

  return (
    <TableLayout
      title="GST Journal"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="gstJournal"
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

export default GSTJournal;