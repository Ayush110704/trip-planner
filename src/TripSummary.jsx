import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TripSummary({ selectedTrip }) {
  const navigate = useNavigate();

  if (!selectedTrip) {
    return (
      <div className="bg-transparent backdrop-blur-md shadow-md border border-gray-200 rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Trip Summary
        </h2>
        <p className="text-white italic text-center py-4">Select a trip to view details</p>
        <button
          onClick={() => navigate('/trips')}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 font-semibold transition-all duration-200 shadow-md hover:shadow-lg mx-auto block"
        >
          ← Back to Trips
        </button>
      </div>
    );
  }

  return (
    <div className="bg-transparent backdrop-blur-md shadow-md border border-gray-200 rounded-2xl p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-700">
          Trip Summary
        </h2>
        <button
          onClick={() => navigate('/trips')}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          ← Back to Trips
        </button>
      </div>

      <div className="space-y-3">
        <p><strong className="text-white">Name:</strong> <span className="text-white">{selectedTrip.name}</span></p>
        <p><strong className="text-white">Boarding:</strong> <span className="text-white">{selectedTrip.boarding || 'Not specified'}</span></p>
        <p><strong className="text-white">Destination:</strong> <span className="text-white">{selectedTrip.destination}</span></p>
        <p><strong className="text-white">Dates:</strong> <span className="text-white">{selectedTrip.startDate} → {selectedTrip.endDate}</span></p>
      </div>

      <h3 className="text-lg font-semibold mt-6 text-blue-700">
        Accommodation
      </h3>
      <div className="space-y-2 ml-4">
        <p><strong className="text-white">Hotel:</strong> <span className="text-white">{selectedTrip.accommodation?.hotel || 'Not specified'}</span></p>
        <p><strong className="text-white">Address:</strong> <span className="text-white">{selectedTrip.accommodation?.address || 'Not specified'}</span></p>
      </div>

      <h3 className="text-lg font-semibold mt-6 text-blue-700">
        Transport
      </h3>
      <div className="space-y-2 ml-4">
        <p><strong className="text-white">Mode:</strong> <span className="text-white">{selectedTrip.transport?.mode || 'Not specified'}</span></p>
        <p><strong className="text-white">Details:</strong> <span className="text-white">{selectedTrip.transport?.details || 'Not specified'}</span></p>
      </div>

      <h3 className="text-lg font-semibold mt-6 text-blue-700">
        Trip Members
      </h3>
      {selectedTrip.members.length === 0 ? (
        <p className="white italic ml-4">No members added</p>
      ) : (
        <ul className="list-disc list-inside space-y-1 ml-4">
          {selectedTrip.members.map((member, index) => (
            <li key={index} className="text-white">
              {member.name} — {member.contact} 
              {member.email && ` — ${member.email}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 