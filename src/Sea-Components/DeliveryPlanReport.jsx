import React from 'react';
import ReportLayout from './ReportLayout';

const deliveryPlanData = [
  {
    no: '1',
    truckNo: 'TRK001',
    trailerNo: 'TRL001',
    transporterName: 'ABC Transports',
    driverName: 'John Doe',
    deliveryDate: '2025-04-01',
    deliveryTerminal: 'Terminal A',
    containerNo: 'CN001',
    size: '20ft',
    delayed: 'No',
    remarks: 'On time',
  },
  {
    no: '2',
    truckNo: 'TRK002',
    trailerNo: 'TRL002',
    transporterName: 'DEF Logistics',
    driverName: 'Jane Smith',
    deliveryDate: '2025-04-02',
    deliveryTerminal: 'Terminal B',
    containerNo: 'CN002',
    size: '40ft',
    delayed: 'Yes',
    remarks: 'Traffic delay',
  },
  {
    no: '3',
    truckNo: 'TRK003',
    trailerNo: 'TRL003',
    transporterName: 'GHI Shipping',
    driverName: 'Mike Brown',
    deliveryDate: '2025-04-03',
    deliveryTerminal: 'Terminal C',
    containerNo: 'CN003',
    size: '20ft',
    delayed: 'No',
    remarks: 'Smooth delivery',
  },
  {
    no: '4',
    truckNo: 'TRK004',
    trailerNo: 'TRL004',
    transporterName: 'JKL Transport',
    driverName: 'Sarah Lee',
    deliveryDate: '2025-04-04',
    deliveryTerminal: 'Terminal D',
    containerNo: 'CN004',
    size: '40ft',
    delayed: 'No',
    remarks: 'No issues',
  },
  {
    no: '5',
    truckNo: 'TRK005',
    trailerNo: 'TRL005',
    transporterName: 'MNO Carriers',
    driverName: 'Tom Clark',
    deliveryDate: '2025-04-05',
    deliveryTerminal: 'Terminal E',
    containerNo: 'CN005',
    size: '20ft',
    delayed: 'Yes',
    remarks: 'Mechanical issue',
  },
];

const headers = [
  'No.',
  'Truck No.',
  'Trailer No.',
  'Transporter Name',
  'Driver Name',
  'Delivery Date',
  'Delivery Terminal',
  'Container No.',
  'Size',
  'Delayed',
  'Remarks',
];

const DeliveryPlanReport = ({ theme }) => {
  return (
    <ReportLayout
      data={deliveryPlanData}
      headers={headers}
      title="CONTAINER'S DELIVERY PLAN"
      theme={theme}
    />
  );
};

export default DeliveryPlanReport;