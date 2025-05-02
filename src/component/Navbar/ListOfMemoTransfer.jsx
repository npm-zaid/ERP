import React from 'react';
import TableLayout from '../TableLayout';

const ListOfMemoTransfer = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-01',
      memoNo: 'MT001',
      transporter: 'ABC Transports',
      city: 'New York',
      freight: 5000,
      weight: 1200,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-02',
      memoNo: 'MT002',
      transporter: 'DEF Logistics',
      city: 'Chicago',
      freight: 3500,
      weight: 900,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-03',
      memoNo: 'MT003',
      transporter: 'GHI Freight',
      city: 'Los Angeles',
      freight: 4200,
      weight: 1100,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-04',
      memoNo: 'MT004',
      transporter: 'JKL Movers',
      city: 'Houston',
      freight: 6000,
      weight: 1500,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-05',
      memoNo: 'MT005',
      transporter: 'MNO Transport',
      city: 'Miami',
      freight: 3800,
      weight: 950,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-06',
      memoNo: 'MT006',
      transporter: 'PQR Logistics',
      city: 'Seattle',
      freight: 5100,
      weight: 1300,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-07',
      memoNo: 'MT007',
      transporter: 'STU Freight',
      city: 'Boston',
      freight: 4600,
      weight: 1050,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-08',
      memoNo: 'MT008',
      transporter: 'VWX Trans Co.',
      city: 'Atlanta',
      freight: 3900,
      weight: 1000,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-09',
      memoNo: 'MT009',
      transporter: 'YZA Movers',
      city: 'Denver',
      freight: 4300,
      weight: 1150,
    },
    {
      selected: false,
      audited: false,
      memoDate: '2025-05-10',
      memoNo: 'MT010',
      transporter: 'BCD Transport',
      city: 'Phoenix',
      freight: 5700,
      weight: 1400,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Memo Date', field: 'memoDate' },
    { label: 'Memo No', field: 'memoNo' },
    { label: 'Transporter', field: 'transporter' },
    { label: 'City', field: 'city' },
    { label: 'Freight', field: 'freight' },
    { label: 'Weight', field: 'weight' },
  ];

  const numericFields = ['freight', 'weight'];

  const fieldConfig = {
    transporter: {
      options: [
        'ABC Transports',
        'DEF Logistics',
        'GHI Freight',
        'JKL Movers',
        'MNO Transport',
        'PQR Logistics',
        'STU Freight',
        'VWX Trans Co.',
        'YZA Movers',
        'BCD Transport',
      ],
    },
    city: {
      options: [
        'New York',
        'Chicago',
        'Los Angeles',
        'Houston',
        'Miami',
        'Seattle',
        'Boston',
        'Atlanta',
        'Denver',
        'Phoenix',
      ],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      memoDate: '',
      memoNo: '',
      transporter: 'ABC Transports',
      city: 'New York',
      freight: 0,
      weight: 0,
    },
    fieldMapping: (newEntry) => ({
      memoDate: newEntry.memoDate || '',
      memoNo: newEntry.memoNo || '',
      transporter: newEntry.transporter || 'ABC Transports',
      city: newEntry.city || 'New York',
      freight: newEntry.freight || 0,
      weight: newEntry.weight || 0,
    }),
  };

  return (
    <TableLayout
      title="List of Memo Transfer"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="memoTransfer"
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

export default ListOfMemoTransfer;