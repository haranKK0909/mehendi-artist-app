import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import ImageCRUD from './ImageCRUD';  // Designs tab

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('designs');  // 'designs' or 'bookings'
  const [designs, setDesigns] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);  // For view modal

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch designs if on designs tab
      if (activeTab === 'designs') {
        const querySnapshot = await getDocs(collection(db, 'images'));
        setDesigns(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
      
      // Fetch bookings, ordered by createdAt desc
      const bookingQuery = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const bookingSnapshot = await getDocs(bookingQuery);
      setBookings(bookingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!confirm('Delete this booking?')) return;
    try {
      await deleteDoc(doc(db, 'bookings', id));
      fetchData();
      alert('Booking deleted!');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete booking.');
    }
  };

  const handleCompleteBooking = async (id) => {
    if (!confirm('Mark this booking as completed?')) return;
    try {
      await updateDoc(doc(db, 'bookings', id), { status: 'completed' });
      fetchData();
      alert('Booking marked as completed!');
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update booking.');
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
  };

  // Compute total revenue from bookings (assuming price is numeric)
  const totalRevenue = bookings.reduce((sum, booking) => {
    const price = parseFloat(booking.designPrice?.replace('$', '') || 0);
    return sum + price;
  }, 0);

  if (loading) {
    return <div className="text-center py-8"><p className="text-gray-500">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="text-sm text-gray-500">Manage designs and bookings</div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('designs')}
              className={`py-4 px-6 flex-1 text-center font-medium transition-all duration-300 ${
                activeTab === 'designs'
                  ? 'border-b-2 border-orange-500 text-orange-600 bg-orange-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Manage Designs ({designs.length})
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-6 flex-1 text-center font-medium transition-all duration-300 ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-orange-500 text-orange-600 bg-orange-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              Bookings ({bookings.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 min-h-[400px]">
            {activeTab === 'designs' ? (
              <ImageCRUD />
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Design</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Day</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.designTitle}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.designPrice}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.contactNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.email || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{booking.address}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.availableTime}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.date} ({booking.day})</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                              booking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status || 'pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button onClick={() => handleViewBooking(booking)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">View</button>
                            {booking.status !== 'completed' && (
                              <button onClick={() => handleCompleteBooking(booking.id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors">Complete</button>
                            )}
                            <button onClick={() => handleDeleteBooking(booking.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors">Delete</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
                          No bookings yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* View Booking Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Booking Details</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {selectedBooking.name}</p>
                <p><strong>Design:</strong> {selectedBooking.designTitle}</p>
                <p><strong>Price:</strong> {selectedBooking.designPrice}</p>
                <p><strong>Contact:</strong> {selectedBooking.contactNumber}</p>
                <p><strong>Email:</strong> {selectedBooking.email || 'N/A'}</p>
                <p><strong>Address:</strong> {selectedBooking.address}</p>
                <p><strong>Time:</strong> {selectedBooking.availableTime}</p>
                <p><strong>Date:</strong> {selectedBooking.date} ({selectedBooking.day})</p>
                <p><strong>Status:</strong> <span className={`px-2 py-1 text-xs rounded-full ${
                  selectedBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                  selectedBooking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  selectedBooking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>{selectedBooking.status || 'pending'}</span></p>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setSelectedBooking(null)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-400 transition-colors">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-500">Total Designs</h3>
            <p className="text-2xl font-bold text-orange-600">{designs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
            <p className="text-2xl font-bold text-orange-600">{bookings.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold text-blue-600">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}