import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserProfile, updateProfile } from '../services/api';
import Avatar from './Avatar';
import AvatarPicker from './AvatarPicker';
import Loader from './Loader';

const UserProfile = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfile();
        const {
          user_details: { username, email, avatar },
          total_steps,
          total_calories,
          Average_steps_week,
          Average_steps_month,
        } = data;
        setUserData({
          username,
          email,
          total_steps,
          total_calories,
          Average_steps_week,
          Average_steps_month,
          avatar
        });
        setFormData({ username, email, avatar });
      } catch (error) {
        setError('Error fetching user profile.');
        console.error('Error fetching user profile:', error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setUserData((u) => ({
        ...u,
        username: formData.username,
        email: formData.email,
        avatar: formData.avatar
      }));
      setIsEditing(false);
    } catch (error) {
      setError('Error updating profile.');
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (error) return <div className="text-red-500 text-center mt-4">{error}</div>;
  if (!userData) return <Loader />;

  return (
    <div className={`p-6 max-w-2xl mx-auto mt-10 rounded-2xl shadow-lg transition-all ${
      darkMode
        ? 'bg-gray-800 text-white border border-gray-700'
        : 'bg-white text-gray-900 border border-gray-200'
    }`}>
      <h1 className="text-3xl font-bold text-center mb-6">
        {isEditing ? 'Edit Profile' : 'Your Profile'}
      </h1>

      {/* Flex Layout for profile form and avatar */}
      <div className={`flex flex-col md:flex-row ${isEditing ? "gap-3" : "gap-30"} items-center`}>
        {/* Left: Username & Email */}
        <div className={`space-y-1 ${isEditing ? "flex-1" : "flex-0"}`}>
          <div>
            <label className="block font-semibold mb-1 text-lg">Username</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full p-3 rounded-md border ${
                  darkMode
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-100 border-gray-300 text-gray-900'
                } shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            ) : (
              <p className="text-lg font-medium">{userData.username}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1 text-lg">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 rounded-md border ${
                  darkMode
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-gray-100 border-gray-300 text-gray-900'
                } shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            ) : (
              <p className="text-lg font-medium">{userData.email}</p>
            )}
          </div>
        </div>

        {/* Right: Avatar */}
        <div className="flex justify-center items-start w-32 h-32">
          <Avatar
            seed={(isEditing ? formData.avatar : userData.avatar) || 'default-user'}
            size={120}
          />
        </div>
      </div>

      {/* Avatar Picker */}
      {isEditing && (
        <div className="mt-4">
          <h3 className="text-md font-medium mb-2">Choose an Avatar</h3>
          <AvatarPicker
            selected={formData.avatar}
            onSelect={(seed) => setFormData({ ...formData, avatar: seed })}
          />
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <Stat label="Total Steps" value={userData.total_steps} />
        <Stat label="Calories Burned" value={userData.total_calories} />
        <Stat label="Avg. Steps This Week" value={userData.Average_steps_week || 'N/A'} />
        <Stat label="Avg. Steps This Month" value={userData.Average_steps_month || 'N/A'} />
      </div>

      {/* Buttons */}
      <div className="text-center mt-8">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default UserProfile;
