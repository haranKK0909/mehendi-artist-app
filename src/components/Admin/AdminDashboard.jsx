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

  // Compute total revenue from bookings (improved parsing for numbers/strings)
  const parsePrice = (p) => typeof p === 'number' ? p : parseFloat((p || '').replace(/[^\d.]/g, '') || 0);
  const totalRevenue = bookings.reduce((sum, booking) => sum + parsePrice(booking.designPrice), 0);

  // Service type mapping (based on Gallery.jsx services; derive from designTitle or add 'serviceType' field)
  const getServiceType = (designTitle, serviceType) => {
    // Prefer explicit serviceType field if available (e.g., from design or booking)
    if (serviceType) return serviceType;
    
    // Fallback to inferring from designTitle
    if (designTitle.toLowerCase().includes('bridal')) return 'Bridal Mehendi';
    if (designTitle.toLowerCase().includes('festive')) return 'Festive Mehendi';
    if (designTitle.toLowerCase().includes('arabic')) return 'Arabic Style';
    if (designTitle.toLowerCase().includes('traditional') || designTitle.toLowerCase().includes('indian')) return 'Traditional Indian';
    if (designTitle.toLowerCase().includes('kids')) return 'Kids Mehendi';
    if (designTitle.toLowerCase().includes('custom')) return 'Custom Designs';
    return 'General';
  };

  if (loading) {
    return <div className="text-center py-8"><p className="text-gray-500">Loading...</p></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in-down">
          <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
            Admin Dashboard
          </h1>
          <div className="text-sm text-gray-600 opacity-0 animate-fade-in-up delay-500">Manage designs and bookings</div>
        </div>

        {/* Tabs - Styled like Home.jsx services */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden animate-staggered-fade-in" style={{ animationDelay: '0ms' }}>
          <div className="flex border-b border-amber-200">
            <button
              onClick={() => setActiveTab('designs')}
              className={`py-4 px-6 flex-1 text-center font-semibold transition-all duration-300 ${
                activeTab === 'designs'
                  ? 'border-b-2 border-orange-500 text-orange-600 bg-gradient-to-r from-amber-50 to-orange-50'
                  : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
              }`}
              aria-label="Manage Designs tab" // Added for accessibility
            >
              Manage Designs ({designs.length})
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-6 flex-1 text-center font-semibold transition-all duration-300 ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-orange-500 text-orange-600 bg-gradient-to-r from-amber-50 to-orange-50'
                  : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
              }`}
              aria-label="Bookings tab" // Added for accessibility
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
                <table className="min-w-full divide-y divide-amber-100">
                  <thead className="bg-gradient-to-r from-amber-50 to-orange-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Service Type</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Design</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date/Day</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-amber-100">
                    {bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 font-medium">
                              {getServiceType(booking.designTitle, booking.serviceType)} {/* Updated to use explicit serviceType if available */}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.designTitle}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-600">₹{booking.designPrice}</td>
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
                            } font-medium`}>
                              {booking.status || 'pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button 
                              onClick={() => handleViewBooking(booking)} 
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
                              aria-label="View booking details" // Added for accessibility
                            >
                              View
                            </button>
                            {booking.status !== 'completed' && (
                              <button 
                                onClick={() => handleCompleteBooking(booking.id)} 
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                                aria-label="Mark booking as completed" // Added for accessibility
                              >
                                Complete
                              </button>
                            )}
                            <button 
                              onClick={() => handleDeleteBooking(booking.id)} 
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                              aria-label="Delete booking" // Added for accessibility
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={11} className="px-6 py-8 text-center text-gray-500">
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

        {/* View Booking Modal - Styled like Home.jsx */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto animate-scale-in">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Booking Details</h3>
              <div className="space-y-3 text-sm bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl">
                <p><strong className="text-gray-900">Name:</strong> <span className="text-gray-700">{selectedBooking.name}</span></p>
                <p><strong className="text-gray-900">Service Type:</strong> <span className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 font-medium">{getServiceType(selectedBooking.designTitle, selectedBooking.serviceType)}</span></p> {/* Updated to use explicit serviceType if available */}
                <p><strong className="text-gray-900">Design:</strong> <span className="text-gray-700">{selectedBooking.designTitle}</span></p>
                <p><strong className="text-gray-900">Price:</strong> <span className="text-orange-600 font-bold">₹{selectedBooking.designPrice}</span></p>
                <p><strong className="text-gray-900">Contact:</strong> <span className="text-gray-700">{selectedBooking.contactNumber}</span></p>
                <p><strong className="text-gray-900">Email:</strong> <span className="text-gray-500">{selectedBooking.email || 'N/A'}</span></p>
                <p><strong className="text-gray-900">Address:</strong> <span className="text-gray-700">{selectedBooking.address}</span></p>
                <p><strong className="text-gray-900">Time:</strong> <span className="text-gray-700">{selectedBooking.availableTime}</span></p>
                <p><strong className="text-gray-900">Date:</strong> <span className="text-gray-700">{selectedBooking.date} ({selectedBooking.day})</span></p>
                <p><strong className="text-gray-900">Status:</strong> <span className={`px-2 py-1 text-xs rounded-full ${
                  selectedBooking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                  selectedBooking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  selectedBooking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                  'bg-gray-100 text-gray-800'
                } font-medium`}>{selectedBooking.status || 'pending'}</span></p>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => setSelectedBooking(null)} 
                  className="flex-1 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 py-2 rounded-xl font-semibold hover:from-gray-400 hover:to-gray-500 transition-all duration-300 transform hover:scale-105"
                  aria-label="Close modal" // Added for accessibility
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats - Styled like Home.jsx services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-staggered-fade-in" style={{ animationDelay: '0ms' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Total Designs</h3>
            <p className="text-2xl font-bold text-orange-600">{designs.length}</p>
          </div>
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-staggered-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Total Bookings</h3>
            <p className="text-2xl font-bold text-orange-600">{bookings.length}</p>
          </div>
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-staggered-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0c1.11 0 2.08.402 2.599 1M12 16v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Total Revenue</h3>
            <p className="text-2xl font-bold text-orange-600">₹{totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}