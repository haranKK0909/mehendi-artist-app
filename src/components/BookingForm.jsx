import { useState } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function BookingForm({ selectedDesign, onClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Compute min date for today
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setSuccess(false);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      designTitle: selectedDesign?.title || 'N/A',
      designPrice: selectedDesign?.price || 'N/A',
      contactNumber: formData.get('contactNumber'),
      email: formData.get('email') || '',
      address: formData.get('address'),
      availableTime: formData.get('availableTime'),
      date: formData.get('date'),
      day: new Date(formData.get('date')).toLocaleDateString('en-US', { weekday: 'long' }),  // Auto-generate day
      createdAt: serverTimestamp(),
      status: 'pending'  // Default status
    };

    // Validation
    if (!data.name || !data.contactNumber || !data.address || !data.availableTime || !data.date) {
      setFormError('Please fill all required fields.');
      setSubmitting(false);
      return;
    }

    try {
      // Check for existing booking on the same date (only one booking per day, regardless of time or style)
      const existingQuery = query(
        collection(db, 'bookings'),
        where('date', '==', data.date)
      );
      const existingSnapshot = await getDocs(existingQuery);
      
      if (existingSnapshot.size > 0) {
        setFormError('This date is already booked. Please choose another date.');
        setSubmitting(false);
        return;
      }

      // No existing booking on this date, proceed to add
      await addDoc(collection(db, 'bookings'), data);
      setSuccess(true);
      setTimeout(onClose, 2000);  // Auto-close after success
    } catch (err) {
      console.error('Booking error:', err);
      setFormError('Failed to submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all animate-scale-in">
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 text-center mb-6">We'll contact you soon to confirm details.</p>
          <button onClick={onClose} className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all animate-scale-in">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Book This Design</h2>
        <p className="text-center text-gray-600 mb-6 italic">Selected: <strong>{selectedDesign?.title}</strong></p>
        <p className="text-center text-sm text-gray-600 mb-6">Price: <strong>{selectedDesign?.price}</strong></p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name *"
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          <input
            type="tel"
            name="contactNumber"
            placeholder="Contact Number *"
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          <textarea
            name="address"
            placeholder="Address *"
            required
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
          />
          <input
            type="time"
            name="availableTime"
            placeholder="Available Time *"
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          <input
            type="date"
            name="date"
            min={today}
            placeholder="Preferred Date *"
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          {formError && <p className="text-red-500 text-sm text-center">{formError}</p>}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-all duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}