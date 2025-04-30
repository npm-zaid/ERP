import React from 'react';
import TableLayout from '../TableLayout';

const ListOfPacking = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      packName: 'Carton Box',
      description: 'Standard cardboard box for general goods',
      quantity: 100,
      weight: 0.5,
      weightAs: 'KG',
      rate: 10.00,
    },
    {
      selected: false,
      audited: false,
      packName: 'Wooden Crate',
      description: 'Heavy-duty crate for fragile items',
      quantity: 50,
      weight: 5.0,
      weightAs: 'KG',
      rate: 50.00,
    },
    {
      selected: false,
      audited: false,
      packName: 'Plastic Bag',
      description: 'Lightweight bag for small items',
      quantity: 1000,
      weight: 0.01,
      weightAs: 'KG',
      rate: 0.50,
    },
    {
      selected: false,
      audited: false,
      packName: 'Pallet',
      description: 'Wooden pallet for bulk goods',
      quantity: 20,
      weight: 15.0,
      weightAs: 'KG',
      rate: 100.00,
    },
    {
      selected: false,
      audited: false,
      packName: 'Bubble Wrap',
      description: 'Protective wrap for delicate items',
      quantity: 200,
      weight: 0.02,
      weightAs: 'KG',
      rate: 2.00,
    },
    {
      selected: false,
      audited: false,
      packName: 'Metal Container',
      description: 'Durable container for heavy machinery',
      quantity: 10,
      weight: 50.0,
      weightAs: 'KG',
      rate: 200.00,
    },
    {
      selected: false,
      audited: false,
      packName: 'Foam Padding',
      description: 'Cushioning for sensitive equipment',
      quantity: 150,
      weight: 0.05,
      weightAs: 'KG',
      rate: 5.00,
    },
    {
      selected: false,
      audited: false,
      packName: 'Shrink Wrap',
      description: 'Plastic film for securing pallets',
      quantity: 300,
      weight: 0.03,
      weightAs: 'KG',
      rate: 1.50,
    },
    {
      selected: false,
      audited: false,
      packName: 'Paper Box',
      description: 'Eco-friendly box for light goods',
      quantity: 80,
      weight: 0.3,
      weightAs: 'KG',
      rate: 8.00,
    },
    {
      selected: false,
      audited: false,
      packName: 'Drum',
      description: 'Steel drum for liquids',
      quantity: 15,
      weight: 20.0,
      weightAs: 'KG',
      rate: 150.00,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Pack Name', field: 'packName' },
    { label: 'Description', field: 'description' },
    { label: 'Quantity', field: 'quantity' },
    { label: 'Weight', field: 'weight' },
    { label: 'WeightAs', field: 'weightAs' },
    { label: 'Rate', field: 'rate' },
  ];

  const numericFields = ['quantity', 'weight', 'rate'];

  const fieldConfig = {
    weightAs: {
      options: ['KG', 'LB', 'GM', 'TON'],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      packName: '',
      description: '',
      quantity: 0,
      weight: 0,
      weightAs: 'KG',
      rate: 0,
    },
    fieldMapping: (newEntry) => ({
      packName: newEntry.packName || '',
      description: newEntry.description || '',
      quantity: parseInt(newEntry.quantity) || 0,
      weight: parseFloat(newEntry.weight) || 0,
      weightAs: newEntry.weightAs || 'KG',
      rate: parseFloat(newEntry.rate) || 0,
    }),
  };

  return (
    <TableLayout
      title="List of Packing"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="packing"
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

export default ListOfPacking;