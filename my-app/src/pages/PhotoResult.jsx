import { useLocation, useNavigate } from "react-router-dom";
// Added LogOut to imports
import { ArrowLeft, RefreshCw, CheckCircle, User, Briefcase, MapPin, Calendar, CreditCard, LogOut } from 'lucide-react';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PhotoResult() {
  const location = useLocation();
  const navigate = useNavigate();
   const { logout } = useContext(AuthContext);
  const data = location.state;

  // Logout Handler
   const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full border border-gray-100">
          <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-orange-500 animate-spin-slow" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Expired</h2>
          <p className="text-gray-500 mb-6">We couldn't find the captured photo data. Please try again.</p>
          <button 
            onClick={() => navigate("/list")}
            className="cursor-pointer w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { employee, photo } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      {/* --- Updated Navigation with Logout --- */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/list')}
              className="cursor-pointer flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to List</span>
            </button>

            {/* Right Side: Logout Button */}
            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-8 py-10 text-white flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-200" />
                <span className="text-emerald-100 uppercase tracking-widest text-xs font-bold">Verification Success</span>
              </div>
              <h1 className="text-3xl font-black">Photo Verification</h1>
            </div>
            <div className="hidden sm:block">
               <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                  <CreditCard className="w-8 h-8 text-white" />
               </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-10">
              
              {/* Left: Photo Frame */}
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <p className="text-sm font-bold text-gray-400 uppercase mb-3 tracking-widest">Captured Identity</p>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative bg-white p-2 rounded-2xl border shadow-sm">
                    <img
                      src={photo}
                      alt="Captured"
                      className="w-72 h-80 object-cover rounded-xl border border-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Employee Summary Cards */}
              <div className="flex-1 space-y-4">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Employee Profile</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3 text-gray-500 mb-1">
                      <User className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Full Name</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{employee.name}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3 text-gray-500 mb-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Position</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{employee.position}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3 text-gray-500 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Work Location</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{employee.city}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3 text-gray-500 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase">Joined Date</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{employee.startDate}</p>
                  </div>
                </div>

                {/* ID Badge Footer */}
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Employee ID</p>
                    <p className="text-xl font-mono font-bold text-blue-900">{employee.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Verification Status</p>
                    <p className="text-sm font-bold text-emerald-600">PASSED</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/photo", { state: employee })}
                className="cursor-pointer flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all font-bold shadow-sm"
              >
                <RefreshCw className="w-5 h-5 text-gray-400" />
                Retake Photo
              </button>

              <button
                onClick={() => navigate("/list")}
                className="cursor-pointer flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all font-bold shadow-lg shadow-emerald-200"
              >
                <CheckCircle className="w-5 h-5" />
                Save & Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}