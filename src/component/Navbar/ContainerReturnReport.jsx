import React from 'react';
import TableLayout from '../TableLayout';

const ContainerReturnReport = () => {
  const containerReturnData = [
    {
      currentDate: "25/04/2025",
      deliveryOrderNo: "DO001/25",
      voyageNo: "V1234",
      vesselName: "CMA CGM",
      billOfLading: "SEL1793950",
      containerNo: "ECMU1704969",
      sealNo: "L6008074",
      qty: 1,
      containerType: "20 DV/GP/ST",
      expiryDate: "07/10/2025",
      status: "Returned",
      pol: "SHANGHAI/CN",
      pod: "BEIRA/MZ",
      deliveryBy: "Jay Bhavani Transport",
      deliveryTerminal: "Beira Port Terminal",
      deliverTo: "ETG Zimbabwe",
      truckingCompany: "Jay Bhavani Transport",
      remarks: "Container returned on time"
    },
    {
      currentDate: "25/04/2025",
      deliveryOrderNo: "DO002/25",
      voyageNo: "V5678",
      vesselName: "MSC",
      billOfLading: "MAEU1234567",
      containerNo: "TGCU2056939",
      sealNo: "L6003660",
      qty: 1,
      containerType: "40 HC",
      expiryDate: "07/11/2025",
      status: "Pending",
      pol: "SINGAPORE",
      pod: "MAPUTO/MZ",
      deliveryBy: "Delhi Logistics",
      deliveryTerminal: "Maputo Port Terminal",
      deliverTo: "SAS Freight",
      truckingCompany: "Delhi Logistics",
      remarks: "Awaiting return confirmation"
    },
    {
      currentDate: "25/04/2025",
      deliveryOrderNo: "DO003/25",
      voyageNo: "V9012",
      vesselName: "MAERSK",
      billOfLading: "MAEU9876543",
      containerNo: "FCIU4518976",
      sealNo: "L6011223",
      qty: 2,
      containerType: "40 OT",
      expiryDate: "07/12/2025",
      status: "Returned",
      pol: "HAMBURG/DE",
      pod: "BEIRA/MZ",
      deliveryBy: "Ahmedabad Logistics",
      deliveryTerminal: "Beira Port Terminal",
      deliverTo: "Global Imports",
      truckingCompany: "Ahmedabad Logistics",
      remarks: "Returned with minor damage"
    },
    {
      currentDate: "25/04/2025",
      deliveryOrderNo: "DO004/25",
      voyageNo: "V3456",
      vesselName: "EVERGREEN",
      billOfLading: "EGL3579512",
      containerNo: "EGLU2222222",
      sealNo: "L6044888",
      qty: 1,
      containerType: "40 DV",
      expiryDate: "07/18/2025",
      status: "In Transit",
      pol: "ANTWERP/BE",
      pod: "MAPUTO/MZ",
      deliveryBy: "Pune Trans Co.",
      deliveryTerminal: "Maputo Port Terminal",
      deliverTo: "Oceanic Traders",
      truckingCompany: "Pune Trans Co.",
      remarks: "Scheduled for return"
    },
    {
      currentDate: "25/04/2025",
      deliveryOrderNo: "DO005/25",
      voyageNo: "V7890",
      vesselName: "ONE",
      billOfLading: "ONE1928374",
      containerNo: "ONEU1928374",
      sealNo: "L6055766",
      qty: 1,
      containerType: "40 HC",
      expiryDate: "07/20/2025",
      status: "Returned",
      pol: "TOKYO/JP",
      pod: "BEIRA/MZ",
      deliveryBy: "Surat Movers",
      deliveryTerminal: "Beira Port Terminal",
      deliverTo: "Logistics Co.",
      truckingCompany: "Surat Movers",
      remarks: "Returned to depot"
    }
  ];

  const columns = [
    { label: 'Current Date', field: 'currentDate' },
    { label: 'Delivery Order No.', field: 'deliveryOrderNo' },
    { label: 'Voyage No.', field: 'voyageNo' },
    { label: 'Vessel Name', field: 'vesselName' },
    { label: 'Bill of Lading', field: 'billOfLading' },
    { label: 'ContainerNo', field: 'containerNo' },
    { label: 'Seal No.', field: 'sealNo' },
    { label: 'Qty.', field: 'qty' },
    { label: 'Container Type', field: 'containerType' },
    { label: 'Expiry Date', field: 'expiryDate' },
    { label: 'Status', field: 'status' },
    { label: 'POL', field: 'pol' },
    { label: 'POD', field: 'pod' },
    { label: 'Delivery By', field: 'deliveryBy' },
    { label: 'Delivery Terminal', field: 'deliveryTerminal' },
    { label: 'Deliver To', field: 'deliverTo' },
    { label: 'Trucking Company', field: 'truckingCompany' },
    { label: 'Remarks', field: 'remarks' },
  ];

  const numericFields = ['qty'];

  return (
    <TableLayout
      title="Container Return Report"
      columns={columns}
      initialData={containerReturnData}
      numericFields={numericFields}
      componentType="containerReturnReport"
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

export default ContainerReturnReport;