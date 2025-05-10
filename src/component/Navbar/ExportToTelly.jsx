import React from 'react';
import TableLayout from '../TableLayout';

const ExportToTelly = () => {
  const initialData = [
    {
      selected: false,
      voucherNo: 'VCH001',
      voucherType: 'Payment',
      voucherDate: '01/05/2025',
      ledgerNameParty: 'ABC Corp',
      drAmount: 15000.00,
      docNo: 'DOC001',
      amount: 15000.00,
      creditLedger: 'Bank A/C',
      crAmount: 15000.00,
      costCenter: 'Marketing',
      costCenterAmt: 15000.00,
      narration: 'Payment for marketing services',
    },
    {
      selected: false,
      voucherNo: 'VCH002',
      voucherType: 'Receipt',
      voucherDate: '01/05/2025',
      ledgerNameParty: 'XYZ Ltd',
      drAmount: 8200.00,
      docNo: 'DOC002',
      amount: 8200.00,
      creditLedger: 'Sales A/C',
      crAmount: 8200.00,
      costCenter: 'Sales',
      costCenterAmt: 8200.00,
      narration: 'Receipt for product sales',
    },
    {
      selected: false,
      voucherNo: 'VCH003',
      voucherType: 'Journal',
      voucherDate: '02/05/2025',
      ledgerNameParty: 'DEF Inc',
      drAmount: 23000.00,
      docNo: 'DOC003',
      amount: 23000.00,
      creditLedger: 'Expenses A/C',
      crAmount: 23000.00,
      costCenter: 'Operations',
      costCenterAmt: 23000.00,
      narration: 'Adjustment for operational expenses',
    },
    {
      selected: false,
      voucherNo: 'VCH004',
      voucherType: 'Payment',
      voucherDate: '02/05/2025',
      ledgerNameParty: 'GHI Co',
      drAmount: 9500.00,
      docNo: 'DOC004',
      amount: 9500.00,
      creditLedger: 'Bank A/C',
      crAmount: 9500.00,
      costCenter: 'Admin',
      costCenterAmt: 9500.00,
      narration: 'Payment for admin services',
    },
    {
      selected: false,
      voucherNo: 'VCH005',
      voucherType: 'Receipt',
      voucherDate: '03/05/2025',
      ledgerNameParty: 'JKL Enterprises',
      drAmount: 12000.00,
      docNo: 'DOC005',
      amount: 12000.00,
      creditLedger: 'Sales A/C',
      crAmount: 12000.00,
      costCenter: 'Sales',
      costCenterAmt: 12000.00,
      narration: 'Receipt for consulting services',
    },
    {
      selected: false,
      voucherNo: 'VCH006',
      voucherType: 'Journal',
      voucherDate: '03/05/2025',
      ledgerNameParty: 'MNO Services',
      drAmount: 6700.00,
      docNo: 'DOC006',
      amount: 6700.00,
      creditLedger: 'Expenses A/C',
      crAmount: 6700.00,
      costCenter: 'IT',
      costCenterAmt: 6700.00,
      narration: 'Adjustment for IT expenses',
    },
    {
      selected: false,
      voucherNo: 'VCH007',
      voucherType: 'Payment',
      voucherDate: '04/05/2025',
      ledgerNameParty: 'PQR Solutions',
      drAmount: 18000.00,
      docNo: 'DOC007',
      amount: 18000.00,
      creditLedger: 'Bank A/C',
      crAmount: 18000.00,
      costCenter: 'Marketing',
      costCenterAmt: 18000.00,
      narration: 'Payment for advertising campaign',
    },
    {
      selected: false,
      voucherNo: 'VCH008',
      voucherType: 'Receipt',
      voucherDate: '04/05/2025',
      ledgerNameParty: 'STU Tech',
      drAmount: 10500.00,
      docNo: 'DOC008',
      amount: 10500.00,
      creditLedger: 'Sales A/C',
      crAmount: 10500.00,
      costCenter: 'Sales',
      costCenterAmt: 10500.00,
      narration: 'Receipt for software license',
    },
    {
      selected: false,
      voucherNo: 'VCH009',
      voucherType: 'Journal',
      voucherDate: '05/05/2025',
      ledgerNameParty: 'VWX Systems',
      drAmount: 8700.00,
      docNo: 'DOC009',
      amount: 8700.00,
      creditLedger: 'Expenses A/C',
      crAmount: 8700.00,
      costCenter: 'Operations',
      costCenterAmt: 8700.00,
      narration: 'Adjustment for operational costs',
    },
    {
      selected: false,
      voucherNo: 'VCH010',
      voucherType: 'Payment',
      voucherDate: '05/05/2025',
      ledgerNameParty: 'YZA Innovations',
      drAmount: 13400.00,
      docNo: 'DOC010',
      amount: 13400.00,
      creditLedger: 'Bank A/C',
      crAmount: 13400.00,
      costCenter: 'R&D',
      costCenterAmt: 13400.00,
      narration: 'Payment for R&D project',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Voucher No', field: 'voucherNo' },
    { label: 'Voucher Type', field: 'voucherType' },
    { label: 'Voucher Date', field: 'voucherDate' },
    { label: 'Ledger Name Party', field: 'ledgerNameParty' },
    { label: 'Dr Amount', field: 'drAmount' },
    { label: 'Doc No', field: 'docNo' },
    { label: 'Amount', field: 'amount' },
    { label: 'Credit Ledger', field: 'creditLedger' },
    { label: 'Cr Amount', field: 'crAmount' },
    { label: 'Cost Center', field: 'costCenter' },
    { label: 'Cost Center Amt', field: 'costCenterAmt' },
    { label: 'Narration', field: 'narration' },
  ];

  const numericFields = ['drAmount', 'amount', 'crAmount', 'costCenterAmt'];

  return (
    <TableLayout
      title="Export To Telly"
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

export default ExportToTelly;