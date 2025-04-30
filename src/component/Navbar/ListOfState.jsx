import React from 'react';
import TableLayout from '../TableLayout';

const ListOfState = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      state: 'Maharashtra',
      country: 'India',
      stateCode: 'MH',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      state: 'Delhi',
      country: 'India',
      stateCode: 'DL',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      state: 'Karnataka',
      country: 'India',
      stateCode: 'KA',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      state: 'Tamil Nadu',
      country: 'India',
      stateCode: 'TN',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      state: 'West Bengal',
      country: 'India',
      stateCode: 'WB',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      state: 'Telangana',
      country: 'India',
      stateCode: 'TG',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      state: 'Gujarat',
      country: 'India',
      stateCode: 'GJ',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      state: 'Rajasthan',
      country: 'India',
      stateCode: 'RJ',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      state: 'Uttar Pradesh',
      country: 'India',
      stateCode: 'UP',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      state: 'Punjab',
      country: 'India',
      stateCode: 'PB',
      createdBy: 'Finance Team',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'State', field: 'state' },
    { label: 'Country', field: 'country' },
    { label: 'State Code', field: 'stateCode' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = [];

  const fieldConfig = {
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
      state: '',
      country: 'India',
      stateCode: '',
      createdBy: 'Jay Bhavani Transport',
    },
    fieldMapping: (newEntry) => ({
      state: newEntry.state || '',
      country: newEntry.country || 'India',
      stateCode: newEntry.stateCode || '',
      createdBy: newEntry.createdBy || 'Jay Bhavani Transport',
    }),
  };

  return (
    <TableLayout
      title="List of State"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="state"
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

export default ListOfState;