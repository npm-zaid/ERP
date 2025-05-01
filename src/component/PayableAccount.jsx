import React from 'react';
import TableLayout from './TableLayout'; // Assuming TableLayout is in the same directory

const PayableAccount = () => {
  // Define columns for the Payable Master table
  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'ACCOUNT NAME', field: 'name' },
    { label: 'ALIAS', field: 'alias' },
    { label: 'CLOSING', field: 'closing', numeric: true },
    { label: 'Cl. D/C', field: 'type' },
    { label: 'MOBILE', field: 'mobile' },
    { label: 'CITY', field: 'city' },
    { label: 'STATE', field: 'state' },
    
  ];

  // Sample initial data for the Payable Master
  const initialData = [
    { selected: false, name: 'Vendor A', alias: 'VA', closing: 300.00, type: 'Cr', mobile: '1234567890', city: 'Delhi', state: 'DL', locked: false },
    { selected: false, name: 'Vendor B', alias: 'VB', closing: 500.00, type: 'Dr', mobile: '0987654321', city: 'Mumbai', state: 'MH', locked: true },
    { selected: false, name: 'Vendor C', alias: 'VC', closing: 200.00, type: 'Cr', mobile: '5555555555', city: 'Chennai', state: 'TN', locked: false },
    { selected: false, name: 'Vendor D', alias: 'VD', closing: 150.00, type: 'Db', mobile: '6666666666', city: 'Bangalore', state: 'KA', locked: true },
    { selected: false, name: 'Vendor E', alias: 'VE', closing: 400.00, type: 'Cr', mobile: '7777777777', city: 'Hyderabad', state: 'TS', locked: false },
    { selected: false, name: 'Vendor F', alias: 'VF', closing: 300.00, type: 'Cr', mobile: '8888888888', city: 'Pune', state: 'MH', locked: false },
    { selected: false, name: 'Vendor G', alias: 'VG', closing: 500.00, type: 'Db', mobile: '9999999999', city: 'Ahmedabad', state: 'GJ', locked: true },
    { selected: false, name: 'Vendor H', alias: 'VH', closing: 250.00, type: 'Cr', mobile: '1111111111', city: 'Surat', state: 'GJ', locked: false },
    { selected: false, name: 'Vendor I', alias: 'VI', closing: 350.00, type: 'Cr', mobile: '2222222222', city: 'Lucknow', state: 'UP', locked: false },
    { selected: false, name: 'Vendor J', alias: 'VJ', closing: 450.00, type: 'Db', mobile: '3333333333', city: 'Indore', state: 'MP', locked: true },
  ];

  return (
    <div className="w-full">
      <TableLayout
        title="Payable Master"
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

export default PayableAccount;