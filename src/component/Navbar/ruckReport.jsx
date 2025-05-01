import React from 'react';
import TableLayout from '../TableLayout';

const TruckReport = () => {
  const trucksData = [
    {
      "Current Date": "25/04/2025",
      "Track Number": "ALG 855 MC",
      "Trailer No": "AI 398 MC",
      "Quantity": 1,
      "Container Type": "20 DV",
      "BillOfLading": "NGP1728334",
      "Destination": "Lilongwe",
      "Clients": "ETG Zimbabwe",
      "Status": "Completed",
      "Invoice Number": "INV001",
      "Diesel Quantity": "150L",
      "Costing": "USD 2700",
      "Return": "Returned"
    },
    {
      "Current Date": "25/04/2025",
      "Track Number": "ALG 858 MC",
      "Trailer No": "AI 400 MC",
      "Quantity": 1,
      "Container Type": "40 HC",
      "BillOfLading": "SEL1793950",
      "Destination": "GMS-WH",
      "Clients": "SAS Freight",
      "Status": "Completed",
      "Invoice Number": "INV002",
      "Diesel Quantity": "140L",
      "Costing": "USD 250",
      "Return": "Returned"
    },
    {
      "Current Date": "25/04/2025",
      "Track Number": "ALG 860 MC",
      "Trailer No": "AI 402 MC",
      "Quantity": 2,
      "Container Type": "20 RF",
      "BillOfLading": "MAEU245321299",
      "Destination": "GMS-WH",
      "Clients": "Global Imports",
      "Status": "Delivered",
      "Invoice Number": "INV003",
      "Diesel Quantity": "160L",
      "Costing": "USD 300",
      "Return": "Not Returned"
    },
    {
      "Current Date": "25/04/2025",
      "Track Number": "ALG 862 MC",
      "Trailer No": "AI 404 MC",
      "Quantity": 1,
      "Container Type": "40 OT",
      "BillOfLading": "MAEU245321299",
      "Destination": "Beira",
      "Clients": "Trinity Holdings",
      "Status": "In Transit",
      "Invoice Number": "INV004",
      "Diesel Quantity": "170L",
      "Costing": "USD 500",
      "Return": "Pending"
    },
    {
      "Current Date": "25/04/2025",
      "Track Number": "ALG 864 MC",
      "Trailer No": "AI 406 MC",
      "Quantity": 1,
      "Container Type": "20 DV",
      "BillOfLading": "MAEU245321299",
      "Destination": "Zimbabwe",
      "Clients": "GMS Mozambique",
      "Status": "Processing",
      "Invoice Number": "INV005",
      "Diesel Quantity": "155L",
      "Costing": "USD 400",
      "Return": "Not Returned"
    }
  ];

  const columns = [
    { label: 'Current Date', field: 'Current Date' },
    { label: 'Track Number', field: 'Track Number' },
    { label: 'Trailer No', field: 'Trailer No' },
    { label: 'Quantity', field: 'Quantity' },
    { label: 'Container Type', field: 'Container Type' },
    { label: 'Bill Number', field: 'BillOfLading' },
    { label: 'Destination', field: 'Destination' },
    { label: 'Clients', field: 'Clients' },
    { label: 'Status', field: 'Status' },
    { label: 'Invoice Number', field: 'Invoice Number' },
    { label: 'Diesel Quantity', field: 'Diesel Quantity' },
    { label: 'Costing', field: 'Costing' },
    { label: 'Return', field: 'Return' },
  ];

  const numericFields = ['Quantity'];

  return (
    <TableLayout
      title="Truck Report"
      columns={columns}
      initialData={trucksData}
      numericFields={numericFields}
      componentType="truckReport"
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

export default TruckReport;