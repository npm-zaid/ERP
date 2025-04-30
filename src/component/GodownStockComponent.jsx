import React, { useState } from 'react';
import TableLayout from './TableLayout';

const GodownStockComponent = () => {
  const [selectedGodownOption, setSelectedGodownOption] = useState('Godown Stock');
  const [selectedFormat, setSelectedFormat] = useState('@Detail Godown Stock');
  const [filteredData, setFilteredData] = useState([]);

  // Full dataset including 10 new entries
  const fullData = [
    { selected: false, lrDate: '11/04/2025', lrNo: 17223, fromCity: 'CHANDIGARH', toCity: 'DELHI (SG)', pack: 'BAG', description: 'hl', article: 10, weight: 100.00, lrFreight: 200.00 },
    { selected: false, lrDate: '15/04/2025', lrNo: 17224, fromCity: 'RAJKOT', toCity: 'AHMEDABAD', pack: 'W BOX', description: 'mobile', article: 4, weight: 100.00, lrFreight: 2000.00 },
    { selected: false, lrDate: '15/04/2025', lrNo: 17225, fromCity: 'DELHI', toCity: 'CHANDIGADH', pack: 'BOX', description: 'HARDWARE', article: 0, weight: 1000.00, lrFreight: 2000.00 },
    { selected: false, lrDate: '16/04/2025', lrNo: 17230, fromCity: 'AHMEDABAD', toCity: 'AMBERNATH', pack: 'W BOX', description: 'machinery', article: 45, weight: 0.00, lrFreight: 21000.00 },
    { selected: false, lrDate: '18/04/2025', lrNo: 17231, fromCity: 'AMBALA', toCity: 'ANANTNAG', pack: 'BAG', description: '', article: 11, weight: 2000.00, lrFreight: 2750.00 },
    { selected: false, lrDate: '25/04/2025', lrNo: 1, fromCity: 'AHMEDABAD', toCity: 'AURANGABAD', pack: 'DRUM', description: 'resins', article: 45, weight: 0.00, lrFreight: 23500.00 },
    // New entries
    { selected: false, lrDate: '26/04/2025', lrNo: 17232, fromCity: 'MUMBAI', toCity: 'DELHI', pack: 'CARTON', description: 'electronics', article: 20, weight: 500.00, lrFreight: 4500.00 },
    { selected: false, lrDate: '27/04/2025', lrNo: 17233, fromCity: 'AHMEDABAD', toCity: 'PUNE', pack: 'BAG', description: 'textiles', article: 15, weight: 300.00, lrFreight: 1800.00 },
    { selected: false, lrDate: '27/04/2025', lrNo: 17234, fromCity: 'DELHI', toCity: 'BANGALORE', pack: 'BOX', description: 'furniture', article: 8, weight: 1200.00, lrFreight: 6000.00 },
    { selected: false, lrDate: '28/04/2025', lrNo: 17235, fromCity: 'KOLKATA', toCity: 'AHMEDABAD', pack: 'CRATE', description: 'machinery parts', article: 30, weight: 800.00, lrFreight: 3200.00 },
    { selected: false, lrDate: '28/04/2025', lrNo: 17236, fromCity: 'CHENNAI', toCity: 'DELHI (SG)', pack: 'DRUM', description: 'chemicals', article: 25, weight: 600.00, lrFreight: 4000.00 },
    { selected: false, lrDate: '29/04/2025', lrNo: 17237, fromCity: 'AHMEDABAD', toCity: 'HYDERABAD', pack: 'W BOX', description: 'pharmaceuticals', article: 12, weight: 200.00, lrFreight: 1500.00 },
    { selected: false, lrDate: '29/04/2025', lrNo: 17238, fromCity: 'JAIPUR', toCity: 'DELHI', pack: 'BAG', description: 'garments', article: 18, weight: 400.00, lrFreight: 2200.00 },
    { selected: false, lrDate: '30/04/2025', lrNo: 17239, fromCity: 'DELHI', toCity: 'MUMBAI', pack: 'BOX', description: 'books', article: 50, weight: 700.00, lrFreight: 3500.00 },
    { selected: false, lrDate: '30/04/2025', lrNo: 17240, fromCity: 'AHMEDABAD', toCity: 'CHANDIGARH', pack: 'CARTON', description: 'stationery', article: 22, weight: 250.00, lrFreight: 1800.00 },
    { selected: false, lrDate: '01/05/2025', lrNo: 17241, fromCity: 'BANGALORE', toCity: 'DELHI', pack: 'CRATE', description: 'auto parts', article: 35, weight: 900.00, lrFreight: 5000.00 },
  ];

  const columns = [
    { field: 'selected', label: '' },
    { field: 'lrDate', label: 'Lr Date' },
    { field: 'lrNo', label: 'LrNo' },
    { field: 'fromCity', label: 'City' },
    { field: 'toCity', label: 'To City' },
    { field: 'pack', label: 'Pack' },
    { field: 'description', label: 'Description' },
    { field: 'article', label: 'Art' },
    { field: 'weight', label: 'Weight' },
    { field: 'lrFreight', label: 'Lr Freight' },
  ];

  const numericFields = ['lrNo', 'article', 'weight', 'lrFreight'];
  const godownOptions = ['Godown Stock', 'In Transit Vehicle', 'Inward Godown Stock', 'All Godown Stock'];
  const formatOptions = ['@Detail Godown Stock'];

  // Set initial filtered data
  React.useEffect(() => {
    handleGodownOptionChange(selectedGodownOption);
  }, []);

  // Handle godown option change and filter data
  const handleGodownOptionChange = (value) => {
    setSelectedGodownOption(value);
    let newFilteredData = [...fullData];
    if (value === 'Godown Stock') {
      // Show all data (or apply specific godown stock filter if needed)
      newFilteredData = fullData;
    } else if (value === 'In Transit Vehicle') {
      newFilteredData = fullData.filter((item) => item.toCity.includes('DELHI'));
    } else if (value === 'Inward Godown Stock') {
      newFilteredData = fullData.filter((item) => item.fromCity.includes('AHMEDABAD'));
    } else if (value === 'All Godown Stock') {
      newFilteredData = fullData;
    }
    setFilteredData(newFilteredData);
  };

  return (
    <div className="w-full min-h-screen">
      <TableLayout
        title="@Detail Godown Stock"
        columns={columns}
        initialData={filteredData}
        numericFields={numericFields}
        showAdd={false}
        showEdit={true}
        showView={true}
        showDelete={true}
        showRefresh={true}
        showPrint={true}
        showAudit={false}
        showField={false}
        showExportExcel={true}
        showExportPDF={true}
        godownOptions={godownOptions}
        formatOptions={formatOptions}
        selectedGodownOption={selectedGodownOption}
        selectedFormat={selectedFormat}
        onGodownOptionChange={handleGodownOptionChange}
        onFormatOptionChange={setSelectedFormat}
      />
    </div>
  );
};

export default GodownStockComponent;