import React from 'react';
import TableLayout from '../TableLayout';

const SmsMask = () => {
  const initialData = [
    {
      selected: false,
      company: 'ABC Corp',
      mask: 'ABCCORP',
    },
    {
      selected: false,
      company: 'XYZ Ltd',
      mask: 'XYZLTD',
    },
    {
      selected: false,
      company: 'DEF Inc',
      mask: 'DEFINC',
    },
    {
      selected: false,
      company: 'GHI Co',
      mask: 'GHICO',
    },
    {
      selected: false,
      company: 'JKL Enterprises',
      mask: 'JKLENT',
    },
    {
      selected: false,
      company: 'MNO Services',
      mask: 'MNOSRV',
    },
    {
      selected: false,
      company: 'PQR Solutions',
      mask: 'PQRSOL',
    },
    {
      selected: false,
      company: 'STU Tech',
      mask: 'STUTECH',
    },
    {
      selected: false,
      company: 'VWX Systems',
      mask: 'VWXSYS',
    },
    {
      selected: false,
      company: 'YZA Innovations',
      mask: 'YZAINN',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Company', field: 'company' },
    { label: 'Mask', field: 'mask' },
  ];

  const numericFields = [];

  return (
    <TableLayout
      title="SMS Mask"
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

export default SmsMask;