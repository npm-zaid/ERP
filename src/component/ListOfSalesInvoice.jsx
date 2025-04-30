import React from 'react';
import TableLayout from './TableLayout';

const ListOfSalesInvoice = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '01/04/2025',
      cashDebit: 'Cash',
      no: 'INV001',
      taxType: 'GST',
      accountName: 'ABC Corp',
      invtype: 'Standard',
      salesAccount: 'Sales - General',
      totalAmount: 15000.00,
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '02/04/2025',
      cashDebit: 'Debit',
      no: 'INV002',
      taxType: 'VAT',
      accountName: 'XYZ Ltd',
      invtype: 'Proforma',
      salesAccount: 'Sales - Retail',
      totalAmount: 25000.00,
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '03/04/2025',
      cashDebit: 'Credit',
      no: 'INV003',
      taxType: 'GST',
      accountName: 'DEF Inc',
      invtype: 'Standard',
      salesAccount: 'Sales - Wholesale',
      totalAmount: 18000.50,
      createdBy: 'Mike Johnson',
    },
    {
      selected: false,
      audited: false,
      date: '04/04/2025',
      cashDebit: 'Cash',
      no: 'INV004',
      taxType: 'VAT',
      accountName: 'GHI LLC',
      invtype: 'Proforma',
      salesAccount: 'Sales - Services',
      totalAmount: 32000.75,
      createdBy: 'Sarah Williams',
    },
    {
      selected: false,
      audited: false,
      date: '05/04/2025',
      cashDebit: 'Debit',
      no: 'INV005',
      taxType: 'GST',
      accountName: 'JKL Enterprises',
      invtype: 'Standard',
      salesAccount: 'Sales - General',
      totalAmount: 12500.00,
      createdBy: 'David Brown',
    },
    {
      selected: false,
      audited: false,
      date: '06/04/2025',
      cashDebit: 'Credit',
      no: 'INV006',
      taxType: 'VAT',
      accountName: 'MNO Group',
      invtype: 'Standard',
      salesAccount: 'Sales - Retail',
      totalAmount: 27500.25,
      createdBy: 'Emily Davis',
    },
    {
      selected: false,
      audited: false,
      date: '07/04/2025',
      cashDebit: 'Cash',
      no: 'INV007',
      taxType: 'GST',
      accountName: 'PQR Solutions',
      invtype: 'Proforma',
      salesAccount: 'Sales - Wholesale',
      totalAmount: 22000.00,
      createdBy: 'Robert Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '08/04/2025',
      cashDebit: 'Debit',
      no: 'INV008',
      taxType: 'VAT',
      accountName: 'STU Technologies',
      invtype: 'Standard',
      salesAccount: 'Sales - Services',
      totalAmount: 19500.50,
      createdBy: 'Lisa Taylor',
    },
    {
      selected: false,
      audited: false,
      date: '09/04/2025',
      cashDebit: 'Credit',
      no: 'INV009',
      taxType: 'GST',
      accountName: 'VWX Industries',
      invtype: 'Proforma',
      salesAccount: 'Sales - General',
      totalAmount: 28500.75,
      createdBy: 'James Anderson',
    },
    {
      selected: false,
      audited: false,
      date: '10/04/2025',
      cashDebit: 'Cash',
      no: 'INV010',
      taxType: 'VAT',
      accountName: 'YZ Systems',
      invtype: 'Standard',
      salesAccount: 'Sales - Retail',
      totalAmount: 16500.00,
      createdBy: 'Jennifer Martinez',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'Cash/Debit', field: 'cashDebit' },
    { label: 'No', field: 'no' },
    { label: 'Tax Type', field: 'taxType' },
    { label: 'Account Name', field: 'accountName' },
    { label: 'Invtype', field: 'invtype' },
    { label: 'Sales Account', field: 'salesAccount' },
    { label: 'Total Amount', field: 'totalAmount' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = ['totalAmount'];

  const fieldConfig = {
    cashDebit: { options: ['Cash', 'Debit', 'Credit'] },
    taxType: { options: ['GST', 'VAT', 'TAX FREE'] },
    invtype: { options: ['Standard', 'Proforma'] },
    salesAccount: {
      options: ['Sales - General', 'Sales - Retail', 'Sales - Wholesale', 'Sales - Services'],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      date: new Date().toISOString().split('T')[0],
      cashDebit: 'Debit',
      no: '',
      taxType: 'GST',
      accountName: '',
      invtype: 'Standard',
      salesAccount: 'Sales - General',
      totalAmount: 0,
      createdBy: '',
      billType: 'Lr',
      bookCode: '',
      balance: 0,
      centerName: '',
      lrNo: '',
      lrDate: '',
      delDate: '',
      consigner: '',
      consignee: '',
      truckNo: '',
      fromCity: '',
      toCity: '',
      hsnSac: '',
      article: 0,
      weight: 0,
      taxableAmount: 0,
      itemFreight: 0,
      narration: '',
      expenseName: '',
      expenseAccount: '',
      rate: 0,
      amount: 0,
    },
    fieldMapping: (entry) => ({
      date: entry.date,
      cashDebit: entry.cashDebit,
      no: entry.no,
      taxType: entry.taxType,
      accountName: entry.accountName,
      invtype: entry.invtype,
      salesAccount: entry.salesAccount,
      totalAmount: parseFloat(entry.totalAmount) || 0,
      createdBy: entry.createdBy,
    }),
  };

  return (
   
      <TableLayout
        title="List of Sales Invoice"
        columns={columns}
        initialData={initialData}
        numericFields={numericFields}
        fieldConfig={fieldConfig}
        windowConfig={windowConfig}
        componentType="salesInvoice"
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

export default ListOfSalesInvoice;