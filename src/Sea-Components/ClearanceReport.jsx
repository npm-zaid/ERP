import React from 'react';
import ReportLayout from './ReportLayout';

const clearanceData = [
  {
    currentDate: "25/04/2025",
    vesselName: "CMA CGM",
    BillOfLading: "SEL1793950",
    invoiceNo: "INV001",
    ContainerNo: "ECMU1704969",
    sealNumber: "S001",
    pol: "SHANGHAI/CN",
    pod: "BEIRA/MZ",
    containerType: "20 DV/GP/ST",
    consigneeNotifyParty: "ETG Zimbabwe",
    warehouseArrivalDate: "03/01/2025",
    cargoStorageTime: "12 days",
    cargoDeliveryDate: "18/01/2025",
    cargoStatus: "Completed",
    cargoDescription: "Hydrogen Peroxide",
    productClass: "Chemical",
    quantity: 54,
    packageType: "Drums",
    grossWeight: "12000 kg",
    costing: "USD 3500",
    remarks: "On time"
  },
  {
    currentDate: "25/04/2025",
    vesselName: "MSC",
    BillOfLading: "MAEU1234567",
    invoiceNo: "INV002",
    ContainerNo: "TGCU2056939",
    sealNumber: "S002",
    pol: "SINGAPORE",
    pod: "MAPUTO/MZ",
    containerType: "40 HC",
    consigneeNotifyParty: "SAS Freight",
    warehouseArrivalDate: "04/01/2025",
    cargoStorageTime: "10 days",
    cargoDeliveryDate: "15/01/2025",
    cargoStatus: "Delivered",
    cargoDescription: "Textiles",
    productClass: "Goods",
    quantity: 102,
    packageType: "Bales",
    grossWeight: "18500 kg",
    costing: "USD 2800",
    remarks: "Handled safely"
  },
  {
    currentDate: "25/04/2025",
    vesselName: "MAERSK",
    BillOfLading: "MAEU9876543",
    invoiceNo: "INV003",
    ContainerNo: "FCIU4518976",
    sealNumber: "S003",
    pol: "HAMBURG/DE",
    pod: "BEIRA/MZ",
    containerType: "40 OT",
    consigneeNotifyParty: "Global Imports",
    warehouseArrivalDate: "05/01/2025",
    cargoStorageTime: "9 days",
    cargoDeliveryDate: "13/01/2025",
    cargoStatus: "Processing",
    cargoDescription: "Machinery",
    productClass: "Industrial",
    quantity: 4,
    packageType: "Crates",
    grossWeight: "23000 kg",
    costing: "USD 4600",
    remarks: "Requires crane"
  },
  {
    currentDate: "25/04/2025",
    vesselName: "EVERGREEN",
    BillOfLading: "EGL3579512",
    invoiceNo: "INV004",
    ContainerNo: "EGLU2222222",
    sealNumber: "S004",
    pol: "ANTWERP/BE",
    pod: "MAPUTO/MZ",
    containerType: "40 DV",
    consigneeNotifyParty: "Oceanic Traders",
    warehouseArrivalDate: "06/01/2025",
    cargoStorageTime: "6 days",
    cargoDeliveryDate: "13/01/2025",
    cargoStatus: "Completed",
    cargoDescription: "Fabrics",
    productClass: "Clothing",
    quantity: 500,
    packageType: "Rolls",
    grossWeight: "19000 kg",
    costing: "USD 3000",
    remarks: "Standard"
  },
  {
    currentDate: "25/04/2025",
    vesselName: "ONE",
    BillOfLading: "ONE1928374",
    invoiceNo: "INV005",
    ContainerNo: "ONEU1928374",
    sealNumber: "S005",
    pol: "TOKYO/JP",
    pod: "BEIRA/MZ",
    containerType: "40 HC",
    consigneeNotifyParty: "Logistics Co.",
    warehouseArrivalDate: "07/01/2025",
    cargoStorageTime: "14 days",
    cargoDeliveryDate: "22/01/2025",
    cargoStatus: "Delivered",
    cargoDescription: "Mobile Phones",
    productClass: "Electronics",
    quantity: 700,
    packageType: "Cartons",
    grossWeight: "12500 kg",
    costing: "USD 4100",
    remarks: "Secured"
  }
];

const headers = [
  'Current Date',
  'Vessel Name',
  'Bill of Lading',
  'Invoice No',
  'ContainerNo.',
  'Seal Number',
  'POL',
  'POD',
  'Container Type',
  'Consignee Notify Party',
  'Warehouse Arrival Date',
  'Cargo Storage Time',
  'Cargo Delivery Date',
  'Cargo Status',
  'Cargo Description',
  'Product Class',
  'Quantity',
  'Package Type',
  'Gross Weight',
  'Costing',
  'Remarks'
];

const ClearanceReport = ({ theme }) => {
  return (
    <ReportLayout
      data={clearanceData}
      headers={headers}
      title="Clearance & Customs Report"
      theme={theme}
    />
  );
};

export default ClearanceReport;
