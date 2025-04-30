import React from 'react';
import TableLayout from './TableLayout';

const ListOfTranspoterBill = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      billNo: 'BILL001',
      billDate: '01/04/2025',
      accountName: 'XYZ Transport',
      totalAmount: 12000.00,
    },
    {
      selected: false,
      audited: false,
      billNo: 'BILL002',
      billDate: '02/04/2025',
      accountName: 'ABC Logistics',
      totalAmount: 18000.00,
    },
    {
      selected: false,
      audited: false,
      billNo: 'BILL003',
      billDate: '03/04/2025',
      accountName: 'Quick Cargo',
      totalAmount: 15000.00,
    },
    {
      selected: false,
      audited: false,
      billNo: 'BILL004',
      billDate: '04/04/2025',
      accountName: 'Global Shipping',
      totalAmount: 22000.00,
    },
    {
      selected: false,
      audited: false,
      billNo: 'BILL005',
      billDate: '05/04/2025',
      accountName: 'Speedy Movers',
      totalAmount: 9500.00,
    },
    {
      selected: false,
      audited: false,
      billNo: 'BILL006',
      billDate: '06/04/2025',
      accountName: 'Safe Haul',
      totalAmount: 13500.00,
    },
    {
      selected: false,
      audited: false,
      billNo: 'BILL007',
      billDate: '07/04/2025',
      accountName: 'Metro Freight',
      totalAmount: 25000.00,
    },
    {
      selected: false,
      audited: false,
      billNo: 'BILL008',
      billDate: '08/04/2025',
      accountName: 'Oceanic Logistics',
      totalAmount: 17500.00,
    },
    {
      selected: false,
      audited: false,
      billNo: 'BILL009',
      billDate: '09/04/2025',
      accountName: 'Air Express',
      totalAmount: 21000.00,
    },
    {
      selected: false,
      audited: false,
      billNo: 'BILL010',
      billDate: '10/04/2025',
      accountName: 'Nationwide Transport',
      totalAmount: 19500.00,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Bill No', field: 'billNo' },
    { label: 'Bill Date', field: 'billDate' },
    { label: 'AccountName', field: 'accountName' },
    { label: 'Total Amount', field: 'totalAmount' },
  ];

  const numericFields = ['totalAmount'];

  const fieldConfig = {
    cashDebit: { options: ['Cash', 'Debit', 'Credit'] },
    taxType: { options: ['GST', 'VAT', 'TAX FREE'] },
    invtype: { options: ['Standard', 'Proforma'] },
    salesAccount: {
      options: ['TAX FREE PUR-A/C', 'Sales - Retail', 'Sales - Wholesale', 'Sales - Services'],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      billNo: '',
      billDate: new Date().toISOString().split('T')[0],
      accountName: '',
      totalAmount: 0,
      cashDebit: 'Debit',
      billType: 'Lr',
      party: '',
      docNo: '',
      docDate: '',
      balance: 0,
      invtype: 'Standard',
      taxType: 'TAX FREE',
      salesAccount: 'TAX FREE PUR-A/C',
      hsnSac: '',
      centerName: '',
      lrNo: '',
      lrDate: '',
      consigner: '',
      consignee: '',
      truckNo: '',
      fromCity: '',
      toCity: '',
      article: 0,
      weight: 0,
      rate: 0,
      taxableAmount: 0,
      itemFreight: 0,
      narration: '',
      expenseName: '',
      expenseAccount: '',
      expenseRate: 0,
      expenseAmount: 0,
    },
    fieldMapping: (entry) => ({
      billNo: entry.billNo,
      billDate: entry.billDate,
      accountName: entry.accountName,
      totalAmount: parseFloat(entry.totalAmount) || 0,
    }),
  };

  return (
  
      <TableLayout
        title="List of Transpoter Bill"
        columns={columns}
        initialData={initialData}
        numericFields={numericFields}
        fieldConfig={fieldConfig}
        windowConfig={windowConfig}
        componentType="transpoterbill"
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

export default ListOfTranspoterBill;