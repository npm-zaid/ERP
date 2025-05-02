import React from 'react';
import TableLayout from '../TableLayout';

const ListOfBankReceipt = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      no: 'BR001',
      oppAccount: 'ABC Enterprises',
      chqDdNo: 'CHQ123456',
      amount: 10000,
      narration: 'Payment for invoice INV001',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      no: 'BR002',
      oppAccount: 'XYZ Corp',
      chqDdNo: 'DD789012',
      amount: 7500,
      narration: 'Advance for order ORD002',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      no: 'BR003',
      oppAccount: 'PQR Ltd',
      chqDdNo: 'CHQ345678',
      amount: 12000,
      narration: 'Payment for transport services',
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      no: 'BR004',
      oppAccount: 'LMN Industries',
      chqDdNo: 'DD901234',
      amount: 5000,
      narration: 'Refund for overpayment',
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      no: 'BR005',
      oppAccount: 'RST Solutions',
      chqDdNo: 'CHQ567890',
      amount: 15000,
      narration: 'Payment for invoice INV005',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      no: 'BR006',
      oppAccount: 'UVW Traders',
      chqDdNo: 'DD123456',
      amount: 8000,
      narration: 'Advance for order ORD006',
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      no: 'BR007',
      oppAccount: 'GHI Enterprises',
      chqDdNo: 'CHQ789012',
      amount: 9500,
      narration: 'Payment for transport services',
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      no: 'BR008',
      oppAccount: 'JKL Corp',
      chqDdNo: 'DD345678',
      amount: 11000,
      narration: 'Payment for invoice INV008',
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      no: 'BR009',
      oppAccount: 'MNO Ltd',
      chqDdNo: 'CHQ901234',
      amount: 6000,
      narration: 'Refund for cancelled order',
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      no: 'BR010',
      oppAccount: 'DEF Industries',
      chqDdNo: 'DD567890',
      amount: 13000,
      narration: 'Payment for invoice INV010',
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
      createdBy: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      no: newEntry.no || '',
      oppAccount: newEntry.oppAccount || 'ABC Enterprises',
      chqDdNo: newEntry.chqDdNo || '',
      amount: newEntry.amount || 0,
      narration: newEntry.narration || '',
      createdBy: newEntry.createdBy || 'John Doe',
    }),
  };

  return (
    <TableLayout
      title="List of Bank Receipt"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="bankReceipt"
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

export default ListOfBankReceipt;