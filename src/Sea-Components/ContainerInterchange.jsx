import React, { useState } from 'react';

const ContainerInterchange = () => {
  const [referenceBLNo, setReferenceBLNo] = useState('');
  const [isoCode, setIsoCode] = useState('');
  const [shippingLine, setShippingLine] = useState('');
  const [vesselVoyage, setVesselVoyage] = useState('');
  const [containerNo, setContainerNo] = useState('');
  const [containerSeal, setContainerSeal] = useState('');
  const [weight, setWeight] = useState('');
  const [imdgUnno, setImdgUnno] = useState('');
  const [transporterName, setTransporterName] = useState('');
  const [truckTrailerRegistration, setTruckTrailerRegistration] = useState('');
  const [destinationTo, setDestinationTo] = useState('');
  const [originFrom, setOriginFrom] = useState('');
  const [transporterSignature, setTransporterSignature] = useState('');
  const [gmsSignature, setGmsSignature] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      referenceBLNo,
      isoCode,
      shippingLine,
      vesselVoyage,
      containerNo,
      containerSeal,
      weight,
      imdgUnno,
      transporterName,
      truckTrailerRegistration,
      destinationTo,
      originFrom,
      transporterSignature,
      gmsSignature,
    };
    console.log(formData);
  };

  return (
    <div className="min-h-screen w-full  text-gray-900 ">
      <div className="p-6 rounded-lg shadow-md bg-white">
        <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-[#397BD0] to-[#2e62a8] text-white py-3 px-4 rounded-lg shadow-md">
          <h2 className="text-2xl uppercase tracking-wider font-semibold flex items-center gap-2 ">
            Interchange - Containers
          </h2>
          <span className="font-bold hidden md:block">DATE - {new Date().toLocaleDateString()}</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group 1: Reference, ISO Code, Shipping Line, Vessel-Voyage */}
          <div className="grid p-4 rounded-lg hover:shadow-md grid-cols-1 md:grid-cols-4 gap-4 bg-gray-200">
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-file-line text-[#397BD0]"></i>
                Reference/BL No.
              </label>
              <input
                type="text"
                placeholder="Reference/BL No."
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={referenceBLNo}
                onChange={(e) => setReferenceBLNo(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-code-box-line text-[#397BD0]"></i>
                ISO Code
              </label>
              <input
                type="text"
                placeholder="ISO Code"
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={isoCode}
                onChange={(e) => setIsoCode(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-ship-line text-[#397BD0]"></i>
                Shipping Line
              </label>
              <input
                type="text"
                placeholder="Shipping Line"
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={shippingLine}
                onChange={(e) => setShippingLine(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-anchor-line text-[#397BD0]"></i>
                Vessel-Voyage
              </label>
              <input
                type="text"
                placeholder="Vessel-Voyage"
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={vesselVoyage}
                onChange={(e) => setVesselVoyage(e.target.value)}
              />
            </div>
          </div>

          {/* Group 2: Container No., Seal, Weight, IMDG/UNNO */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-200 p-4 rounded-lg shadow-md">
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-inbox-line text-[#397BD0]"></i>
                Container No.
              </label>
              <input
                type="text"
                placeholder="Container No."
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={containerNo}
                onChange={(e) => setContainerNo(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-lock-line text-[#397BD0]"></i>
                Container Seal
              </label>
              <input
                type="text"
                placeholder="Container Seal"
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={containerSeal}
                onChange={(e) => setContainerSeal(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-weight-line text-[#397BD0]"></i>
                Weight
              </label>
              <input
                type="text"
                placeholder="Weight"
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-alert-line text-[#397BD0]"></i>
                IMDG/UNNO
              </label>
              <input
                type="text"
                placeholder="IMDG/UNNO"
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={imdgUnno}
                onChange={(e) => setImdgUnno(e.target.value)}
              />
            </div>
          </div>

          {/* Group 3: Transporter Name, Truck/Trailer Registration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-200 p-4 rounded-lg shadow-md">
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-truck-line text-[#397BD0]"></i>
                Transporter Name
              </label>
              <input
                type="text"
                placeholder="Transporter Name"
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={transporterName}
                onChange={(e) => setTransporterName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-car-line text-[#397BD0]"></i>
                Truck/Trailer Registration
              </label>
              <input
                type="text"
                placeholder="Truck/Trailer Registration"
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={truckTrailerRegistration}
                onChange={(e) => setTruckTrailerRegistration(e.target.value)}
              />
            </div>
          </div>

          {/* Group 4: Destination, Origin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-200 p-4 rounded-lg shadow-md">
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-map-pin-line text-[#397BD0]"></i>
                Destination to
              </label>
              <input
                type="text"
                placeholder="Destination to"
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={destinationTo}
                onChange={(e) => setDestinationTo(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-map-pin-2-line text-[#397BD0]"></i>
                Origin From
              </label>
              <input
                type="text"
                placeholder="Origin From"
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={originFrom}
                onChange={(e) => setOriginFrom(e.target.value)}
              />
            </div>
          </div>

          {/* Container Diagram and Parts List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-200 p-4 rounded-lg shadow-md border-l-4 border-[#397BD0]">
            <div className="w-full">
              <img
                src="https://via.placeholder.com/200x150"
                alt="Container Diagram"
                className="rounded shadow-md w-full h-auto"
              />
            </div>
            <div className="w-full">
              <h3 className="text-lg font-semibold text-[#397BD0] mb-4 flex items-center gap-2">
                <i className="ri-box-3-line text-[#397BD0]"></i>
                Container Parts
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { no: '1-', part: 'Rear Side' },
                  { no: '1-', part: 'Right Gate' },
                  { no: '2-', part: 'Top Side' },
                  { no: '3-', part: 'Right Side' },
                  { no: '4-', part: 'Left Gate' },
                  { no: '5-', part: 'Back Side' },
                  { no: '6-', part: 'Container Downside' },
                  { no: '7-', part: 'Outer Bottom' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-4 bg-gray-300 text-gray-900 p-4 rounded-lg hover:shadow-xl hover:bg-[#397BD0]/10 transition-all duration-300 border-l-2 border-transparent hover:border-[#397BD0]"
                  >
                    <div className="font-medium flex items-center gap-2 md:text-base text-sm">
                      <i className="ri-number-1 text-[#397BD0] md:hidden"></i>
                      <span className="md:hidden">Part No.: </span>
                      {item.no}
                    </div>
                    <div className="font-medium flex items-center gap-2 md:text-base text-sm">
                      <i className="ri-box-3-line text-[#397BD0] md:hidden"></i>
                      <span className="md:hidden">Part: </span>
                      {item.part}
                    </div>
                    <div>
                      <i className="ri-check-line text-[#397BD0]"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-200 p-4 rounded-lg shadow-md">
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-edit-line text-[#397BD0]"></i>
                Transporter Signature
              </label>
              <input
                type="text"
                placeholder="Transporter Signature"
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={transporterSignature}
                onChange={(e) => setTransporterSignature(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-900 flex items-center gap-2">
                <i className="ri-edit-line text-[#397BD0]"></i>
                GMS - Signature
              </label>
              <input
                type="text"
                placeholder="GMS Signature"
                className="w-full p-2 mt-1 bg-gray-300 text-gray-900 rounded focus:ring-2 focus:ring-[#397BD0] focus:outline-none"
                value={gmsSignature}
                onChange={(e) => setGmsSignature(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-[#397BD0] text-white py-2 rounded-lg shadow-md active:scale-95 transition-all duration-300 hover:bg-[#2e62a8]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContainerInterchange;