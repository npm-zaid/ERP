import React, { useState } from 'react';
import TableLayout from './TableLayout';

const ListOfLR = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      lrDate: '01/04/2025',
      lrNo: '1',
      center: 'HEAD OFFICE',
      fromCity: 'MUMBAI',
      toCity: 'AHMEDABAD',
      consignorName: 'ABC Corp',
      consigneeName: 'XYZ Ltd',
      totalArticle: 5,
      totalWeight: 100.00,
      totalFreight: 1500.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '02/04/2025',
      lrNo: '2',
      center: 'MUMBAI BRANCH',
      fromCity: 'DELHI',
      toCity: 'PUNE',
      consignorName: 'DEF Inc',
      consigneeName: 'PQR Ltd',
      totalArticle: 3,
      totalWeight: 50.00,
      totalFreight: 800.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '03/04/2025',
      lrNo: '3',
      center: 'DELHI BRANCH',
      fromCity: 'PUNE',
      toCity: 'JAIPUR',
      consignorName: 'GHI Ltd',
      consigneeName: 'STU Corp',
      totalArticle: 7,
      totalWeight: 120.00,
      totalFreight: 1800.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '04/04/2025',
      lrNo: '4',
      center: 'HEAD OFFICE',
      fromCity: 'BANGALORE',
      toCity: 'KOTA',
      consignorName: 'JKL Inc',
      consigneeName: 'VWX Ltd',
      totalArticle: 4,
      totalWeight: 80.00,
      totalFreight: 1200.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '05/04/2025',
      lrNo: '5',
      center: 'MUMBAI BRANCH',
      fromCity: 'MUMBAI',
      toCity: 'SURAT',
      consignorName: 'MNO Corp',
      consigneeName: 'YZA Ltd',
      totalArticle: 6,
      totalWeight: 90.00,
      totalFreight: 1350.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '06/04/2025',
      lrNo: '6',
      center: 'DELHI BRANCH',
      fromCity: 'DELHI',
      toCity: 'AHMEDABAD',
      consignorName: 'PQR Inc',
      consigneeName: 'BCD Ltd',
      totalArticle: 8,
      totalWeight: 110.00,
      totalFreight: 1650.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '07/04/2025',
      lrNo: '7',
      center: 'HEAD OFFICE',
      fromCity: 'PUNE',
      toCity: 'PUNE',
      consignorName: 'STU Corp',
      consigneeName: 'EFG Ltd',
      totalArticle: 2,
      totalWeight: 40.00,
      totalFreight: 600.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '08/04/2025',
      lrNo: '8',
      center: 'MUMBAI BRANCH',
      fromCity: 'BANGALORE',
      toCity: 'JAIPUR',
      consignorName: 'VWX Inc',
      consigneeName: 'HIJ Ltd',
      totalArticle: 9,
      totalWeight: 130.00,
      totalFreight: 1950.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '09/04/2025',
      lrNo: '9',
      center: 'DELHI BRANCH',
      fromCity: 'MUMBAI',
      toCity: 'KOTA',
      consignorName: 'YZA Corp',
      consigneeName: 'KLM Ltd',
      totalArticle: 5,
      totalWeight: 70.00,
      totalFreight: 1050.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '10/04/2025',
      lrNo: '10',
      center: 'HEAD OFFICE',
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
    { label: 'From City', field: 'fromCity' },
    { label: 'To City', field: 'toCity' },
    { label: 'Consignor Name', field: 'consignorName' },
    { label: 'Consignee Name', field: 'consigneeName' },
    { label: 'Total Article', field: 'totalArticle' },
    { label: 'Total Weight', field: 'totalWeight' },
    { label: 'Total Freight', field: 'totalFreight' },
  ];

  const numericFields = ['totalArticle', 'totalWeight', 'totalFreight'];

  const fieldConfig = {
    type: { options: ['Type 1', 'Type 2'] },
    center: { options: ['HEAD OFFICE', 'MUMBAI BRANCH', 'DELHI BRANCH'] },
    freightBy: { options: ['TBB'] },
    delivery: { options: ['Delivery 1', 'Delivery 2'] },
    godown: { options: ['Godown 1', 'Godown 2'] },
    fromCity: { options: ['MUMBAI', 'DELHI', 'PUNE', 'BANGALORE'] },
    toCity: { options: ['AHMEDABAD', 'KOTA', 'JAIPUR', 'SURAT', 'PUNE'] },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      date: new Date().toISOString().split('T')[0],
      lrNo: '',
      center: '',
      type: '',
      freightBy: 'TBB',
      delivery: '',
      godown: '',
      consignee: { fromCity: '', toCity: '', gstno: '', name: '', mobile: '', address: '' },
      billAccount: { gstno: '', name: '', mobile: '', address: '' },
      items: [{ article: 0, packaging: '', goodsContained: '', actualWeight: 0, weight: 0, rate: 0, freightOn: '', amount: 0 }],
      narration: '',
      valueRs: 0,
      previousFreight: 0,
      freight: 0,
      invNo: '',
      crossing: 0,
      docketCharge: 0,
      hamali: 0,
      detention: 0,
      doorCollection: 0,
      doorDelivery: 0,
      bookingId: '',
      memoNo: '',
      deliveryNo: '',
      billNo: '',
      subTotal: 0,
      gstBy: 'N/A',
      gstAmt: 0,
      gstRate: '2.5%',
      totalFreight: 0,
    },
    fieldMapping: (newEntry) => ({
      lrDate: newEntry.date,
      lrNo: newEntry.lrNo,
      center: newEntry.center,
      fromCity: newEntry.consignee.fromCity,
      toCity: newEntry.consignee.toCity,
      consignorName: newEntry.billAccount.name || '',
      consigneeName: newEntry.consignee.name || '',
      totalArticle: (newEntry.items || []).reduce((sum, item) => sum + (parseInt(item.article) || 0), 0),
      totalWeight: (newEntry.items || []).reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0),
      totalFreight: parseFloat(newEntry.totalFreight) || 0,
    }),
  };

  return (
    <TableLayout
      title="List of LR"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="lr"
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

export default ListOfLR;