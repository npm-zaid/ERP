import React from 'react';
import TableLayout from '../TableLayout';

const ListOfEstTransportBill = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      no: 'ETB001',
      date: '2025-05-01',
      partyName: 'ABC Enterprises',
      salePurAccount: 'Sales',
      totalAmount: 13000,
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      no: 'ETB002',
      date: '2025-05-02',
      partyName: 'XYZ Corp',
      salePurAccount: 'Purchase',
      totalAmount: 9000,
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      no: 'ETB003',
      date: '2025-05-03',
      partyName: 'PQR Ltd',
      salePurAccount: 'Sales',
      totalAmount: 16000,
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      no: 'ETB004',
      date: '2025-05-04',
      partyName: 'LMN Industries',
      salePurAccount: 'Purchase',
      totalAmount: 11000,
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      no: 'ETB005',
      date: '2025-05-05',
      partyName: 'RST Solutions',
      salePurAccount: 'Sales',
      totalAmount: 14000,
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      no: 'ETB006',
      date: '2025-05-06',
      partyName: 'UVW Traders',
      salePurAccount: 'Purchase',
      totalAmount: 8500,
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      no: 'ETB007',
      date: '2025-05-07',
      partyName: 'GHI Enterprises',
      salePurAccount: 'Sales',
      totalAmount: 17500,
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      no: 'ETB008',
      date: '2025-05-08',
      partyName: 'JKL Corp',
      salePurAccount: 'Purchase',
      totalAmount: 10000,
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      no: 'ETB009',
      date: '2025-05-09',
      partyName: 'MNO Ltd',
      salePurAccount: 'Sales',
      totalAmount: 15500,
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      no: 'ETB010',
      date: '2025-05-10',
      partyName: 'DEF Industries',
      salePurAccount: 'Purchase',
      totalAmount: 12000,
      createdBy: 'Anna Taylor',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'No', field: 'no' },
    { label: 'Date', field: 'date' },
    { label: 'Party Name', field: 'partyName' },
    { label: 'Sale/Pur Account', field: 'salePurAccount' },
    { label: 'Total Amount', field: 'totalAmount' },
    { label: 'Created By', field: 'createdBy' },
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
    salePurAccount: {
      options: ['Sales', 'Purchase'],
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
      no: '',
      date: '',
      partyName: 'ABC Enterprises',
      salePurAccount: 'Sales',
      totalAmount: 0,
      createdBy: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      no: newEntry.no || '',
      date: newEntry.date || '',
      partyName: newEntry.partyName || 'ABC Enterprises',
      salePurAccount: newEntry.salePurAccount || 'Sales',
      totalAmount: newEntry.totalAmount || 0,
      createdBy: newEntry.createdBy || 'John Doe',
    }),
  };

  return (
    <TableLayout
      title="List of Estimated Transport Bill"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="estTransportBill"
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

export default ListOfEstTransportBill;