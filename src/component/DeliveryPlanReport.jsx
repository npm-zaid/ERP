import React from 'react';
import TableLayout from '../TableLayout';

const DeliveryPlanReport = () => {
  const deliveryPlanData = [
    {
      no: 1,
      truckNo: "ALG 855 MC",
      trailerNo: "AI 398 MC",
      transporterName: "Jay Bhavani Transport",
      driverName: "Ravi Kumar",
      deliveryDate: "10/01/2025",
      deliveryTerminal: "Beira Port Terminal",
      containerNo: "ECMU1704969",
      size: "20 DV",
      delayed: "No",
      remarks: "On schedule"
    },
    {
      no: 2,
      truckNo: "ALG 858 MC",
      trailerNo: "AI 400 MC",
      transporterName: "Delhi Logistics",
      driverName: "Sanjay Patel",
      deliveryDate: "12/01/2025",
      deliveryTerminal: "Maputo Port Terminal",
      containerNo: "TGCU2056939",
      size: "40 HC",
      delayed: "Yes",
      remarks: "Delayed due to customs clearance"
    },
    {
      no: 3,
      truckNo: "ALG 860 MC",
      trailerNo: "AI 402 MC",
      transporterName: "Ahmedabad Logistics",
      driverName: "Vikram Singh",
      deliveryDate: "15/01/2025",
      deliveryTerminal: "Beira Port Terminal",
      containerNo: "FCIU4518976",
      size: "40 OT",
      delayed: "No",
      remarks: "Requires heavy-duty crane"
    },
    {
      no: 4,
      truckNo: "ALG 862 MC",
      trailerNo: "AI 404 MC",
      transporterName: "Pune Trans Co.",
      driverName: "Mahesh Desai",
      deliveryDate: "18/01/2025",
      deliveryTerminal: "Maputo Port Terminal",
      containerNo: "EGLU2222222",
      size: "40 DV",
      delayed: "No",
      remarks: "Scheduled delivery"
    },
    {
      no: 5,
      truckNo: "ALG 864 MC",
      trailerNo: "AI 406 MC",
      transporterName: "Surat Movers",
      driverName: "Arjun Yadav",
      deliveryDate: "20/01/2025",
      deliveryTerminal: "Beira Port Terminal",
      containerNo: "ONEU1928374",
      size: "40 HC",
      delayed: "Yes",
      remarks: "Delayed due to road conditions"
    }
  ];

  const columns = [
    { label: 'No.', field: 'no' },
    { label: 'Truck No.', field: 'truckNo' },
    { label: 'Trailer No.', field: 'trailerNo' },
    { label: 'Transporter Name', field: 'transporterName' },
    { label: 'Driver Name', field: 'driverName' },
    { label: 'Delivery Date', field: 'deliveryDate' },
    { label: 'Delivery Terminal', field: 'deliveryTerminal' },
    { label: 'Container No.', field: 'containerNo' },
    { label: 'Size', field: 'size' },
    { label: 'Delayed', field: 'delayed' },
    { label: 'Remarks', field: 'remarks' },
  ];

  const numericFields = ['no'];

  return (
    <TableLayout
      title="Delivery Plan Report"
      columns={columns}
      initialData={deliveryPlanData}
      numericFields={numericFields}
      componentType="deliveryPlanReport"
      showAdd={false}
      showEdit={false}
      showView={true}
      showDelete={false}
      showRefresh={true}
      showPrint={true}
      showAudit={false}
      showField={true}
      showExportExcel={true}
      showExportPDF={true}
    />
  );
};

export default DeliveryPlanReport;