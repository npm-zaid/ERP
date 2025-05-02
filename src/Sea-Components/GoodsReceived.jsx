import React, { useState } from 'react';

const GoodsReceived = () => {
  const [clientName, setClientName] = useState('');
  const [originFrom, setOriginFrom] = useState('');
  const [transporterName, setTransporterName] = useState('');
  const [truck, setTruck] = useState('');
  const [trailer, setTrailer] = useState('');
  const [driverName, setDriverName] = useState('');
  const [idPassportNo, setIdPassportNo] = useState('');
  const [commodity, setCommodity] = useState('');
  const [referenceBLNo, setReferenceBLNo] = useState('');
  const [containerNo, setContainerNo] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      clientName,
      originFrom,
      transporterName,
      truck,
      trailer,
      driverName,
      idPassportNo,
      commodity,
      referenceBLNo,
      containerNo,
      quantity,
      type,
    };
    console.log(formData);
  };

  return (
    <div className="min-h-screen w-full  text-gray-900 ">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-[#397BD0] to-[#2e62a8] text-white py-3 px-4 rounded-lg shadow-md">
          <h2 className="text-2xl uppercase tracking-wider font-semibold flex items-center gap-2">
            Goods Received
          </h2>
          <span className="font-bold hidden md:block">DATE - {new Date().toLocaleDateString()}</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 "> 
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-user-line text-[#397BD0]"></i>
                Client Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="BLS Operations"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-map-pin-line text-[#397BD0]"></i>
                Origin From
              </label>
              <input
                type="text"
                value={originFrom}
                onChange={(e) => setOriginFrom(e.target.value)}
                placeholder="Origin From"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 "> 
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-truck-line text-[#397BD0]"></i>
                Transporter Name
              </label>
              <input
                type="text"
                value={transporterName}
                onChange={(e) => setTransporterName(e.target.value)}
                placeholder="Transporter Name"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-car-line text-[#397BD0]"></i>
                Truck
              </label>
              <input
                type="text"
                value={truck}
                onChange={(e) => setTruck(e.target.value)}
                placeholder="Truck"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-trailer-line text-[#397BD0]"></i>
                Trailer
              </label>
              <input
                type="text"
                value={trailer}
                onChange={(e) => setTrailer(e.target.value)}
                placeholder="Trailer"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 "> 
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-user-smile-line text-[#397BD0]"></i>
                Driver Name
              </label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="Driver Name"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-passport-line text-[#397BD0]"></i>
                ID/Passport No.
              </label>
              <input
                type="text"
                value={idPassportNo}
                onChange={(e) => setIdPassportNo(e.target.value)}
                placeholder="ID/Passport No."
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
          </div>
          <div className=""> 
            <label className="text-gray-900 flex items-center gap-2">
              <i className="ri-package-line text-[#397BD0]"></i>
              Commodity
            </label>
            <input
              type="text"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              placeholder="Commodity"
              className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 "> 
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-file-line text-[#397BD0]"></i>
                Reference/BL No.
              </label>
              <input
                type="text"
                value={referenceBLNo}
                onChange={(e) => setReferenceBLNo(e.target.value)}
                placeholder="Reference/BL No."
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-inbox-line text-[#397BD0]"></i>
                Container No.
              </label>
              <input
                type="text"
                value={containerNo}
                onChange={(e) => setContainerNo(e.target.value)}
                placeholder="Container No."
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-box-3-line text-[#397BD0]"></i>
                Quantity
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-list-check text-[#397BD0]"></i>
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              >
                <option value="">Select</option>
                <option value="Chemical">Chemical</option>
                <option value="Textiles">Textiles</option>
                <option value="Industrial">Industrial</option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>
          </div>
          <div className=" border-l-4 p-3 rounded-xl border-[#397BD0]">
            <h3 className="text-lg font-semibold text-[#397BD0] mb-4 flex items-center gap-2">
              <i className="ri-arrow-right-line text-[#397BD0]"></i>
              Incomings
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { id: '1- Security', placeholder: 'Comp. Name', icon: 'ri-shield-line' },
                { id: '2- Gate Controller', placeholder: 'Comp. Name', icon: 'ri-gate-line' },
                { id: '3- Weighbridge', placeholder: 'Comp. Name', icon: 'ri-weight-line' },
                { id: '4- Tally Interchange', placeholder: 'Comp. Name', icon: 'ri-swap-line' },
              ].map((item, index) => (
                <div
                  key={`incoming-${index}`}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-4 bg-gray-100 text-gray-900 p-2 rounded-lg shadow-md hover:shadow-xl hover:bg-[#397BD0]/10 transition-all duration-300 border-l-2 border-transparent hover:border-[#397BD0]"
                >
                  <div className="font-medium flex items-center gap-2 ">
            
                    {item.id}
                  </div>
                  <div>
                    <label className="md:hidden text-gray-900 flex items-center gap-2">
                      <i className="ri-checkbox-circle-line text-[#397BD0]"></i>
                      Status
                    </label>
                    <select
                      className="w-full p-2 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                    >
                      <option value="">YES/NO</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="md:hidden text-gray-900 flex items-center gap-2">
                      <i className="ri-building-line text-[#397BD0]"></i>
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder={item.placeholder}
                      className="w-full p-2 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" border-l-4 p-3 rounded-xl border-[#397BD0]">
            <h3 className="text-lg font-semibold text-[#397BD0] mb-4 flex items-center gap-2">
              <i className="ri-arrow-left-line text-[#397BD0]"></i>
              Outgoings
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { id: '1- Security', placeholder: 'Comp. Name', icon: 'ri-shield-line' },
                { id: '2- Gate Controller', placeholder: 'Comp. Name', icon: 'ri-gate-line' },
                { id: '3- Weighbridge', placeholder: 'Comp. Name', icon: 'ri-weight-line' },
                { id: '4- Tally Interchange', placeholder: 'Comp. Name', icon: 'ri-swap-line' },
              ].map((item, index) => (
                <div
                  key={`outgoing-${index}`}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-4 bg-gray-100 text-gray-900 p-2 rounded-lg shadow-md hover:shadow-xl hover:bg-[#397BD0]/10 transition-all duration-300 border-l-2 border-transparent hover:border-[#397BD0]"
                >
                  <div className="font-medium flex items-center gap-2">
                    <i className={`${item.icon} text-[#397BD0] md:hidden`}></i>
                    <span className="md:hidden">ID: </span>
                    {item.id}
                  </div>
                  <div>
                    <label className="md:hidden text-gray-900 flex items-center gap-2">
                      <i className="ri-checkbox-circle-line text-[#397BD0]"></i>
                      Status
                    </label>
                    <select
                      className="w-full p-2 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                    >
                      <option value="">YES/NO</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="md:hidden text-gray-900 flex items-center gap-2">
                      <i className="ri-building-line text-[#397BD0]"></i>
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder={item.placeholder}
                      className="w-full p-2 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-edit-line text-[#397BD0]"></i>
                Operations [Sign]
              </label>
              <input
                type="text"
                placeholder="Operations Signature"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-edit-line text-[#397BD0]"></i>
                Manager [Sign]
              </label>
              <input
                type="text"
                placeholder="Manager Signature"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#397BD0] uppercase tracking-wider text-lg  text-white py-2 rounded-lg shadow-md active:scale-95 transition-all duration-300 hover:bg-[#2e62a8]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoodsReceived;