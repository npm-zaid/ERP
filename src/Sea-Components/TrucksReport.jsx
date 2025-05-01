import React from 'react';
import ReportLayout from './ReportLayout';

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

const headers = [
  'Current Date',
  'Track Number',
  'Trailer No',
  'Quantity',
  'Container Type',
  'Bill Number',
  'Destination',
  'Clients',
  'Status',
  'Invoice Number',
  'Diesel Quantity',
  'Costing',
  'Return'
];

const TrucksReport = ({ theme }) => {
  return (
    <ReportLayout
      data={trucksData}
      headers={headers}
      title="Trucks Operational Report"
      theme={theme}
    />
  );
};

export default TrucksReport;
