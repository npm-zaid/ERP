import React from 'react';
import TableLayout from './TableLayout';

const ListOfDelivery = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      date: '01/04/2025',
      deliveryNo: 'DEL001',
      type: 'Standard',
      consignee: 'XYZ Ltd',
      lrNo: '1',
      fromBranch: 'MUMBAI',
    },
    {
      selected: false,
      audited: false,
      date: '02/04/2025',
      deliveryNo: 'DEL002',
      type: 'Express',
      consignee: 'PQR Ltd',
      lrNo: '2',
      fromBranch: 'AHMEDABAD',
    },
    {
      selected: false,
      audited: false,
      date: '03/04/2025',
      deliveryNo: 'DEL003',
      type: 'Standard',
      consignee: 'ABC Corp',
      lrNo: '3',
      fromBranch: 'DELHI',
    },
    {
      selected: false,
      audited: false,
      date: '04/04/2025',
      deliveryNo: 'DEL004',
      type: 'Express',
      consignee: 'DEF Inc',
      lrNo: '4',
      fromBranch: 'PUNE',
    },
    {
      selected: false,
      audited: false,
      date: '05/04/2025',
      deliveryNo: 'DEL005',
      type: 'Standard',
      consignee: 'GHI Pvt Ltd',
      lrNo: '5',
      fromBranch: 'BANGALORE',
    },
    {
      selected: false,
      audited: false,
      date: '06/04/2025',
      deliveryNo: 'DEL006',
      type: 'Express',
      consignee: 'JKL Traders',
      lrNo: '6',
      fromBranch: 'HYDERABAD',
    },
    {
      selected: false,
      audited: false,
      date: '07/04/2025',
      deliveryNo: 'DEL007',
      type: 'Standard',
      consignee: 'MNO Movers',
      lrNo: '7',
      fromBranch: 'KOLKATA',
    },
    {
      selected: false,
      audited: false,
      date: '08/04/2025',
      deliveryNo: 'DEL008',
      type: 'Express',
      consignee: 'STU Enterprises',
      lrNo: '8',
      fromBranch: 'CHENNAI',
    },
    {
      selected: false,
      audited: false,
      date: '09/04/2025',
      deliveryNo: 'DEL009',
      type: 'Standard',
      consignee: 'VWX Logistics',
      lrNo: '9',
      fromBranch: 'SURAT',
    },
    {
      selected: false,
      audited: false,
      date: '10/04 evidenziato/2025',
      deliveryNo: 'DEL010',
      type: 'Express',
      consignee: 'YZA Ltd',
      lrNo: '10',
      fromBranch: 'NAGPUR',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Date', field: 'date' },
    { label: 'Delivery No', field: 'deliveryNo' },
    { label: 'Type', field: 'type' },
    { label: 'Consignee', field: 'consignee' },
    { label: 'LrNo', field: 'lrNo' },
    { label: 'From Branch', field: 'fromBranch' },
  ];

  const numericFields = ['advance', 'advance2', 'balance', 'article', 'weight', 'rate', 'amount', 'preRate', 'totalArticle', 'totalWeight', 'hamali', 'serviceCharge', 'discountKasar', 'deliveryFreight'];

  const fieldConfig = {
    type: { options: ['Standard', 'Express'] },
    fromBranch: {
      options: [
        'MUMBAI',
        'AHMEDABAD',
        'DELHI',
        'PUNE',
        'BANGALORE',
        'HYDERABAD',
        'KOLKATA',
        'CHENNAI',
        'SURAT',
        'NAGPUR',
      ],
    },
    party: {
      options: [
        'ABC TRANSPORT',
        'ACF',
        'ACM',
        'ACM LOGISTICS',
        'AJAY TRANSPORT',
        'AK TRANSPORT',
        'ANAND',
        'ANMOL TRANPORT',
        'ASHIRWAD TRANSPORT CO.',
        'ASK TRANSPORT',
        'BASUDEV TRANSPORT',
      ],
    },
    hireAccount: { options: ['ABC TRANSPORT', 'AJAY TRANSPORT'] },
    hire: { options: ['Hire 1', 'Hire 2'] },
    cashBank: { options: ['CASH', 'BANK'] },
    cashBank2: { options: ['CASH', 'BANK'] },
    freightOn: { options: ['FreightON'] },
    deliveryType: { options: ['Type 1', 'Type 2'] },
    cashType: { options: ['CASH ON HAND'] },
    account: { options: ['Account 1', 'Account 2'] },
    labour: { options: ['Labour 1', 'Labour 2'] },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      date: new Date().toLocaleDateString('en-GB').split('/').join('/'),
      deliveryNo: '',
      type: '',
      consignee: '',
      lrNo: '',
      lrRows: [],
      fromBranch: '',
      party: '',
      partyAddress: '',
      hireAccount: '',
      hire: '',
      cashBank: '',
      advance: 0,
      cashBank2: '',
      advance2: 0,
      balance: 0,
      consigner: '',
      consignee: '',
      consignerGSTNO: '',
      consigneeGSTNO: '',
      pack: '',
      description: '',
      article: 0,
      weight: 0,
      rate: 0,
      freightOn: '',
      amount: 0,
      preRate: 0,
      totalArticle: 0,
      totalWeight: 0,
      hamali: 0,
      serviceCharge: 0,
      discountKasar: 0,
      deliveryFreight: 0,
      deliveryType: '',
      cashType: '',
      account: '',
      labour: '',
      deliveryAt: '',
      note: '',
    },
    fieldMapping: (entry) => ({
      selected: entry.selected || false,
      audited: entry.audited || false,
      date: entry.date || '',
      deliveryNo: entry.deliveryNo || '',
      type: entry.type || '',
      consignee: entry.consignee || '',
      lrNo: entry.lrRows?.length > 0 ? entry.lrRows[0].lrNo : entry.lrNo || '',
      lrRows: entry.lrRows || [],
      fromBranch: entry.fromBranch || '',
      party: entry.party || '',
      partyAddress: entry.partyAddress || '',
      hireAccount: entry.hireAccount || '',
      hire: entry.hire || '',
      cashBank: entry.cashBank || '',
      advance: parseFloat(entry.advance) || 0,
      cashBank2: entry.cashBank2 || '',
      advance2: parseFloat(entry.advance2) || 0,
      balance: parseFloat(entry.balance) || 0,
      consigner: entry.consigner || '',
      consignee: entry.consignee || '',
      consignerGSTNO: entry.consignerGSTNO || '',
      consigneeGSTNO: entry.consigneeGSTNO || '',
      pack: entry.pack || '',
      description: entry.description || '',
      article: parseInt(entry.article) || 0,
      weight: parseFloat(entry.weight) || 0,
      rate: parseFloat(entry.rate) || 0,
      freightOn: entry.freightOn || '',
      amount: parseFloat(entry.amount) || 0,
      preRate: parseFloat(entry.preRate) || 0,
      totalArticle: parseInt(entry.totalArticle) || 0,
      totalWeight: parseFloat(entry.totalWeight) || 0,
      hamali: parseFloat(entry.hamali) || 0,
      serviceCharge: parseFloat(entry.serviceCharge) || 0,
      discountKasar: parseFloat(entry.discountKasar) || 0,
      deliveryFreight: parseFloat(entry.deliveryFreight) || 0,
      deliveryType: entry.deliveryType || '',
      cashType: entry.cashType || '',
      account: entry.account || '',
      labour: entry.labour || '',
      deliveryAt: entry.deliveryAt || '',
      note: entry.note || '',
    }),
  };

  return (
    <TableLayout
      title="List of Delivery"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="delivery"
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

export default ListOfDelivery;