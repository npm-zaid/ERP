import React from 'react';
import TableLayout from '../TableLayout';

const SalaryCalculation = () => {
  const initialData = [
    {
      selected: false,
      date: '01/05/2025',
      no: 'SAL001',
      fromDate: '01/04/2025',
      toDate: '30/04/2025',
      salaryDate: '01/05/2025',
      branch: 'Main Branch',
      month: 'April 2025',
      totalEmployee: 50,
      totalNetSalary: 2500000.00,
      totalPayment: 2500000.00,
    },
    {
      selected: false,
      date: '01/04/2025',
      no: 'SAL002',
      fromDate: '01/03/2025',
      toDate: '31/03/2025',
      salaryDate: '01/04/2025',
      branch: 'West Branch',
      month: 'March 2025',
      totalEmployee: 45,
      totalNetSalary: 2250000.00,
      totalPayment: 2250000.00,
    },
    {
      selected: false,
      date: '01/03/2025',
      no: 'SAL003',
      fromDate: '01/02/2025',
      toDate: '28/02/2025',
      salaryDate: '01/03/2025',
      branch: 'East Branch',
      month: 'February 2025',
      totalEmployee: 60,
      totalNetSalary: 3000000.00,
      totalPayment: 3000000.00,
    },
    {
      selected: false,
      date: '01/02/2025',
      no: 'SAL004',
      fromDate: '01/01/2025',
      toDate: '31/01/2025',
      salaryDate: '01/02/2025',
      branch: 'South Branch',
      month: 'January 2025',
      totalEmployee: 55,
      totalNetSalary: 2750000.00,
      totalPayment: 2750000.00,
    },
    {
      selected: false,
      date: '01/01/2025',
      no: 'SAL005',
      fromDate: '01/12/2024',
      toDate: '31/12/2024',
      salaryDate: '01/01/2025',
      branch: 'Main Branch',
      month: 'December 2024',
      totalEmployee: 52,
      totalNetSalary: 2600000.00,
      totalPayment: 2600000.00,
    },
    {
      selected: false,
      date: '01/12/2024',
      no: 'SAL006',
      fromDate: '01/11/2024',
      toDate: '30/11/2024',
      salaryDate: '01/12/2024',
      branch: 'West Branch',
      month: 'November 2024',
      totalEmployee: 48,
      totalNetSalary: 2400000.00,
      totalPayment: 2400000.00,
    },
    {
      selected: false,
      date: '01/11/2024',
      no: 'SAL007',
      fromDate: '01/10/2024',
      toDate: '31/10/2024',
      salaryDate: '01/11/2024',
      branch: 'East Branch',
      month: 'October 2024',
      totalEmployee: 58,
      totalNetSalary: 2900000.00,
      totalPayment: 2900000.00,
    },
    {
      selected: false,
      date: '01/10/2024',
      no: 'SAL008',
      fromDate: '01/09/2024',
      toDate: '30/09/2024',
      salaryDate: '01/10/2024',
      branch: 'South Branch',
      month: 'September 2024',
      totalEmployee: 53,
      totalNetSalary: 2650000.00,
      totalPayment: 2650000.00,
    },
    {
      selected: false,
      date: '01/09/2024',
      no: 'SAL009',
      fromDate: '01/08/2024',
      toDate: '31/08/2024',
      salaryDate: '01/09/2024',
      branch: 'Main Branch',
      month: 'August 2024',
      totalEmployee: 49,
      totalNetSalary: 2450000.00,
      totalPayment: 2450000.00,
    },
    {
      selected: false,
      date: '01/08/2024',
      no: 'SAL010',
      fromDate: '01/07/2024',
      toDate: '31/07/2024',
      salaryDate: '01/08/2024',
      branch: 'West Branch',
      month: 'July 2024',
      totalEmployee: 47,
      totalNetSalary: 2350000.00,
      totalPayment: 2350000.00,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Date', field: 'date' },
    { label: 'No', field: 'no' },
    { label: 'From Date', field: 'fromDate' },
    { label: 'To Date', field: 'toDate' },
    { label: 'Salary Date', field: 'salaryDate' },
    { label: 'Branch', field: 'branch' },
    { label: 'Month', field: 'month' },
    { label: 'Total Employee', field: 'totalEmployee' },
    { label: 'Total Net Salary', field: 'totalNetSalary' },
    { label: 'Total Payment', field: 'totalPayment' },
  ];

  const numericFields = ['totalEmployee', 'totalNetSalary', 'totalPayment'];

  return (
    <TableLayout
      title="Salary Calculation"
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

export default SalaryCalculation;