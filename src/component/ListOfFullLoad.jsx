import React from 'react';
import TableLayout from './TableLayout';

const ListOfFullLoad = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      lrDate: '01/04/2025',
      lrNo: '1',
      fromCity: 'MUMBAI',
      toCity: 'AHMEDABAD',
      consigner: 'ABC Corp',
      consignee: 'XYZ Ltd',
      weight: 500.00,
      partyRate: 10.00,
      partyFreight: 5000.00,
      transRate: 8.00,
      transFreight: 4000.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '02/04/2025',
      lrNo: '2',
      fromCity: 'DELHI',
      toCity: 'KOTA',
      consigner: 'DEF Inc',
      consignee: 'PQR Ltd',
      weight: 750.00,
      partyRate: 12.00,
      partyFreight: 9000.00,
      transRate: 9.00,
      transFreight: 6750.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '03/04/2025',
      lrNo: '3',
      fromCity: 'PUNE',
      toCity: 'SURAT',
      consigner: 'GHI Pvt Ltd',
      consignee: 'STU Enterprises',
      weight: 600.00,
      partyRate: 11.00,
      partyFreight: 6600.00,
      transRate: 9.50,
      transFreight: 5700.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '04/04/2025',
      lrNo: '4',
      fromCity: 'BANGALORE',
      toCity: 'HYDERABAD',
      consigner: 'JKL Logistics',
      consignee: 'VWX Traders',
      weight: 850.00,
      partyRate: 9.00,
      partyFreight: 7650.00,
      transRate: 7.50,
      transFreight: 6375.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '05/04/2025',
      lrNo: '5',
      fromCity: 'CHENNAI',
      toCity: 'VIZAG',
      consigner: 'MNO Movers',
      consignee: 'YZA Ltd',
      weight: 400.00,
      partyRate: 13.00,
      partyFreight: 5200.00,
      transRate: 10.00,
      transFreight: 4000.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '06/04/2025',
      lrNo: '6',
      fromCity: 'KOLKATA',
      toCity: 'PATNA',
      consigner: 'QRS Shippers',
      consignee: 'BCD Retailers',
      weight: 920.00,
      partyRate: 10.50,
      partyFreight: 9660.00,
      transRate: 8.50,
      transFreight: 7820.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '07/04/2025',
      lrNo: '7',
      fromCity: 'HYDERABAD',
      toCity: 'COIMBATORE',
      consigner: 'TUV Carriers',
      consignee: 'EFG Group',
      weight: 300.00,
      partyRate: 14.00,
      partyFreight: 4200.00,
      transRate: 11.00,
      transFreight: 3300.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '08/04/2025',
      lrNo: '8',
      fromCity: 'SURAT',
      toCity: 'RAJKOT',
      consigner: 'WXY Logistics',
      consignee: 'HIJ Pvt Ltd',
      weight: 780.00,
      partyRate: 11.00,
      partyFreight: 8580.00,
      transRate: 9.00,
      transFreight: 7020.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '09/04/2025',
      lrNo: '9',
      fromCity: 'NAGPUR',
      toCity: 'MUMBAI',
      consigner: 'KLM Shipping',
      consignee: 'NOP Ltd',
      weight: 650.00,
      partyRate: 12.50,
      partyFreight: 8125.00,
      transRate: 10.00,
      transFreight: 6500.00,
    },
    {
      selected: false,
      audited: false,
      lrDate: '10/04/2025',
      lrNo: '10',
      fromCity: 'MUMBAI',
      toCity: 'GOA',
      consigner: 'QPT Movers',
      consignee: 'RST Cargo',
      weight: 720.00,
      partyRate: 10.00,
      partyFreight: 7200.00,
      transRate: 8.00,
      transFreight: 5760.00,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'LRDATE', field: 'lrDate' },
    { label: 'LRNO', field: 'lrNo' },
    { label: 'FROMCITY', field: 'fromCity' },
    { label: 'TOCITY', field: 'toCity' },
    { label: 'Consigner', field: 'consigner' },
    { label: 'Consignee', field: 'consignee' },
    { label: 'Weight', field: 'weight' },
    { label: 'PartyRate', field: 'partyRate' },
    { label: 'Party Freight', field: 'partyFreight' },
    { label: 'TransRate', field: 'transRate' },
    { label: 'TransFreight', field: 'transFreight' },
  ];

  const numericFields = ['weight', 'partyRate', 'partyFreight', 'transRate', 'transFreight'];

  const fieldConfig = {
    type: { options: ['Truck', 'Trailer'] },
    freightBy: { options: ['TBB', 'TBBL'] },
    transporter: { options: ['Trans 1', 'Trans 2'] },
    forParty: { options: ['Party 1', 'Party 2'] },
    forTransporter: { options: ['Trans 1', 'Trans 2'] },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      lrDate: new Date().toISOString().split('T')[0],
      lrNo: '',
      type: 'Truck',
      vehicleNo: '',
      driver: '',
      freightBy: 'TBB',
      transporter: '',
      forParty: '',
      grossWt: 0,
      tareWt: 0,
      loadingWt: 0,
      unloadingWt: 0,
      freightOn: '',
      weight: 0,
      partyRate: 0,
      partyFreight: 0,
      hamali: 0,
      detention: 0,
      pTotal: 0,
      forTransporter: '',
      transRate: 0,
      transFreight: 0,
      commission: 0,
      tdsPer: 0,
      tdsAmt: 0,
      tTotal: 0,
      shortage: 0,
      allowed: 0,
      rate: 0,
      tAmount: 0,
      netParty: 0,
      netTrans: 0,
      difference: 0,
      fromCity: '',
      toCity: '',
      consigner: '',
      consignee: '',
      name: '',
      party: '',
      description: '',
      articleQty: 0,
      km: 0,
      note: '',
    },
    fieldMapping: (entry) => ({
      lrDate: entry.lrDate,
      lrNo: entry.lrNo,
      fromCity: entry.fromCity,
      toCity: entry.toCity,
      consigner: entry.consigner,
      consignee: entry.consignee,
      weight: parseFloat(entry.weight) || 0,
      partyRate: parseFloat(entry.partyRate) || 0,
      partyFreight: parseFloat(entry.partyFreight) || 0,
      transRate: parseFloat(entry.transRate) || 0,
      transFreight: parseFloat(entry.transFreight) || 0,
    }),
  };

  return (
 
      <TableLayout
        title="List of Full Load"
        columns={columns}
        initialData={initialData}
        numericFields={numericFields}
        fieldConfig={fieldConfig}
        windowConfig={windowConfig}
        componentType="fullload"
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

export default ListOfFullLoad;