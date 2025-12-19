import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TripList({ onTripSelect, refresh }) {
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);
  const [newMember, setNewMember] = useState({ name: '', contact: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    setTrips(savedTrips);
  }, [refresh]); 

  const deleteTrip = (tripId) => { 
    const updatedTrips = trips.filter(trip => trip.id !== tripId);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
    if (onTripSelect) onTripSelect(null);
  };

  const handleTripClick = (trip) => { 
    if (onTripSelect) {
      onTripSelect(trip);
    } 
    navigate('/summary');
  };

  const startEditing = (trip) => {
    setEditingTrip({...trip});
    setNewMember({ name: '', contact: '', email: '' });
  };

  const saveEditedTrip = () => {
    if (!editingTrip.name.trim() || !editingTrip.destination.trim()) {
      alert("Please fill in Trip Name and Destination");
      return;
    }

    const updatedTrips = trips.map(trip => 
      trip.id === editingTrip.id ? editingTrip : trip
    );
    
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
    setTrips(updatedTrips);
    setEditingTrip(null);
    alert("Trip updated successfully!");
  };

  const handleEditChange = (field, value) => {
    setEditingTrip(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedEditChange = (parent, field, value) => {
    setEditingTrip(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const addEditMember = () => {
    if (newMember.name.trim()) {
      setEditingTrip(prev => ({
        ...prev,
        members: [...prev.members, { ...newMember, id: Date.now() }]
      }));
      setNewMember({ name: '', contact: '', email: '' });
    }
  };

  const removeEditMember = (index) => {
    setEditingTrip(prev => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-transparent backdrop-blur-md shadow-md border border-gray-200 rounded-2xl p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Your Trips</h2>
      
      {trips.length === 0 ? (
        <p className="text-white italic text-center py-4">No trips added yet.</p>
      ) : (
        <div className="space-y-4">
          {trips.map(trip => (
            <div key={trip.id} className="border border-white rounded-lg p-4 transition-colors duration-200">
              {editingTrip && editingTrip.id === trip.id ? ( // agar editing trip ka id current trip ke id ke barabar hai toh edit mode dikhaye
                // Edit Mode - Compact
                <div className="space-y-3">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input type="text" value={editingTrip.name} onChange={(e) => handleEditChange('name', e.target.value)} className="border border-gray-300 text-white rounded-lg p-2" placeholder="Trip Name *" required />
                    <input type="text" value={editingTrip.boarding} onChange={(e) => handleEditChange('boarding', e.target.value)} className="border border-gray-300 text-white rounded-lg p-2" placeholder="Boarding" />
                  </div>
                  <input type="text" value={editingTrip.destination} onChange={(e) => handleEditChange('destination', e.target.value)} className="border border-gray-300 text-white rounded-lg p-2 w-full" placeholder="Destination *" required />
                  
                  {/* Dates with arrow */}
                  <div className="flex items-center gap-2">
                    <input type="date" value={editingTrip.startDate} onChange={(e) => handleEditChange('startDate', e.target.value)} className="border border-gray-300 text-white rounded-lg p-2 flex-1" />
                    <span className="text-white">→</span>
                    <input type="date" value={editingTrip.endDate} onChange={(e) => handleEditChange('endDate', e.target.value)} className="border border-gray-300 text-white rounded-lg p-2 flex-1" />
                  </div>

                  {/* Accommodation & Transport */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input type="text" value={editingTrip.accommodation?.hotel || ''} onChange={(e) => handleNestedEditChange('accommodation', 'hotel', e.target.value)} className="border border-gray-30 text-white rounded-lg p-2" placeholder="Hotel" />
                    <input type="text" value={editingTrip.accommodation?.address || ''} onChange={(e) => handleNestedEditChange('accommodation', 'address', e.target.value)} className="border border-gray-300 text-white rounded-lg p-2" placeholder="Address" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input type="text" value={editingTrip.transport?.mode || ''} onChange={(e) => handleNestedEditChange('transport', 'mode', e.target.value)} className="border border-gray-300 text-white rounded-lg p-2" placeholder="Transport Mode" />
                    <input type="text" value={editingTrip.transport?.details || ''} onChange={(e) => handleNestedEditChange('transport', 'details', e.target.value)} className="border border-gray-300 text-white rounded-lg p-2" placeholder="Transport Details" />
                  </div>

                  {/* Members Section */}
                  <div className="border-t pt-3">
                    <p className="font-semibold text-blue-600 mb-2">Trip Members:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                      <input type="text" placeholder="Name" value={newMember.name} onChange={(e) => setNewMember(prev => ({...prev, name: e.target.value}))} className="border border-gray-300 text-white rounded-lg p-2" />
                      <input type="text" placeholder="Contact" value={newMember.contact} onChange={(e) => setNewMember(prev => ({...prev, contact: e.target.value}))} className="border border-gray-300 text-white rounded-lg p-2" />
                      <input type="email" placeholder="Email" value={newMember.email} onChange={(e) => setNewMember(prev => ({...prev, email: e.target.value}))} className="border border-gray-300 text-white rounded-lg p-2" />
                    </div>
                    <button onClick={addEditMember} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 mb-3 w-full">Add Member</button>
                    
                    {editingTrip.members && editingTrip.members.map((member, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded mb-1">
                        <span className="text-sm">{member.name} - {member.contact}</span>
                        <button onClick={() => removeEditMember(index)} className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                      </div>
                    ))}
                  </div>

                  <button onClick={saveEditedTrip} className="cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 w-full font-semibold">Save Changes</button>
                </div>
              ) : (
                // View Mode - Compact
                <div className="flex justify-between items-start">
                  <div 
                    className="cursor-pointer flex-1" 
                    onClick={() => handleTripClick(trip)}
                  >
                    <h3 className="font-semibold text-lg text-white">{trip.name || 'Unnamed Trip'}</h3>
                    <p className="text-white">{trip.boarding && `${trip.boarding} → `}{trip.destination}</p>
                    <p className="text-sm text-white">{trip.startDate} {trip.endDate && `→ ${trip.endDate}`}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={(e) => { e.stopPropagation(); startEditing(trip); }} className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors duration-200 border border-blue-200">Edit</button>
                    <button onClick={(e) => { e.stopPropagation(); if (window.confirm('Delete this trip?')) deleteTrip(trip.id); }} className="text-red-600 hover:text-red-800 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors duration-200 border border-red-200">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}