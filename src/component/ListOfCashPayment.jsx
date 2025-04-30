import React from 'react';
import TableLayout from './TableLayout';

const ListOfCashPayment = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '01/04/2025',
      no: 'PAY001',
      oppAC: 'XYZ Transport',
      chqDDNo: 'CHK123',
      amount: 5000.00,
      narration: 'Payment for transport services',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      audited: false,
      date: '02/04/2025',
      no: 'PAY002',
      oppAC: 'ABC Logistics',
      chqDDNo: 'DD456',
      amount: 7500.00,
      narration: 'Payment for logistics fees',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      audited: false,
      date: '03/04/2025',
      no: 'PAY003',
      oppAC: 'DEF Couriers',
      chqDDNo: 'CHK789',
      amount: 6200.00,
      narration: 'Courier service payment',
      createdBy: 'Alice Johnson',
    },
    {
      selected: false,
      audited: false,
      date: '04/04/2025',
      no: 'PAY004',
      oppAC: 'GHI Movers',
      chqDDNo: 'DD101',
      amount: 4500.00,
      narration: 'Payment for moving services',
      createdBy: 'Bob Williams',
    },
    {
      selected: false,
      audited: false,
      date: '05/04/2025',
      no: 'PAY005',
      oppAC: 'JKL Shipping',
      chqDDNo: 'CHK112',
      amount: 9800.00,
      narration: 'Shipping charges payment',
      createdBy: 'Carol Davis',
    },
    {
      selected: false,
      audited: false,
      date: '06/04/2025',
      no: 'PAY006',
      oppAC: 'MNO Freight',
      chqDDNo: 'DD131',
      amount: 7100.00,
      narration: 'Freight charges settlement',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      audited: false,
      date: '07/04/2025',
      no: 'PAY007',
      oppAC: 'PQR Logistics',
      chqDDNo: 'CHK415',
      amount: 8300.00,
      narration: 'Logistics payment',
      createdBy: 'Eva Thomas',
    },
    {
      selected: false,
      audited: false,
      date: '08/04/2025',
      no: 'PAY008',
      oppAC: 'STU Express',
      chqDDNo: 'DD161',
      amount: 5400.00,
      narration: 'Express delivery payment',
      createdBy: 'Frank Harris',
    },
    {
      selected: false,
      audited: false,
      date: '09/04/2025',
      no: 'PAY009',
      oppAC: 'VWX Packers',
      chqDDNo: 'CHK718',
      amount: 6900.00,
      narration: 'Packing services payment',
      createdBy: 'Grace Lee',
    },
    {
      selected: false,
      audited: false,
      date: '10/04/2025',
      no: 'PAY010',
      oppAC: 'YZA Movers',
      chqDDNo: 'DD192',
      amount: 8700.00,
      narration: 'Moving expenses payment',
      createdBy: 'Henry Clark',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'No', field: 'no' },
    { label: 'Opp. A/C', field: 'oppAC' },
    { label: 'Chq / DD No.', field: 'chqDDNo' },
    { label: 'Amount', field: 'amount' },
    { label: 'Narration', field: 'narration' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = ['amount'];

  const fieldConfig = {
    voucherType: { options: ['PAYMENT', 'RECEIPT'] },
    refType: { options: ['Lr', 'Non Lr'] },
    branch: { options: ['Branch 1', 'Branch 2', 'Branch 3'] },
    cashAccount: { options: ['CASH ON HAND', 'BANK A/C'] },
    diffAccount: { options: ['DISCOUNT A/C', 'MISC A/C'] },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      date: new Date().toISOString().split('T')[0],
      no: '',
      oppAC: '',
      chqDDNo: '',
      amount: 0,
      narration: '',
      createdBy: '',
      voucherType: 'PAYMENT',
      refType: 'Lr',
      branch: '',
      refNo: '',
      vehicle: '',
      cashAccount: 'CASH ON HAND',
      cashAmount: 0,
      diffAccount: 'DISCOUNT A/C',
      diffAmount: 0,
      diffAccount2: 'DISCOUNT A/C',
      diffAmount2: 0,
      docNo: '',
      docDate: '',
      balance: 0,
    },
    fieldMapping: (entry) => ({
      date: entry.date,
      no: entry.no,
      oppAC: entry.oppAC,
      chqDDNo: entry.chqDDNo,
      amount: parseFloat(entry.amount) || 0,
      narration: entry.narration,
      createdBy: entry.createdBy,
    }),
  };

  return (
  
      <TableLayout
        title="List of Cash Payment"
        columns={columns}
        initialData={initialData}
        numericFields={numericFields}
        fieldConfig={fieldConfig}
        windowConfig={windowConfig}
        componentType="cashPayment"
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

export default ListOfCashPayment;