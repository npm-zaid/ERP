import React from 'react';
import TableLayout from '../TableLayout';

const ListOfTruckOwner = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      name: 'Jay Bhavani Transport',
      mobile: '+91-9123456789',
      address: 'Mumbai',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      name: 'Delhi Logistics',
      mobile: '+91-9012345678',
      address: 'Delhi',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      name: 'Bangalore Trans Co.',
      mobile: '+91-8901234567',
      address: 'Bangalore',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      name: 'Chennai Freight',
      mobile: '+91-8790123456',
      address: 'Chennai',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      name: 'Kolkata Movers',
      mobile: '+91-8689012345',
      address: 'Kolkata',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      name: 'Hyderabad Transport',
      mobile: '+91-8578901234',
      address: 'Hyderabad',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      name: 'Ahmedabad Logistics',
      mobile: '+91-8467890123',
      address: 'Ahmedabad',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      name: 'Pune Trans Co.',
      mobile: '+91-8356789012',
      address: 'Pune',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      name: 'Jaipur Freight',
      mobile: '+91-8245678901',
      address: 'Jaipur',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      name: 'Surat Movers',
      mobile: '+91-8134567890',
      address: 'Surat',
      createdBy: 'Admin User',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Name', field: 'name' },
    { label: 'Mobile', field: 'mobile' },
    { label: 'Address', field: 'address' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = [];

  const fieldConfig = {
    address: {
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
    createdBy: {
      options: ['Jay Bhavani Transport', 'Admin User', 'Finance Team', 'Guest User'],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      name: '',
      mobile: '',
      address: 'Mumbai',
      createdBy: 'Jay Bhavani Transport',
    },
    fieldMapping: (newEntry) => ({
      name: newEntry.name || '',
      mobile: newEntry.mobile || '',
      address: newEntry.address || 'Mumbai',
      createdBy: newEntry.createdBy || 'Jay Bhavani Transport',
    }),
  };

  return (
    <TableLayout
      title="List of Truck Owner"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="truckOwner"
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

export default ListOfTruckOwner;