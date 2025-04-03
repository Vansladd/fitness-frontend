import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserProfile, updateProfile } from '../services/api'; // Assume API services are implemented


const UserProfile = () => {
    const darkMode = useSelector((state) => state.darkMode.darkMode);
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});


    useEffect(() => {
        // Fetch user data from backend API
        const fetchData = async () => {
            try {
                const data = await getUserProfile(); // Get user data with token
                const {user_details: {username, email} , total_steps, total_calories, Average_steps_week,Average_steps_month} = data
                setUserData({username, email , total_steps, total_calories, Average_steps_week,Average_steps_month});
                setFormData({username, email , total_steps, total_calories, Average_steps_week,Average_steps_month}); // Set initial form data for editing
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchData();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await updateProfile(formData); // Update profile data
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (!userData) {
        return <div>Loading...</div>;
    }
    console.log(userData)
    return (
        <div className={`profile-container p-6 max-w-lg mx-auto mt-8 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}>
        <h1 className={`text-2xl font-semibold text-center mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {isEditing ? 'Edit Profile' : 'Profile'}
        </h1>
  
        <div className="profile-info space-y-6">
          <div>
            <strong className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Username:</strong>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-md p-2 w-full mt-2`}
              />
            ) : (
              <span className="text-lg">{userData.username}</span>
            )}
          </div>
  
          <div>
            <strong className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Email:</strong>{' '}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-black'} rounded-md p-2 w-full mt-2`}
              />
            ) : (
              <span className="text-lg">{userData.email}</span>
            )}
          </div>
  
          <div>
            <strong className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Total Steps:</strong>
            <span className="text-lg">{userData.total_steps}</span>
          </div>
  
          <div>
            <strong className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Average Steps this week:</strong>
            <span className="text-lg">{userData.Average_steps_week}</span>
          </div>
  
          <div>
            <strong className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Average Steps this Month:</strong>
            <span className="text-lg">{userData.Average_steps_month}</span>
          </div>
  
          <div>
            <strong className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Calories Burned:</strong>
            <span className="text-lg">{userData.total_calories}</span>
          </div>
        </div>
  
        <div className="text-center mt-6">
          {isEditing ? (
            <button 
              onClick={handleSave}
              className={`bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition ${darkMode ? 'hover:bg-blue-500' : 'hover:bg-blue-700'}`}
            >
              Save
            </button>
          ) : (
            <button 
              onClick={handleEdit} 
              className={`bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition ${darkMode ? 'hover:bg-gray-500' : 'hover:bg-gray-700'}`}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    );
  };

export default UserProfile;
