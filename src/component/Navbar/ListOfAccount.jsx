import React, { useState } from 'react';
import TableLayout from '../TableLayout';

const ListOfAccount = () => {
  const initialData = [
    {
      selected: false,
      audited: false,
      accountName: 'ABC Corp',
      notSorted: 'No',
      mobile: '9876543210',
      city: 'Mumbai',
      group: 'Corporate',
      gstNo: '27AAACA1234B1Z5',
      stateName: 'Maharashtra',
      opening: 50000.00,
      crDb: 'Cr',
      balanceMethod: 'FIFO',
    },
    {
      selected: false,
      audited: false,
      accountName: 'XYZ Ltd',
      notSorted: 'Yes',
      mobile: '8765432109',
      city: 'Delhi',
      group: 'SME',
      gstNo: '07AABCB5678C1Z3',
      stateName: 'Delhi',
      opening: 75000.00,
      crDb: 'Db',
      balanceMethod: 'LIFO',
    },
    {
      selected: false,
      audited: false,
      accountName: 'PQR Enterprises',
      notSorted: 'No',
      mobile: '7654321098',
      city: 'Bangalore',
      group: 'Retail',
      gstNo: '29AADCP7890D1Z1',
      stateName: 'Karnataka',
      opening: 25000.00,
      crDb: 'Cr',
      balanceMethod: 'Average',
    },
    {
      selected: false,
      audited: false,
      accountName: 'DEF Inc',
      notSorted: 'Yes',
      mobile: '6543210987',
      city: 'Pune',
      group: 'Corporate',
      gstNo: '27AAADD4567E1Z9',
      stateName: 'Maharashtra',
      opening: 100000.00,
      crDb: 'Db',
      balanceMethod: 'FIFO',
    },
    {
      selected: false,
      audited: false,
      accountName: 'GHI Ltd',
      notSorted: 'No',
      mobile: '5432109876',
      city: 'Ahmedabad',
      group: 'SME',
      gstNo: '24AAEFG1234F1Z7',
      stateName: 'Gujarat',
      opening: 45000.00,
      crDb: 'Cr',
      balanceMethod: 'LIFO',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Audited', field: 'audited' },
    { label: 'Account Name', field: 'accountName' },
    { label: 'Not Sorted', field: 'notSorted' },
    { label: 'Mobile', field: 'mobile' },
    { label: 'City', field: 'city' },
    { label: 'Group', field: 'group' },
    { label: 'GSTNO', field: 'gstNo' },
    { label: 'State Name', field: 'stateName' },
    { label: 'Opening', field: 'opening' },
    { label: 'Cr/Db', field: 'crDb' },
    { label: 'Balance Method', field: 'balanceMethod' },
  ];

  const numericFields = ['opening'];

  const fieldConfig = {
    notSorted: { options: ['Yes', 'No'] },
    city: { options: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Ahmedabad', 'Surat', 'Jaipur', 'Kota'] },
    group: { options: ['Corporate', 'SME', 'Retail', 'Individual'] },
    stateName: { options: ['Maharashtra', 'Delhi', 'Karnataka', 'Gujarat', 'Rajasthan'] },
    crDb: { options: ['Cr', 'Db'] },
    balanceMethod: { options: ['FIFO', 'LIFO', 'Average'] },
  };

  const windowConfig = {
    initialState: {
      selected: false,
      audited: false,
      accountName: '',
      notSorted: 'No',
      mobile: '',
      city: '',
      group: '',
      gstNo: '',
      stateName: '',
      opening: 0,
      crDb: 'Cr',
      balanceMethod: 'FIFO',
    },
    fieldMapping: (newEntry) => ({
      accountName: newEntry.accountName || '',
      notSorted: newEntry.notSorted || 'No',
      mobile: newEntry.mobile || '',
      city: newEntry.city || '',
      group: newEntry.group || '',
      gstNo: newEntry.gstNo || '',
      stateName: newEntry.stateName || '',
      opening: parseFloat(newEntry.opening) || 0,
      crDb: newEntry.crDb || 'Cr',
      balanceMethod: newEntry.balanceMethod || 'FIFO',
    }),
  };

  return (
    <TableLayout
      title="List of Account"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      fieldConfig={fieldConfig}
      windowConfig={windowConfig}
      componentType="account"
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

export default ListOfAccount;