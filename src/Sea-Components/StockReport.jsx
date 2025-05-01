import React from 'react';
import ReportLayout from './ReportLayout';

const stockData = [
  {
    FileNo: "00007/UVC/25",
    WHCargoArrivalDate: "03/01/2025",
    VesselName: "CMA-CGM",
    BillOfLading: "SEL1793950",
    ContainerNo: "ECMU1704969",
    SealNo: "L6008074",
    Qty: 1,
    ContainerType: "20 DV/GP/ST",
    Origin: "BUSAN/KOREA",
    Consignee: "ETG Zimbabwe",
    CargoExpiryDate: "07/10/2025"
  },
  {
    FileNo: "00007/UVC/25",
    WHCargoArrivalDate: "03/01/2025",
    VesselName: "CMA-CGM",
    BillOfLading: "SEL1793950",
    ContainerNo: "TGCU2056939",
    SealNo: "L6003660",
    Qty: 1,
    ContainerType: "20 DV/GP/ST",
    Origin: "BUSAN/KOREA",
    Consignee: "ETG Zimbabwe",
    CargoExpiryDate: "07/10/2025"
  },
  {
    FileNo: "00008/UVC/25",
    WHCargoArrivalDate: "04/01/2025",
    VesselName: "MAERSK",
    BillOfLading: "MAEU5432100",
    ContainerNo: "MSCU8765432",
    SealNo: "L6011223",
    Qty: 2,
    ContainerType: "40 HC",
    Origin: "ROTTERDAM/NL",
    Consignee: "SAS Freight",
    CargoExpiryDate: "07/11/2025"
  },
  {
    FileNo: "00009/UVC/25",
    WHCargoArrivalDate: "05/01/2025",
    VesselName: "MSC",
    BillOfLading: "MSC1112223",
    ContainerNo: "MSCU3332211",
    SealNo: "L6098876",
    Qty: 3,
    ContainerType: "40 OT",
    Origin: "HAMBURG/GERMANY",
    Consignee: "Global Imports",
    CargoExpiryDate: "07/12/2025"
  },
  {
    FileNo: "00010/UVC/25",
    WHCargoArrivalDate: "06/01/2025",
    VesselName: "CMA-CGM",
    BillOfLading: "CMA7894561",
    ContainerNo: "CMAU6543210",
    SealNo: "L6023456",
    Qty: 1,
    ContainerType: "20 RF",
    Origin: "SHANGHAI/CHINA",
    Consignee: "ETG Zambia",
    CargoExpiryDate: "07/15/2025"
  },
  {
    FileNo: "00011/UVC/25",
    WHCargoArrivalDate: "07/01/2025",
    VesselName: "COSCO",
    BillOfLading: "COS4569871",
    ContainerNo: "COSU9876543",
    SealNo: "L6033499",
    Qty: 4,
    ContainerType: "20 DV",
    Origin: "BUSAN/KOREA",
    Consignee: "ZIM Logistics",
    CargoExpiryDate: "07/17/2025"
  },
  {
    FileNo: "00012/UVC/25",
    WHCargoArrivalDate: "08/01/2025",
    VesselName: "EVERGREEN",
    BillOfLading: "EGL3579512",
    ContainerNo: "EGLU3579512",
    SealNo: "L6044888",
    Qty: 2,
    ContainerType: "40 DV",
    Origin: "YOKOHAMA/JAPAN",
    Consignee: "Trinity Holdings",
    CargoExpiryDate: "07/18/2025"
  },
  {
    FileNo: "00013/UVC/25",
    WHCargoArrivalDate: "09/01/2025",
    VesselName: "ONE",
    BillOfLading: "ONE1928374",
    ContainerNo: "ONEU1928374",
    SealNo: "L6055766",
    Qty: 3,
    ContainerType: "40 HC",
    Origin: "TOKYO/JAPAN",
    Consignee: "Oceanic Traders",
    CargoExpiryDate: "07/20/2025"
  },
  {
    FileNo: "00014/UVC/25",
    WHCargoArrivalDate: "10/01/2025",
    VesselName: "HAPAG-LLOYD",
    BillOfLading: "HLX4758392",
    ContainerNo: "HLXU4758392",
    SealNo: "L6066622",
    Qty: 2,
    ContainerType: "20 DV",
    Origin: "SINGAPORE",
    Consignee: "Beira Depot",
    CargoExpiryDate: "07/21/2025"
  },
  {
    FileNo: "00015/UVC/25",
    WHCargoArrivalDate: "11/01/2025",
    VesselName: "ZIM",
    BillOfLading: "ZIM1357924",
    ContainerNo: "ZIMU1357924",
    SealNo: "L6077333",
    Qty: 1,
    ContainerType: "20 OT",
    Origin: "ANTWERP/BELGIUM",
    Consignee: "GMS Mozambique",
    CargoExpiryDate: "07/23/2025"
  }
];

const headers = [
  'File No.',
  'WH Cargo Arrival Date',
  'Vessel Name',
  'Bill of Lading',
  'ContainerNo.',
  'Seal No.',
  'Qty.',
  'Container Type',
  'Country of Origin',
  'Consignee',
  'Cargo Expiry Date'
];

const StockReport = ({ theme }) => {
  return (
    <ReportLayout
      data={stockData}
      headers={headers}
      title="Stocks"
      theme={theme}
    />
  );
};

export default StockReport;
