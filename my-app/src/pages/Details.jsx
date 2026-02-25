import { useLocation, useNavigate } from "react-router-dom";
// Added LogOut to imports
import { ArrowLeft, Camera, MapPin, Briefcase, Calendar, DollarSign, User, LogOut } from 'lucide-react';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  // Extract employee data from location state
  const employee = location.state;

 // Logout Handler
   const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Handle case where state is lost (e.g., direct URL access or refresh)
  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Employee Data Found</h2>
          <p className="text-gray-500 mb-6">Please navigate back to the list and select an employee.</p>
          <button 
            onClick={() => navigate("/list")}
            className=" cursor-pointer inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      {/* 1. Navigation Header with Logout */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side */}
            <button
              onClick={() => navigate('/list')}
              className=" cursor-pointer flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to List</span>
            </button>

            {/* Right Side - Added Logout Button */}
            <button
              onClick={handleLogout}
              className=" cursor-pointer flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 2. Main Detail Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white">
          
          {/* Blue Hero Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-extrabold mb-2 tracking-tight">{employee.name}</h1>
                <div className="flex items-center gap-2 text-blue-100">
                  <Briefcase className="w-5 h-5" />
                  <p className="text-xl font-medium">{employee.position}</p>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-sm font-semibold">
                ID: {employee.id}
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* 3. Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              
              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Position</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{employee.position}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors">
                <div className="bg-green-100 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Office Location</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{employee.city || employee.office}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Employee ID </p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{employee.id || employee.extn}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors">
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Hiring Date</p>
                  <p className="text-lg font-bold text-gray-900 mt-1">{employee.startDate}</p>
                </div>
              </div>

              {/* Salary Full Width Card */}
              <div className="flex items-center justify-between gap-4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl md:col-span-2 border-2 border-green-200">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-4 rounded-xl shadow-sm">
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-700 uppercase tracking-widest">Annual Salary</p>
                    <p className="text-4xl font-black text-gray-900 mt-1">{employee.salary}</p>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                    <p className="text-xs text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full">Full Time</p>
                </div>
              </div>
            </div>

            {/* 4. Action Buttons */}
            <div className="flex flex-col gap-4 border-t pt-8">
              <button
                onClick={() => navigate('/photo', { state: employee })}
                className=" cursor-pointer w-full flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 font-bold text-xl active:scale-[0.98]"
              >
                <Camera className="w-7 h-7" />
                <span>Capture ID Photo</span>
              </button>
              
              <p className="text-center text-gray-400 text-sm">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}