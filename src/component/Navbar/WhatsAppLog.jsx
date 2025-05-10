import React from 'react';
import TableLayout from '../TableLayout';

const WhatsAppLog = () => {
  const initialData = [
    {
      selected: false,
      sendTime: '01/05/2025 10:15:32',
      mobile: '9876543210',
      message: 'Payment confirmation for order #123',
      isSend: 'true',
      returnMessage: 'Message delivered',
    },
    {
      selected: false,
      sendTime: '01/05/2025 11:22:45',
      mobile: '8765432109',
      message: 'Reminder: Invoice #456 due tomorrow',
      isSend: 'false',
      returnMessage: 'Failed: Invalid number',
    },
    {
      selected: false,
      sendTime: '02/05/2025 09:10:12',
      mobile: '7654321098',
      message: 'Your package has been shipped',
      isSend: 'true',
      returnMessage: 'Message delivered',
    },
    {
      selected: false,
      sendTime: '02/05/2025 14:33:20',
      mobile: '6543210987',
      message: 'Thank you for your payment',
      isSend: 'true',
      returnMessage: 'Message read',
    },
    {
      selected: false,
      sendTime: '03/05/2025 16:05:55',
      mobile: '5432109876',
      message: 'Please confirm your appointment',
      isSend: 'false',
      returnMessage: 'Failed: Network error',
    },
    {
      selected: false,
      sendTime: '03/05/2025 17:45:10',
      mobile: '4321098765',
      message: 'Order #789 status update',
      isSend: 'true',
      returnMessage: 'Message delivered',
    },
    {
      selected: false,
      sendTime: '04/05/2025 08:20:30',
      mobile: '3210987654',
      message: 'New offer available! Check now',
      isSend: 'true',
      returnMessage: 'Message read',
    },
    {
      selected: false,
      sendTime: '04/05/2025 12:15:25',
      mobile: '2109876543',
      message: 'Your subscription has been renewed',
      isSend: 'true',
      returnMessage: 'Message delivered',
    },
    {
      selected: false,
      sendTime: '05/05/2025 13:50:40',
      mobile: '1098765432',
      message: 'Feedback request for order #101',
      isSend: 'false',
      returnMessage: 'Failed: Recipient blocked',
    },
    {
      selected: false,
      sendTime: '05/05/2025 15:30:15',
      mobile: '0987654321',
      message: 'Meeting scheduled for tomorrow',
      isSend: 'true',
      returnMessage: 'Message read',
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Send Time', field: 'sendTime' },
    { label: 'Mobile', field: 'mobile' },
    { label: 'Message', field: 'message' },
    { label: 'IsSend', field: 'isSend' },
    { label: 'ReturnMessage', field: 'returnMessage' },
  ];

  const numericFields = ['mobile'];

  return (
    <TableLayout
      title="WhatsApp Log"
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

export default WhatsAppLog;