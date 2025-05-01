import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Title = ({ text1, text2 }) => (
  <h1 className="text-4xl font-bold text-gray-800">
    {text1} <span className="text-blue-500">{text2}</span>
  </h1>
);

const ProfileCard = () => {
  // Mock admin profile data
  const [profile, setProfile] = useState({
    username: 'John Doe',
    email: 'john.doe@erp.com',
    role: 'System Admin',
    department: 'IT',
    phone: '+1-555-123-4567',
    employeeId: 'EMP-001',
    lastLogin: '2025-05-01 10:30 AM',
   
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ ...profile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleSave = () => {
    // Simulate API call to save profile
    setProfile({ ...updatedProfile });
    setIsEditing(false);
    console.log('Profile saved:', updatedProfile);
  };

  const handleCancel = () => {
    setUpdatedProfile({ ...profile });
    setIsEditing(false);
  };

  return (
    <div className="w-full h-full">
 

      <div className=" w-full mx-auto  rounded-2xl bg-white border border-blue-200/50 hover:border-blue-300/70 shadow-xl transform transition-all hover:shadow-2xl">
        <div className="flex flex-col  gap-3 items-center justify-center">
          {/* Profile Image */}
          <div className="bg-blue-500/80 w-full p-4  rounded-t-2xl flex items-center justify-center">
          <div className="relative group  flex justify-between items-center ">
            <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-blue-300 shadow-lg transform transition group-hover:scale-105">
              {profile.profilePic ? (
                <img
                  src={profile.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <i className="ri-user-heart-line text-6xl text-blue-400"></i>
              )}
            </div>
          </div>
          </div>



          {/* Profile Info */}
          <div className="grid grid-cols-12 justify-between gap-4 p-5 uppercase tracking-wide text-[14px]">
            <div className="col-span-4">
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={updatedProfile.username}
                  onChange={handleInputChange}
                  className="text-3xl font-bold text-gray-800 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter username"
                />
              ) : (
                <h2 className="text-[3vw] uppercase tracking-wide mb-3 font-bold  text-gray-800 flex items-center gap-3">
                
                  {profile.username}
                </h2>
              )}
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={updatedProfile.email}
                  onChange={handleInputChange}
                  className=" text-gray-700 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                />
              ) : (
                <p className="text-gray-600 flex items-center gap-3 ">
                  <i className="ri-mail-star-line text-blue-500"></i>
                  {profile.email}
                </p>
              )}
              <p className="text-gray-600 flex items-center gap-3 ">
                <i className="ri-briefcase-line text-blue-500"></i>
                {profile.role}
              </p>
              {isEditing ? (
                <input
                  type="text"
                  name="department"
                  value={updatedProfile.department}
                  onChange={handleInputChange}
                  className="t text-gray-700 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter department"
                />
              ) : (
                <p className="text-gray-600 flex items-center gap-3 ">
                  <i className="ri-building-line text-blue-500"></i>
                  {profile.department}
                </p>
              )}
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={updatedProfile.phone}
                  onChange={handleInputChange}
                  className=" text-gray-700 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone"
                />
              ) : (
                <p className="text-gray-600 flex items-center gap-3 ">
                  <i className="ri-phone-line text-blue-500"></i>
                  {profile.phone}
                </p>
              )}
              <p className="text-gray-600 flex items-center gap-3 ">
                <i className="ri-fingerprint-line text-blue-500"></i>
                {profile.employeeId}
              </p>
              <p className="text-gray-600 flex items-center gap-3 ">
                <i className="ri-time-line text-blue-500"></i>
                Last Login: {profile.lastLogin}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6 col-span-6 pt-4 border-t border-blue-200/50">
              <h4 className="text-gray-700 font-medium">Quick Actions</h4>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300"
                >
                  <i className="ri-dashboard-line"></i>
                  Dashboard
                </Link>
                <Link
                  to="/proof-of-delivery"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300"
                >
                  <i className="ri-group-line"></i>
                  pod
                </Link>
                <Link
                  to="/reports/stock"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300"
                >
                  <i className="ri-file-chart-line"></i>
                  Reports
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300"
                >
                  <i className="ri-settings-4-line"></i>
                  Settings
                </Link>
                <Link
                  to="/logout"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-300"
                >
                  <i className="ri-logout-box-line"></i>
                  Logout
                </Link>
              </div>
            </div>

            {/* Edit/Save/Cancel Buttons */}
            <div className="pt-4 col-span-2 self-end flex justify-start gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Edit Profile
                </button>
              )}
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;