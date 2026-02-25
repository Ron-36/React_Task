import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEmployees } from "../api/employeeApi";
import { AuthContext } from "../context/AuthContext";
import { LogOut, BarChart3, Search, Users, Map } from 'lucide-react';

export default function List() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchEmployees();
        const formattedData = data.map((item, index) => ({
          id: item[3] || index, 
          name: item[0],
          position: item[1],
          city: item[2], 
          startDate: item[4],
          salary: item[5],
        }));
        setEmployees(formattedData);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900"> Dashboard</h1>
            </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, position, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
            />
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/chart')}
              className="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm font-medium transition-all"
            >
              <BarChart3 className="w-5 h-5" />
              <span>View Chart</span>
            </button>
            <button
              onClick={() => navigate('/map')}
              className="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm font-medium transition-all"
            >
              <Map className="w-5 h-5" />
              <span>View Map</span>
            </button>
          </div>
        </div>

        {/* --- Table Container with Scrollbar --- */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Sticky Header */}
              <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                <tr>
                  {["Name", "Position", "City", "Employee ID", "Start Date", "Salary"].map((head) => (
                    <th key={head} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider bg-gray-50">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((emp, index) => (
                  <tr
                    key={index}
                    onClick={() => navigate("/details", { state: emp })}
                    className="hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emp.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{emp.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{emp.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{emp.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{emp.startDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{emp.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No employees found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
      </div>
    </div>
  );
}