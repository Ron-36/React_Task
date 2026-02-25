import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
// Icons make the UI feel "premium"
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // 1. State management
    const [logindata, setLogindata] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setLogindata({ ...logindata, [e.target.name]: e.target.value });
        if (error) setError(''); // Clear error when user starts typing again
    };

    // 2. Form submission logic
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload
        setError('');
        setIsLoading(true);

        // Simulate a network delay for better UX
        setTimeout(async () => {
            if (logindata.username === "testuser" && logindata.password === "Test123") {
                login();
                navigate("/list");
            } else {
                setError('Invalid username or password. Use "testuser" and "Test123"');
                setIsLoading(false);
            }
        }, 800);
    };

   return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">

        {/* Header Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full mb-4">
            <LogIn className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome
          </h1>

          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="username"
                type="text"
                value={logindata.username}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="password"
                type="password"
                value={logindata.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p className="leading-snug">{error}</p>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs sm:text-sm text-gray-500 pt-4 border-t">
          <p>Demo credentials</p>
          <p className="font-medium text-gray-700 mt-1 break-words">
            testuser / Test123
          </p>
        </div>

      </div>
    </div>
  </div>
);
};

export default Login;