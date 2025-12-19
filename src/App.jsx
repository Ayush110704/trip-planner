import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Navbar';
import AddTrip from './AddTrip';
import TripList from './TripList';
import TripSummary from './TripSummary';
import Itinerary from './Itinerary'; 
import bg1 from './assets/bg1.jpg';

function App() {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [refreshTrips, setRefreshTrips] = useState(false);

  const handleTripAdded = () => {   // ye jab call hoga jab new trip add hogi (true ko fasle kar de ga ya false ko true kar de ga)
    setRefreshTrips(prev => !prev);  // state ko toggle kar ta hai isse triplist ko pata chal ta hai data refresh karna hai
  };

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center py-10 px-4"
      style={{
        backgroundImage: `url(${bg1})`,
      }}
    >
      <div>
        <div className="container mx-auto px-1 py-8 max-w-6xl">
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/add-trip" replace />} />
            <Route
              path="/add-trip"
              element={<AddTrip onTripAdded={handleTripAdded} />} // ontripadded prop me handletripadded paas ki bcz new trip add hone pe parent ko notify kar ta hai aur uske baad triplist refresh kar sakta hai
            />
            <Route
              path="/trips"
              element={
                <TripList
                  onTripSelect={handleTripSelect}
                  refresh={refreshTrips}
                />
              }
            />
            <Route
              path="/summary"
              element={<TripSummary selectedTrip={selectedTrip} />}  // selected trip ka data use kr ne k liye
            />
            <Route
              path="/itinerary"
              element={<Itinerary selectedTrip={selectedTrip} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;