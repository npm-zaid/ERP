import React from 'react';
import TableLayout from '../TableLayout';

const ListOfCity = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      cityName: 'Mumbai',
      stateName: 'Maharashtra',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      cityName: 'Delhi',
      stateName: 'Delhi',
      country: 'India',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      cityName: 'Bangalore',
      stateName: 'Karnataka',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      cityName: 'Chennai',
      stateName: 'Tamil Nadu',
      country: 'India',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      cityName: 'Kolkata',
      stateName: 'West Bengal',
      country: 'India',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      cityName: 'Hyderabad',
      stateName: 'Telangana',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      cityName: 'Ahmedabad',
      stateName: 'Gujarat',
      country: 'India',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      cityName: 'Pune',
      stateName: 'Maharashtra',
      country: 'India',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      cityName: 'Jaipur',
      stateName: 'Rajasthan',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      cityName: 'Surat',
      stateName: 'Gujarat',
      country: 'India',
      createdBy: 'Finance Team',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'City Name', field: 'cityName' },
    { label: 'State Name', field: 'stateName' },
    { label: 'Country', field: 'country' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = [];

  const fieldConfig = {
    stateName: {
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
      cityName: '',
      stateName: 'Maharashtra',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
    fieldMapping: (newEntry) => ({
      cityName: newEntry.cityName || '',
      stateName: newEntry.stateName || 'Maharashtra',
      country: newEntry.country || 'India',
      createdBy: newEntry.createdBy || 'Jay Bhavani Transport',
    }),
  };

  return (
    <TableLayout
      title="List of City"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="city"
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

export default ListOfCity;