import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const res = await registerUser(formData)
    res ? navigate("/dashboard") : window.alert("Registration failed. Try again.")

  }



  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="border p-2 rounded mb-2"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 rounded mb-2"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 rounded mb-2"
        value={formData.password}
        onChange={handleChange}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;
