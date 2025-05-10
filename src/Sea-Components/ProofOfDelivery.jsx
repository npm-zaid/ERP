import React, { useState } from 'react';

const ProofOfDelivery = () => {
  const [To, setTo] = useState('');
  const [Reference, setReference] = useState('');
  const [Vessel, setVessel] = useState('');
  const [ContainerQty, setContainerQty] = useState('');
  const [Commodity, setCommodity] = useState('');
  const [TransporterName, setTransporterName] = useState('');
  const [TruckRegistration, setTruckRegistration] = useState('');
  const [DriverName, setDriverName] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [IdPassportNo, setIdPassportNo] = useState('');
  const [GmsLda, setGmsLda] = useState('');
  const [Receiver, setReceiver] = useState('');

  // Container state
  const [containers, setContainers] = useState([
    { id: 1, containerNo: '', sealNo: '', cargoType: '', damage: '', quantity: '' }
  ]);

  const addContainer = () => {
    setContainers([
      ...containers,
      {
        id: containers.length + 1,
        containerNo: '',
        sealNo: '',
        cargoType: '',
        damage: '',
        quantity: ''
      }
    ]);
  };

  const removeContainer = (id) => {
    if (containers.length > 1) {
      setContainers(containers.filter(container => container.id !== id));
    }
  };

  const updateContainer = (id, field, value) => {
    setContainers(
      containers.map(container =>
        container.id === id ? { ...container, [field]: value } : container
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      To,
      Reference,
      Vessel,
      ContainerQty,
      Commodity,
      containers,
      TransporterName,
      TruckRegistration,
      DriverName,
      ContactNo,
      IdPassportNo,
      GmsLda,
      Receiver
    };
    console.log(formData);
  };

  return (
    <div className="min-h-screen w-full  text-gray-900 ">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-[#397BD0] to-[#2e62a8] text-white py-3 px-4 rounded-lg shadow-md">
          <h2 className="text-2xl uppercase tracking-wider font-semibold flex items-center gap-2">
            Proof of Delivery
          </h2>
          <span className="font-bold hidden md:block">DATE - {new Date().toLocaleDateString()}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">


       

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-user-line text-[#397BD0]"></i>
                To:
              </label>
              <input
                type="text"
                placeholder="Recipient Name"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={To}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-file-text-line text-[#397BD0]"></i>
                Reference/BL No.
              </label>
              <input
                type="text"
                placeholder="Reference/BL No."
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={Reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </div>
          </div>

         

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-ship-line text-[#397BD0]"></i>
                Vessel/Voyage
              </label>
              <input
                type="text"
                placeholder="Vessel/Voyage"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={Vessel}
                onChange={(e) => setVessel(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-box-3-line text-[#397BD0]"></i>
                Container Qty.
              </label>
              <input
                type="text"
                placeholder="Container Qty."
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={ContainerQty}
                onChange={(e) => setContainerQty(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-package-line text-[#397BD0]"></i>
                Commodity
              </label>
              <input
                type="text"
                placeholder="Commodity"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={Commodity}
                onChange={(e) => setCommodity(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-gray-200 p-3 rounded-lg">
            <p className="text-gray-700 flex items-center gap-2 text-[14px]">
              <i className="ri-information-line text-[#397BD0]"></i>
              This is to confirm the delivery of all the goods in proper conditions, according to the following descriptions:
            </p>
          </div>

          <div className=" border-l-4 p-3 rounded-xl border-[#397BD0]">
            <h3 className="text-xl  font-semibold text-[#397BD0] mb-4 flex items-center gap-2">
              <i className="ri-table-line text-[#397BD0]"></i>
              Container Details
            </h3>

            <div className="overflow-x-auto">
              <div className="w-full grid sm:grid-cols-5 gap-0">
                {/* Header */}
                <div className="bg-gray-200 p-3 text-left flex items-center gap-2">
                  <i className="ri-box-1-line text-[#397BD0]"></i>
                  Container No.
                </div>
                <div className="bg-gray-200 text-gray-900 p-3 text-left flex items-center gap-2">
                  <i className="ri-lock-line text-[#397BD0]"></i>
                  Seal No.
                </div>
                <div className="bg-gray-200 text-gray-900 p-3 text-left flex items-center gap-2">
                  <i className="ri-list-check text-[#397BD0]"></i>
                  Cargo Type
                </div>
                <div className="bg-gray-200 text-gray-900 p-3 text-left flex items-center gap-2">
                  <i className="ri-alert-line text-[#397BD0]"></i>
                  Damage
                </div>
                <div className="bg-gray-200 text-gray-900 p-3 text-left flex items-center gap-2">
                  <i className="ri-number-1 text-[#397BD0]"></i>
                  Quantity
                </div>

                {/* Rows */}
                {containers.map((container) => (
                  <div key={container.id} className="contents group">
                    <div className="p-3 border-t border-gray-400">
                      <input
                        type="text"
                        placeholder={`${container.id}-`}
                        className="w-full p-2 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                        value={container.containerNo}
                        onChange={(e) => updateContainer(container.id, 'containerNo', e.target.value)}
                      />
                    </div>
                    <div className="p-3 border-t border-gray-400">
                      <input
                        type="text"
                        placeholder="Seal No."
                        className="w-full p-2 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                        value={container.sealNo}
                        onChange={(e) => updateContainer(container.id, 'sealNo', e.target.value)}
                      />
                    </div>
                    <div className="p-3 border-t border-gray-400">
                      <select
                        className="w-full p-2 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                        value={container.cargoType}
                        onChange={(e) => updateContainer(container.id, 'cargoType', e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Chemical">Chemical</option>
                        <option value="Textiles">Textiles</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Electronics">Electronics</option>
                      </select>
                    </div>
                    <div className="p-3 border-t border-gray-400">
                      <select
                        className="w-full p-2 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                        value={container.damage}
                        onChange={(e) => updateContainer(container.id, 'damage', e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="p-3 border-t border-gray-400 flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Qty"
                        className="w-full p-2 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                        value={container.quantity}
                        onChange={(e) => updateContainer(container.id, 'quantity', e.target.value)}
                      />
                      {containers.length > 1 && (
                        <button
                          onClick={() => removeContainer(container.id)}
                          className="ml-2 p-1 text-red-500 hover:text-red-700"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button
                  onClick={addContainer}
                  className="p-2 bg-[#397BD0] text-white rounded hover:bg-[#2e62a8] flex items-center gap-2"
                >
                  <i className="ri-add-line"></i> Add Container
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-ruler-line text-[#397BD0]"></i>
                Total Space [MT]
              </label>
              <input
                type="text"
                placeholder="Total Space"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-scales-line text-[#397BD0]"></i>
                Gross Weight [Kgs.]
              </label>
              <input
                type="text"
                placeholder="Gross Weight"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-calculator-line text-[#397BD0]"></i>
                Total
              </label>
              <input
                type="text"
                placeholder="Total"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-stack-line text-[#397BD0]"></i>
                Total Qty.
              </label>
              <input
                type="text"
                placeholder="Total Qty."
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-edit-line text-[#397BD0]"></i>
                Receiver [Sign]
              </label>
              <input
                type="text"
                placeholder="Receiver Signature"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-edit-line text-[#397BD0]"></i>
                Delivery Agent [Sign]
              </label>
              <input
                type="text"
                placeholder="Agent Signature"
                className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
              />
            </div>
          </div>

          {/* Transporter Details */}
          <div className="w-full border-l-4 p-3 rounded-xl border-[#397BD0] text-gray-900 ">
            <div className="">
              <h1 className="text-xl font-bold text-[#397BD0] mb-3 flex items-center gap-2">
                <i className="ri-truck-line text-[#397BD0]"></i>
                Transporter Details
              </h1>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg transition-all duration-300">
                  <div className="flex-1">
                    <label className="text-gray-900 flex items-center gap-2">
                      <i className="ri-user-line text-[#397BD0]"></i>
                      Transporter Name
                    </label>
                    <input
                      type="text"
                      placeholder="Transporter Name"
                      className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                      value={TransporterName}
                      onChange={(e) => setTransporterName(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-900 flex items-center gap-2">
                      <i className="ri-truck-line text-[#397BD0]"></i>
                      Truck/Trailer Registration
                    </label>
                    <input
                      type="text"
                      placeholder="Truck/Trailer Registration"
                      className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                      value={TruckRegistration}
                      onChange={(e) => setTruckRegistration(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300">
                  <div className="flex-1">
                    <label className="text-gray-900 flex items-center gap-2">
                      <i className="ri-user-smile-line text-[#397BD0]"></i>
                      Driver's Name
                    </label>
                    <input
                      type="text"
                      placeholder="Driver's Name"
                      className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                      value={DriverName}
                      onChange={(e) => setDriverName(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-900 flex items-center gap-2">
                      <i className="ri-phone-line text-[#397BD0]"></i>
                      Contact No.
                    </label>
                    <input
                      type="text"
                      placeholder="Contact No."
                      className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                      value={ContactNo}
                      onChange={(e) => setContactNo(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-900 flex items-center gap-2">
                      <i className="ri-passport-line text-[#397BD0]"></i>
                      ID/Passport No.
                    </label>
                    <input
                      type="text"
                      placeholder="ID/Passport No."
                      className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                      value={IdPassportNo}
                      onChange={(e) => setIdPassportNo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="">
                  <p className="text-gray-900 italic">
                    We thank you for choosing GMS as your prioritized business partner. We look forward to working with you again.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex-1">
                    <label className="text-gray-900 flex items-center gap-2">
                      <i className="ri-building-line text-[#397BD0]"></i>
                      GMS, LDA
                    </label>
                    <input
                      type="text"
                      placeholder="GMS, LDA"
                      className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                      value={GmsLda}
                      onChange={(e) => setGmsLda(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-900 flex items-center gap-2">
                      <i className="ri-user-line text-[#397BD0]"></i>
                      Transport/Driver
                    </label>
                    <input
                      type="text"
                      placeholder="Transport/Driver"
                      className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-900 flex items-center gap-2">
                      <i className="ri-user-received-line text-[#397BD0]"></i>
                      Receiver
                    </label>
                    <input
                      type="text"
                      placeholder="Receiver"
                      className="w-full p-2 mt-1 bg-gray-200 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                      value={Receiver}
                      onChange={(e) => setReceiver(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          
<button className="btn-donate w-full active:scale-90 tracking-widest font-bold text-xl p-4">SUBMIT NOW</button>

        </form>
      </div>
    </div>
  );
};

export default ProofOfDelivery;