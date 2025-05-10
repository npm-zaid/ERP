import React from 'react';
import TableLayout from '../TableLayout';

const MenuManagement = () => {
  const initialData = [
    {
      selected: false,
      parent: 'Dashboard',
      subParent: '',
      menuTitle: 'Home',
      srNo: 1,
      isEnabled: true,
      gesture: 'Click',
    },
    {
      selected: false,
      parent: 'Transactions',
      subParent: 'Payments',
      menuTitle: 'Add Payment',
      srNo: 2,
      isEnabled: true,
      gesture: 'Double Click',
    },
    {
      selected: false,
      parent: 'Transactions',
      subParent: 'Receipts',
      menuTitle: 'View Receipts',
      srNo: 3,
      isEnabled: true,
      gesture: 'Click',
    },
    {
      selected: false,
      parent: 'Reports',
      subParent: '',
      menuTitle: 'Sales Report',
      srNo: 4,
      isEnabled: false,
      gesture: 'Swipe',
    },
    {
      selected: false,
      parent: 'Settings',
      subParent: 'User Management',
      menuTitle: 'Manage Users',
      srNo: 5,
      isEnabled: true,
      gesture: 'Click',
    },
    {
      selected: false,
      parent: 'Settings',
      subParent: 'Role Management',
      menuTitle: 'Manage Roles',
      srNo: 6,
      isEnabled: true,
      gesture: 'Double Click',
    },
    {
      selected: false,
      parent: 'Inventory',
      subParent: '',
      menuTitle: 'Stock Overview',
      srNo: 7,
      isEnabled: true,
      gesture: 'Click',
    },
    {
      selected: false,
      parent: 'Reports',
      subParent: 'Financial',
      menuTitle: 'Balance Sheet',
      srNo: 8,
      isEnabled: true,
      gesture: 'Swipe',
    },
    {
      selected: false,
      parent: 'Transactions',
      subParent: 'Journal',
      menuTitle: 'Create Journal',
      srNo: 9,
      isEnabled: false,
      gesture: 'Click',
    },
    {
      selected: false,
      parent: 'Dashboard',
      subParent: '',
      menuTitle: 'Analytics',
      srNo: 10,
      isEnabled: true,
      gesture: 'Double Click',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Parent', field: 'parent' },
    { label: 'Sub Parent', field: 'subParent' },
    { label: 'Menu Title', field: 'menuTitle' },
    { label: 'SrNo', field: 'srNo' },
    { label: 'IsEnabled', field: 'isEnabled' },
    { label: 'Gesture', field: 'gesture' },
  ];

  const numericFields = ['srNo'];

  return (
    <TableLayout
      title="Menu Management"
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

export default MenuManagement;