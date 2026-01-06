import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import ImageCRUD from './ImageCRUD';  // Now full designs CRUD

export default function AdminDashboard() {
  const [activeTab] = useState('designs');  // Single tab
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'images'));
      setDesigns(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Fetch designs error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="text-sm text-gray-500">Manage your Mehendi designs here</div>
        </div>

        {/* Single Tab: Manage Designs */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button className="py-4 px-6 w-full text-center font-medium transition-all duration-300 border-b-2 border-orange-500 text-orange-600 bg-orange-50">
              Manage Designs ({designs.length})
            </button>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[400px]">
            <ImageCRUD />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-500">Total Designs</h3>
            <p className="text-2xl font-bold text-orange-600">{designs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-500">Gallery Views</h3>
            <p className="text-2xl font-bold text-green-600">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-500">Recent Bookings</h3>
            <p className="text-2xl font-bold text-blue-600">$2,450</p>
          </div>
        </div>
      </div>
    </div>
  );
}