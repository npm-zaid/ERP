import React from 'react';
import TableLayout from '../TableLayout';

const ListOfCountry = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      country: 'India',
      countryCode: 'IN',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      country: 'United States',
      countryCode: 'US',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      country: 'United Kingdom',
      countryCode: 'GB',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      country: 'Australia',
      countryCode: 'AU',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      country: 'Canada',
      countryCode: 'CA',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      country: 'Germany',
      countryCode: 'DE',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      country: 'France',
      countryCode: 'FR',
      createdBy: 'Jay Bhavani Transport',
    },
    {
      selected: false,
      audited: false,
      country: 'Japan',
      countryCode: 'JP',
      createdBy: 'Admin User',
    },
    {
      selected: false,
      audited: false,
      country: 'China',
      countryCode: 'CN',
      createdBy: 'Finance Team',
    },
    {
      selected: false,
      audited: false,
      country: 'Brazil',
      countryCode: 'BR',
      createdBy: 'Jay Bhavani Transport',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Country', field: 'country' },
    { label: 'Country Code', field: 'countryCode' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = [];

  const fieldConfig = {
    createdBy: {
      options: ['Jay Bhavani Transport', 'Admin User', 'Finance Team', 'Guest User'],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      country: '',
      countryCode: '',
      createdBy: 'Jay Bhavani Transport',
    },
    fieldMapping: (newEntry) => ({
      country: newEntry.country || '',
      countryCode: newEntry.countryCode || '',
      createdBy: newEntry.createdBy || 'Jay Bhavani Transport',
    }),
  };

  return (
    <TableLayout
      title="List of Country"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="country"
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

export default ListOfCountry;