import React from 'react';
import TableLayout from '../TableLayout';

const ListOfArea = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      area: 'Bandra',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      area: 'Connaught Place',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      area: 'Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      area: 'T. Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      area: 'Salt Lake',
      city: 'Kolkata',
      state: 'West Bengal',
      country: 'India',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      area: 'Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      area: 'Navrangpura',
      city: 'Ahmedabad',
      state: 'Gujarat',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      area: 'Koregaon Park',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      area: 'Civil Lines',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      area: 'Adajan',
      city: 'Surat',
      state: 'Gujarat',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Area', field: 'area' },
    { label: 'City', field: 'city' },
    { label: 'State', field: 'state' },
    { label: 'Country', field: 'country' },
    { label: 'Created By', field: 'createdBy' },
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
    state: {
      options: [
        'Maharashtra',
        'Delhi',
        'Karnataka',
        'Tamil Nadu',
        'West Bengal',
        'Telangana',
        'Gujarat',
        'Rajasthan',
      ],
    },
    country: {
      options: ['India', 'USA', 'UK', 'Australia'],
    },
    createdBy: {
      options: ['Jay Bhavani Transport', 'Admin User', 'Finance Team', 'Guest User'],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      area: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
    fieldMapping: (newEntry) => ({
      area: newEntry.area || '',
      city: newEntry.city || 'Mumbai',
      state: newEntry.state || 'Maharashtra',
      country: newEntry.country || 'India',
      createdBy: newEntry.createdBy || 'Jay Bhavani Transport',
    }),
  };

  return (
    <TableLayout
      title="List of Area"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="area"
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

export default ListOfArea;