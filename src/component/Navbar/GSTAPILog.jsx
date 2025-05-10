import React from 'react';
import TableLayout from '../TableLayout';

const GSTAPILog = () => {
  const initialData = [
    {
      selected: false,
      sendTime: '01/05/2025 09:15:22',
      message: 'GSTR1 filing request',
      isSend: true,
      apiType: 'GSTR1',
      branch: 'Main Branch',
      userName: 'John Doe',
      result: 'Success: Data submitted',
    },
    {
      selected: false,
      sendTime: '01/05/2025 11:30:45',
      message: 'GSTR3B validation request',
      isSend: false,
      apiType: 'GSTR3B',
      branch: 'West Branch',
      userName: 'Jane Smith',
      result: 'Failed: Invalid credentials',
    },
    {
      selected: false,
      sendTime: '02/05/2025 08:20:10',
      message: 'E-Way Bill generation',
      isSend: true,
      apiType: 'EWB',
      branch: 'East Branch',
      userName: 'Alice Johnson',
      result: 'Success: E-Way Bill generated',
    },
    {
      selected: false,
      sendTime: '02/05/2025 14:45:33',
      message: 'GSTIN verification',
      isSend: true,
      apiType: 'GSTIN',
      branch: 'South Branch',
      userName: 'Bob Williams',
      result: 'Success: GSTIN verified',
    },
    {
      selected: false,
      sendTime: '03/05/2025 10:05:50',
      message: 'GSTR2A reconciliation',
      isSend: false,
      apiType: 'GSTR2A',
      branch: 'Main Branch',
      userName: 'Carol Davis',
      result: 'Failed: Server timeout',
    },
    {
      selected: false,
      sendTime: '03/05/2025 16:25:15',
      message: 'ITC claim request',
      isSend: true,
      apiType: 'ITC',
      branch: 'West Branch',
      userName: 'David Wilson',
      result: 'Success: ITC claimed',
    },
    {
      selected: false,
      sendTime: '04/05/2025 07:50:40',
      message: 'GSTR9 annual return',
      isSend: true,
      apiType: 'GSTR9',
      branch: 'East Branch',
      userName: 'Eva Thomas',
      result: 'Success: Return filed',
    },
    {
      selected: false,
      sendTime: '04/05/2025 13:10:20',
      message: 'E-Invoice generation',
      isSend: false,
      apiType: 'EINV',
      branch: 'South Branch',
      userName: 'Frank Harris',
      result: 'Failed: Invalid JSON format',
    },
    {
      selected: false,
      sendTime: '05/05/2025 11:35:55',
      message: 'GST return status check',
      isSend: true,
      apiType: 'STATUS',
      branch: 'Main Branch',
      userName: 'Grace Lee',
      result: 'Success: Status retrieved',
    },
    {
      selected: false,
      sendTime: '05/05/2025 15:20:30',
      message: 'GSTR1 amendment request',
      isSend: true,
      apiType: 'GSTR1',
      branch: 'West Branch',
      userName: 'Henry Clark',
      result: 'Success: Amendment submitted',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Send Time', field: 'sendTime' },
    { label: 'Message', field: 'message' },
    { label: 'IsSend', field: 'isSend' },
    { label: 'Api Type', field: 'apiType' },
    { label: 'Branch', field: 'branch' },
    { label: 'User Name', field: 'userName' },
    { label: 'Result', field: 'result' },
  ];

  const numericFields = [];

  return (
    <TableLayout
      title="GST API Log"
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

export default GSTAPILog;