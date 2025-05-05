import React from 'react';
import TableLayout from './TableLayout';

const ListOfLR = () => {
  const initialData = [
    {
      id: 'lr-001',
      selected: false,
      audited: false,
      lrDate: '01/04/2025',
      lrNo: '1',
      center: 'HEAD OFFICE',
      delivery: 'Godown',
      fromCity: 'MUMBAI',
      toCity: 'AHMEDABAD',
      consignorName: 'ABC Corp',
      consigneeName: 'XYZ Ltd',
      totalArticle: 5,
      totalWeight: 100.00,
      totalFreight: 1500.00,
    },
    {
      id: 'lr-002',
      selected: false,
      audited: false,
      lrDate: '02/04/2025',
      lrNo: '2',
      center: 'MUMBAI BRANCH',
      delivery: 'TBB',
      fromCity: 'DELHI',
      toCity: 'PUNE',
      consignorName: 'DEF Inc',
      consigneeName: 'PQR Ltd',
      totalArticle: 3,
      totalWeight: 50.00,
      totalFreight: 800.00,
    },
    {
      id: 'lr-003',
      selected: false,
      audited: false,
      lrDate: '03/04/2025',
      lrNo: '3',
      center: 'DELHI BRANCH',
      delivery: 'Godown',
      fromCity: 'PUNE',
      toCity: 'JAIPUR',
      consignorName: 'GHI Ltd',
      consigneeName: 'STU Corp',
      totalArticle: 7,
      totalWeight: 120.00,
      totalFreight: 1800.00,
    },
    {
      id: 'lr-004',
      selected: false,
      audited: false,
      lrDate: '04/04/2025',
      lrNo: '4',
      center: 'HEAD OFFICE',
      delivery: 'TBB',
      fromCity: 'BANGALORE',
      toCity: 'KOTA',
      consignorName: 'JKL Inc',
      consigneeName: 'VWX Ltd',
      totalArticle: 4,
      totalWeight: 80.00,
      totalFreight: 1200.00,
    },
    {
      id: 'lr-005',
      selected: false,
      audited: false,
      lrDate: '05/04/2025',
      lrNo: '5',
      center: 'MUMBAI BRANCH',
      delivery: 'Godown',
      fromCity: 'MUMBAI',
      toCity: 'SURAT',
      consignorName: 'MNO Corp',
      consigneeName: 'YZA Ltd',
      totalArticle: 6,
      totalWeight: 90.00,
      totalFreight: 1350.00,
    },
    {
      id: 'lr-006',
      selected: false,
      audited: false,
      lrDate: '06/04/2025',
      lrNo: '6',
      center: 'DELHI BRANCH',
      delivery: 'TBB',
      fromCity: 'DELHI',
      toCity: 'AHMEDABAD',
      consignorName: 'PQR Inc',
      consigneeName: 'BCD Ltd',
      totalArticle: 8,
      totalWeight: 110.00,
      totalFreight: 1650.00,
    },
    {
      id: 'lr-007',
      selected: false,
      audited: false,
      lrDate: '07/04/2025',
      lrNo: '7',
      center: 'HEAD OFFICE',
      delivery: 'Godown',
      fromCity: 'PUNE',
      toCity: 'PUNE',
      consignorName: 'STU Corp',
      consigneeName: 'EFG Ltd',
      totalArticle: 2,
      totalWeight: 40.00,
      totalFreight: 600.00,
    },
    {
      id: 'lr-008',
      selected: false,
      audited: false,
      lrDate: '08/04/2025',
      lrNo: '8',
      center: 'MUMBAI BRANCH',
      delivery: 'TBB',
      fromCity: 'BANGALORE',
      toCity: 'JAIPUR',
      consignorName: 'VWX Inc',
      consigneeName: 'HIJ Ltd',
      totalArticle: 9,
      totalWeight: 130.00,
      totalFreight: 1950.00,
    },
    {
      id: 'lr-009',
      selected: false,
      audited: false,
      lrDate: '09/04/2025',
      lrNo: '9',
      center: 'DELHI BRANCH',
      delivery: 'Godown',
      fromCity: 'MUMBAI',
      toCity: 'KOTA',
      consignorName: 'YZA Corp',
      consigneeName: 'KLM Ltd',
      totalArticle: 5,
      totalWeight: 70.00,
      totalFreight: 1050.00,
    },
    {
      id: 'lr-010',
      selected: false,
      audited: false,
      lrDate: '10/04/2025',
      lrNo: '10',
      center: 'HEAD OFFICE',
      delivery: 'TBB',
      fromCity: 'DELHI',
      toCity: 'SURAT',
      consignorName: 'BCD Inc',
      consigneeName: 'NOP Ltd',
      totalArticle: 6,
      totalWeight: 85.00,
      totalFreight: 1275.00,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'LR Date', field: 'lrDate' },
    { label: 'LR No', field: 'lrNo' },
    { label: 'Center', field: 'center' },
    { label: 'Delivery', field: 'delivery' },
    { label: 'From City', field: 'fromCity' },
    { label: 'To City', field: 'toCity' },
    { label: 'Consignor Name', field: 'consignorName' },
    { label: 'Consignee Name', field: 'consigneeName' },
    { label: 'Total Article', field: 'totalArticle' },
    { label: 'Total Weight', field: 'totalWeight' },
    { label: 'Total Freight', field: 'totalFreight' },
  ];

  const numericFields = ['totalArticle', 'totalWeight', 'totalFreight'];


  const windowConfig = {
    initialState: {
      id: '',
      selected: false,
      audited: false,
      date: new Date().toLocaleDateString('en-GB').split('/').join('/'),
      lrNo: '',
      center: '',
      type: '',
      delivery: '',
      fromCity: '',
      toCity: '',
      consignor: { name: '', gstno: '', mobile: '', address: '' },
      consignee: { name: '', gstno: '', mobile: '', address: '' },
      billAccount: { name: '', gstno: '', mobile: '', address: '' },
      vehicleNo: '',
      items: [{ article: 0, packaging: '', goodsContained: '', actualWeight: 0, weight: 0, rate: 0, freightOn: '', amount: 0 }],
      totalArticle: 0,
      totalWeight: 0,
      actualWeight: 0,
      valueRs: 0,
      invNo: '',
      previousFreight: 0,
      freight: 0,
      crossing: 0,
      docketCharge: 0,
      hamali: 0,
      detention: 0,
      doorCollection: 0,
      doorDelivery: 0,
      deliveryAt: '',
      narration: '',
      bookingId: '',
      memoNo: '',
      deliveryNo: '',
      billNo: '',
      subTotal: 0,
      gstBy: '',
      gstRate: 2.5,
      gstAmt: 0,
      totalFreight: 0,
      status: '',
    },
    fieldMapping: (newEntry) => {
      const mappedEntry = {
        id: newEntry.id,
        selected: false,
        audited: false,
        lrDate: newEntry.date || '',
        lrNo: newEntry.lrNo || '',
        center: newEntry.center || '',
        delivery: newEntry.delivery || '',
        fromCity: newEntry.fromCity || '',
        toCity: newEntry.toCity || '',
        consignorName: newEntry.consignor?.name || '',
        consigneeName: newEntry.consignee?.name || '',
        totalArticle: newEntry.totalArticle || (newEntry.items || []).reduce((sum, item) => sum + (parseInt(item.article) || 0), 0),
        totalWeight: newEntry.totalWeight || (newEntry.items || []).reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0),
        totalFreight: parseFloat(newEntry.totalFreight) || 0,
      };
      console.log('Mapped entry for edit:', mappedEntry);
      return mappedEntry;
    },
  };

  console.log('Initial windowConfig.initialState:', windowConfig.initialState);

  return (
    <TableLayout
      title="List of LR"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      windowConfig={windowConfig}
      componentType="lr"
      showAdd={true}
      showEdit={true}
      showView={true}
      showDelete={true}
      showRefresh={true}
      showPrint={true}
      showAudit={true}
      showExportExcel={true}
      showExportPDF={true}
    />
  );
};

export default ListOfLR;