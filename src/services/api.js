import axios, { Axios } from "axios";
import axiosInstance from "./axiosinstance";
import {jwtDecode} from "jwt-decode"
import Cookies from "js-cookie"

export const loginUser = async (username, password) => {
  try {
    const res = await axiosInstance.post("/token/", { username, password });
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.set("access_token", res.data.access, { secure: true, sameSite: "Strict" });
    Cookies.set("refresh_token", res.data.refresh, { secure: true, sameSite: "Strict" });
    return res.data;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get("refresh_token")
    if (!refreshToken) throw new Error("No refresh token available");

    const res = await axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken });
    return res.data.access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

export const registerUser = async (formData) => {
  try {
    const res = await axiosInstance.post("/register/", formData);
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.set("access_token", res.data.access, { secure: true, sameSite: "Strict" });
    Cookies.set("refresh_token", res.data.refresh, { secure: true, sameSite: "Strict" });
    return res.data;
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

export const getStepRecords = async () => {
  try {
      const response = await axiosInstance.get('/steps/');
      return response.data;
  } catch (error) {
      console.error("Error fetching step records:", error);
      return [];
  }
};

export const addStepRecord = async (data) => {
  try {
      const response = await axiosInstance.post('/steps/', data);
      return response.data;
  } catch (error) {
      console.error("Error adding step record:", error);
      throw error;
  }
};

export const getLeaderBoard = async () => {
  try{
    const response = await axiosInstance.get("/leaderboard/");
    return response.data
  } catch(err){
    console.error("Couldn't retrieve data", err);
    throw err;
  }
}


export const getUserProfile = async () => {
  try{
    const response = await axiosInstance.get("/profile/")
    return response.data
  } catch(error){
    console.error("Failed to retrieve User Info",error)
    throw error
  }
}

export const getUserid = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;  // User ID extracted from the token
    console.log(userId);  // Use this for frontend operations if needed
    return(userId)
  }
}

export const updateProfile = async (formData) => {
  try{
    const response = axiosInstance.put("/profile/", formData);
  } catch(error) {
    console.error("Failed to Update Profile", error)
    throw error

  }
}

export const fetchWorkouts = async () => {
  const response = await axiosInstance.get("/workout/");
  return response.data;
};

export const logWorkout = async (workoutData) => {
  const response = await axiosInstance.post("/workout/", workoutData);
  return response.data;
};