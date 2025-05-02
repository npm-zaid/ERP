import React from 'react';
import TableLayout from '../TableLayout';

const GSTPayment = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      no: 'GSTP001',
      date: '2025-05-01',
      partyName: 'ABC Enterprises',
      challanNo: 'CHL001',
      challanDate: '2025-04-30',
      chqNo: 'CHQ123456',
      chqDate: '2025-05-01',
      totalAmount: 5000,
      notes: 'GST payment for April 2025',
    },
    {
      selected: false,
      audited: false,
      no: 'GSTP002',
      date: '2025-05-02',
      partyName: 'XYZ Corp',
      challanNo: 'CHL002',
      challanDate: '2025-05-01',
      chqNo: 'CHQ789012',
      chqDate: '2025-05-02',
      totalAmount: 3000,
      notes: 'GST payment for transport services',
    },
    {
      selected: false,
      audited: false,
      no: 'GSTP003',
      date: '2025-05-03',
      partyName: 'PQR Ltd',
      challanNo: 'CHL003',
      challanDate: '2025-05-02',
      chqNo: 'CHQ345678',
      chqDate: '2025-05-03',
      totalAmount: 7000,
      notes: 'GST payment for freight charges',
    },
    {
      selected: false,
      audited: false,
      no: 'GSTP004',
      date: '2025-05-04',
      partyName: 'LMN Industries',
      challanNo: 'CHL004',
      challanDate: '2025-05-03',
      chqNo: 'CHQ901234',
      chqDate: '2025-05-04',
      totalAmount: 4000,
      notes: 'GST payment for consultancy fees',
    },
    {
      selected: false,
      audited: false,
      no: 'GSTP005',
      date: '2025-05-05',
      partyName: 'RST Solutions',
      challanNo: 'CHL005',
      challanDate: '2025-05-04',
      chqNo: 'CHQ567890',
      chqDate: '2025-05-05',
      totalAmount: 6000,
      notes: 'GST payment for logistics services',
    },
    {
      selected: false,
      audited: false,
      no: 'GSTP006',
      date: '2025-05-06',
      partyName: 'UVW Traders',
      challanNo: 'CHL006',
      challanDate: '2025-05-05',
      chqNo: 'CHQ123457',
      chqDate: '2025-05-06',
      totalAmount: 4500,
      notes: 'GST payment for May 2025',
    },
    {
      selected: false,
      audited: false,
      no: 'GSTP007',
      date: '2025-05-07',
      partyName: 'GHI Enterprises',
      challanNo: 'CHL007',
      challanDate: '2025-05-06',
      chqNo: 'CHQ789013',
      chqDate: '2025-05-07',
      totalAmount: 5500,
      notes: 'GST payment for transport services',
    },
    {
      selected: false,
      audited: false,
      no: 'GSTP008',
      date: '2025-05-08',
      partyName: 'JKL Corp',
      challanNo: 'CHL008',
      challanDate: '2025-05-07',
      chqNo: 'CHQ345679',
      chqDate: '2025-05-08',
      totalAmount: 3500,
      notes: 'GST payment for freight charges',
    },
    {
      selected: false,
      audited: false,
      no: 'GSTP009',
      date: '2025-05-09',
      partyName: 'MNO Ltd',
      challanNo: 'CHL009',
      challanDate: '2025-05-08',
      chqNo: 'CHQ901235',
      chqDate: '2025-05-09',
      totalAmount: 6500,
      notes: 'GST payment for consultancy fees',
    },
    {
      selected: false,
      audited: false,
      no: 'GSTP010',
      date: '2025-05-10',
      partyName: 'DEF Industries',
      challanNo: 'CHL010',
      challanDate: '2025-05-09',
      chqNo: 'CHQ567891',
      chqDate: '2025-05-10',
      totalAmount: 8000,
      notes: 'GST payment for logistics services',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'No', field: 'no' },
    { label: 'Date', field: 'date' },
    { label: 'Party Name', field: 'partyName' },
    { label: 'Challan No.', field: 'challanNo' },
    { label: 'Challan Date', field: 'challanDate' },
    { label: 'Chq. No.', field: 'chqNo' },
    { label: 'Chq. Date', field: 'chqDate' },
    { label: 'Total Amount', field: 'totalAmount' },
    { label: 'Notes', field: 'notes' },
  ];

  const numericFields = ['totalAmount'];

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
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      no: '',
      date: '',
      partyName: 'ABC Enterprises',
      challanNo: '',
      challanDate: '',
      chqNo: '',
      chqDate: '',
      totalAmount: 0,
      notes: '',
    },
    fieldMapping: (newEntry) => ({
      no: newEntry.no || '',
      date: newEntry.date || '',
      partyName: newEntry.partyName || 'ABC Enterprises',
      challanNo: newEntry.challanNo || '',
      challanDate: newEntry.challanDate || '',
      chqNo: newEntry.chqNo || '',
      chqDate: newEntry.chqDate || '',
      totalAmount: newEntry.totalAmount || 0,
      notes: newEntry.notes || '',
    }),
  };

  return (
    <TableLayout
      title="GST Payment"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="gstPayment"
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

export default GSTPayment;