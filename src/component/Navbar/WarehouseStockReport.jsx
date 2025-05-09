import React from 'react';
import TableLayout from '../TableLayout';

const WarehouseStockReport = () => {
  const warehouseStockData = [
    {
      fileNo: "00021/UVC/25",
      whCargoArrivalDate: "03/01/2025",
      whTime: "14:30",
      vesselName: "CMA CGM",
      billOfLading: "SEL1793950",
      containerNo: "ECMU1704969",
      sealNo: "L6008074",
      qty: 1,
      containerType: "20 DV/GP/ST",
      countryOfOrigin: "SHANGHAI/CN",
      consignee: "ETG Zimbabwe",
      cargoExpiryDate: "07/10/2025",
      totalFreeDays: 5,
      warehouseStorageTime: "12 days",
      cargoStatus: "In Storage",
      cargoDescription: "Hydrogen Peroxide",
      productClass: "Chemical",
      containerCargoQty: 54,
      packageType: "Drums",
      netWeightPerUnit: 200,
      totalNetWeight: 10800,
      grossWeight: 12000,
      totalCargoQty: 54,
      damagedCargo: 0,
      shortCargo: 0,
      previouslyLeftCargoQuantity: 0,
      deliveredTotalCargo: 0,
      totalCargoBalanceLeft: 54,
      balanceCargoOccupiedArea: 10.5,
      cargoTrucksDeliveryDate: "",
      truckTrailerDetails: "",
      remarks: "Awaiting dispatch"
    },
    {
      fileNo: "00022/UVC/25",
      whCargoArrivalDate: "04/01/2025",
      whTime: "09:15",
      vesselName: "MSC",
      billOfLading: "MAEU1234567",
      containerNo: "TGCU2056939",
      sealNo: "L6003660",
      qty: 1,
      containerType: "40 HC",
      countryOfOrigin: "SINGAPORE",
      consignee: "SAS Freight",
      cargoExpiryDate: "07/11/2025",
      totalFreeDays: 6,
      warehouseStorageTime: "10 days",
      cargoStatus: "Delivered",
      cargoDescription: "Cotton Fabrics",
      productClass: "Textiles",
      containerCargoQty: 102,
      packageType: "Bales",
      netWeightPerUnit: 180,
      totalNetWeight: 18360,
      grossWeight: 18500,
      totalCargoQty: 102,
      damagedCargo: 2,
      shortCargo: 0,
      previouslyLeftCargoQuantity: 0,
      deliveredTotalCargo: 100,
      totalCargoBalanceLeft: 0,
      balanceCargoOccupiedArea: 0,
      cargoTrucksDeliveryDate: "15/01/2025",
      truckTrailerDetails: "ALG 858 MC / AI 400 MC",
      remarks: "Delivered to GMS-WH"
    },
    {
      fileNo: "00023/UVC/25",
      whCargoArrivalDate: "05/01/2025",
      whTime: "11:00",
      vesselName: "MAERSK",
      billOfLading: "MAEU9876543",
      containerNo: "FCIU4518976",
      sealNo: "L6011223",
      qty: 2,
      containerType: "40 OT",
      countryOfOrigin: "HAMBURG/DE",
      consignee: "Global Imports",
      cargoExpiryDate: "07/12/2025",
      totalFreeDays: 5,
      warehouseStorageTime: "9 days",
      cargoStatus: "Processing",
      cargoDescription: "Machinery Parts",
      productClass: "Industrial",
      containerCargoQty: 4,
      packageType: "Crates",
      netWeightPerUnit: 5500,
      totalNetWeight: 22000,
      grossWeight: 23000,
      totalCargoQty: 4,
      damagedCargo: 0,
      shortCargo: 1,
      previouslyLeftCargoQuantity: 0,
      deliveredTotalCargo: 0,
      totalCargoBalanceLeft: 3,
      balanceCargoOccupiedArea: 15.0,
      cargoTrucksDeliveryDate: "",
      truckTrailerDetails: "",
      remarks: "Requires inspection"
    },
    {
      fileNo: "00024/UVC/25",
      whCargoArrivalDate: "06/01/2025",
      whTime: "16:45",
      vesselName: "EVERGREEN",
      billOfLading: "EGL3579512",
      containerNo: "EGLU2222222",
      sealNo: "L6044888",
      qty: 1,
      containerType: "40 DV",
      countryOfOrigin: "ANTWERP/BE",
      consignee: "Oceanic Traders",
      cargoExpiryDate: "07/18/2025",
      totalFreeDays: 6,
      warehouseStorageTime: "6 days",
      cargoStatus: "Dispatched",
      cargoDescription: "Apparel",
      productClass: "Clothing",
      containerCargoQty: 500,
      packageType: "Rolls",
      netWeightPerUnit: 38,
      totalNetWeight: 19000,
      grossWeight: 19000,
      totalCargoQty: 500,
      damagedCargo: 0,
      shortCargo: 0,
      previouslyLeftCargoQuantity: 0,
      deliveredTotalCargo: 500,
      totalCargoBalanceLeft: 0,
      balanceCargoOccupiedArea: 0,
      cargoTrucksDeliveryDate: "13/01/2025",
      truckTrailerDetails: "ALG 862 MC / AI 404 MC",
      remarks: "Delivered to Zimbabwe"
    },
    {
      fileNo: "00025/UVC/25",
      whCargoArrivalDate: "07/01/2025",
      whTime: "08:20",
      vesselName: "ONE",
      billOfLading: "ONE1928374",
      containerNo: "ONEU1928374",
      sealNo: "L6055766",
      qty: 1,
      containerType: "40 HC",
      countryOfOrigin: "TOKYO/JP",
      consignee: "Logistics Co.",
      cargoExpiryDate: "07/20/2025",
      totalFreeDays: 5,
      warehouseStorageTime: "14 days",
      cargoStatus: "In Storage",
      cargoDescription: "Mobile Phones",
      productClass: "Electronics",
      containerCargoQty: 700,
      packageType: "Cartons",
      netWeightPerUnit: 17.86,
      totalNetWeight: 12500,
      grossWeight: 12500,
      totalCargoQty: 700,
      damagedCargo: 5,
      shortCargo: 0,
      previouslyLeftCargoQuantity: 0,
      deliveredTotalCargo: 0,
      totalCargoBalanceLeft: 695,
      balanceCargoOccupiedArea: 12.0,
      cargoTrucksDeliveryDate: "",
      truckTrailerDetails: "",
      remarks: "Secured storage"
    }
  ];

  const columns = [
    { label: 'File No.', field: 'fileNo' },
    { label: 'WH Cargo Arrival Date', field: 'whCargoArrivalDate' },
    { label: 'WH Time', field: 'whTime' },
    { label: 'Vessel Name', field: 'vesselName' },
    { label: 'Bill of Lading', field: 'billOfLading' },
    { label: 'Container No.', field: 'containerNo' },
    { label: 'Seal No.', field: 'sealNo' },
    { label: 'Qty.', field: 'qty' },
    { label: 'Container Type', field: 'containerType' },
    { label: 'Country of Origin', field: 'countryOfOrigin' },
    { label: 'Consignee', field: 'consignee' },
    { label: 'Cargo Expiry Date', field: 'cargoExpiryDate' },
    { label: 'Total Free Days', field: 'totalFreeDays' },
    { label: 'Warehouse Storage Time', field: 'warehouseStorageTime' },
    { label: 'Cargo Status', field: 'cargoStatus' },
    { label: 'Cargo Description', field: 'cargoDescription' },
    { label: 'Product Class', field: 'productClass' },
    { label: "Container's Cargo Qty. [Bags/Barrels/Box/Cans]", field: 'containerCargoQty' },
    { label: 'Package Type', field: 'packageType' },
    { label: 'Net Weight [Per/Unit] Kgs.', field: 'netWeightPerUnit' },
    { label: 'Total Net Weight [Kgs.]', field: 'totalNetWeight' },
    { label: 'Gross Weight [Kgs.]', field: 'grossWeight' },
    { label: 'Total Cargo Qty. [Bags/Barrels/Box/Cans]', field: 'totalCargoQty' },
    { label: 'Damaged Cargo', field: 'damagedCargo' },
    { label: 'Short Cargo', field: 'shortCargo' },
    { label: 'Previously Left Cargo Quantity', field: 'previouslyLeftCargoQuantity' },
    { label: 'Delivered Total Cargo', field: 'deliveredTotalCargo' },
    { label: 'Total Cargo Balance Left', field: 'totalCargoBalanceLeft' },
    { label: 'Balance Cargo Occupied Area [MTS]', field: 'balanceCargoOccupiedArea' },
    { label: 'Cargo Trucks Delivery Date', field: 'cargoTrucksDeliveryDate' },
    { label: 'Truck/Trailer Details', field: 'truckTrailerDetails' },
    { label: 'Remarks', field: 'remarks' },
  ];

  const numericFields = [
    'qty',
    'totalFreeDays',
    'containerCargoQty',
    'netWeightPerUnit',
    'totalNetWeight',
    'grossWeight',
    'totalCargoQty',
    'damagedCargo',
    'shortCargo',
    'previouslyLeftCargoQuantity',
    'deliveredTotalCargo',
    'totalCargoBalanceLeft',
    'balanceCargoOccupiedArea'
  ];

  return (
    <TableLayout
      title="Warehouse Stock Report"
      columns={columns}
      initialData={warehouseStockData}
      numericFields={numericFields}
      componentType="warehouseStockReport"
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

export default WarehouseStockReport;