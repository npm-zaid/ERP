import React from 'react';
import TableLayout from '../TableLayout';

const DocumentList = () => {
  const initialData = [
    {
      selected: false,
      page: 'Payments',
      vchDate: '01/05/2025',
      voucherNo: 'VCH001',
      doc1: 'Invoice.pdf',
      doc2: 'Payment_Receipt.jpg',
      doc3: '',
      doc4: '',
      doc5: '',
      lastModifyTime: '01/05/2025 10:15:22',
      user: 'John Doe',
      branchName: 'Main Branch',
    },
    {
      selected: false,
      page: 'Receipts',
      vchDate: '01/05/2025',
      voucherNo: 'VCH002',
      doc1: 'Receipt.pdf',
      doc2: '',
      doc3: 'Bank_Statement.pdf',
      doc4: '',
      doc5: '',
      lastModifyTime: '01/05/2025 11:30:45',
      user: 'Jane Smith',
      branchName: 'West Branch',
    },
    {
      selected: false,
      page: 'Journal',
      vchDate: '02/05/2025',
      voucherNo: 'VCH003',
      doc1: 'Adjustment_Note.docx',
      doc2: '',
      doc3: '',
      doc4: 'Supporting_Doc.pdf',
      doc5: '',
      lastModifyTime: '02/05/2025 08:20:10',
      user: 'Alice Johnson',
      branchName: 'East Branch',
    },
    {
      selected: false,
      page: 'Payments',
      vchDate: '02/05/2025',
      voucherNo: 'VCH004',
      doc1: 'Cheque_Scan.jpg',
      doc2: 'Invoice.pdf',
      doc3: '',
      doc4: '',
      doc5: 'Approval_Letter.pdf',
      lastModifyTime: '02/05/2025 14:45:33',
      user: 'Bob Williams',
      branchName: 'South Branch',
    },
    {
      selected: false,
      page: 'Receipts',
      vchDate: '03/05/2025',
      voucherNo: 'VCH005',
      doc1: 'Payment_Proof.pdf',
      doc2: '',
      doc3: 'Tax_Document.pdf',
      doc4: '',
      doc5: '',
      lastModifyTime: '03/05/2025 10:05:50',
      user: 'Carol Davis',
      branchName: 'Main Branch',
    },
    {
      selected: false,
      page: 'Journal',
      vchDate: '03/05/2025',
      voucherNo: 'VCH006',
      doc1: '',
      doc2: 'Reconciliation_Report.xlsx',
      doc3: '',
      doc4: '',
      doc5: '',
      lastModifyTime: '03/05/2025 16:25:15',
      user: 'David Wilson',
      branchName: 'West Branch',
    },
    {
      selected: false,
      page: 'Payments',
      vchDate: '04/05/2025',
      voucherNo: 'VCH007',
      doc1: 'Invoice.pdf',
      doc2: 'Bank_Transfer_Proof.jpg',
      doc3: '',
      doc4: 'Contract.pdf',
      doc5: '',
      lastModifyTime: '04/05/2025 07:50:40',
      user: 'Eva Thomas',
      branchName: 'East Branch',
    },
    {
      selected: false,
      page: 'Receipts',
      vchDate: '04/05/2025',
      voucherNo: 'VCH008',
      doc1: 'Receipt_Scan.jpg',
      doc2: '',
      doc3: '',
      doc4: '',
      doc5: 'GST_Document.pdf',
      lastModifyTime: '04/05/2025 13:10:20',
      user: 'Frank Harris',
      branchName: 'South Branch',
    },
    {
      selected: false,
      page: 'Journal',
      vchDate: '05/05/2025',
      voucherNo: 'VCH009',
      doc1: '',
      doc2: 'Audit_Report.pdf',
      doc3: '',
      doc4: '',
      doc5: '',
      lastModifyTime: '05/05/2025 11:35:55',
      user: 'Grace Lee',
      branchName: 'Main Branch',
    },
    {
      selected: false,
      page: 'Payments',
      vchDate: '05/05/2025',
      voucherNo: 'VCH010',
      doc1: 'Payment_Confirmation.pdf',
      doc2: 'Invoice.pdf',
      doc3: 'PO_Document.pdf',
      doc4: '',
      doc5: '',
      lastModifyTime: '05/05/2025 15:20:30',
      user: 'Henry Clark',
      branchName: 'West Branch',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Page', field: 'page' },
    { label: 'Vch Date', field: 'vchDate' },
    { label: 'Voucher No', field: 'voucherNo' },
    { label: 'Doc 1', field: 'doc1' },
    { label: 'Doc 2', field: 'doc2' },
    { label: 'Doc 3', field: 'doc3' },
    { label: 'Doc 4', field: 'doc4' },
    { label: 'Doc 5', field: 'doc5' },
    { label: 'Last Modify Time', field: 'lastModifyTime' },
    { label: 'User', field: 'user' },
    { label: 'BranchName', field: 'branchName' },
  ];

  const numericFields = [];

  return (
    <TableLayout
      title="Document List"
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

export default DocumentList;