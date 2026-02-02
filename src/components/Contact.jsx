// src/components/Contact.jsx
import { useState } from 'react';

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

    // Here you can later integrate with EmailJS, Formspree, Firebase Functions, etc.
    // For now we'll simulate a successful submission after 1.5 seconds
    try {
      // Example: await sendEmail(formData); // your future API call

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus({ submitted: true, submitting: false, error: null });
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
      });
    } catch (err) {
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

        {/* Contact Info Cards + Form */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Quick Contact Cards */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all hover:-translate-y-2 hover:shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Call / WhatsApp</h3>
            <p className="text-gray-600">+91 63805 99589</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all hover:-translate-y-2 hover:shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">hpydayy7@gmail.com</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all hover:-translate-y-2 hover:shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
            <p className="text-gray-600">Tiruppur, Tamil Nadu</p>
          </div>
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