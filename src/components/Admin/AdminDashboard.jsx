import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import ImageCRUD from './ImageCRUD';  // Designs tab

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('designs'); // 'designs', 'bookings', 'inquiries'
  const [designs, setDesigns] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]); // New: contact form submissions
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null); // New: view inquiry modal

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Designs
      if (activeTab === 'designs') {
        const designsSnapshot = await getDocs(collection(db, 'images'));
        setDesigns(designsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }

      // Bookings
      if (activeTab === 'bookings' || activeTab === 'designs') { // fetch always for stats
        const bookingQuery = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
        const bookingSnapshot = await getDocs(bookingQuery);
        setBookings(bookingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }

      // Inquiries (contact form submissions)
      if (activeTab === 'inquiries' || activeTab === 'designs') { // fetch always for stats
        const inquiryQuery = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
        const inquirySnapshot = await getDocs(inquiryQuery);
        setInquiries(inquirySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete booking
  const handleDeleteBooking = async (id) => {
    if (!confirm('Delete this booking?')) return;
    try {
      await deleteDoc(doc(db, 'bookings', id));
      fetchData();
      alert('Booking deleted!');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete.');
    }
  };

  // Mark booking complete
  const handleCompleteBooking = async (id) => {
    if (!confirm('Mark as completed?')) return;
    try {
      await updateDoc(doc(db, 'bookings', id), { status: 'completed' });
      fetchData();
      alert('Marked as completed!');
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update.');
    }
  };

  // Delete inquiry
  const handleDeleteInquiry = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
      fetchData();
      alert('Inquiry deleted!');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete.');
    }
  };

  // Mark inquiry as read
  const handleMarkRead = async (id) => {
    try {
      await updateDoc(doc(db, 'inquiries', id), { read: true });
      fetchData();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleViewBooking = (booking) => setSelectedBooking(booking);
  const handleViewInquiry = (inquiry) => setSelectedInquiry(inquiry);

  // Revenue calculation
  const parsePrice = (p) => typeof p === 'number' ? p : parseFloat((p || '').replace(/[^\d.]/g, '') || 0);
  const totalRevenue = bookings.reduce((sum, b) => sum + parsePrice(b.designPrice), 0);

  // Service type helper
  const getServiceType = (title, type) => {
    if (type) return type;
    if (title?.toLowerCase().includes('bridal')) return 'Bridal Mehendi';
    if (title?.toLowerCase().includes('festive')) return 'Festive Mehendi';
    if (title?.toLowerCase().includes('arabic')) return 'Arabic Style';
    if (title?.toLowerCase().includes('traditional') || title?.toLowerCase().includes('indian')) return 'Traditional Indian';
    if (title?.toLowerCase().includes('kids')) return 'Kids Mehendi';
    if (title?.toLowerCase().includes('custom')) return 'Custom Designs';
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
          <div className="text-sm text-gray-600 opacity-0 animate-fade-in-up delay-500">Manage everything</div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden animate-staggered-fade-in" style={{ animationDelay: '0ms' }}>
          <div className="flex border-b border-amber-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('designs')}
              className={`py-4 px-6 flex-1 text-center font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === 'designs'
                  ? 'border-b-2 border-orange-500 text-orange-600 bg-gradient-to-r from-amber-50 to-orange-50'
                  : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
              }`}
            >
              Designs ({designs.length})
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-6 flex-1 text-center font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-orange-500 text-orange-600 bg-gradient-to-r from-amber-50 to-orange-50'
                  : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
              }`}
            >
              Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`py-4 px-6 flex-1 text-center font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === 'inquiries'
                  ? 'border-b-2 border-orange-500 text-orange-600 bg-gradient-to-r from-amber-50 to-orange-50'
                  : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
              }`}
            >
              Inquiries ({inquiries.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 min-h-[400px]">
            {activeTab === 'designs' ? (
              <ImageCRUD />
            ) : activeTab === 'bookings' ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-amber-100">
                  <thead className="bg-gradient-to-r from-amber-50 to-orange-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Design</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-amber-100">
                    {bookings.length > 0 ? bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{b.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800">
                            {getServiceType(b.designTitle, b.serviceType)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{b.designTitle}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-orange-600">₹{b.designPrice}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{b.contactNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            b.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            b.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {b.status || 'pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                          <button onClick={() => handleViewBooking(b)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">View</button>
                          {b.status !== 'completed' && (
                            <button onClick={() => handleCompleteBooking(b.id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Complete</button>
                          )}
                          <button onClick={() => handleDeleteBooking(b.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={7} className="py-8 text-center text-gray-500">No bookings yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              // Inquiries Tab
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-amber-100">
                  <thead className="bg-gradient-to-r from-amber-50 to-orange-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-amber-100">
                    {inquiries.length > 0 ? inquiries.map((inq) => (
                      <tr key={inq.id} className={`hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 ${!inq.read ? 'bg-yellow-50/30' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{inq.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{inq.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{inq.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{inq.service || 'General'}</td>
                        <td className="px-6 py-4 text-sm max-w-xs truncate">{inq.message}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {inq.createdAt ? new Date(inq.createdAt.toDate()).toLocaleString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                          <button onClick={() => handleViewInquiry(inq)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">View</button>
                          {!inq.read && (
                            <button onClick={() => handleMarkRead(inq.id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Mark Read</button>
                          )}
                          <button onClick={() => handleDeleteInquiry(inq.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan={7} className="py-8 text-center text-gray-500">No inquiries yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* View Booking Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Booking Details</h3>
              <div className="space-y-3 text-sm bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl">
                <p><strong>Name:</strong> {selectedBooking.name}</p>
                <p><strong>Service:</strong> {getServiceType(selectedBooking.designTitle, selectedBooking.serviceType)}</p>
                <p><strong>Design:</strong> {selectedBooking.designTitle}</p>
                <p><strong>Price:</strong> ₹{selectedBooking.designPrice}</p>
                <p><strong>Contact:</strong> {selectedBooking.contactNumber}</p>
                <p><strong>Email:</strong> {selectedBooking.email || 'N/A'}</p>
                <p><strong>Address:</strong> {selectedBooking.address}</p>
                <p><strong>Time:</strong> {selectedBooking.availableTime}</p>
                <p><strong>Date:</strong> {selectedBooking.date} ({selectedBooking.day})</p>
                <p><strong>Status:</strong> {selectedBooking.status || 'pending'}</p>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="mt-6 w-full bg-gray-500 text-white py-2 rounded-xl hover:bg-gray-600">
                Close
              </button>
            </div>
          </div>
        )}

        {/* View Inquiry Modal */}
        {selectedInquiry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Inquiry Details</h3>
              <div className="space-y-3 text-sm bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl">
                <p><strong>Name:</strong> {selectedInquiry.name}</p>
                <p><strong>Phone/WhatsApp:</strong> {selectedInquiry.phone}</p>
                <p><strong>Email:</strong> {selectedInquiry.email}</p>
                <p><strong>Interested In:</strong> {selectedInquiry.service || 'Not specified'}</p>
                <p><strong>Message:</strong> <br /><span className="whitespace-pre-wrap">{selectedInquiry.message}</span></p>
                <p><strong>Submitted:</strong> {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt.toDate()).toLocaleString() : 'N/A'}</p>
                <p><strong>Status:</strong> {selectedInquiry.status || 'new'}</p>
              </div>
              <div className="flex gap-3 mt-6">
                {!selectedInquiry.read && (
                  <button onClick={() => { handleMarkRead(selectedInquiry.id); setSelectedInquiry(null); }} className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600">
                    Mark as Read
                  </button>
                )}
                <button onClick={() => setSelectedInquiry(null)} className="flex-1 bg-gray-500 text-white py-2 rounded-xl hover:bg-gray-600">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-1">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Total Designs</h3>
            <p className="text-2xl font-bold text-orange-600">{designs.length}</p>
          </div>
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-1">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Total Bookings</h3>
            <p className="text-2xl font-bold text-orange-600">{bookings.length}</p>
          </div>
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all hover:-translate-y-1">
            <h3 className="text-sm font-medium text-gray-700 mb-2">New Inquiries</h3>
            <p className="text-2xl font-bold text-orange-600">{inquiries.filter(i => !i.read).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}