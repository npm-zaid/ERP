import React from 'react';
import TableLayout from '../TableLayout';

const ListOfUser = () => {
  const initialData = [
    {
      selected: false,
      name: 'John Doe',
      userName: 'johndoe',
      role: 'Admin',
      mobile: '9876543210',
      email: 'john.doe@example.com',
      active: true,
    },
    {
      selected: false,
      name: 'Jane Smith',
      userName: 'janesmith',
      role: 'Editor',
      mobile: '8765432109',
      email: 'jane.smith@example.com',
      active: true,
    },
    {
      selected: false,
      name: 'Alice Johnson',
      userName: 'alicej',
      role: 'Viewer',
      mobile: '7654321098',
      email: 'alice.johnson@example.com',
      active: false,
    },
    {
      selected: false,
      name: 'Bob Williams',
      userName: 'bobw',
      role: 'Editor',
      mobile: '6543210987',
      email: 'bob.williams@example.com',
      active: true,
    },
    {
      selected: false,
      name: 'Carol Davis',
      userName: 'carold',
      role: 'Admin',
      mobile: '5432109876',
      email: 'carol.davis@example.com',
      active: true,
    },
    {
      selected: false,
      name: 'David Wilson',
      userName: 'davidw',
      role: 'Viewer',
      mobile: '4321098765',
      email: 'david.wilson@example.com',
      active: false,
    },
    {
      selected: false,
      name: 'Eva Thomas',
      userName: 'evat',
      role: 'Editor',
      mobile: '3210987654',
      email: 'eva.thomas@example.com',
      active: true,
    },
    {
      selected: false,
      name: 'Frank Harris',
      userName: 'frankh',
      role: 'Admin',
      mobile: '2109876543',
      email: 'frank.harris@example.com',
      active: true,
    },
    {
      selected: false,
      name: 'Grace Lee',
      userName: 'gracel',
      role: 'Viewer',
      mobile: '1098765432',
      email: 'grace.lee@example.com',
      active: false,
    },
    {
      selected: false,
      name: 'Henry Clark',
      userName: 'henryc',
      role: 'Editor',
      mobile: '0987654321',
      email: 'henry.clark@example.com',
      active: true,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Name', field: 'name' },
    { label: 'User Name', field: 'userName' },
    { label: 'Role', field: 'role' },
    { label: 'Mobile', field: 'mobile' },
    { label: 'Email', field: 'email' },
    { label: 'Active', field: 'active' },
  ];

  const numericFields = ['mobile'];

  return (
    <TableLayout
      title="List of User"
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

export default ListOfUser;