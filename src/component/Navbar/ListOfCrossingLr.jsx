import React from 'react';
import TableLayout from '../TableLayout';

const ListOfCrossingLr = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      crossingDate: '2025-05-01',
      crossingNo: 'CR123',
      city: 'New York',
      freight: 5000,
      balanceFreight: 1000,
    },
    {
      selected: false,
      audited: false,
      crossingDate: '2025-05-02',
      crossingNo: 'CR124',
      city: 'Chicago',
      freight: 3000,
      balanceFreight: 500,
    },
    {
      selected: false,
      audited: false,
      crossingDate: '2025-05-03',
      crossingNo: 'CR125',
      city: 'Los Angeles',
      freight: 4500,
      balanceFreight: 800,
    },
    {
      selected: false,
      audited: false,
      crossingDate: '2025-05-04',
      crossingNo: 'CR126',
      city: 'Houston',
      freight: 6000,
      balanceFreight: 1200,
    },
    {
      selected: false,
      audited: false,
      crossingDate: '2025-05-05',
      crossingNo: 'CR127',
      city: 'Miami',
      freight: 3500,
      balanceFreight: 700,
    },
    {
      selected: false,
      audited: false,
      crossingDate: '2025-05-06',
      crossingNo: 'CR128',
      city: 'Seattle',
      freight: 5200,
      balanceFreight: 1100,
    },
    {
      selected: false,
      audited: false,
      crossingDate: '2025-05-07',
      crossingNo: 'CR129',
      city: 'Boston',
      freight: 4800,
      balanceFreight: 900,
    },
    {
      selected: false,
      audited: false,
      crossingDate: '2025-05-08',
      crossingNo: 'CR130',
      city: 'Atlanta',
      freight: 4100,
      balanceFreight: 600,
    },
    {
      selected: false,
      audited: false,
      crossingDate: '2025-05-09',
      crossingNo: 'CR131',
      city: 'Denver',
      freight: 3900,
      balanceFreight: 750,
    },
    {
      selected: false,
      audited: false,
      crossingDate: '2025-05-10',
      crossingNo: 'CR132',
      city: 'Phoenix',
      freight: 5500,
      balanceFreight: 1300,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Crossing Date', field: 'crossingDate' },
    { label: 'Crossing No', field: 'crossingNo' },
    { label: 'City', field: 'city' },
    { label: 'Freight', field: 'freight' },
    { label: 'Balance Freight', field: 'balanceFreight' },
  ];

  const numericFields = ['freight', 'balanceFreight'];

  const fieldConfig = {
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
      crossingDate: '',
      crossingNo: '',
      city: 'New York',
      freight: 0,
      balanceFreight: 0,
    },
    fieldMapping: (newEntry) => ({
      crossingDate: newEntry.crossingDate || '',
      crossingNo: newEntry.crossingNo || '',
      city: newEntry.city || 'New York',
      freight: newEntry.freight || 0,
      balanceFreight: newEntry.balanceFreight || 0,
    }),
  };

  return (
    <TableLayout
      title="List of Crossing LR"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="crossingLr"
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

export default ListOfCrossingLr;