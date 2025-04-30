import React from 'react';
import TableLayout from '../TableLayout';

const ListOfTruck = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      truckNo: 'MH04AB1234',
      permitNo: 'PERMIT/MH/2023/001',
      driver: 'Ramesh Patel',
      mobile: '+91-9876543210',
      owner: 'Jay Bhavani Transport',
      ownerMobile: '+91-9123456789',
    },
    {
      selected: false,
      audited: false,
      truckNo: 'DL01CD5678',
      permitNo: 'PERMIT/DL/2023/002',
      driver: 'Suresh Kumar',
      mobile: '+91-8765432109',
      owner: 'Delhi Logistics',
      ownerMobile: '+91-9012345678',
    },
    {
      selected: false,
      audited: false,
      truckNo: 'KA05EF9012',
      permitNo: 'PERMIT/KA/2023/003',
      driver: 'Venkat Rao',
      mobile: '+91-7654321098',
      owner: 'Bangalore Trans Co.',
      ownerMobile: '+91-8901234567',
    },
    {
      selected: false,
      audited: false,
      truckNo: 'TN07GH3456',
      permitNo: 'PERMIT/TN/2023/004',
      driver: 'Mohan Raj',
      mobile: '+91-6543210987',
      owner: 'Chennai Freight',
      ownerMobile: '+91-8790123456',
    },
    {
      selected: false,
      audited: false,
      truckNo: 'WB09IJ7890',
      permitNo: 'PERMIT/WB/2023/005',
      driver: 'Arjun Das',
      mobile: '+91-5432109876',
      owner: 'Kolkata Movers',
      ownerMobile: '+91-8689012345',
    },
    {
      selected: false,
      audited: false,
      truckNo: 'TG03KL1234',
      permitNo: 'PERMIT/TG/2023/006',
      driver: 'Srinivas Reddy',
      mobile: '+91-4321098765',
      owner: 'Hyderabad Transport',
      ownerMobile: '+91-8578901234',
    },
    {
      selected: false,
      audited: false,
      truckNo: 'GJ01MN5678',
      permitNo: 'PERMIT/GJ/2023/007',
      driver: 'Hitesh Shah',
      mobile: '+91-3210987654',
      owner: 'Ahmedabad Logistics',
      ownerMobile: '+91-8467890123',
    },
    {
      selected: false,
      audited: false,
      truckNo: 'MH12OP9012',
      permitNo: 'PERMIT/MH/2023/008',
      driver: 'Vikas Pawar',
      mobile: '+91-2109876543',
      owner: 'Pune Trans Co.',
      ownerMobile: '+91-8356789012',
    },
    {
      selected: false,
      audited: false,
      truckNo: 'RJ05QR3456',
      permitNo: 'PERMIT/RJ/2023/009',
      driver: 'Manoj Sharma',
      mobile: '+91-1098765432',
      owner: 'Jaipur Freight',
      ownerMobile: '+91-8245678901',
    },
    {
      selected: false,
      audited: false,
      truckNo: 'GJ09ST7890',
      permitNo: 'PERMIT/GJ/2023/010',
      driver: 'Kiran Desai',
      mobile: '+91-0987654321',
      owner: 'Surat Movers',
      ownerMobile: '+91-8134567890',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Truck No', field: 'truckNo' },
    { label: 'Permit No.', field: 'permitNo' },
    { label: 'Driver', field: 'driver' },
    { label: 'Mobile', field: 'mobile' },
    { label: 'Owner', field: 'owner' },
    { label: 'Owner Mobile', field: 'ownerMobile' },
  ];

  const numericFields = [];

  const fieldConfig = {
    driver: {
      options: [
        'Ramesh Patel',
        'Suresh Kumar',
        'Venkat Rao',
        'Mohan Raj',
        'Arjun Das',
        'Srinivas Reddy',
        'Hitesh Shah',
        'Vikas Pawar',
        'Manoj Sharma',
        'Kiran Desai',
      ],
    },
    owner: {
      options: [
        'Jay Bhavani Transport',
        'Delhi Logistics',
        'Bangalore Trans Co.',
        'Chennai Freight',
        'Kolkata Movers',
        'Hyderabad Transport',
        'Ahmedabad Logistics',
        'Pune Trans Co.',
        'Jaipur Freight',
        'Surat Movers',
      ],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      truckNo: '',
      permitNo: '',
      driver: 'Ramesh Patel',
      mobile: '',
      owner: 'Jay Bhavani Transport',
      ownerMobile: '',
    },
    fieldMapping: (newEntry) => ({
      truckNo: newEntry.truckNo || '',
      permitNo: newEntry.permitNo || '',
      driver: newEntry.driver || 'Ramesh Patel',
      mobile: newEntry.mobile || '',
      owner: newEntry.owner || 'Jay Bhavani Transport',
      ownerMobile: newEntry.ownerMobile || '',
    }),
  };

  return (
    <TableLayout
      title="List of Truck"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="truck"
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

export default ListOfTruck;