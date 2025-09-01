import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const result = await dispatch(loginUser(formData));

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Login successful");
      navigate("/"); // redirect to home
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="w-full max-w-sm border rounded-2xl p-6 bg-white">
        <h1 className="text-xl font-bold mb-2">Login</h1>
        <p className="text-sm text-gray-600 mb-4">Enter your credentials</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-xl"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border px-3 py-2 rounded-xl"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded-xl bg-black text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
