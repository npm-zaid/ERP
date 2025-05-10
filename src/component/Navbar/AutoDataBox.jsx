import React from 'react';
import TableLayout from '../TableLayout';

const AutoDataBox = () => {
  const initialData = [
    {
      selected: false,
      name: 'Customer Search',
      bindName: 'customer_search',
      columnName: 'Customer Name',
      columnId: 'CUST_NAME',
      cacheData: true,
      pageName: 'Customer Management',
      myQuery: 'SELECT name FROM customers WHERE active = 1',
    },
    {
      selected: false,
      name: 'Invoice Lookup',
      bindName: 'invoice_lookup',
      columnName: 'Invoice Number',
      columnId: 'INV_NO',
      cacheData: false,
      pageName: 'Invoice Processing',
      myQuery: 'SELECT invoice_no FROM invoices WHERE status = "Pending"',
    },
    {
      selected: false,
      name: 'Product Filter',
      bindName: 'product_filter',
      columnName: 'Product Code',
      columnId: 'PROD_CODE',
      cacheData: true,
      pageName: 'Inventory',
      myQuery: 'SELECT product_code FROM products WHERE stock > 0',
    },
    {
      selected: false,
      name: 'Supplier List',
      bindName: 'supplier_list',
      columnName: 'Supplier Name',
      columnId: 'SUP_NAME',
      cacheData: true,
      pageName: 'Supplier Management',
      myQuery: 'SELECT name FROM suppliers WHERE verified = 1',
    },
    {
      selected: false,
      name: 'Order Search',
      bindName: 'order_search',
      columnName: 'Order ID',
      columnId: 'ORD_ID',
      cacheData: false,
      pageName: 'Order Tracking',
      myQuery: 'SELECT order_id FROM orders WHERE date >= "2025-01-01"',
    },
    {
      selected: false,
      name: 'Employee Selector',
      bindName: 'employee_selector',
      columnName: 'Employee Name',
      columnId: 'EMP_NAME',
      cacheData: true,
      pageName: 'HR Dashboard',
      myQuery: 'SELECT name FROM employees WHERE status = "Active"',
    },
    {
      selected: false,
      name: 'Payment Reference',
      bindName: 'payment_ref',
      columnName: 'Payment ID',
      columnId: 'PAY_ID',
      cacheData: false,
      pageName: 'Payment Processing',
      myQuery: 'SELECT payment_id FROM payments WHERE amount > 0',
    },
    {
      selected: false,
      name: 'Branch Filter',
      bindName: 'branch_filter',
      columnName: 'Branch Name',
      columnId: 'BR_NAME',
      cacheData: true,
      pageName: 'Branch Management',
      myQuery: 'SELECT name FROM branches WHERE active = 1',
    },
    {
      selected: false,
      name: 'Project Lookup',
      bindName: 'project_lookup',
      columnName: 'Project Code',
      columnId: 'PROJ_CODE',
      cacheData: false,
      pageName: 'Project Dashboard',
      myQuery: 'SELECT project_code FROM projects WHERE status = "Ongoing"',
    },
    {
      selected: false,
      name: 'Vendor Search',
      bindName: 'vendor_search',
      columnName: 'Vendor Name',
      columnId: 'VEND_NAME',
      cacheData: true,
      pageName: 'Vendor Portal',
      myQuery: 'SELECT name FROM vendors WHERE rating >= 4',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Name', field: 'name' },
    { label: 'Bind Name', field: 'bindName' },
    { label: 'Column Name', field: 'columnName' },
    { label: 'Column Id', field: 'columnId' },
    { label: 'Cache Data', field: 'cacheData' },
    { label: 'PageName', field: 'pageName' },
    { label: 'MyQuery', field: 'myQuery' },
  ];

  const numericFields = [];

  return (
    <TableLayout
      title="AutoDataBox"
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

export default AutoDataBox;