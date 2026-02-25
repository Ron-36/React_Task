import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEmployees } from "../api/employeeApi";
// Added LogOut to imports
import { ArrowLeft, BarChart3, TrendingUp, LogOut } from 'lucide-react';
import { AuthContext } from "../context/AuthContext";

export default function BarChartPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchEmployees();
        // Format the first 10 employees
        const formatted = res.slice(0, 10).map((item) => ({
          name: item[0],
          position: item[1],
          salaryStr: item[5],
          salaryValue: parseInt(item[5].replace(/[$,]/g, "")),
        }));
        setEmployees(formatted);
      } catch (err) {
        console.error("Failed to load chart data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Logout Handler
   const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Calculate stats for the summary footer
  const salaries = employees.map(e => e.salaryValue);
  const maxSalary = Math.max(...(salaries.length ? salaries : [0]));
  const avgSalary = salaries.length 
    ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length) 
    : 0;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center font-medium text-gray-500 animate-pulse">Loading Analysis...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* --- Updated Navigation Header --- */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side: Back button */}
            <button
              onClick={() => navigate('/list')}
              className=" cursor-pointer flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to List</span>
            </button>

            {/* Right side: Logout button */}
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

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-white">
          
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-blue-100 p-4 rounded-xl">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Salary Analysis</h1>
              <p className="text-gray-600 font-medium">Distribution of Top 10 Employees</p>
            </div>
          </div>

          {/* Custom CSS Bar Chart */}
          <div className="space-y-8">
            {employees.map((emp, index) => {
              const percentage = (emp.salaryValue / maxSalary) * 100;

              return (
                <div key={index} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {emp.name}
                      </p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                        {emp.position}
                      </p>
                    </div>
                    <p className="text-lg font-mono font-bold text-emerald-600">
                      {emp.salaryStr}
                    </p>
                  </div>
                  
                  {/* Bar Container */}
                  <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-4 shadow-lg"
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 15 && (
                        <span className="text-white text-[10px] font-black tracking-tighter">
                          {Math.round(percentage)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Summary Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-center shadow-sm">
              <p className="text-xs text-blue-600 font-black uppercase tracking-widest mb-2">Highest</p>
              <p className="text-2xl font-black text-gray-900">{employees[0]?.salaryStr}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center shadow-sm">
              <p className="text-xs text-emerald-600 font-black uppercase tracking-widest mb-2">Average</p>
              <p className="text-2xl font-black text-gray-900">${avgSalary.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl text-center shadow-sm">
              <p className="text-xs text-gray-500 font-black uppercase tracking-widest mb-2">Lowest (Top 10)</p>
              <p className="text-2xl font-black text-gray-900">{employees[employees.length - 1]?.salaryStr}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}