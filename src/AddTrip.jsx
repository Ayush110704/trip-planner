import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function AddTrip({ onTripAdded }) {
  const [form, setForm] = useState({
    tripName: "", boarding: "", destination: "", startDate: "", endDate: "",
    hotel: "", address: "", transportMode: "", transportDetails: ""
  });
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState({ name: "", contact: "", email: "" });
  const navigate = useNavigate();

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value })); // pahale data copy kr ta hai fir field ko check kr k value update kr return kr ta hai 
  };

  const updateMember = (field, value) => {
    setMember(prev => ({ ...prev, [field]: value }));
  };

  const addMember = () => {
    if (member.name.trim()) {  // new member ko add kr ta hai agar khali hai to uniq id k sath
      setMembers(prev => [...prev, { ...member, id: Date.now() }]);
      setMember({ name: "", contact: "", email: "" }); 
      toast.success("Member Added Successfully!");
    }
  };

  const removeMember = (index) => {
    setMembers(prev => prev.filter((_, i) => i !== index));  // wo element hatao jiska index remove karne wale index ke barabar hai
    toast.success("Member Removed Successfully!");
  };

  const saveTrip = (e) => {
    e.preventDefault();

    if (!form.tripName.trim() || !form.destination.trim()) { 
      toast.error("Please fill in Trip Name and Destination");
      return;
    }

    const trips = JSON.parse(localStorage.getItem("trips") || "[]");  // taki purane data PE overwrite na ho jaye
    const newTrip = {
      id: Date.now(),
      name: form.tripName,
      boarding: form.boarding,
      destination: form.destination,
      startDate: form.startDate,
      endDate: form.endDate,
      accommodation: { hotel: form.hotel, address: form.address },
      transport: { mode: form.transportMode, details: form.transportDetails },
      members,
      createdAt: new Date().toISOString(),
    };
 
    trips.push(newTrip);  // new trip ko array me add kr ta hai  fir save kr ta hai localstorage me as json
    localStorage.setItem("trips", JSON.stringify(trips));

    // Reset form and navigate
    setForm({
      tripName: "", boarding: "", destination: "", startDate: "", endDate: "",
      hotel: "", address: "", transportMode: "", transportDetails: ""
    });
    setMembers([]);
    setMember({ name: "", contact: "", email: "" });

    if (onTripAdded) onTripAdded();
    
    toast.success("Trip Saved Successfully!");
    setTimeout(() => {
      navigate("/trips");
    }, 2000);
  };

  return ( 
    <>
      <div className="min-h-screen bg-transparent backdrop-blur-md from-blue-50 to-blue-100 flex items-center justify-center py-10 px-4">
        <form className="bg-transparent backdrop-blur-md shadow-xl p-8 border border-gray-200 rounded-2xl max-w-2xl w-full" onSubmit={saveTrip}>
          <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">✈️ Add New Trip</h2>

          {/* Trip Info */}
          <input type="text" placeholder="Trip Name *" className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
            value={form.tripName} onChange={(e) => updateForm('tripName', e.target.value)}  />
          <input type="text" placeholder="Boarding" className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
            value={form.boarding} onChange={(e) => updateForm('boarding', e.target.value)} />
          <input type="text" placeholder="Destination *" className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
            value={form.destination} onChange={(e) => updateForm('destination', e.target.value)} />

          <div className="flex gap-3 mb-3">
            <input type="date" className="border border-gray-300 rounded-lg p-3 w-1/2 focus:ring-2 focus:ring-blue-500"
              value={form.startDate} onChange={(e) => updateForm('startDate', e.target.value)} />
            <span className="text-white mt-3">→</span>
            <input type="date" className="border border-gray-300 rounded-lg p-3 w-1/2 focus:ring-2 focus:ring-blue-500"
              value={form.endDate} onChange={(e) => updateForm('endDate', e.target.value)} />
          </div>

          {/* Accommodation */}
          <h3 className="text-lg font-semibold mt-6 mb-2 text-blue-700">🏨 Accommodation</h3>
          <input type="text" placeholder="Hotel / Stay Name" className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
            value={form.hotel} onChange={(e) => updateForm('hotel', e.target.value)} />
          <input type="text" placeholder="Address / Location" className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
            value={form.address} onChange={(e) => updateForm('address', e.target.value)} />

          {/* Transport */}
          <h3 className="text-lg font-semibold mt-6 mb-2 text-blue-700">🚗 Transport</h3>
          <input type="text" placeholder="Mode of Transport (e.g., Flight, Train)" className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
            value={form.transportMode} onChange={(e) => updateForm('transportMode', e.target.value)} />
          <input type="text" placeholder="Transport Details (e.g., Flight No., Bus Name)" className="border border-gray-300 rounded-lg p-3 w-full mb-3 focus:ring-2 focus:ring-blue-500"
            value={form.transportDetails} onChange={(e) => updateForm('transportDetails', e.target.value)} />

          {/* Members */}
          <h3 className="text-lg font-semibold mt-6 mb-2 text-blue-700">👥 Trip Members</h3>
          <div className="bg-transparent backdrop-blur-md border border-gray-200 p-5 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <input type="text" placeholder="Member Name" className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
                value={member.name} onChange={(e) => updateMember('name', e.target.value)} />
              <input type="text" placeholder="Contact Number" className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
                value={member.contact} onChange={(e) => updateMember('contact', e.target.value)} />
              <input type="email" placeholder="Email (optional)" className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
                value={member.email} onChange={(e) => updateMember('email', e.target.value)} />
            </div>

            <button type="button" className="cursor-pointer bg-transparent border-blue-500 border-2 hover:bg-blue-700 text-white rounded-full p-3 mt-6 w-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-xl"
              onClick={addMember}>
              Add Member
            </button>

            {members.length > 0 && (
              <div className="space-y-2">
                {members.map((member, index) => (
                  <div key={index} className="mt-5 flex justify-between items-center bg-transparent p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <span className="font-medium text-white">{member.name} - {member.contact}</span>
                    <button type="button" className="cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-100 p-1 rounded transition-colors"
                      onClick={() => removeMember(index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save Button */}
          <button type="submit" className="cursor-pointer bg-transparent border-blue-500 border-2 hover:bg-blue-700 text-white rounded-full p-3 mt-6 w-full font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-xl">
            Save Trip
          </button>
        </form>
      </div>
       
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        transition={Slide}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={false} 
        rtl={false}
        pauseOnFocusLoss
        draggable 
      /> 
    </> 
  );
}