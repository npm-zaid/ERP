import React from 'react';
import TableLayout from '../TableLayout';

const ListOfFundTransfer = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      no: 'FT001',
      oppAccount: 'ABC Enterprises',
      chqDdNo: 'CHQ123456',
      amount: 15000,
      narration: 'Payment for invoice INV001',
      status: 'Completed',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      no: 'FT002',
      oppAccount: 'XYZ Corp',
      chqDdNo: 'DD789012',
      amount: 8000,
      narration: 'Advance for order ORD002',
      status: 'Pending',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      no: 'FT003',
      oppAccount: 'PQR Ltd',
      chqDdNo: 'CHQ345678',
      amount: 20000,
      narration: 'Transfer for transport services',
      status: 'Completed',
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      no: 'FT004',
      oppAccount: 'LMN Industries',
      chqDdNo: 'DD901234',
      amount: 6000,
      narration: 'Refund for overpayment',
      status: 'Failed',
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      no: 'FT005',
      oppAccount: 'RST Solutions',
      chqDdNo: 'CHQ567890',
      amount: 17500,
      narration: 'Payment for invoice INV005',
      status: 'Completed',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      no: 'FT006',
      oppAccount: 'UVW Traders',
      chqDdNo: 'DD123456',
      amount: 9500,
      narration: 'Advance for order ORD006',
      status: 'Pending',
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      no: 'FT007',
      oppAccount: 'GHI Enterprises',
      chqDdNo: 'CHQ789012',
      amount: 11000,
      narration: 'Payment for transport services',
      status: 'Completed',
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      no: 'FT008',
      oppAccount: 'JKL Corp',
      chqDdNo: 'DD345678',
      amount: 13000,
      narration: 'Payment for invoice INV008',
      status: 'Completed',
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      no: 'FT009',
      oppAccount: 'MNO Ltd',
      chqDdNo: 'CHQ901234',
      amount: 7000,
      narration: 'Refund for cancelled order',
      status: 'Failed',
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      no: 'FT010',
      oppAccount: 'DEF Industries',
      chqDdNo: 'DD567890',
      amount: 16000,
      narration: 'Payment for invoice INV010',
      status: 'Completed',
      createdBy: 'Anna Taylor',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'No', field: 'no' },
    { label: 'Opp. A/C', field: 'oppAccount' },
    { label: 'Chq / DD No.', field: 'chqDdNo' },
    { label: 'Amount', field: 'amount' },
    { label: 'Narration', field: 'narration' },
    { label: 'Status', field: 'status' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = ['amount'];

  const fieldConfig = {
    oppAccount: {
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
    status: {
      options: ['Completed', 'Pending', 'Failed'],
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
      oppAccount: 'ABC Enterprises',
      chqDdNo: '',
      amount: 0,
      narration: '',
      status: 'Pending',
      createdBy: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      no: newEntry.no || '',
      oppAccount: newEntry.oppAccount || 'ABC Enterprises',
      chqDdNo: newEntry.chqDdNo || '',
      amount: newEntry.amount || 0,
      narration: newEntry.narration || '',
      status: newEntry.status || 'Pending',
      createdBy: newEntry.createdBy || 'John Doe',
    }),
  };

  return (
    <TableLayout
      title="List of Fund Transfer"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="fundTransfer"
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

export default ListOfFundTransfer;