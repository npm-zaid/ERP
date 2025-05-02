import React from 'react';
import TableLayout from '../TableLayout';

const StockOutward = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      no: 'SOUT001',
      date: '2025-05-01',
      truck: 'TRK001',
      labour: '2 Workers',
    },
    {
      selected: false,
      audited: false,
      no: 'SOUT002',
      date: '2025-05-02',
      truck: 'TRK002',
      labour: '3 Workers',
    },
    {
      selected: false,
      audited: false,
      no: 'SOUT003',
      date: '2025-05-03',
      truck: 'TRK003',
      labour: '1 Worker',
    },
    {
      selected: false,
      audited: false,
      no: 'SOUT004',
      date: '2025-05-04',
      truck: 'TRK004',
      labour: '4 Workers',
    },
    {
      selected: false,
      audited: false,
      no: 'SOUT005',
      date: '2025-05-05',
      truck: 'TRK005',
      labour: '2 Workers',
    },
    {
      selected: false,
      audited: false,
      no: 'SOUT006',
      date: '2025-05-06',
      truck: 'TRK006',
      labour: '3 Workers',
    },
    {
      selected: false,
      audited: false,
      no: 'SOUT007',
      date: '2025-05-07',
      truck: 'TRK007',
      labour: '2 Workers',
    },
    {
      selected: false,
      audited: false,
      no: 'SOUT008',
      date: '2025-05-08',
      truck: 'TRK008',
      labour: '1 Worker',
    },
    {
      selected: false,
      audited: false,
      no: 'SOUT009',
      date: '2025-05-09',
      truck: 'TRK009',
      labour: '3 Workers',
    },
    {
      selected: false,
      audited: false,
      no: 'SOUT010',
      date: '2025-05-10',
      truck: 'TRK010',
      labour: '2 Workers',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'No', field: 'no' },
    { label: 'Date', field: 'date' },
    { label: 'Truck', field: 'truck' },
    { label: 'Labour', field: 'labour' },
  ];

  const numericFields = [];

  const fieldConfig = {
    truck: {
      options: [
        'TRK001',
        'TRK002',
        'TRK003',
        'TRK004',
        'TRK005',
        'TRK006',
        'TRK007',
        'TRK008',
        'TRK009',
        'TRK010',
      ],
    },
    labour: {
      options: [
        '1 Worker',
        '2 Workers',
        '3 Workers',
        '4 Workers',
      ],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      no: '',
      date: '',
      truck: 'TRK001',
      labour: '1 Worker',
    },
    fieldMapping: (newEntry) => ({
      no: newEntry.no || '',
      date: newEntry.date || '',
      truck: newEntry.truck || 'TRK001',
      labour: newEntry.labour || '1 Worker',
    }),
  };

  return (
    <TableLayout
      title="Stock Outward"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="stockOutward"
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

export default StockOutward;