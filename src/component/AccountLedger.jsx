import React from 'react';
import TableLayout2 from './TableLayout2';

const AccountLedger = () => {
  const initialData = [
    { selected: false, name: 'A HARILAL & CO. PVT LTD', city: 'AHMEDABAD', opening: 309233.00, opDC: 'Db', closingBalance: 330483.00, clCrDb: 'Db', locked: false },
    { selected: false, name: 'A HARILAL & CO. PVT LTD.', city: 'AHMEDABAD', opening: 0.00, opDC: 'Db', closingBalance: 0.00, clCrDb: 'Db', locked: false },
    { selected: false, name: 'AAKASH ENTERPRISE', city: '', opening: 2345799.00, opDC: 'Db', closingBalance: 2345799.00, clCrDb: 'Db', locked: true },
    { selected: false, name: 'AARJAVAM TECHFARM PVT LIMITED', city: '', opening: 23900.00, opDC: 'Db', closingBalance: 48405.00, clCrDb: 'Db', locked: false },
    { selected: false, name: 'ABC DRIVER', city: '', opening: 13631.00, opDC: 'Db', closingBalance: 13631.00, clCrDb: 'Db', locked: false },
    { selected: false, name: 'ABC ENTERPRISE', city: '', opening: 31941.00, opDC: 'Db', closingBalance: 33411.00, clCrDb: 'Db', locked: false },
    { selected: false, name: 'ABC TRADERS', city: '', opening: 53960.00, opDC: 'Cr', closingBalance: 94960.00, clCrDb: 'Cr', locked: false },
  ];

  const columns = [
    { label: 'A', field: 'selected' },
    { label: 'Name', field: 'name' },
    { label: 'City', field: 'city' },
    { label: 'Opening', field: 'opening' },
    { label: 'Op. D/C', field: 'opDC' },
    { label: 'Closing Balance', field: 'closingBalance' },
    { label: 'Cl. Cr/Db', field: 'clCrDb' },
  ];

  const numericFields = ['opening', 'closingBalance'];

  return (
    <TableLayout2
      title="Account Ledger"
      columns={columns}
      initialData={initialData}
      numericFields={numericFields}
      showBack={true}
      showForward={true}
      showRefresh={true}
      showPrint={true}
      showGroupwise={true}
      showMerge={true}
      showAudit={true}
      showExportExcel={true}
      showExportPDF={true}
    />
  );
};

export default AccountLedger;