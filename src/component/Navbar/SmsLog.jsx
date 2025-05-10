import React from 'react';
import TableLayout from '../TableLayout';

const SmsLog = () => {
  const initialData = [
    {
      selected: false,
      sendTime: '01/05/2025 09:30:15',
      mobile: '9876543210',
      message: 'Your OTP for login is 123456',
      isSend: true,
      transactionId: 'TXN001',
    },
    {
      selected: false,
      sendTime: '01/05/2025 12:45:22',
      mobile: '8765432109',
      message: 'Payment of $50 received',
      isSend: false,
      transactionId: 'TXN002',
    },
    {
      selected: false,
      sendTime: '02/05/2025 08:15:40',
      mobile: '7654321098',
      message: 'Order #789 confirmed',
      isSend: true,
      transactionId: 'TXN003',
    },
    {
      selected: false,
      sendTime: '02/05/2025 15:20:10',
      mobile: '6543210987',
      message: 'Reminder: Pay invoice #456',
      isSend: true,
      transactionId: 'TXN004',
    },
    {
      selected: false,
      sendTime: '03/05/2025 10:05:55',
      mobile: '5432109876',
      message: 'Your package is out for delivery',
      isSend: false,
      transactionId: 'TXN005',
    },
    {
      selected: false,
      sendTime: '03/05/2025 16:35:25',
      mobile: '4321098765',
      message: 'Meeting at 2 PM tomorrow',
      isSend: true,
      transactionId: 'TXN006',
    },
    {
      selected: false,
      sendTime: '04/05/2025 07:50:30',
      mobile: '3210987654',
      message: 'New offer: 20% off today',
      isSend: true,
      transactionId: 'TXN007',
    },
    {
      selected: false,
      sendTime: '04/05/2025 13:10:45',
      mobile: '2109876543',
      message: 'Account balance: $150.25',
      isSend: true,
      transactionId: 'TXN008',
    },
    {
      selected: false,
      sendTime: '05/05/2025 11:25:50',
      mobile: '1098765432',
      message: 'Feedback requested for order #101',
      isSend: false,
      transactionId: 'TXN009',
    },
    {
      selected: false,
      sendTime: '05/05/2025 14:55:20',
      mobile: '0987654321',
      message: 'Your subscription is renewed',
      isSend: true,
      transactionId: 'TXN010',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Send Time', field: 'sendTime' },
    { label: 'Mobile', field: 'mobile' },
    { label: 'Message', field: 'message' },
    { label: 'IsSend', field: 'isSend' },
    { label: 'TransactionId', field: 'transactionId' },
  ];

  const numericFields = ['mobile'];

  return (
    <TableLayout
      title="SMS Log"
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

export default SmsLog;