import React from 'react';
import TableLayout from '../TableLayout';

const ReportFileMaster = () => {
  const initialData = [
    {
      selected: false,
      uploadDate: '01/05/2025',
      fileName: 'Sales_Report_April_2025.pdf',
    },
    {
      selected: false,
      uploadDate: '02/05/2025',
      fileName: 'Inventory_Summary_May_2025.xlsx',
    },
    {
      selected: false,
      uploadDate: '03/05/2025',
      fileName: 'Financial_Statement_Q1_2025.pdf',
    },
    {
      selected: false,
      uploadDate: '04/05/2025',
      fileName: 'Employee_Attendance_April_2025.csv',
    },
    {
      selected: false,
      uploadDate: '05/05/2025',
      fileName: 'Customer_Feedback_May_2025.docx',
    },
    {
      selected: false,
      uploadDate: '06/05/2025',
      fileName: 'Purchase_Order_Report_May_2025.pdf',
    },
    {
      selected: false,
      uploadDate: '07/05/2025',
      fileName: 'Budget_Analysis_Q2_2025.xlsx',
    },
    {
      selected: false,
      uploadDate: '08/05/2025',
      fileName: 'Supplier_Payment_Summary_April_2025.pdf',
    },
    {
      selected: false,
      uploadDate: '09/05/2025',
      fileName: 'Project_Status_Report_May_2025.docx',
    },
    {
      selected: false,
      uploadDate: '10/05/2025',
      fileName: 'Audit_Log_April_2025.csv',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Upload Date', field: 'uploadDate' },
    { label: 'File Name', field: 'fileName' },
  ];

  const numericFields = [];

  return (
    <TableLayout
      title="Report File Master"
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

export default ReportFileMaster;