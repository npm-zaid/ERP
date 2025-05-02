import React from 'react';
import TableLayout from '../TableLayout';

const GSTIncomeEntry = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      voucherNo: 'VIN001',
      taxType: 'CGST',
      accountName: 'Transport Services',
      totalAmount: 5000,
      docno: 'INV001',
      docDate: '2025-04-30',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      voucherNo: 'VIN002',
      taxType: 'SGST',
      accountName: 'Freight Charges',
      totalAmount: 3000,
      docno: 'INV002',
      docDate: '2025-05-01',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      voucherNo: 'VIN003',
      taxType: 'IGST',
      accountName: 'Logistics Services',
      totalAmount: 7000,
      docno: 'INV003',
      docDate: '2025-05-02',
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      voucherNo: 'VIN004',
      taxType: 'CGST',
      accountName: 'Consultancy Fees',
      totalAmount: 4000,
      docno: 'INV004',
      docDate: '2025-05-03',
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      voucherNo: 'VIN005',
      taxType: 'SGST',
      accountName: 'Transport Services',
      totalAmount: 6000,
      docno: 'INV005',
      docDate: '2025-05-04',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      voucherNo: 'VIN006',
      taxType: 'IGST',
      accountName: 'Freight Charges',
      totalAmount: 4500,
      docno: 'INV006',
      docDate: '2025-05-05',
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      voucherNo: 'VIN007',
      taxType: 'CGST',
      accountName: 'Logistics Services',
      totalAmount: 5500,
      docno: 'INV007',
      docDate: '2025-05-06',
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      voucherNo: 'VIN008',
      taxType: 'SGST',
      accountName: 'Consultancy Fees',
      totalAmount: 3500,
      docno: 'INV008',
      docDate: '2025-05-07',
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      voucherNo: 'VIN009',
      taxType: 'IGST',
      accountName: 'Transport Services',
      totalAmount: 6500,
      docno: 'INV009',
      docDate: '2025-05-08',
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      voucherNo: 'VIN010',
      taxType: 'CGST',
      accountName: 'Freight Charges',
      totalAmount: 8000,
      docno: 'INV010',
      docDate: '2025-05-09',
      createdBy: 'Anna Taylor',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'Voucher No', field: 'voucherNo' },
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
        'Logistics Services',
        'Consultancy Fees',
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
      voucherNo: '',
      taxType: 'CGST',
      accountName: 'Transport Services',
      totalAmount: 0,
      docno: '',
      docDate: '',
      createdBy: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      voucherNo: newEntry.voucherNo || '',
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
      title="GST Income Entry"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="gstIncomeEntry"
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

export default GSTIncomeEntry;