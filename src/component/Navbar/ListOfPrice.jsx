import React from 'react';
import TableLayout from '../TableLayout';

const ListOfPrice = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      name: 'Standard Freight Rate',
      fromDate: '2025-01-01',
      toDate: '2025-12-31',
      salePurch: 'Sale',
      type: 'Freight',
      active: 'Yes',
    },
    {
      selected: false,
      audited: false,
      name: 'Bulk Purchase Discount',
      fromDate: '2025-02-01',
      toDate: '2025-06-30',
      salePurch: 'Purchase',
      type: 'Discount',
      active: 'Yes',
    },
    {
      selected: false,
      audited: false,
      name: 'Express Delivery Charge',
      fromDate: '2025-03-01',
      toDate: '2025-09-30',
      salePurch: 'Sale',
      type: 'Surcharge',
      active: 'No',
    },
    {
      selected: false,
      audited: false,
      name: 'Seasonal Offer',
      fromDate: '2025-04-01',
      toDate: '2025-04-30',
      salePurch: 'Sale',
      type: 'Offer',
      active: 'Yes',
    },
    {
      selected: false,
      audited: false,
      name: 'Raw Material Cost',
      fromDate: '2025-01-01',
      toDate: '2025-12-31',
      salePurch: 'Purchase',
      type: 'Material',
      active: 'Yes',
    },
    {
      selected: false,
      audited: false,
      name: 'Special Handling Fee',
      fromDate: '2025-05-01',
      toDate: '2025-08-31',
      salePurch: 'Sale',
      type: 'Fee',
      active: 'Yes',
    },
    {
      selected: false,
      audited: false,
      name: 'Contract Rate',
      fromDate: '2025-06-01',
      toDate: '2026-05-31',
      salePurch: 'Sale',
      type: 'Contract',
      active: 'Yes',
    },
    {
      selected: false,
      audited: false,
      name: 'Vendor Discount',
      fromDate: '2025-07-01',
      toDate: '2025-12-31',
      salePurch: 'Purchase',
      type: 'Discount',
      active: 'No',
    },
    {
      selected: false,
      audited: false,
      name: 'Promotional Rate',
      fromDate: '2025-08-01',
      toDate: '2025-10-31',
      salePurch: 'Sale',
      type: 'Offer',
      active: 'Yes',
    },
    {
      selected: false,
      audited: false,
      name: 'Fuel Surcharge',
      fromDate: '2025-09-01',
      toDate: '2025-12-31',
      salePurch: 'Sale',
      type: 'Surcharge',
      active: 'Yes',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Name', field: 'name' },
    { label: 'From Date', field: 'fromDate' },
    { label: 'To Date', field: 'toDate' },
    { label: 'Sale/Purch', field: 'salePurch' },
    { label: 'Type', field: 'type' },
    { label: 'Active', field: 'active' },
  ];

  const numericFields = [];

  const fieldConfig = {
    salePurch: {
      options: ['Sale', 'Purchase'],
    },
    type: {
      options: ['Freight', 'Discount', 'Surcharge', 'Offer', 'Material', 'Fee', 'Contract'],
    },
    active: {
      options: ['Yes', 'No'],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      name: '',
      fromDate: new Date().toISOString().split('T')[0],
      toDate: new Date().toISOString().split('T')[0],
      salePurch: 'Sale',
      type: 'Freight',
      active: 'Yes',
    },
    fieldMapping: (newEntry) => ({
      name: newEntry.name || '',
      fromDate: newEntry.fromDate || new Date().toISOString().split('T')[0],
      toDate: newEntry.toDate || new Date().toISOString().split('T')[0],
      salePurch: newEntry.salePurch || 'Sale',
      type: newEntry.type || 'Freight',
      active: newEntry.active || 'Yes',
    }),
  };

  return (
    <TableLayout
      title="List of Price"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="price"
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

export default ListOfPrice;