import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  CheckCircle,
  Clock,
  MapPin,
  RefreshCcw,
  User,
  Plane,
} from 'lucide-react';

const mockData = {
  initial: [
    { name: 'Trip 1', duration: 15, distance: 3.2, mode: 'Car' },
    { name: 'Trip 2', duration: 25, distance: 5.8, mode: 'Bus' },
    { name: 'Trip 3', duration: 10, distance: 1.5, mode: 'Walk' },
    { name: 'Trip 4', duration: 40, distance: 8.5, mode: 'Train' },
    { name: 'Trip 5', duration: 20, distance: 4.0, mode: 'Car' },
  ],
  postTrip: [
    { name: 'Trip 1', duration: 15, distance: 3.2, mode: 'Car' },
    { name: 'Trip 2', duration: 25, distance: 5.8, mode: 'Bus' },
    { name: 'Trip 3', duration: 10, distance: 1.5, mode: 'Walk' },
    { name: 'Trip 4', duration: 40, distance: 8.5, mode: 'Train' },
    { name: 'Trip 5', duration: 20, distance: 4.0, mode: 'Car' },
    { name: 'Trip 6', duration: 30, distance: 6.5, mode: 'Car' }, // New trip added after citizen uses the app
  ],
};

const App = () => {
  const [data, setData] = useState(mockData.initial);
  const [isTripActive, setIsTripActive] = useState(false);
  const [tripStartedAt, setTripStartedAt] = useState(null);
  const [tripSummary, setTripSummary] = useState(null);

  const handleRefreshData = () => {
    setData(mockData.postTrip);
  };

  const handleStartTrip = () => {
    setIsTripActive(true);
    setTripStartedAt(new Date());
    setTripSummary(null);
  };

  const handleEndTrip = () => {
    setIsTripActive(false);
    const endTime = new Date();
    const durationInMinutes = Math.floor((endTime - tripStartedAt) / (1000 * 60));
    const randomDistance = (Math.random() * 10).toFixed(1);
    const newTrip = {
      name: `Trip ${mockData.initial.length + 1}`,
      duration: durationInMinutes,
      distance: parseFloat(randomDistance),
      mode: 'Car',
    };
    setTripSummary(newTrip);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 font-sans antialiased text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Citizen App View */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center">
          <div className="flex items-center space-x-2 text-indigo-600 mb-4">
            <User size={32} />
            <h1 className="text-2xl font-bold">Citizen App</h1>
          </div>
          <p className="text-gray-500 mb-6">Track your trips and contribute to smarter city planning.</p>

          <div className="w-full flex justify-center space-x-4 mb-8">
            <button
              onClick={handleStartTrip}
              disabled={isTripActive}
              className={`flex-1 transition-transform transform hover:scale-105 rounded-xl px-6 py-3 font-semibold text-lg shadow-md ${
                isTripActive
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <Plane className="inline-block mr-2" /> Start Trip
            </button>
            <button
              onClick={handleEndTrip}
              disabled={!isTripActive}
              className={`flex-1 transition-transform transform hover:scale-105 rounded-xl px-6 py-3 font-semibold text-lg shadow-md ${
                !isTripActive
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <CheckCircle className="inline-block mr-2" /> End Trip
            </button>
          </div>

          <div className="w-full text-left">
            {isTripActive && (
              <div className="bg-yellow-50 text-yellow-700 border-l-4 border-yellow-400 p-4 rounded-lg shadow-inner">
                <div className="flex items-center space-x-2">
                  <Clock className="animate-pulse" size={20} />
                  <p className="font-semibold">Trip in progress...</p>
                </div>
                <p className="text-sm mt-2">Started at: {tripStartedAt.toLocaleTimeString()}</p>
              </div>
            )}
            {tripSummary && (
              <div className="bg-green-50 text-green-700 border-l-4 border-green-400 p-4 rounded-lg shadow-inner">
                <p className="font-semibold">Trip Summary</p>
                <p className="text-sm mt-2">
                  <Clock className="inline-block mr-1" size={16} /> Duration: {tripSummary.duration} mins
                </p>
                <p className="text-sm">
                  <MapPin className="inline-block mr-1" size={16} /> Distance: {tripSummary.distance} km
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Planner Dashboard View (Person 2's main task - basic view for demo) */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="flex items-center space-x-2 text-teal-600 mb-4">
            <User size={32} />
            <h1 className="text-2xl font-bold">Planner Dashboard</h1>
          </div>
          <p className="text-gray-500 mb-6">Live view of trip data and urban mobility.</p>

          <div className="mb-8">
            <button
              onClick={handleRefreshData}
              className="w-full flex items-center justify-center transition-transform transform hover:scale-105 bg-teal-600 text-white rounded-xl px-6 py-3 font-semibold text-lg shadow-md hover:bg-teal-700"
            >
              <RefreshCcw className="inline-block mr-2" /> Refresh Data
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Ridership Chart */}
            <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-teal-700">Ridership Trends</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="duration" fill="#2d9a91" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Simulated Map View with Heatmap (mocked) */}
            <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-teal-700">Trip Density (Heatmap)</h3>
              <div
                className="w-full h-48 rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 relative overflow-hidden"
              >
                {/* Visualizing "hot spots" with a simple gradient for the demo */}
                <div
                  className="absolute inset-0 z-10 opacity-70"
                  style={{
                    background:
                      'radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 40%), ' +
                      'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 40%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
