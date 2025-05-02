import React from 'react';
import TableLayout from '../TableLayout';

const ListOfPurchaseOrder = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '2025-05-01',
      no: 'PO001',
      orderNo: 'ORD001',
      orderDate: '2025-04-28',
      lrNo: 'LR12345',
      truckNo: 'MH04AB1234',
      consignorName: 'Global Suppliers',
      consigneeName: 'ABC Enterprises',
      accountName: 'Transport Services',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-02',
      no: 'PO002',
      orderNo: 'ORD002',
      orderDate: '2025-04-29',
      lrNo: 'LR12346',
      truckNo: 'DL01CD5678',
      consignorName: 'Prime Logistics',
      consigneeName: 'XYZ Corp',
      accountName: 'Freight Charges',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-03',
      no: 'PO003',
      orderNo: 'ORD003',
      orderDate: '2025-04-30',
      lrNo: 'LR12347',
      truckNo: 'KA05EF9012',
      consignorName: 'Metro Traders',
      consigneeName: 'PQR Ltd',
      accountName: 'Logistics Services',
      createdBy: 'Mike Brown',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-04',
      no: 'PO004',
      orderNo: 'ORD004',
      orderDate: '2025-05-01',
      lrNo: 'LR12348',
      truckNo: 'TN07GH3456',
      consignorName: 'Star Enterprises',
      consigneeName: 'LMN Industries',
      accountName: 'Transport Services',
      createdBy: 'Sarah Davis',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-05',
      no: 'PO005',
      orderNo: 'ORD005',
      orderDate: '2025-05-02',
      lrNo: 'LR12349',
      truckNo: 'WB09IJ7890',
      consignorName: 'Elite Suppliers',
      consigneeName: 'RST Solutions',
      accountName: 'Freight Charges',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-06',
      no: 'PO006',
      orderNo: 'ORD006',
      orderDate: '2025-05-03',
      lrNo: 'LR12350',
      truckNo: 'TG03KL1234',
      consignorName: 'Fast Movers',
      consigneeName: 'UVW Traders',
      accountName: 'Logistics Services',
      createdBy: 'Emily Clark',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-07',
      no: 'PO007',
      orderNo: 'ORD007',
      orderDate: '2025-05-04',
      lrNo: 'LR12351',
      truckNo: 'GJ01MN5678',
      consignorName: 'Reliable Logistics',
      consigneeName: 'GHI Enterprises',
      accountName: 'Transport Services',
      createdBy: 'Robert Lee',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-08',
      no: 'PO008',
      orderNo: 'ORD008',
      orderDate: '2025-05-05',
      lrNo: 'LR12352',
      truckNo: 'MH12OP9012',
      consignorName: 'Swift Carriers',
      consigneeName: 'JKL Corp',
      accountName: 'Freight Charges',
      createdBy: 'Lisa Adams',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-09',
      no: 'PO009',
      orderNo: 'ORD009',
      orderDate: '2025-05-06',
      lrNo: 'LR12353',
      truckNo: 'RJ05QR3456',
      consignorName: 'Alpha Suppliers',
      consigneeName: 'MNO Ltd',
      accountName: 'Logistics Services',
      createdBy: 'Chris Evans',
    },
    {
      selected: false,
      audited: false,
      date: '2025-05-10',
      no: 'PO010',
      orderNo: 'ORD010',
      orderDate: '2025-05-07',
      lrNo: 'LR12354',
      truckNo: 'GJ09ST7890',
      consignorName: 'Omega Traders',
      consigneeName: 'DEF Industries',
      accountName: 'Transport Services',
      createdBy: 'Anna Taylor',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'No', field: 'no' },
    { label: 'Order No', field: 'orderNo' },
    { label: 'Order Date', field: 'orderDate' },
    { label: 'LrNo', field: 'lrNo' },
    { label: 'TruckNo', field: 'truckNo' },
    { label: 'ConsignorName', field: 'consignorName' },
    { label: 'ConsigneeName', field: 'consigneeName' },
    { label: 'Account Name', field: 'accountName' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = [];

  const fieldConfig = {
    truckNo: {
      options: [
        'MH04AB1234',
        'DL01CD5678',
        'KA05EF9012',
        'TN07GH3456',
        'WB09IJ7890',
        'TG03KL1234',
        'GJ01MN5678',
        'MH12OP9012',
        'RJ05QR3456',
        'GJ09ST7890',
      ],
    },
    consignorName: {
      options: [
        'Global Suppliers',
        'Prime Logistics',
        'Metro Traders',
        'Star Enterprises',
        'Elite Suppliers',
        'Fast Movers',
        'Reliable Logistics',
        'Swift Carriers',
        'Alpha Suppliers',
        'Omega Traders',
      ],
    },
    consigneeName: {
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
    accountName: {
      options: [
        'Transport Services',
        'Freight Charges',
        'Logistics Services',
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
      orderNo: '',
      orderDate: '',
      lrNo: '',
      truckNo: 'MH04AB1234',
      consignorName: 'Global Suppliers',
      consigneeName: 'ABC Enterprises',
      accountName: 'Transport Services',
      createdBy: 'John Doe',
    },
    fieldMapping: (newEntry) => ({
      date: newEntry.date || '',
      no: newEntry.no || '',
      orderNo: newEntry.orderNo || '',
      orderDate: newEntry.orderDate || '',
      lrNo: newEntry.lrNo || '',
      truckNo: newEntry.truckNo || 'MH04AB1234',
      consignorName: newEntry.consignorName || 'Global Suppliers',
      consigneeName: newEntry.consigneeName || 'ABC Enterprises',
      accountName: newEntry.accountName || 'Transport Services',
      createdBy: newEntry.createdBy || 'John Doe',
    }),
  };

  return (
    <TableLayout
      title="List of Purchase Order"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="purchaseOrder"
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

export default ListOfPurchaseOrder;