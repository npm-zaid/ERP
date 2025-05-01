import React from 'react';
import ReportLayout from './ReportLayout';

const entryPlanData = [
  {
    no: '1',
    truckNo: 'TRK001',
    trailerNo: 'TRL001',
    transporterName: 'ABC Transports',
    containerNo: 'CN001',
    size: '20ft',
    returnDate: '2025-04-01',
    commodity: 'Electronics',
    clientName: 'XYZ Corp',
    type: 'Dry',
    weight: '15000kg',
    damaged: 'No',
  },
  {
    no: '2',
    truckNo: 'TRK002',
    trailerNo: 'TRL002',
    transporterName: 'DEF Logistics',
    containerNo: 'CN002',
    size: '40ft',
    returnDate: '2025-04-02',
    commodity: 'Textiles',
    clientName: 'LMN Ltd',
    type: 'Reefer',
    weight: '20000kg',
    damaged: 'Yes',
  },
  {
    no: '3',
    truckNo: 'TRK003',
    trailerNo: 'TRL003',
    transporterName: 'GHI Shipping',
    containerNo: 'CN003',
    size: '20ft',
    returnDate: '2025-04-03',
    commodity: 'Machinery',
    clientName: 'PQR Inc',
    type: 'Dry',
    weight: '18000kg',
    damaged: 'No',
  },
  {
    no: '4',
    truckNo: 'TRK004',
    trailerNo: 'TRL004',
    transporterName: 'JKL Transport',
    containerNo: 'CN004',
    size: '40ft',
    returnDate: '2025-04-04',
    commodity: 'Food Items',
    clientName: 'STU Co',
    type: 'Reefer',
    weight: '22000kg',
    damaged: 'No',
  },
  {
    no: '5',
    truckNo: 'TRK005',
    trailerNo: 'TRL005',
    transporterName: 'MNO Carriers',
    containerNo: 'CN005',
    size: '20ft',
    returnDate: '2025-04-05',
    commodity: 'Chemicals',
    clientName: 'VWX Ltd',
    type: 'Dry',
    weight: '16000kg',
    damaged: 'Yes',
  },
];

const headers = [
  'No.',
  'Truck No.',
  'Trailer No.',
  'Transporter Name',
  'Container No.',
  'Size',
  'Return Date',
  'Commodity',
  'Client Name',
  'Type',
  'Weight',
  'Damaged',
];

const EntryPlanReport = ({ theme }) => {
  return (
    <ReportLayout
      data={entryPlanData}
      headers={headers}
      title="CONTAINER'S ENTRY PLAN"
      theme={theme}
    />
  );
};

export default EntryPlanReport;