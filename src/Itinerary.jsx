import React, { useState, useEffect } from 'react'; 
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export default function Itinerary({ selectedTrip }) {
  const [activities, setActivities] = useState([]);
  const [day, setDay] = useState('');
  const [description, setDescription] = useState('');
  const [editingActivity, setEditingActivity] = useState(null);

  useEffect(() => {
    if (selectedTrip) {
      const savedActivities = JSON.parse(localStorage.getItem(`itinerary_${selectedTrip.id}`) || '[]');
      setActivities(savedActivities);
    } else {
      setActivities([]);
    }
    setEditingActivity(null);
  }, [selectedTrip]);

  const addActivity = () => {
    if (day.trim() && description.trim() && selectedTrip) {
      const newActivity = { day, description, id: Date.now() };
      const updatedActivities = [...activities, newActivity];
      setActivities(updatedActivities);
      localStorage.setItem(`itinerary_${selectedTrip.id}`, JSON.stringify(updatedActivities));
      setDay('');
      setDescription(''); 
      toast.success("Activity Added Successfully!");
    }
  };

  const deleteActivity = (activityId) => {
    const updatedActivities = activities.filter(activity => activity.id !== activityId);
    setActivities(updatedActivities);
    localStorage.setItem(`itinerary_${selectedTrip.id}`, JSON.stringify(updatedActivities)); 
    toast.success("Activity Deleted Successfully!");
  };

  const startEditing = (activity) => {
    setEditingActivity(activity);
    setDay(activity.day);
    setDescription(activity.description);
  };

  const saveEditedActivity = () => {
    if (day.trim() && description.trim() && selectedTrip && editingActivity) {
      const updatedActivities = activities.map(activity =>
        activity.id === editingActivity.id ? { ...activity, day, description } : activity
      );
      setActivities(updatedActivities);
      localStorage.setItem(`itinerary_${selectedTrip.id}`, JSON.stringify(updatedActivities));
      setEditingActivity(null);
      setDay('');
      setDescription(''); 
      toast.info("Activity Updated Successfully!");
    }
  };

  if (!selectedTrip) {
    return (
      <div className="bg-transparent backdrop-blur-md shadow-md border border-gray-200 rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Itinerary
        </h2>
        <p className="text-white italic text-center py-4">Select a trip to manage itinerary</p>
      </div>
    );
  }

  return ( 
    <>
      <div className="bg-transparent backdrop-blur-md shadow-md border border-gray-200 rounded-2xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Itinerary - {selectedTrip.name}
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input 
            type="text" 
            placeholder="Day"
            className="text-white border border-gray-300 rounded-lg p-3 sm:w-1/4 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Activity Description" 
            className="text-white border border-gray-300 rounded-lg p-3 flex-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button 
            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-3 font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={editingActivity ? saveEditedActivity : addActivity}
          >
            {editingActivity ? 'Save' : 'Add'}
          </button>
        </div>

        {activities.length === 0 ? (
          <p className="text-white italic text-center py-4">No activities added yet.</p>
        ) : (
          <ul className="space-y-2">
            {activities.map(activity => (
              <li key={activity.id} className="flex justify-between items-center py-2 px-3 bg-transparent rounded-lg border border-gray-200">
                <span className="text-white">
                  <strong>Day {activity.day}</strong> — {activity.description}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(activity)}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-50 transition-colors border border-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteActivity(activity.id)}
                    className="cursor-pointer text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors border border-red-200"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
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