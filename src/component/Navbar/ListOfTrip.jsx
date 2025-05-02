import React from 'react';
import TableLayout from '../TableLayout';

const ListOfTrip = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      tripNo: 'TR001',
      tripDate: '2025-05-01',
      truckNo: 'MH04AB1234',
      run: 450,
      memoNo: 'MT001',
      average: 12.5,
    },
    {
      selected: false,
      audited: false,
      tripNo: 'TR002',
      tripDate: '2025-05-02',
      truckNo: 'DL01CD5678',
      run: 380,
      memoNo: 'MT002',
      average: 11.8,
    },
    {
      selected: false,
      audited: false,
      tripNo: 'TR003',
      tripDate: '2025-05-03',
      truckNo: 'KA05EF9012',
      run: 520,
      memoNo: 'MT003',
      average: 13.2,
    },
    {
      selected: false,
      audited: false,
      tripNo: 'TR004',
      tripDate: '2025-05-04',
      truckNo: 'TN07GH3456',
      run: 410,
      memoNo: 'MT004',
      average: 12.0,
    },
    {
      selected: false,
      audited: false,
      tripNo: 'TR005',
      tripDate: '2025-05-05',
      truckNo: 'WB09IJ7890',
      run: 470,
      memoNo: 'MT005',
      average: 12.7,
    },
    {
      selected: false,
      audited: false,
      tripNo: 'TR006',
      tripDate: '2025-05-06',
      truckNo: 'TG03KL1234',
      run: 390,
      memoNo: 'MT006',
      average: 11.5,
    },
    {
      selected: false,
      audited: false,
      tripNo: 'TR007',
      tripDate: '2025-05-07',
      truckNo: 'GJ01MN5678',
      run: 500,
      memoNo: 'MT007',
      average: 13.0,
    },
    {
      selected: false,
      audited: false,
      tripNo: 'TR008',
      tripDate: '2025-05-08',
      truckNo: 'MH12OP9012',
      run: 430,
      memoNo: 'MT008',
      average: 12.3,
    },
    {
      selected: false,
      audited: false,
      tripNo: 'TR009',
      tripDate: '2025-05-09',
      truckNo: 'RJ05QR3456',
      run: 460,
      memoNo: 'MT009',
      average: 12.8,
    },
    {
      selected: false,
      audited: false,
      tripNo: 'TR010',
      tripDate: '2025-05-10',
      truckNo: 'GJ09ST7890',
      run: 480,
      memoNo: 'MT010',
      average: 13.1,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Trip No', field: 'tripNo' },
    { label: 'Trip Date', field: 'tripDate' },
    { label: 'Truck No', field: 'truckNo' },
    { label: 'Run', field: 'run' },
    { label: 'Memo No', field: 'memoNo' },
    { label: 'Average', field: 'average' },
  ];

  const numericFields = ['run', 'average'];

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
    memoNo: {
      options: [
        'MT001',
        'MT002',
        'MT003',
        'MT004',
        'MT005',
        'MT006',
        'MT007',
        'MT008',
        'MT009',
        'MT010',
      ],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      tripNo: '',
      tripDate: '',
      truckNo: 'MH04AB1234',
      run: 0,
      memoNo: 'MT001',
      average: 0,
    },
    fieldMapping: (newEntry) => ({
      tripNo: newEntry.tripNo || '',
      tripDate: newEntry.tripDate || '',
      truckNo: newEntry.truckNo || 'MH04AB1234',
      run: newEntry.run || 0,
      memoNo: newEntry.memoNo || 'MT001',
      average: newEntry.average || 0,
    }),
  };

  return (
    <TableLayout
      title="List of Trip"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="trip"
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

export default ListOfTrip;