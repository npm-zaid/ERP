import React from 'react';
import TableLayout from '../TableLayout';

const CreditNoteWithStock = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      no: 'CNS001',
      partyName: 'ABC Enterprises',
      taxType: 'CGST',
      invtype: 'Sales Return',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      no: 'CNS002',
      partyName: 'XYZ Corp',
      taxType: 'SGST',
      invtype: 'Damaged Goods',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      no: 'CNS003',
      partyName: 'PQR Ltd',
      taxType: 'IGST',
      invtype: 'Sales Return',
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      no: 'CNS004',
      partyName: 'LMN Industries',
      taxType: 'CGST',
      invtype: 'Discount',
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      no: 'CNS005',
      partyName: 'RST Solutions',
      taxType: 'SGST',
      invtype: 'Sales Return',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      no: 'CNS006',
      partyName: 'UVW Traders',
      taxType: 'IGST',
      invtype: 'Damaged Goods',
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      no: 'CNS007',
      partyName: 'GHI Enterprises',
      taxType: 'CGST',
      invtype: 'Sales Return',
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      no: 'CNS008',
      partyName: 'JKL Corp',
      taxType: 'SGST',
      invtype: 'Discount',
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      no: 'CNS009',
      partyName: 'MNO Ltd',
      taxType: 'IGST',
      invtype: 'Sales Return',
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      no: 'CNS010',
      partyName: 'DEF Industries',
      taxType: 'CGST',
      invtype: 'Damaged Goods',
      createdBy: 'Anna Taylor',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'No', field: 'no' },
    { label: 'Party Name', field: 'partyName' },
    { label: 'Tax Type', field: 'taxType' },
    { label: 'Invtype', field: 'invtype' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = [];

  const fieldConfig = {
    partyName: {
      options: [
        'ABC Enterprises',
        'XYZ Corp',
        'PQR Ltd',
        'LMN Industries',
        'RST Solutions',
        'UVW Traders',
        'GHI Enterprises',
        'JKL Corp',
        'MNO Ltd',
        'DEF Industries',
      ],
    },
    taxType: {
      options: ['CGST', 'SGST', 'IGST'],
    },
    invtype: {
      options: ['Sales Return', 'Damaged Goods', 'Discount'],
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
      no: '',
      partyName: 'ABC Enterprises',
      taxType: 'CGST',
      invtype: 'Sales Return',
      createdBy: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      no: newEntry.no || '',
      partyName: newEntry.partyName || 'ABC Enterprises',
      taxType: newEntry.taxType || 'CGST',
      invtype: newEntry.invtype || 'Sales Return',
      createdBy: newEntry.createdBy || 'John Doe',
    }),
  };

  return (
    <TableLayout
      title="Credit Note With Stock"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="creditNoteWithStock"
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

export default CreditNoteWithStock;