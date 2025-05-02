import React from 'react';
import TableLayout from '../TableLayout';

const WarehouseProcessingReport = () => {
  const warehouseData = [
    {
      fileNo: "00016/UVC/25",
      warehouseEntryDate: "03/01/2025",
      vesselName: "CMA CGM",
      billOfLading: "SEL1793950",
      containerNo: "ECMU1704969",
      category: "Chemical",
      freightKind: "FCL",
      qty: 1,
      containerType: "20 DV/GP/ST",
      cargoDescription: "Hydrogen Peroxide",
      cargoMovements: "Import",
      pol: "SHANGHAI/CN",
      pod: "BEIRA/MZ",
      destination: "Lilongwe",
      clients: "ETG Zimbabwe",
      portDueDate: "02/01/2025",
      status: "Processed",
      truckingCompany: "Jay Bhavani Transport",
      portEntryDate: "01/01/2025",
      lastFreeDay: "07/01/2025",
      freeDaysAllowed: 5,
      dwellDays: 2,
      storageDays: 12,
      remarks: "On time"
    },
    {
      fileNo: "00017/UVC/25",
      warehouseEntryDate: "04/01/2025",
      vesselName: "MSC",
      billOfLading: "MAEU1234567",
      containerNo: "TGCU2056939",
      category: "Textiles",
      freightKind: "FCL",
      qty: 1,
      containerType: "40 HC",
      cargoDescription: "Cotton Fabrics",
      cargoMovements: "Import",
      pol: "SINGAPORE",
      pod: "MAPUTO/MZ",
      destination: "GMS-WH",
      clients: "SAS Freight",
      portDueDate: "03/01/2025",
      status: "In Storage",
      truckingCompany: "Delhi Logistics",
      portEntryDate: "02/01/2025",
      lastFreeDay: "08/01/2025",
      freeDaysAllowed: 6,
      dwellDays: 2,
      storageDays: 10,
      remarks: "Awaiting clearance"
    },
    {
      fileNo: "00018/UVC/25",
      warehouseEntryDate: "05/01/2025",
      vesselName: "MAERSK",
      billOfLading: "MAEU9876543",
      containerNo: "FCIU4518976",
      category: "Industrial",
      freightKind: "LCL",
      qty: 2,
      containerType: "40 OT",
      cargoDescription: "Machinery Parts",
      cargoMovements: "Import",
      pol: "HAMBURG/DE",
      pod: "BEIRA/MZ",
      destination: "Beira",
      clients: "Global Imports",
      portDueDate: "04/01/2025",
      status: "Processing",
      truckingCompany: "Ahmedabad Logistics",
      portEntryDate: "03/01/2025",
      lastFreeDay: "09/01/2025",
      freeDaysAllowed: 5,
      dwellDays: 2,
      storageDays: 9,
      remarks: "Requires inspection"
    },
    {
      fileNo: "00019/UVC/25",
      warehouseEntryDate: "06/01/2025",
      vesselName: "EVERGREEN",
      billOfLading: "EGL3579512",
      containerNo: "EGLU2222222",
      category: "Clothing",
      freightKind: "FCL",
      qty: 1,
      containerType: "40 DV",
      cargoDescription: "Apparel",
      cargoMovements: "Import",
      pol: "ANTWERP/BE",
      pod: "MAPUTO/MZ",
      destination: "Zimbabwe",
      clients: "Oceanic Traders",
      portDueDate: "05/01/2025",
      status: "Dispatched",
      truckingCompany: "Pune Trans Co.",
      portEntryDate: "04/01/2025",
      lastFreeDay: "10/01/2025",
      freeDaysAllowed: 6,
      dwellDays: 2,
      storageDays: 6,
      remarks: "Delivered"
    },
    {
      fileNo: "00020/UVC/25",
      warehouseEntryDate: "07/01/2025",
      vesselName: "ONE",
      billOfLading: "ONE1928374",
      containerNo: "ONEU1928374",
      category: "Electronics",
      freightKind: "FCL",
      qty: 1,
      containerType: "40 HC",
      cargoDescription: "Mobile Phones",
      cargoMovements: "Import",
      pol: "TOKYO/JP",
      pod: "BEIRA/MZ",
      destination: "GMS-WH",
      clients: "Logistics Co.",
      portDueDate: "06/01/2025",
      status: "In Storage",
      truckingCompany: "Surat Movers",
      portEntryDate: "05/01/2025",
      lastFreeDay: "11/01/2025",
      freeDaysAllowed: 5,
      dwellDays: 2,
      storageDays: 14,
      remarks: "Secured storage"
    }
  ];

  const columns = [
    { label: 'File No.', field: 'fileNo' },
    { label: 'WarehouseEntry Date', field: 'warehouseEntryDate' },
    { label: 'Vessel Name', field: 'vesselName' },
    { label: 'Bill of Lading [BL No.]', field: 'billOfLading' },
    { label: 'Container No.', field: 'containerNo' },
    { label: 'Category', field: 'category' },
    { label: 'Freight Kind', field: 'freightKind' },
    { label: 'Qty.', field: 'qty' },
    { label: 'Container Type', field: 'containerType' },
    { label: 'Cargo Description', field: 'cargoDescription' },
    { label: 'Cargo Movements', field: 'cargoMovements' },
    { label: 'POL', field: 'pol' },
    { label: 'POD', field: 'pod' },
    { label: 'Destination', field: 'destination' },
    { label: 'Clients', field: 'clients' },
    { label: 'Port Due Date', field: 'portDueDate' },
    { label: 'Status', field: 'status' },
    { label: 'Trucking Company', field: 'truckingCompany' },
    { label: 'Port Entry Date', field: 'portEntryDate' },
    { label: 'Last Free Day', field: 'lastFreeDay' },
    { label: 'Free Days Allowed', field: 'freeDaysAllowed' },
    { label: 'Dwell Days', field: 'dwellDays' },
    { label: 'Storage Days', field: 'storageDays' },
    { label: 'Remarks', field: 'remarks' },
  ];

  const numericFields = ['qty', 'freeDaysAllowed', 'dwellDays', 'storageDays'];

  return (
    <TableLayout
      title="Warehouse Processing Report"
      columns={columns}
      initialData={warehouseData}
      numericFields={numericFields}
      componentType="warehouseProcessingReport"
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

export default WarehouseProcessingReport;