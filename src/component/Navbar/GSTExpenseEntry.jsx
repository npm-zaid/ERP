import React from 'react';
import TableLayout from '../TableLayout';

const GSTExpenseEntry = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      taxType: 'CGST',
      accountName: 'Fuel Expense',
      totalAmount: 1800,
      docno: 'GST001',
      docDate: '2025-04-30',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      taxType: 'SGST',
      accountName: 'Maintenance Expense',
      totalAmount: 3500,
      docno: 'GST002',
      docDate: '2025-05-01',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      taxType: 'IGST',
      accountName: 'Transport Services',
      totalAmount: 5000,
      docno: 'GST003',
      docDate: '2025-05-02',
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      taxType: 'CGST',
      accountName: 'Rent Expense',
      totalAmount: 6000,
      docno: 'GST004',
      docDate: '2025-05-03',
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      taxType: 'SGST',
      accountName: 'Utilities Expense',
      totalAmount: 2000,
      docno: 'GST005',
      docDate: '2025-05-04',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      taxType: 'IGST',
      accountName: 'Freight Charges',
      totalAmount: 4500,
      docno: 'GST006',
      docDate: '2025-05-05',
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      taxType: 'CGST',
      accountName: 'Office Supplies',
      totalAmount: 1200,
      docno: 'GST007',
      docDate: '2025-05-06',
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      taxType: 'SGST',
      accountName: 'Insurance Expense',
      totalAmount: 4000,
      docno: 'GST008',
      docDate: '2025-05-07',
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      taxType: 'IGST',
      accountName: 'Advertising Expense',
      totalAmount: 3000,
      docno: 'GST009',
      docDate: '2025-05-08',
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      taxType: 'CGST',
      accountName: 'Salaries Expense',
      totalAmount: 8000,
      docno: 'GST010',
      docDate: '2025-05-09',
      createdBy: 'Anna Taylor',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'Tax Type', field: 'taxType' },
    { label: 'Account Name', field: 'accountName' },
    { label: 'Total Amount', field: 'totalAmount' },
    { label: 'Docno', field: 'docno' },
    { label: 'Doc Date', field: 'docDate' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = ['totalAmount'];

  const fieldConfig = {
    taxType: {
      options: ['CGST', 'SGST', 'IGST'],
    },
    accountName: {
      options: [
        'Fuel Expense',
        'Maintenance Expense',
        'Transport Services',
        'Rent Expense',
        'Utilities Expense',
        'Freight Charges',
        'Office Supplies',
        'Insurance Expense',
        'Advertising Expense',
        'Salaries Expense',
      ],
    },
    createdBy: {
      options: [
        'John Doe',
        'Jane Smith',
        'Mike Brown',
        'Sarah Davis',
        'David Wilson',
        'Emily Clark',
        'Robert Lee',
        'Lisa Adams',
        'Chris Evans',
        'Anna Taylor',
      ],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      date: '',
      taxType: 'CGST',
      accountName: 'Fuel Expense',
      totalAmount: 0,
      docno: '',
      docDate: '',
      createdBy: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      taxType: newEntry.taxType || 'CGST',
      accountName: newEntry.accountName || 'Fuel Expense',
      totalAmount: newEntry.totalAmount || 0,
      docno: newEntry.docno || '',
      docDate: newEntry.docDate || '',
      createdBy: newEntry.createdBy || 'John Doe',
    }),
  };

  return (
    <TableLayout
      title="GST Expense Entry"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="gstExpenseEntry"
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

export default GSTExpenseEntry;