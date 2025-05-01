import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/login`, { email, password });
    return res.data;
  } catch (err) {
    return err.response?.data || { success: false, message: "Login failed" };
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/register`, {
      name,
      email,
      password
    });
    return res.data;
  } catch (err) {
    return err.response?.data || { success: false, message: "Register failed" };
  }
};

export const fetchItems = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/item`);
    return res.data;
  } catch (err) {
    return { success: false, payload: [] };
  }
};
