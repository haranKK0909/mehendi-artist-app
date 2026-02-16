// src/components/Contact.jsx
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure this path is correct
import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitted: false, submitting: true, error: null });

    try {
      // Save to Firestore in 'inquiries' collection
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new',
        read: false,
      });

      // Success
      setStatus({ submitted: true, submitting: false, error: null });
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
      });
    } catch (err) {
      console.error('Error saving inquiry:', err);
      setStatus({
        submitted: false,
        submitting: false,
        error: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-amber-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-orange-400 rounded-full animate-bounce"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We'd love to hear from you! Whether it's booking a bridal session, asking about custom designs, or just saying hello — drop us a message.
          </p>
        </div>

        {/* Get in Touch – now fully clickable & responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {/* Phone */}
          <a
            href="tel:+916380599589"
            className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all hover:-translate-y-2 hover:shadow-xl group"
            aria-label="Call us on phone"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaPhoneAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
              Call / WhatsApp
            </h3>
            <p className="text-gray-700 font-medium">+91 63805 99589</p>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/916380599589"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all hover:-translate-y-2 hover:shadow-xl group"
            aria-label="Message us on WhatsApp"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaWhatsapp className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
              WhatsApp Chat
            </h3>
            <p className="text-gray-700 font-medium">+91 63805 99589</p>
          </a>

          {/* Email */}
          <a
            href="mailto:hpydayy7@gmail.com"
            className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all hover:-translate-y-2 hover:shadow-xl group"
            aria-label="Send us an email"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FaEnvelope className="text-white text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
              Email Us
            </h3>
            <p className="text-gray-700 font-medium break-all">hpydayy7@gmail.com</p>
          </a>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl mx-auto">
          {status.submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
              <p className="text-gray-600">We'll get back to you within 24 hours.</p>
              <button
                onClick={() => setStatus({ submitted: false, submitting: false, error: null })}
                className="mt-6 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="+91 63805 99589"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition bg-white"
                  >
                    <option value="">Select service</option>
                    <option value="Bridal Mehendi">Bridal Mehendi</option>
                    <option value="Festive Mehendi">Festive Mehendi</option>
                    <option value="Arabic Style">Arabic Style</option>
                    <option value="Traditional Indian">Traditional Indian</option>
                    <option value="Kids Mehendi">Kids Mehendi</option>
                    <option value="Custom Designs">Custom Designs</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  placeholder="Tell us about your occasion, preferred date, or any special requests..."
                ></textarea>
              </div>

              {status.error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
                  {status.error}
                </div>
              )}

              <button
                type="submit"
                disabled={status.submitting}
                className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status.submitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}