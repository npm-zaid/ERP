import React from 'react';
import TableLayout from '../TableLayout';

const AccountDetail = () => {
  const initialData = [
    {
      selected: false,
      partyName: 'ABC Corp',
      partyAlias: 'ABC',
      address: '123 Business Park',
      address2: 'Suite 101',
      address3: 'Industrial Area',
      city: 'Mumbai',
      mobile: '9876543210',
      partyGroup: 'Suppliers',
    },
    {
      selected: false,
      partyName: 'XYZ Ltd',
      partyAlias: 'XYZ',
      address: '456 Commerce Street',
      address2: '',
      address3: 'Downtown',
      city: 'Delhi',
      mobile: '8765432109',
      partyGroup: 'Customers',
    },
    {
      selected: false,
      partyName: 'DEF Inc',
      partyAlias: 'DEF',
      address: '789 Trade Center',
      address2: 'Floor 5',
      address3: '',
      city: 'Bangalore',
      mobile: '7654321098',
      partyGroup: 'Vendors',
    },
    {
      selected: false,
      partyName: 'GHI Co',
      partyAlias: 'GHI',
      address: '101 Market Road',
      address2: 'Block B',
      address3: 'Commercial Hub',
      city: 'Chennai',
      mobile: '6543210987',
      partyGroup: 'Suppliers',
    },
    {
      selected: false,
      partyName: 'JKL Enterprises',
      partyAlias: 'JKL',
      address: '202 Corporate Avenue',
      address2: '',
      address3: 'Business District',
      city: 'Hyderabad',
      mobile: '5432109876',
      partyGroup: 'Customers',
    },
    {
      selected: false,
      partyName: 'MNO Services',
      partyAlias: 'MNO',
      address: '303 Enterprise Zone',
      address2: 'Tower 1',
      address3: '',
      city: 'Pune',
      mobile: '4321098765',
      partyGroup: 'Vendors',
    },
    {
      selected: false,
      partyName: 'PQR Solutions',
      partyAlias: 'PQR',
      address: '404 Tech Park',
      address2: 'Unit 12',
      address3: 'IT Corridor',
      city: 'Kolkata',
      mobile: '3210987654',
      partyGroup: 'Suppliers',
    },
    {
      selected: false,
      partyName: 'STU Tech',
      partyAlias: 'STU',
      address: '505 Innovation Street',
      address2: '',
      address3: 'Tech Hub',
      city: 'Ahmedabad',
      mobile: '2109876543',
      partyGroup: 'Customers',
    },
    {
      selected: false,
      partyName: 'VWX Systems',
      partyAlias: 'VWX',
      address: '606 Industrial Estate',
      address2: 'Phase 2',
      address3: '',
      city: 'Jaipur',
      mobile: '1098765432',
      partyGroup: 'Vendors',
    },
    {
      selected: false,
      partyName: 'YZA Innovations',
      partyAlias: 'YZA',
      address: '707 Startup City',
      address2: 'Block C',
      address3: 'Innovation Zone',
      city: 'Gurgaon',
      mobile: '0987654321',
      partyGroup: 'Suppliers',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Party Name', field: 'partyName' },
    { label: 'Party Alias', field: 'partyAlias' },
    { label: 'Address', field: 'address' },
    { label: 'Address2', field: 'address2' },
    { label: 'Address3', field: 'address3' },
    { label: 'City', field: 'city' },
    { label: 'Mobile', field: 'mobile' },
    { label: 'Party Group', field: 'partyGroup' },
  ];

  const numericFields = ['mobile'];

  return (
    <TableLayout
      title="Account Detail"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
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

export default AccountDetail;