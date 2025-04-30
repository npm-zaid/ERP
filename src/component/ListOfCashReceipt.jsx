import React from 'react';
import TableLayout from './TableLayout';

const ListOfCashReceipt = () => {
  const initialData = [
    {
      selected: false,
      date: '01/04/2025',
      no: 'REC001',
      oppAC: 'XYZ Transport',
      chqDDNo: 'CHK789',
      amount: 8000.00,
      narration: 'Receipt for transport services',
      createdBy: 'John Doe',
    },
    {
      selected: false,
      date: '02/04/2025',
      no: 'REC002',
      oppAC: 'ABC Logistics',
      chqDDNo: 'DD987',
      amount: 12000.00,
      narration: 'Receipt for logistics fees',
      createdBy: 'Jane Smith',
    },
    {
      selected: false,
      date: '03/04/2025',
      no: 'REC003',
      oppAC: 'DEF Couriers',
      chqDDNo: 'CHK654',
      amount: 9500.00,
      narration: 'Receipt for courier services',
      createdBy: 'Alice Johnson',
    },
    {
      selected: false,
      date: '04/04/2025',
      no: 'REC004',
      oppAC: 'GHI Movers',
      chqDDNo: 'DD321',
      amount: 7800.00,
      narration: 'Receipt for moving services',
      createdBy: 'Bob Williams',
    },
    {
      selected: false,
      date: '05/04/2025',
      no: 'REC005',
      oppAC: 'JKL Shipping',
      chqDDNo: 'CHK852',
      amount: 10500.00,
      narration: 'Receipt for shipping charges',
      createdBy: 'Carol Davis',
    },
    {
      selected: false,
      date: '06/04/2025',
      no: 'REC006',
      oppAC: 'MNO Freight',
      chqDDNo: 'DD147',
      amount: 6700.00,
      narration: 'Receipt for freight services',
      createdBy: 'David Wilson',
    },
    {
      selected: false,
      date: '07/04/2025',
      no: 'REC007',
      oppAC: 'PQR Logistics',
      chqDDNo: 'CHK369',
      amount: 8900.00,
      narration: 'Receipt for logistics services',
      createdBy: 'Eva Thomas',
    },
    {
      selected: false,
      date: '08/04/2025',
      no: 'REC008',
      oppAC: 'STU Express',
      chqDDNo: 'DD258',
      amount: 7400.00,
      narration: 'Receipt for express delivery',
      createdBy: 'Frank Harris',
    },
    {
      selected: false,
      date: '09/04/2025',
      no: 'REC009',
      oppAC: 'VWX Packers',
      chqDDNo: 'CHK147',
      amount: 8300.00,
      narration: 'Receipt for packing services',
      createdBy: 'Grace Lee',
    },
    {
      selected: false,
      date: '10/04/2025',
      no: 'REC010',
      oppAC: 'YZA Movers',
      chqDDNo: 'DD963',
      amount: 9100.00,
      narration: 'Receipt for moving services',
      createdBy: 'Henry Clark',
    }
  ];
  

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Date', field: 'date' },
    { label: 'No', field: 'no' },
    { label: 'Opp. A/C', field: 'oppAC' },
    { label: 'Chq / DD No.', field: 'chqDDNo' },
    { label: 'Amount', field: 'amount' },
    { label: 'Narration', field: 'narration' },
    { label: 'Created By', field: 'createdBy' },
  ];

  const numericFields = ['amount'];

  
  return (
    <TableLayout
      title="List of Cash Receipt"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
     
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

export default ListOfCashReceipt;