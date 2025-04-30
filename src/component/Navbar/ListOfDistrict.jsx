import React from 'react';
import TableLayout from '../TableLayout';

const ListOfDistrict = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      district: 'Mumbai City',
      state: 'Maharashtra',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      district: 'North Delhi',
      state: 'Delhi',
      country: 'India',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      district: 'Bangalore Urban',
      state: 'Karnataka',
      country: 'India',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      district: 'Chennai',
      state: 'Tamil Nadu',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      district: 'Kolkata',
      state: 'West Bengal',
      country: 'India',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      district: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      district: 'Ahmedabad',
      state: 'Gujarat',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      district: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      district: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      district: 'Surat',
      state: 'Gujarat',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'District', field: 'district' },
    { label: 'State', field: 'state' },
    { label: 'Country', field: 'country' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = [];

  const fieldConfig = {
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
      district: '',
      state: 'Maharashtra',
      country: 'India',
      createdBy: 'Jay Bhavani Transport',
    },
    fieldMapping: (newEntry) => ({
      district: newEntry.district || '',
      state: newEntry.state || 'Maharashtra',
      country: newEntry.country || 'India',
      createdBy: newEntry.createdBy || 'Jay Bhavani Transport',
    }),
  };

  return (
    <TableLayout
      title="List of District"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="district"
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

export default ListOfDistrict;