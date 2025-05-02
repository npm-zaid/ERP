import React from 'react';
import TableLayout from '../TableLayout';

const GSTUtilization = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      no: 'GSTU001',
      totalAmount: 10000,
      narration: 'Utilization of CGST credit for April 2025',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      no: 'GSTU002',
      totalAmount: 8000,
      narration: 'Utilization of SGST credit for transport services',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      no: 'GSTU003',
      totalAmount: 12000,
      narration: 'Utilization of IGST credit for freight charges',
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      no: 'GSTU004',
      totalAmount: 6000,
      narration: 'Utilization of CGST credit for consultancy fees',
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      no: 'GSTU005',
      totalAmount: 9000,
      narration: 'Utilization of SGST credit for logistics services',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      no: 'GSTU006',
      totalAmount: 7000,
      narration: 'Utilization of IGST credit for May 2025',
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      no: 'GSTU007',
      totalAmount: 11000,
      narration: 'Utilization of CGST credit for transport services',
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      no: 'GSTU008',
      totalAmount: 5000,
      narration: 'Utilization of SGST credit for freight charges',
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      no: 'GSTU009',
      totalAmount: 13000,
      narration: 'Utilization of IGST credit for consultancy fees',
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      no: 'GSTU010',
      totalAmount: 15000,
      narration: 'Utilization of CGST credit for logistics services',
      createdBy: 'Anna Taylor',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'No', field: 'no' },
    { label: 'Total Amount', field: 'totalAmount' },
    { label: 'Narration', field: 'narration' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = ['totalAmount'];

  const fieldConfig = {
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
      totalAmount: 0,
      narration: '',
      createdBy: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      no: newEntry.no || '',
      totalAmount: newEntry.totalAmount || 0,
      narration: newEntry.narration || '',
      createdBy: newEntry.createdBy || 'John Doe',
    }),
  };

  return (
    <TableLayout
      title="GST Utilization"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="gstUtilization"
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

export default GSTUtilization;