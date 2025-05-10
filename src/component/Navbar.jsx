import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [locationDropdown, setLocationDropdown] = useState(false);
  const [yearDropdown, setYearDropdown] = useState(false);
  const navigate = useNavigate();

  // Menu items with options
  const menuItems = [
    {
      name: 'Master',
      options: [
        { name: 'Account', subOptions: null },
        { name: 'Account-Group', subOptions: null },
        { name: 'Packing', subOptions: null },
        { name: 'Price List', subOptions: ['Price Master'] },
        { name: 'Branch', subOptions: ['Branch Master'] },
        { name: 'Place Master', subOptions: ['City', 'Area', 'State', 'Country', 'District'] },
        { name: 'Truck Details', subOptions: ['Truck Master', 'Truck Driver', 'Truck Owner'] },
       
      ],
    },
    {
      name: 'Transactions',
      options: [
        { name: 'Outward', subOptions: ['LR. Entry','Memo Entry','Crossing Lr','Memo Transfer','Loading Sheet'] },
        { name: 'Inward', subOptions: ['Memo Receive','Delivery Of Memo','Delivery Of LR',''] },
        { name: 'Trip Entry', subOptions: null },
        { name: 'Full Load', subOptions: null },
        { name: 'Truck Expense', subOptions: null },
        { name: 'Bank/Cash', subOptions: ['Bank Payment','Bank Receipt', 'Cash Payment', 'Cash Receipt','Contra','Fund Transfer','Fund Receive'] },
        { name: 'Journal Voucher', subOptions: ['Journal voucher', 'Credit Note', 'Debit Note','Expense Entry'] },
        { name: 'GST', subOptions: ['GST Expense Entry', 'GST RCM Entry','GST Income Entry','GST Payment','GST Utilization','GST Journal','CN Entry w/o Stock','CN Entry With Stock','DN Entry w/o Stock','DN Entry With Stock'] },
        { name: 'Quotation', subOptions: null},
        { name: 'Purchase Order', subOptions: null},
        { name: 'Sales', subOptions: ['Sales Bill','Trans Bill','Supplementary Bill','Estimate Bill','Freight Bill','Est Transport Bill']},

        { name: 'Inventory', subOptions: ['Stock Inward','Stock Outward','Stock Inward from Truck','Stock Removal Entry'] },
       
      ],
    },
    {
      name: 'Reports',
      options: [
        { name: 'Stock', subOptions: null },
        { name: 'Clearance', subOptions: null },
        { name: 'WH. Processing', subOptions: null },
        { name: 'Warehouse Stock', subOptions: null },
        { name: 'Delivery Plan', subOptions: null },
        { name: 'Entry Plan', subOptions: null },
        { name: 'Container Return', subOptions: null },
        { name: 'Trucks', subOptions: null },
        { name: 'Commodities', subOptions: null },
      ],
    },
    {
      name: "Utilities",
      options: [
        {
          name: "User Management",
          subOptions: [
           "User Entry", 
           "User Right", 
           "User Log", 
           "Role Template", 
          ]
        },
        {
          name: "WhatsApp",
          subOptions: [
           "WhatsApp Log", 
           "WhatsApp Setup", 
          ]
        },
        {
          name: "SMS",
          subOptions: [
           "Send Sms", 
           "Sms Template", 
           "Sms Log", 
           "Sms Mask", 
          ]
        },
        {
          name: "Year End",
          subOptions: [
           "New Fin. Year", 
           "Update Balance", 
           "Import Back Year Data", 
          ]
        },
        {
          name: "Data Utility",
          subOptions: [
           "Import", 
           "Export To Telly", 
          ]
        },
        {
          name: "Havala",
          subOptions: [
           "Capital", 
           "Depreciation", 
           "Interest", 
           "Discount/Kasar Entry", 
           "TDS Calculation", 
           "Salary", 
          ]
        },
        {
          name: "Advance Utility",
          subOptions: [
           "Account Merge", 
           "Product Merge", 
           "City Merge", 
           "State Merge", 
           "Voucher Renumber", 
           "Specification Merge", 
           "Voucher Print", 
           "Merge Truck", 
           "Quick Link", 
           "Delete Transaction", 
           "Document Cancellation", 
           "Copy Branch", 
          ]
        },
        {
          name: "Personal Diary",
          subOptions: [
           "Reminder", 
           "Label Print", 
          ]
        },
        {
          name: "System Utility",
          subOptions: [
            "Account Effect",
            "User Fields",
            "User Auto List",
            "Report File",
            "Menu Management",
            "GST Api Log",
            "Document List",
            "Client LR Track",
            "Report Fields"
          ]
        },
      ]
    },
    {
      "name": "Set Up",
      "options": [
        {
          "name": "Sales Setup",
          "subOptions": [
            "Sales Invoice Type",
            "Sale Expense Formula",
            "Link Sale Expense"
          ]
        },
        {
          "name": "Purchase Setup",
          "subOptions": [
            "Purchase Invoice Type",
            "Purchase Expense Formula",
            "Link Purchase Expense"
          ]
        },
        {
          "name": "Company Setup",
          "subOptions": null
        },
        {
          "name": "Branch Setup",
          "subOptions": null
        },
        {
          "name": "Voucher Setup",
          "subOptions": null
        },
        {
          "name": "Report Setup",
          "subOptions": null
        },
        {
          "name": "Resource Setup",
          "subOptions": null
        },
        {
          "name": "Remainder Setup",
          "subOptions": null
        },
        {
          "name": "SMS Setup",
          "subOptions": null
        },
        {
          "name": "Scheduler Setup",
          "subOptions": null
        },
        {
          "name": "Notification Setup",
          "subOptions": null
        },
        {
          "name": "Email Setup",
          "subOptions": null
        },
        {
          "name": "Tax Setup",
          "subOptions": [
            "Tax Master",
            "Tax Group",
            "TCS Master",
            "TCS Certificate",
            "TDS Nature Of Payment"
          ]
        }
      ]
    }
  ];

  // Location and Year options
  const locations = ['Head Office', 'Mumbai', 'Delhi', 'Bangalore']; // Extend as needed
  const currentYear = 2025;
  const years = [];
  for (let i = 2020; i < currentYear; i++) {
    years.push(`${i}-${(i + 1).toString().slice(2)}`);
  }

  // Handle dropdown toggle
  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setActiveSubDropdown(null);
    setLocationDropdown(false);
    setYearDropdown(false);
  };

  // Handle sub-dropdown toggle
  const handleSubDropdown = (index) => {
    setActiveSubDropdown(activeSubDropdown === index ? null : index);
  };

  // Handle location and year dropdown toggle
  const toggleLocationDropdown = () => {
    setLocationDropdown(!locationDropdown);
    setYearDropdown(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  const toggleYearDropdown = () => {
    setYearDropdown(!yearDropdown);
    setLocationDropdown(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  // Handle navigation to a new component
  const handleNavigation = (mainItem, option, subOption = null) => {
    const path = subOption
      ? `/${mainItem.toLowerCase()}/${option.toLowerCase()}/${subOption.toLowerCase()}`
      : `/${mainItem.toLowerCase()}/${option.toLowerCase()}`;
    navigate(path);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  // // Handle location and year selection
  // const handleLocationSelect = (location) => {
  //   navigate(`/location/${location.toLowerCase()}`);
  //   setLocationDropdown(false);
  // };

  // const handleYearSelect = (year) => {
  //   navigate(`/year/${year.toLowerCase()}`);
  //   setYearDropdown(false);
  // };

  const handleLocationSelect = (location) => {
    navigate(`/`);
    setLocationDropdown(false);
  };

  const handleYearSelect = (year) => {
    navigate(`/`);
    setYearDropdown(false);
  };

  return (
    <div className="px-8 relative z-50  bg-white text-black flex justify-between items-center shadow-lg">
      {/* Menu Items */}
      <div className="flex gap-5  text-sm font-medium capitalize">
        {menuItems.map((item, index) => (
          <div
            key={item.name}
            className="relative group"
            onMouseEnter={() => handleDropdown(index)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <h1 className="cursor-pointer py-5 uppercase hover:tracking-widest transitionq-all duration-200  text-zinc-800">{item.name}</h1>
            {/* Dropdown */}
            {activeDropdown === index && (
              <div className="absolute -left-5 top-14 w-48 bg-[#397BD0] backdrop-blur-xl text-white rounded-lg shadow-xl z-10">
                {item.options.map((option, optIndex) => (
                  <div
                    key={option.name}
                    className="relative group"
                    onMouseEnter={() => handleSubDropdown(optIndex)}
                    onMouseLeave={() => setActiveSubDropdown(null)}
                  >
                    {/* Option with or without sub-options */}
                    {option.subOptions ? (
                      <div className="px-4 py-1 hover:bg-blue-100 hover:text-black border-b border-white/50 cursor-pointer transition-colors duration-200">
                        {option.name}
                      </div>
                    ) : (
                      <div
                        className="px-4 py-1 hover:bg-blue-100 hover:text-black border-b border-white/50 cursor-pointer transition-colors duration-200"
                        onClick={() => handleNavigation(item.name, option.name)}
                      >
                        {option.name}
                      </div>
                    )}
                    {/* Sub-Dropdown (only if subOptions exist) */}
                    {activeSubDropdown === optIndex && option.subOptions && (
                      <div className="absolute left-full top-0 mt-0 w-48 bg-[#397BD0] text-white rounded-lg shadow-xl z-10">
                        {option.subOptions.map((subOption) => (
                          <div
                            key={subOption}
                            className="px-4 py-1 hover:bg-blue-100 hover:text-black border-b text-nowrap border-white/50 cursor-pointer transition-colors duration-200"
                            onClick={() => handleNavigation(item.name, option.name, subOption)}
                          >
                            {subOption}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Icons */}
      <div className="flex gap-6 text-xl">
        
      <NavLink to="/list-of-lr">
          <i className="ri-search-line cursor-pointer"></i>
        </NavLink>

        <NavLink to="/profile">
          <i className="ri-user-line cursor-pointer"></i>
        </NavLink>

        {/* Location Dropdown */}
        <div className="relative">
          <i
            className="ri-map-pin-line cursor-pointer"
            onClick={toggleLocationDropdown}
          ></i>
          {locationDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-[#397BD0] overflow-hidden backdrop-blur-xl text-white rounded-lg shadow-xl z-10">
              {locations.map((location) => (
                <div
                  key={location}
                  className="px-2 py-1 text-sm hover:bg-blue-100 hover:text-black border-b border-white/50 cursor-pointer transition-colors duration-200"
                  onClick={() => handleLocationSelect(location)}
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Year Dropdown */}
        <div className="relative">
          <i
            className="ri-calendar-line cursor-pointer"
            onClick={toggleYearDropdown}
          ></i>
          {yearDropdown && (
            <div className="absolute overflow-hidden right-0 mt-2 w-48 bg-[#397BD0] backdrop-blur-xl text-white rounded-lg shadow-xl z-10">
              {years.map((year) => (
                <div
                  key={year}
                  className="px-2 py-1 text-sm hover:bg-blue-100 hover:text-black border-b border-white/50 cursor-pointer transition-colors duration-200"
                  onClick={() => handleYearSelect(year)}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;