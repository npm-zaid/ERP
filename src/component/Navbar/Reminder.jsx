import React from 'react';
import TableLayout from '../TableLayout';

const Reminder = () => {
  const initialData = [
    {
      selected: false,
      startDate: '01/05/2025',
      name: 'John Doe',
      status: 'Pending',
      priority: 'High',
      subject: 'Submit project report',
      isCompleted: false,
    },
    {
      selected: false,
      startDate: '02/05/2025',
      name: 'Jane Smith',
      status: 'In Progress',
      priority: 'Medium',
      subject: 'Schedule team meeting',
      isCompleted: false,
    },
    {
      selected: false,
      startDate: '03/05/2025',
      name: 'Alice Johnson',
      status: 'Completed',
      priority: 'Low',
      subject: 'Review invoice #456',
      isCompleted: true,
    },
    {
      selected: false,
      startDate: '04/05/2025',
      name: 'Bob Williams',
      status: 'Pending',
      priority: 'High',
      subject: 'Follow up with client XYZ',
      isCompleted: false,
    },
    {
      selected: false,
      startDate: '05/05/2025',
      name: 'Carol Davis',
      status: 'In Progress',
      priority: 'Medium',
      subject: 'Update software licenses',
      isCompleted: false,
    },
    {
      selected: false,
      startDate: '06/05/2025',
      name: 'David Wilson',
      status: 'Pending',
      priority: 'Low',
      subject: 'Organize office files',
      isCompleted: false,
    },
    {
      selected: false,
      startDate: '07/05/2025',
      name: 'Eva Thomas',
      status: 'Completed',
      priority: 'High',
      subject: 'Finalize budget proposal',
      isCompleted: true,
    },
    {
      selected: false,
      startDate: '08/05/2025',
      name: 'Frank Harris',
      status: 'In Progress',
      priority: 'Medium',
      subject: 'Prepare for audit',
      isCompleted: false,
    },
    {
      selected: false,
      startDate: '09/05/2025',
      name: 'Grace Lee',
      status: 'Pending',
      priority: 'Low',
      subject: 'Send feedback survey',
      isCompleted: false,
    },
    {
      selected: false,
      startDate: '10/05/2025',
      name: 'Henry Clark',
      status: 'Completed',
      priority: 'High',
      subject: 'Deliver presentation to board',
      isCompleted: true,
    },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Start Date', field: 'startDate' },
    { label: 'Name', field: 'name' },
    { label: 'Status', field: 'status' },
    { label: 'Priority', field: 'priority' },
    { label: 'Subject', field: 'subject' },
    { label: 'IsCompleted', field: 'isCompleted' },
  ];

  const numericFields = [];

  return (
    <TableLayout
      title="Reminder"
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

export default Reminder;