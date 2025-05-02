import React from 'react';
import TableLayout from '../TableLayout';

const StockRemovalEntry = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      no: 'SRE001',
      date: '2025-05-01',
      truck: 'TRK001',
      removalDate: '2025-05-02',
    },
    {
      selected: false,
      audited: false,
      no: 'SRE002',
      date: '2025-05-02',
      truck: 'TRK002',
      removalDate: '2025-05-03',
    },
    {
      selected: false,
      audited: false,
      no: 'SRE003',
      date: '2025-05-03',
      truck: 'TRK003',
      removalDate: '2025-05-04',
    },
    {
      selected: false,
      audited: false,
      no: 'SRE004',
      date: '2025-05-04',
      truck: 'TRK004',
      removalDate: '2025-05-05',
    },
    {
      selected: false,
      audited: false,
      no: 'SRE005',
      date: '2025-05-05',
      truck: 'TRK005',
      removalDate: '2025-05-06',
    },
    {
      selected: false,
      audited: false,
      no: 'SRE006',
      date: '2025-05-06',
      truck: 'TRK006',
      removalDate: '2025-05-07',
    },
    {
      selected: false,
      audited: false,
      no: 'SRE007',
      date: '2025-05-07',
      truck: 'TRK007',
      removalDate: '2025-05-08',
    },
    {
      selected: false,
      audited: false,
      no: 'SRE008',
      date: '2025-05-08',
      truck: 'TRK008',
      removalDate: '2025-05-09',
    },
    {
      selected: false,
      audited: false,
      no: 'SRE009',
      date: '2025-05-09',
      truck: 'TRK009',
      removalDate: '2025-05-10',
    },
    {
      selected: false,
      audited: false,
      no: 'SRE010',
      date: '2025-05-10',
      truck: 'TRK010',
      removalDate: '2025-05-11',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'No', field: 'no' },
    { label: 'Date', field: 'date' },
    { label: 'Truck', field: 'truck' },
    { label: 'Removal Date', field: 'removalDate' },
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
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      no: '',
      date: '',
      truck: 'TRK001',
      removalDate: '',
    },
    fieldMapping: (newEntry) => ({
      no: newEntry.no || '',
      date: newEntry.date || '',
      truck: newEntry.truck || 'TRK001',
      removalDate: newEntry.removalDate || '',
    }),
  };

  return (
    <TableLayout
      title="Stock Removal Entry"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="stockRemovalEntry"
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

export default StockRemovalEntry;