import axios from "axios";
import axiosInstance from "./axiosinstance";

const API_URL = "http://localhost:8000/api";

export const loginUser = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/token/`, { username, password });
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    return res.data;
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
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
    const res = await axios.post(`${API_URL}/register/`, formData);
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
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