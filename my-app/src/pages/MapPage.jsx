import { useEffect, useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEmployees } from "../api/employeeApi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// Added LogOut to the imports
import { ArrowLeft, Map as MapIcon, MapPin, Users, Globe, LogOut } from 'lucide-react';
import "leaflet/dist/leaflet.css";
import { AuthContext } from "../context/AuthContext";

// Helper for city coordinates
const cityCoordinates = {
    London: [51.5072, -0.1276],
    Tokyo: [35.6762, 139.6503],
    "New York": [40.7128, -74.006],
    Edinburgh: [55.9533, -3.1883],
    Singapore: [1.3521, 103.8198],
    "San Francisco": [37.7749, -122.4194],
    Sidney: [-33.8688, 151.2093],
};

const cityColors = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-purple-500 to-purple-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
];

export default function MapPage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetchEmployees();
                const formatted = res.map(item => ({
                    city: item[2],
                    name: item[0]
                }));
                setEmployees(formatted);
            } catch (err) {
                console.error("Error loading map data", err);
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

    const cityData = useMemo(() => {
        const cities = {};
        employees.forEach(emp => {
            cities[emp.city] = (cities[emp.city] || 0) + 1;
        });
        return Object.entries(cities)
            .map(([city, count]) => ({ 
                city, 
                count, 
                coords: cityCoordinates[city] 
            }))
            .sort((a, b) => b.count - a.count);
    }, [employees]);

    const maxCount = Math.max(...cityData.map(d => d.count), 0);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center font-medium text-green-600 animate-pulse">Initializing Map...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50">
            {/* --- Updated Navigation Bar with Logout --- */}
            <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Side: Back Navigation */}
                        <button
                            onClick={() => navigate('/list')}
                            className=" cursor-pointer flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to List</span>
                        </button>

                        {/* Right Side: Logout Button */}
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Globe className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Geographic Distribution</h1>
                            <p className="text-gray-600 mt-1">Real-time office locations and headcounts</p>
                        </div>
                    </div>

                    {/* Interactive Leaflet Map Section */}
                    <div className="rounded-xl overflow-hidden border-4 border-gray-100 shadow-inner mb-10 h-[450px] relative z-0">
                        <MapContainer
                            center={[20, 0]}
                            zoom={2}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                attribution='&copy; OpenStreetMap'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {cityData.filter(loc => loc.coords).map((loc, index) => (
                                <Marker key={index} position={loc.coords}>
                                    <Popup>
                                        <div className="text-center">
                                            <strong className="text-blue-600">{loc.city}</strong><br/>
                                            {loc.count} Employees
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                    {/* Distribution Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {cityData.map((data, index) => {
                            const percentage = (data.count / maxCount) * 100;
                            const colorClass = cityColors[index % cityColors.length];

                            return (
                                <div
                                    key={data.city}
                                    className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`bg-gradient-to-br ${colorClass} p-3 rounded-lg shadow-lg`}>
                                            <MapPin className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{data.city}</h3>
                                            <p className="text-xs text-gray-500 uppercase font-bold tracking-tight">Primary Hub</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Users className="w-4 h-4" />
                                                <span>Staff Count</span>
                                            </div>
                                            <span className="text-xl font-bold">{data.count}</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Summary Stats Footer */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col items-center">
                            <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-1">Total Cities</span>
                            <span className="text-3xl font-bold">{cityData.length}</span>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex flex-col items-center">
                            <span className="text-green-600 text-[10px] font-black uppercase tracking-widest mb-1">Top Location</span>
                            <span className="text-xl font-bold">{cityData[0]?.city}</span>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex flex-col items-center">
                            <span className="text-purple-600 text-[10px] font-black uppercase tracking-widest mb-1">Workforce</span>
                            <span className="text-3xl font-bold">{employees.length}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}