import React from 'react';
import TableLayout2 from './TableLayout2'; // Assuming TableLayout2 is in the same directory

const ReceivableAccount = () => {
  // Define columns for the Receivable Account table, adding State, Follow-up Date, and Phone
  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'ACCOUNT NAME', field: 'name' },
    { label: 'ALIAS', field: 'alias' },
    { label: 'CLOSING', field: 'closing', numeric: true },
    { label: 'Cr/Db/C', field: 'type' },
    { label: 'MOBILE', field: 'mobile' },
    { label: 'PHONE', field: 'phone' }, // New column
    { label: 'CITY', field: 'city' },
    { label: 'STATE', field: 'state' }, // New column
    { label: 'FOLLOW-UP DATE', field: 'followUpDate' }, // New column
  ];

  // Sample initial data for the Receivable Account, updated with new fields
  const initialData = [
    { selected: false, name: 'A HARILAL & CO PVT LTD', alias: 'Y', closing: 1030.4833, type: 'Db', mobile: '', phone: '9876543210', city: 'AHMEDABAD', state: 'GJ', followUpDate: '2025-05-01', locked: false },
    { selected: false, name: 'AAKASH ENTERPRISE', alias: '', closing: 12.8616, type: 'Db', mobile: '', phone: '9123456789', city: '', state: 'MH', followUpDate: '2025-05-02', locked: true },
    { selected: false, name: 'AARJAVAM TECHFAB PRIVATE LIMITED', alias: 'AARJAVAM TECHFAB PRIVATE LIMITED', closing: 86.1099, type: 'Db', mobile: '', phone: '9234567890', city: '', state: 'TN', followUpDate: '2025-05-03', locked: false },
    { selected: false, name: 'AOG CLUBS', alias: '', closing: 15.3989, type: 'Db', mobile: '', phone: '9345678901', city: '', state: 'KA', followUpDate: '2025-05-04', locked: false },
    { selected: false, name: 'ABS SAIFERANS', alias: '', closing: 46.8470, type: 'Db', mobile: '', phone: '9456789012', city: '', state: 'AP', followUpDate: '2025-05-05', locked: true },
    { selected: false, name: 'ABOT', alias: '', closing: 71.0085, type: 'Db', mobile: '', phone: '9567890123', city: '', state: 'TS', followUpDate: '2025-05-06', locked: false },
    { selected: false, name: 'ABHY LOGISTICS', alias: '', closing: 70.5810, type: 'Db', mobile: '', phone: '9678901234', city: '', state: 'KL', followUpDate: '2025-05-07', locked: false },
    { selected: false, name: 'ABHISHEK LOGISTICS', alias: '', closing: 126.5660, type: 'Db', mobile: '', phone: '9789012345', city: '', state: 'RJ', followUpDate: '2025-05-08', locked: false },
    { selected: false, name: 'AOD CREATICAL', alias: '', closing: 105.095, type: 'Db', mobile: '', phone: '9890123456', city: '', state: 'UP', followUpDate: '2025-05-09', locked: false },
    { selected: false, name: 'AOD ENTERPRISE', alias: '', closing: 116.8065, type: 'Db', mobile: '', phone: '9901234567', city: '', state: 'MP', followUpDate: '2025-05-10', locked: false },
    { selected: false, name: 'AK TRANSPORT', alias: '', closing: 5.8600, type: 'Db', mobile: '45654654', phone: '9012345678', city: '', state: 'WB', followUpDate: '2025-05-11', locked: false },
    { selected: false, name: 'AEGIS PHARMASEUTICALS LTD', alias: 'AEGIS PHARMASEUTICALS LTD', closing: 116.1070, type: 'Db', mobile: '', phone: '9123456780', city: '', state: 'OD', followUpDate: '2025-05-12', locked: false },
    { selected: false, name: 'AGARWAL PHARMACEUTICALS LTD', alias: '', closing: 16.1970, type: 'Db', mobile: '', phone: '9234567891', city: '', state: 'BR', followUpDate: '2025-05-13', locked: false },
    { selected: false, name: 'AMIT GUPTA', alias: '', closing: 15.6800, type: 'Db', mobile: '', phone: '9345678902', city: '', state: 'JH', followUpDate: '2025-05-14', locked: false },
    { selected: false, name: 'ANIL SODHAR', alias: 'ANIL SODHAR', closing: 16.3069, type: 'Db', mobile: '', phone: '9456789013', city: '', state: 'HP', followUpDate: '2025-05-15', locked: false },
  ];

  return (
    <div className="w-full">
      <TableLayout2
        title="Receivable Account"
        columns={columns}
        initialData={initialData}
        numericFields={['closing']} // Fields that should be treated as numeric for totals
        showBack={false} // Not shown in the screenshot
        showForward={true} // Shown in the screenshot
        showRefresh={true} // Shown in the screenshot
        showPrint={true} // Shown in the screenshot
        showGroupwise={true} // Shown in the screenshot
        showMerge={true} // Shown in the screenshot
        showAudit={true} // Shown in the screenshot
        showExportExcel={false} // Not shown in the screenshot
        showExportPDF={false} // Not shown in the screenshot
        showFIFO={true} // Shown in the screenshot
        showMSME={false} // Not shown in the screenshot
      />
    </div>
  );
};

export default ReceivableAccount;