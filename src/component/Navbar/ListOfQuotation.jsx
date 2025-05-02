import React from 'react';
import TableLayout from '../TableLayout';

const ListOfQuotation = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      no: 'QT001',
      accountName: 'ABC Enterprises',
      amount: 10000,
      narration: 'Quotation for transport services',
      notSorted: 'Yes',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      no: 'QT002',
      accountName: 'XYZ Corp',
      amount: 7500,
      narration: 'Quotation for bulk delivery',
      notSorted: 'No',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      no: 'QT003',
      accountName: 'PQR Ltd',
      amount: 12000,
      narration: 'Quotation for logistics contract',
      notSorted: 'Yes',
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      no: 'QT004',
      accountName: 'LMN Industries',
      amount: 9000,
      narration: 'Quotation for freight services',
      notSorted: 'No',
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      no: 'QT005',
      accountName: 'RST Solutions',
      amount: 15000,
      narration: 'Quotation for warehouse transport',
      notSorted: 'Yes',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      no: 'QT006',
      accountName: 'UVW Traders',
      amount: 8000,
      narration: 'Quotation for delivery services',
      notSorted: 'No',
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      no: 'QT007',
      accountName: 'GHI Enterprises',
      amount: 11000,
      narration: 'Quotation for long-haul transport',
      notSorted: 'Yes',
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      no: 'QT008',
      accountName: 'JKL Corp',
      amount: 9500,
      narration: 'Quotation for local delivery',
      notSorted: 'No',
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      no: 'QT009',
      accountName: 'MNO Ltd',
      amount: 13000,
      narration: 'Quotation for transport contract',
      notSorted: 'Yes',
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      no: 'QT010',
      accountName: 'DEF Industries',
      amount: 14000,
      narration: 'Quotation for freight forwarding',
      notSorted: 'No',
      createdBy: 'Anna Taylor',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'No', field: 'no' },
    { label: 'Account Name', field: 'accountName' },
    { label: 'Amount', field: 'amount' },
    { label: 'Narration', field: 'narration' },
    { label: 'Not Sorted', field: 'notSorted' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = ['amount'];

  const fieldConfig = {
    accountName: {
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
    notSorted: {
      options: ['Yes', 'No'],
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
      accountName: 'ABC Enterprises',
      amount: 0,
      narration: '',
      notSorted: 'Yes',
      createdBy: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      no: newEntry.no || '',
      accountName: newEntry.accountName || 'ABC Enterprises',
      amount: newEntry.amount || 0,
      narration: newEntry.narration || '',
      notSorted: newEntry.notSorted || 'Yes',
      createdBy: newEntry.createdBy || 'John Doe',
    }),
  };

  return (
    <TableLayout
      title="List of Quotation"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="quotation"
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

export default ListOfQuotation;