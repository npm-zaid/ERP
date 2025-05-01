import React from 'react';
import ReportLayout from './ReportLayout';

const commoditiesPlanData = [
  {
    no: '1',
    truckNo: 'TRK001',
    trailerNo: 'TRL001',
    transporterName: 'ABC Transports',
    driverName: 'John Doe',
    loadingDate: '2025-04-01',
    loadingFrom: 'Warehouse A',
    commodity: 'Electronics',
    clientName: 'XYZ Corp',
    type: 'Dry',
    weight: '15000kg',
    remarks: 'Loaded on time',
  },
  {
    no: '2',
    truckNo: 'TRK002',
    trailerNo: 'TRL002',
    transporterName: 'DEF Logistics',
    driverName: 'Jane Smith',
    loadingDate: '2025-04-02',
    loadingFrom: 'Warehouse B',
    commodity: 'Textiles',
    clientName: 'LMN Ltd',
    type: 'Reefer',
    weight: '20000kg',
    remarks: 'Slight delay',
  },
  {
    no: '3',
    truckNo: 'TRK003',
    trailerNo: 'TRL003',
    transporterName: 'GHI Shipping',
    driverName: 'Mike Brown',
    loadingDate: '2025-04-03',
    loadingFrom: 'Warehouse C',
    commodity: 'Machinery',
    clientName: 'PQR Inc',
    type: 'Dry',
    weight: '18000kg',
    remarks: 'No issues',
  },
  {
    no: '4',
    truckNo: 'TRK004',
    trailerNo: 'TRL004',
    transporterName: 'JKL Transport',
    driverName: 'Sarah Lee',
    loadingDate: '2025-04-04',
    loadingFrom: 'Warehouse D',
    commodity: 'Food Items',
    clientName: 'STU Co',
    type: 'Reefer',
    weight: '22000kg',
    remarks: 'Smooth loading',
  },
  {
    no: '5',
    truckNo: 'TRK005',
    trailerNo: 'TRL005',
    transporterName: 'MNO Carriers',
    driverName: 'Tom Clark',
    loadingDate: '2025-04-05',
    loadingFrom: 'Warehouse E',
    commodity: 'Chemicals',
    clientName: 'VWX Ltd',
    type: 'Dry',
    weight: '16000kg',
    remarks: 'Extra checks',
  },
];

const headers = [
  'No.',
  'Truck No.',
  'Trailer No.',
  'Transporter Name',
  'Driver Name',
  'Loading Date',
  'Loading From',
  'Commodity',
  'Client Name',
  'Type',
  'Weight',
  'Remarks',
];

const CommoditiesPlanReport = ({ theme }) => {
  return (
    <ReportLayout
      data={commoditiesPlanData}
      headers={headers}
      title="COMMODITIES DELIVERY PLAN"
      theme={theme}
    />
  );
};

export default CommoditiesPlanReport;