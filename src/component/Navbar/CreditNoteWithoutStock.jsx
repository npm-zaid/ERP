import React from 'react';
import TableLayout from '../TableLayout';

const CreditNoteWithoutStock = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      taxType: 'CGST',
      accountName: 'Transport Services',
      totalAmount: 3000,
      docno: 'CN001',
      docDate: '2025-04-30',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      taxType: 'SGST',
      accountName: 'Freight Charges',
      totalAmount: 2000,
      docno: 'CN002',
      docDate: '2025-05-01',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      taxType: 'IGST',
      accountName: 'Consultancy Fees',
      totalAmount: 5000,
      docno: 'CN003',
      docDate: '2025-05-02',
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      taxType: 'CGST',
      accountName: 'Logistics Services',
      totalAmount: 2500,
      docno: 'CN004',
      docDate: '2025-05-03',
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      taxType: 'SGST',
      accountName: 'Transport Services',
      totalAmount: 4000,
      docno: 'CN005',
      docDate: '2025-05-04',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      taxType: 'IGST',
      accountName: 'Freight Charges',
      totalAmount: 3500,
      docno: 'CN006',
      docDate: '2025-05-05',
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      taxType: 'CGST',
      accountName: 'Consultancy Fees',
      totalAmount: 6000,
      docno: 'CN007',
      docDate: '2025-05-06',
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      taxType: 'SGST',
      accountName: 'Logistics Services',
      totalAmount: 2800,
      docno: 'CN008',
      docDate: '2025-05-07',
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      taxType: 'IGST',
      accountName: 'Transport Services',
      totalAmount: 4500,
      docno: 'CN009',
      docDate: '2025-05-08',
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      taxType: 'CGST',
      accountName: 'Freight Charges',
      totalAmount: 7000,
      docno: 'CN010',
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
        'Transport Services',
        'Freight Charges',
        'Consultancy Fees',
        'Logistics Services',
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
      accountName: 'Transport Services',
      totalAmount: 0,
      docno: '',
      docDate: '',
      createdBy: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      taxType: newEntry.taxType || 'CGST',
      accountName: newEntry.accountName || 'Transport Services',
      totalAmount: newEntry.totalAmount || 0,
      docno: newEntry.docno || '',
      docDate: newEntry.docDate || '',
      createdBy: newEntry.createdBy || 'John Doe',
    }),
  };

  return (
    <TableLayout
      title="Credit Note Without Stock"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="creditNoteWithoutStock"
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

export default CreditNoteWithoutStock;