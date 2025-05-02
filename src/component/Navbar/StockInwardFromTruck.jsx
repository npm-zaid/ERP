import React from 'react';
import TableLayout from '../TableLayout';

const StockInwardFromTruck = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      no: 'SIT001',
      truckNo: 'TRK001',
      meterReading: 12500,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      no: 'SIT002',
      truckNo: 'TRK002',
      meterReading: 13000,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      no: 'SIT003',
      truckNo: 'TRK003',
      meterReading: 12850,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      no: 'SIT004',
      truckNo: 'TRK004',
      meterReading: 13200,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      no: 'SIT005',
      truckNo: 'TRK005',
      meterReading: 12675,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      no: 'SIT006',
      truckNo: 'TRK006',
      meterReading: 13400,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      no: 'SIT007',
      truckNo: 'TRK007',
      meterReading: 12925,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      no: 'SIT008',
      truckNo: 'TRK008',
      meterReading: 13150,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      no: 'SIT009',
      truckNo: 'TRK009',
      meterReading: 12780,
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      no: 'SIT010',
      truckNo: 'TRK010',
      meterReading: 13500,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'No', field: 'no' },
    { label: 'Truck No', field: 'truckNo' },
    { label: 'Meter Reading', field: 'meterReading' },
  ];

  const numericFields = ['meterReading'];

  const fieldConfig = {
    truckNo: {
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
      date: '',
      no: '',
      truckNo: 'TRK001',
      meterReading: 0,
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      no: newEntry.no || '',
      truckNo: newEntry.truckNo || 'TRK001',
      meterReading: newEntry.meterReading || 0,
    }),
  };

  return (
    <TableLayout
      title="Stock Inward From Truck"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="stockInwardFromTruck"
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

export default StockInwardFromTruck;