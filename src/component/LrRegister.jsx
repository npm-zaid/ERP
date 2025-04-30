import React from 'react';
import TableLayout from './TableLayout';

const LrRegister = () => {
  const columns = [
    { field: 'selected', label: 'A' },
    { field: 'lrDate', label: 'Lr Date' },
    { field: 'lrNo', label: 'Lr No' },
    { field: 'freightBy', label: 'Freight By' },
    { field: 'fromCity', label: 'From City' },
    { field: 'toCity', label: 'To City' },
    { field: 'deliveryType', label: 'Delivery Type' },
    { field: 'consignorName', label: 'Consignor Name' },
    { field: 'consignorGST', label: 'Consignor GST' },
    { field: 'truckNo', label: 'Truck No' },
    { field: 'article', label: 'Article' },
    { field: 'weight', label: 'Weight' },
    { field: 'freight', label: 'Freight' },
    { field: 'bc', label: 'BC' },
    { field: 'hamali', label: 'Hamali' },
    { field: 'otherCharge', label: 'OtherCharge' },
    { field: 'subTotal', label: 'SubTotal' },
    { field: 'gstBy', label: 'GST By' },
    { field: 'gstAmount', label: 'GSTAmount' },
    { field: 'totalFreight', label: 'TotalFreight' },
  ];

  const initialData = [
    { selected: false, lrDate: '01/04/2025', lrNo: 17222, freightBy: 'TBB', fromCity: 'CHANDIGARH', toCity: 'AGRA', deliveryType: 'Godown', consignorName: 'A HARILAL & CO. PVT LTD', consignorGST: '', truckNo: 'GJ01XX1234', article: 'Box', weight: 500, freight: 1500, bc: 100, hamali: 50, otherCharge: 20, subTotal: 1670, gstBy: 'Consignor', gstAmount: 83.50, totalFreight: 1753.50 },
    { selected: false, lrDate: '01/04/2025', lrNo: 17223, freightBy: 'TBB', fromCity: 'AHMEDABAD', toCity: 'AMBALA', deliveryType: 'Godown', consignorName: 'ABC DRIVER', consignorGST: '', truckNo: 'GJ01XX1235', article: 'Crate', weight: 300, freight: 1200, bc: 80, hamali: 40, otherCharge: 10, subTotal: 1330, gstBy: 'Consignee', gstAmount: 66.50, totalFreight: 1396.50 },
    { selected: false, lrDate: '05/04/2025', lrNo: 17224, freightBy: 'TBB', fromCity: 'BADLAPUR', toCity: 'ANKLESHWAR', deliveryType: 'Godown', consignorName: 'SHREE RADHEY COTAINER', consignorGST: '03ABJPG4740R', truckNo: 'MH04YY5678', article: 'Pallet', weight: 700, freight: 2000, bc: 150, hamali: 60, otherCharge: 30, subTotal: 2240, gstBy: 'Consignor', gstAmount: 112, totalFreight: 2352 },
    { selected: false, lrDate: '11/04/2025', lrNo: 17225, freightBy: 'TBB', fromCity: 'CHANDIGARH', toCity: 'DELHI (SG)', deliveryType: 'Godown', consignorName: 'GIRIDHARI LAL RAJESH KUMAR', consignorGST: '', truckNo: 'DL01ZZ9012', article: 'Bag', weight: 400, freight: 1400, bc: 90, hamali: 45, otherCharge: 15, subTotal: 1550, gstBy: 'Consignee', gstAmount: 77.50, totalFreight: 1627.50 },
    { selected: false, lrDate: '11/04/2025', lrNo: 17226, freightBy: 'To Pay', fromCity: 'JODHPUR', toCity: 'KOTA', deliveryType: 'Godown', consignorName: 'SHREYANS JAIN', consignorGST: '', truckNo: 'RJ19AA3456', article: 'Box', weight: 600, freight: 1800, bc: 120, hamali: 50, otherCharge: 25, subTotal: 1995, gstBy: 'Consignor', gstAmount: 99.75, totalFreight: 2094.75 },
    { selected: false, lrDate: '11/04/2025', lrNo: 17227, freightBy: 'To Pay', fromCity: 'AHMEDABAD', toCity: 'AMBERNATH', deliveryType: 'Godown', consignorName: 'AAKASH ENTERPRISE', consignorGST: '', truckNo: 'GJ01BB7890', article: 'Crate', weight: 350, freight: 1300, bc: 85, hamali: 40, otherCharge: 15, subTotal: 1440, gstBy: 'Consignee', gstAmount: 72, totalFreight: 1512 },
    { selected: false, lrDate: '14/04/2025', lrNo: 17228, freightBy: 'TBB', fromCity: 'AGRA', toCity: 'AHMEDABAD', deliveryType: 'Godown', consignorName: 'A HARILAL & CO. PVT LTD', consignorGST: '07AAACE2710L', truckNo: 'UP80CC2345', article: 'Pallet', weight: 800, freight: 2200, bc: 160, hamali: 70, otherCharge: 40, subTotal: 2470, gstBy: 'Consignor', gstAmount: 123.50, totalFreight: 2593.50 },
    { selected: false, lrDate: '15/04/2025', lrNo: 17229, freightBy: 'Consignee', fromCity: 'RAJKOT', toCity: 'CHANDIGADH', deliveryType: 'Godown', consignorName: 'ENAR WELD-BRAZE PVT LTD', consignorGST: '', truckNo: 'GJ03DD6789', article: 'Bag', weight: 450, freight: 1500, bc: 100, hamali: 50, otherCharge: 20, subTotal: 1670, gstBy: 'Consignee', gstAmount: 83.50, totalFreight: 1753.50 },
    { selected: false, lrDate: '16/04/2025', lrNo: 17230, freightBy: 'TBB', fromCity: 'AKOLA', toCity: 'MUMBAI', deliveryType: 'Godown', consignorName: 'AVINASH WANKHADE', consignorGST: '', truckNo: 'MH30EE1234', article: 'Box', weight: 550, freight: 1700, bc: 110, hamali: 55, otherCharge: 25, subTotal: 1890, gstBy: 'Consignor', gstAmount: 94.50, totalFreight: 1984.50 },
    { selected: false, lrDate: '16/04/2025', lrNo: 17231, freightBy: 'Paid', fromCity: 'AHMEDABAD', toCity: 'AMBERNATH', deliveryType: 'Godown', consignorName: 'AARJAVAM TECHFAB PRIVATE LIMITED', consignorGST: '03AAUCA1090K', truckNo: 'GJ01FF5678', article: 'Crate', weight: 320, freight: 1250, bc: 80, hamali: 40, otherCharge: 10, subTotal: 1380, gstBy: 'Consignee', gstAmount: 69, totalFreight: 1449 },
    { selected: false, lrDate: '18/04/2025', lrNo: 17232, freightBy: 'TBB', fromCity: 'AMBALA', toCity: 'ANANTNAG', deliveryType: 'Godown', consignorName: 'A HARILAL & CO. PVT LTD', consignorGST: '09AAFC56576F', truckNo: 'HR26GG9012', article: 'Pallet', weight: 650, freight: 1900, bc: 130, hamali: 60, otherCharge: 30, subTotal: 2120, gstBy: 'Consignor', gstAmount: 106, totalFreight: 2226 },
    { selected: false, lrDate: '19/04/2025', lrNo: 17233, freightBy: 'TBB', fromCity: 'RAJKOT', toCity: 'AHMEDABAD', deliveryType: 'Godown', consignorName: 'A HARILAL & CO. PVT LTD', consignorGST: '', truckNo: 'GJ03HH3456', article: 'Bag', weight: 480, freight: 1600, bc: 100, hamali: 50, otherCharge: 20, subTotal: 1770, gstBy: 'Consignee', gstAmount: 88.50, totalFreight: 1858.50 },
    { selected: false, lrDate: '22/04/2025', lrNo: 17234, freightBy: 'TBB', fromCity: 'RAJKOT', toCity: 'AHMEDABAD', deliveryType: 'Godown', consignorName: 'AARJAVAM TECHFAB PRIVATE LIMITED', consignorGST: '03AAUCA1090K', truckNo: 'GJ03II7890', article: 'Box', weight: 520, freight: 1650, bc: 110, hamali: 50, otherCharge: 25, subTotal: 1835, gstBy: 'Consignor', gstAmount: 91.75, totalFreight: 1926.75 },
    { selected: false, lrDate: '25/04/2025', lrNo: 1, freightBy: 'TBB', fromCity: 'AHMEDABAD', toCity: 'AURANGABAD', deliveryType: 'Godown', consignorName: 'ACID CHEMICAL', consignorGST: '', truckNo: 'MH12JJ2345', article: 'Crate', weight: 380, freight: 1350, bc: 90, hamali: 45, otherCharge: 15, subTotal: 1500, gstBy: 'Consignee', gstAmount: 75, totalFreight: 1575 },
  ];

  const numericFields = ['lrNo', 'weight', 'freight', 'bc', 'hamali', 'otherCharge', 'subTotal', 'gstAmount', 'totalFreight'];

  return (
    <TableLayout
      title="@Sort (L.R.)"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      showAdd={true}
      showEdit={true}
      showView={true}
      showDelete={true}
      showRefresh={true}
      showPrint={true}
      showAudit={true}
      showField={true}
      showExportExcel={true}
      showExportPDF={true}
    />
  );
};

export default LrRegister;