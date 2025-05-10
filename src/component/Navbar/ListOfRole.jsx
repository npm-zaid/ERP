import React from 'react';
import TableLayout from '../TableLayout';

const ListOfRole = () => {
  const initialData = [
    {
      selected: false,
      role: 'Admin',
    },
    {
      selected: false,
      role: 'Editor',
    },
    {
      selected: false,
      role: 'Viewer',
    },
    {
      selected: false,
      role: 'Manager',
    },
    {
      selected: false,
      role: 'Accountant',
    },
    {
      selected: false,
      role: 'Support',
    },
    {
      selected: false,
      role: 'Developer',
    },
    {
      selected: false,
      role: 'Analyst',
    },
    {
      selected: false,
      role: 'Supervisor',
    },
    {
      selected: false,
      role: 'Guest',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Role', field: 'role' },
  ];

  const numericFields = [];

  return (
    <TableLayout
      title="List of Role"
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

export default ListOfRole;