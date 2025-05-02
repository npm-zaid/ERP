import React from 'react';
import TableLayout from '../TableLayout';

const GSTRcmEntry = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      no: 'RCM001',
      oppAccount: 'ABC Enterprises',
      chqDdNo: 'CHQ123456',
      amount: 2500,
      narration: 'RCM payment for transport services',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      no: 'RCM002',
      oppAccount: 'XYZ Corp',
      chqDdNo: 'DD789012',
      amount: 3000,
      narration: 'RCM payment for legal services',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      no: 'RCM003',
      oppAccount: 'PQR Ltd',
      chqDdNo: 'CHQ345678',
      amount: 4000,
      narration: 'RCM payment for freight charges',
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      no: 'RCM004',
      oppAccount: 'LMN Industries',
      chqDdNo: 'DD901234',
      amount: 2000,
      narration: 'RCM payment for consultancy fees',
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      no: 'RCM005',
      oppAccount: 'RST Solutions',
      chqDdNo: 'CHQ567890',
      amount: 3500,
      narration: 'RCM payment for transport services',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      no: 'RCM006',
      oppAccount: 'UVW Traders',
      chqDdNo: 'DD123456',
      amount: 2800,
      narration: 'RCM payment for security services',
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      no: 'RCM007',
      oppAccount: 'GHI Enterprises',
      chqDdNo: 'CHQ789012',
      amount: 4500,
      narration: 'RCM payment for freight charges',
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      no: 'RCM008',
      oppAccount: 'JKL Corp',
      chqDdNo: 'DD345678',
      amount: 3200,
      narration: 'RCM payment for legal services',
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      no: 'RCM009',
      oppAccount: 'MNO Ltd',
      chqDdNo: 'CHQ901234',
      amount: 2700,
      narration: 'RCM payment for transport services',
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      no: 'RCM010',
      oppAccount: 'DEF Industries',
      chqDdNo: 'DD567890',
      amount: 5000,
      narration: 'RCM payment for consultancy fees',
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
      title="GST RCM Entry"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="gstRcmEntry"
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

export default GSTRcmEntry;