import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("✅ Registered successfully! Please login.");
      navigate("/"); // redirect to login
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Registration failed!";
      console.error("Registration error:", errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Create Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg px-4 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-2"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link className="text-blue-500 hover:underline" to="/">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
