import { useRef, useState,useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, ShieldCheck, Video, VideoOff, Aperture, User, LogOut } from 'lucide-react';
import { AuthContext } from "../context/AuthContext";

export default function PhotoPage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const employee = location.state;
  const [isCameraOn, setIsCameraOn] = useState(false);
  const { logout } = useContext(AuthContext);

  // Logout Logic
  const handleLogout = () => {
     logout();
    navigate("/");
  };

  

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-sm">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Data Found</h2>
          <button 
            onClick={() => navigate("/list")}
            className="cursor-pointer mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsCameraOn(true);
    } catch (error) {
      alert(error.message || "Unable to access camera");
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0);
    const imageData = canvas.toDataURL("image/png");

    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());

    navigate("/photo-result", {
      state: { employee, photo: imageData },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      {/* --- Updated Navbar with Logout --- */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side: Back Navigation */}
            <button
              onClick={() => navigate('/list')}
              className="cursor-pointer flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to List</span>
            </button>

            {/* Right Side: Your Logout Button */}
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black mb-1 italic tracking-tight text-white">CAMERA TERMINAL</h1>
                <p className="text-blue-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Identity Capture for {employee.name}
                </p>
              </div>
              <div className={`p-3 rounded-full ${isCameraOn ? 'bg-green-400 animate-pulse' : 'bg-white/20'}`}>
                <Video className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-col items-center">
              
              {/* Viewfinder */}
              <div className="relative w-full max-w-md aspect-[4/3] bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-50 mb-8">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className={`w-full h-full object-cover ${!isCameraOn ? 'hidden' : 'block'}`}
                />
                
                {!isCameraOn && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                    <VideoOff className="w-12 h-12 mb-2 opacity-20" />
                    <p className="text-sm font-medium">Camera Offline</p>
                  </div>
                )}
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>

              {/* Controls */}
              <div className="w-full max-w-sm flex flex-col gap-4">
                {!isCameraOn ? (
                  <button
                    onClick={startCamera}
                    className=" cursor-pointer w-full flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg font-bold text-lg"
                  >
                    <Video className="w-6 h-6" />
                    Initialize Camera
                  </button>
                ) : (
                  <button
                    onClick={capturePhoto}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all shadow-lg font-bold text-lg"
                  >
                    <Aperture className="w-6 h-6" />
                    Capture Snapshot
                  </button>
                )}

                <button
                  onClick={() => navigate("/details", { state: employee })}
                  className="cursor-pointer w-full flex items-center justify-center gap-3 px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all font-bold"
                >
                  Return to Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}