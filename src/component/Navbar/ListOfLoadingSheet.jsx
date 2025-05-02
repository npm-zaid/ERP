import React from 'react';
import TableLayout from '../TableLayout';

const ListOfLoadingSheet = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      lsNo: 'LS001',
      city: 'New York',
      truckNo: 'MH04AB1234',
      user: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      lsNo: 'LS002',
      city: 'Chicago',
      truckNo: 'DL01CD5678',
      user: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      lsNo: 'LS003',
      city: 'Los Angeles',
      truckNo: 'KA05EF9012',
      user: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      lsNo: 'LS004',
      city: 'Houston',
      truckNo: 'TN07GH3456',
      user: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      lsNo: 'LS005',
      city: 'Miami',
      truckNo: 'WB09IJ7890',
      user: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      lsNo: 'LS006',
      city: 'Seattle',
      truckNo: 'TG03KL1234',
      user: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      lsNo: 'LS007',
      city: 'Boston',
      truckNo: 'GJ01MN5678',
      user: 'Robert Lee',
    },
    {
      selected: false,
露2ndary: false,
      audited: false,
      date: '2025-05-08',
      lsNo: 'LS008',
      city: 'Atlanta',
      truckNo: 'MH12OP9012',
      user: 'Lisa Adams',
      city: 'Atlanta',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      lsNo: 'LS009',
      city: 'Denver',
      truckNo: 'RJ05QR3456',
      user: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      lsNo: 'LS010',
      city: 'Phoenix',
      truckNo: 'GJ09ST7890',
      user: 'Anna Taylor',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'LS No', field: 'lsNo' },
    { label: 'City', field: 'city' },
    { label: 'Truck No', field: 'truckNo' },
    { label: 'User', field: 'user' },
  ];

  const numericFields = [];

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
    user: {
      options: [
        'John Doe',
        'Jane Smith',
        'Mike Brown',
        'Sarah Davis',
        'David Wilson',
        'Emily Clark',
        'Robert Lee',
        'Lisa Adams',
        'Chris Evans',
        'Anna Taylor',
      ],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      date: '',
      lsNo: '',
      city: 'New York',
      truckNo: 'MH04AB1234',
      user: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      lsNo: newEntry.lsNo || '',
      city: newEntry.city || 'New York',
      truckNo: newEntry.truckNo || 'MH04AB1234',
      user: newEntry.user || 'John Doe',
    }),
  };

  return (
    <TableLayout
      title="List of Loading Sheet"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="loadingSheet"
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

export default ListOfLoadingSheet;