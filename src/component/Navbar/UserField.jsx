import React from 'react';
import TableLayout from '../TableLayout';

const UserField = () => {
  const initialData = [
    {
      selected: false,
      voucher: 'Payment',
      fieldId: 'FLD001',
      name: 'Invoice Number',
      type: 'Text',
      size: 50,
      orderNo: 1,
    },
    {
      selected: false,
      voucher: 'Receipt',
      fieldId: 'FLD002',
      name: 'Payment Mode',
      type: 'Dropdown',
      size: 20,
      orderNo: 2,
    },
    {
      selected: false,
      voucher: 'Journal',
      fieldId: 'FLD003',
      name: 'Reference No',
      type: 'Text',
      size: 30,
      orderNo: 3,
    },
    {
      selected: false,
      voucher: 'Payment',
      fieldId: 'FLD004',
      name: 'Bank Name',
      type: 'Text',
      size: 100,
      orderNo: 4,
    },
    {
      selected: false,
      voucher: 'Receipt',
      fieldId: 'FLD005',
      name: 'Received Date',
      type: 'Date',
      size: 10,
      orderNo: 5,
    },
    {
      selected: false,
      voucher: 'Journal',
      fieldId: 'FLD006',
      name: 'Adjustment Type',
      type: 'Dropdown',
      size: 25,
      orderNo: 6,
    },
    {
      selected: false,
      voucher: 'Payment',
      fieldId: 'FLD007',
      name: 'Cheque Number',
      type: 'Text',
      size: 20,
      orderNo: 7,
    },
    {
      selected: false,
      voucher: 'Receipt',
      fieldId: 'FLD008',
      name: 'Tax Amount',
      type: 'Number',
      size: 15,
      orderNo: 8,
    },
    {
      selected: false,
      voucher: 'Journal',
      fieldId: 'FLD009',
      name: 'Notes',
      type: 'TextArea',
      size: 200,
      orderNo: 9,
    },
    {
      selected: false,
      voucher: 'Payment',
      fieldId: 'FLD010',
      name: 'Approval Status',
      type: 'Dropdown',
      size: 20,
      orderNo: 10,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Voucher', field: 'voucher' },
    { label: 'Field Id', field: 'fieldId' },
    { label: 'Name', field: 'name' },
    { label: 'Type', field: 'type' },
    { label: 'Size', field: 'size' },
    { label: 'Order No', field: 'orderNo' },
  ];

  const numericFields = ['size', 'orderNo'];

  return (
    <TableLayout
      title="User Field"
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

export default UserField;