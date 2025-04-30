import React from 'react';
import TableLayout from '../TableLayout';

const ListOfTruckDriver = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      driver: 'Ramesh Patel',
      mobile: '+91-9876543210',
      licNo: 'MH0120230001234',
      city: 'Mumbai',
    },
    {
      selected: false,
      audited: false,
      driver: 'Suresh Kumar',
      mobile: '+91-8765432109',
      licNo: 'DL0120230005678',
      city: 'Delhi',
    },
    {
      selected: false,
      audited: false,
      driver: 'Venkat Rao',
      mobile: '+91-7654321098',
      licNo: 'KA0120230009012',
      city: 'Bangalore',
    },
    {
      selected: false,
      audited: false,
      driver: 'Mohan Raj',
      mobile: '+91-6543210987',
      licNo: 'TN0120230003456',
      city: 'Chennai',
    },
    {
      selected: false,
      audited: false,
      driver: 'Arjun Das',
      mobile: '+91-5432109876',
      licNo: 'WB0120230007890',
      city: 'Kolkata',
    },
    {
      selected: false,
      audited: false,
      driver: 'Srinivas Reddy',
      mobile: '+91-4321098765',
      licNo: 'TG0120230001234',
      city: 'Hyderabad',
    },
    {
      selected: false,
      audited: false,
      driver: 'Hitesh Shah',
      mobile: '+91-3210987654',
      licNo: 'GJ0120230005678',
      city: 'Ahmedabad',
    },
    {
      selected: false,
      audited: false,
      driver: 'Vikas Pawar',
      mobile: '+91-2109876543',
      licNo: 'MH0120230009012',
      city: 'Pune',
    },
    {
      selected: false,
      audited: false,
      driver: 'Manoj Sharma',
      mobile: '+91-1098765432',
      licNo: 'RJ0120230003456',
      city: 'Jaipur',
    },
    {
      selected: false,
      audited: false,
      driver: 'Kiran Desai',
      mobile: '+91-0987654321',
      licNo: 'GJ0120230007890',
      city: 'Surat',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Driver', field: 'driver' },
    { label: 'Mobile', field: 'mobile' },
    { label: 'Lic No', field: 'licNo' },
    { label: 'City', field: 'city' },
  ];

  const numericFields = [];

  const fieldConfig = {
    city: {
      options: [
        'Mumbai',
        'Delhi',
        'Bangalore',
        'Chennai',
        'Kolkata',
        'Hyderabad',
        'Ahmedabad',
        'Pune',
        'Jaipur',
        'Surat',
      ],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      driver: '',
      mobile: '',
      licNo: '',
      city: 'Mumbai',
    },
    fieldMapping: (newEntry) => ({
      driver: newEntry.driver || '',
      mobile: newEntry.mobile || '',
      licNo: newEntry.licNo || '',
      city: newEntry.city || 'Mumbai',
    }),
  };

  return (
    <TableLayout
      title="List of Truck Driver"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="truckDriver"
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

export default ListOfTruckDriver;