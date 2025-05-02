import React from 'react';
import TableLayout from '../TableLayout';

const ListOfDeliveryMemo = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      deliveryNo: 'DM001',
      type: 'Express',
      lrNo: 'LR12345',
      consignee: 'ABC Enterprises',
      fromBranch: 'New York',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      deliveryNo: 'DM002',
      type: 'Standard',
      lrNo: 'LR12346',
      consignee: 'XYZ Corp',
      fromBranch: 'Chicago',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      deliveryNo: 'DM003',
      type: 'Express',
      lrNo: 'LR12347',
      consignee: 'PQR Ltd',
      fromBranch: 'Los Angeles',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      deliveryNo: 'DM004',
      type: 'Standard',
      lrNo: 'LR12348',
      consignee: 'LMN Industries',
      fromBranch: 'Houston',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      deliveryNo: 'DM005',
      type: 'Express',
      lrNo: 'LR12349',
      consignee: 'RST Solutions',
      fromBranch: 'Miami',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      deliveryNo: 'DM006',
      type: 'Standard',
      lrNo: 'LR12350',
      consignee: 'UVW Traders',
      fromBranch: 'Seattle',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      deliveryNo: 'DM007',
      type: 'Express',
      lrNo: 'LR12351',
      consignee: 'GHI Enterprises',
      fromBranch: 'Boston',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      deliveryNo: 'DM008',
      type: 'Standard',
      lrNo: 'LR12352',
      consignee: 'JKL Corp',
      fromBranch: 'Atlanta',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      deliveryNo: 'DM009',
      type: 'Express',
      lrNo: 'LR12353',
      consignee: 'MNO Ltd',
      fromBranch: 'Denver',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      deliveryNo: 'DM010',
      type: 'Standard',
      lrNo: 'LR12354',
      consignee: 'DEF Industries',
      fromBranch: 'Phoenix',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'Delivery No', field: 'deliveryNo' },
    { label: 'Type', field: 'type' },
    { label: 'L.R. No.', field: 'lrNo' },
    { label: 'Consignee', field: 'consignee' },
    { label: 'From Branch', field: 'fromBranch' },
  ];

  const numericFields = [];

  const fieldConfig = {
    type: {
      options: ['Express', 'Standard'],
    },
    consignee: {
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
    fromBranch: {
      options: [
        'New York',
        'Chicago',
        'Los Angeles',
        'Houston',
        'Miami',
        'Seattle',
        'Boston',
        'Atlanta',
        'Denver',
        'Phoenix',
      ],
    },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      date: '',
      deliveryNo: '',
      type: 'Express',
      lrNo: '',
      consignee: 'ABC Enterprises',
      fromBranch: 'New York',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      deliveryNo: newEntry.deliveryNo || '',
      type: newEntry.type || 'Express',
      lrNo: newEntry.lrNo || '',
      consignee: newEntry.consignee || 'ABC Enterprises',
      fromBranch: newEntry.fromBranch || 'New York',
    }),
  };

  return (
    <TableLayout
      title="List of Delivery Memo"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="deliveryMemo"
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

export default ListOfDeliveryMemo;