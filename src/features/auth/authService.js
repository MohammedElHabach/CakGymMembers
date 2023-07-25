import axios from "axios";
const loginURL = process.env.REACT_APP_URL + "/admin/login";

// Login user
const login = async (adminData) => {
  const response = await axios.post(loginURL, adminData);

  if (response.data) {
    localStorage.setItem("admin", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("admin");
};

const authService = {
  logout,
  login,
};

export default authService;
