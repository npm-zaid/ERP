import React from 'react';
import TableLayout from '../TableLayout';

const EntryPlanReport = () => {
  const entryPlanData = [
    {
      no: 1,
      truckNo: "ALG 855 MC",
      trailerNo: "AI 398 MC",
      transporterName: "Jay Bhavani Transport",
      containerNo: "ECMU1704969",
      size: "20 DV",
      returnDate: "10/01/2025",
      commodity: "Hydrogen Peroxide",
      clientName: "ETG Zimbabwe",
      type: "Chemical",
      weight: 12000,
      damaged: 0
    },
    {
      no: 2,
      truckNo: "ALG 858 MC",
      trailerNo: "AI 400 MC",
      transporterName: "Delhi Logistics",
      containerNo: "TGCU2056939",
      size: "40 HC",
      returnDate: "12/01/2025",
      commodity: "Cotton Fabrics",
      clientName: "SAS Freight",
      type: "Textiles",
      weight: 18500,
      damaged: 2
    },
    {
      no: 3,
      truckNo: "ALG 860 MC",
      trailerNo: "AI 402 MC",
      transporterName: "Ahmedabad Logistics",
      containerNo: "FCIU4518976",
      size: "40 OT",
      returnDate: "15/01/2025",
      commodity: "Machinery Parts",
      clientName: "Global Imports",
      type: "Industrial",
      weight: 23000,
      damaged: 0
    },
    {
      no: 4,
      truckNo: "ALG 862 MC",
      trailerNo: "AI 404 MC",
      transporterName: "Pune Trans Co.",
      containerNo: "EGLU2222222",
      size: "40 DV",
      returnDate: "18/01/2025",
      commodity: "Apparel",
      clientName: "Oceanic Traders",
      type: "Clothing",
      weight: 19000,
      damaged: 0
    },
    {
      no: 5,
      truckNo: "ALG 864 MC",
      trailerNo: "AI 406 MC",
      transporterName: "Surat Movers",
      containerNo: "ONEU1928374",
      size: "40 HC",
      returnDate: "20/01/2025",
      commodity: "Mobile Phones",
      clientName: "Logistics Co.",
      type: "Electronics",
      weight: 12500,
      damaged: 5
    }
  ];

  const columns = [
    { label: 'No.', field: 'no' },
    { label: 'Truck No.', field: 'truckNo' },
    { label: 'Trailer No.', field: 'trailerNo' },
    { label: 'Transporter Name', field: 'transporterName' },
    { label: 'Container No.', field: 'containerNo' },
    { label: 'Size', field: 'size' },
    { label: 'Return Date', field: 'returnDate' },
    { label: 'Commodity', field: 'commodity' },
    { label: 'Client Name', field: 'clientName' },
    { label: 'Type', field: 'type' },
    { label: 'Weight', field: 'weight' },
    { label: 'Damaged', field: 'damaged' },
  ];

  const numericFields = ['no', 'weight', 'damaged'];

  return (
    <TableLayout
      title="Entry Plan Report"
      columns={columns}
      initialData={entryPlanData}
      numericFields={numericFields}
      componentType="entryPlanReport"
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

export default EntryPlanReport;