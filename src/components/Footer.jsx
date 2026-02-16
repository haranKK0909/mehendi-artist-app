// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-amber-50 via-amber-100 to-orange-50 text-gray-800 pt-12 pb-6 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -bottom-16 -right-16 w-64 h-64 border-4 border-amber-300 rounded-full animate-pulse-slow"></div>
        <div className="absolute -top-20 -left-20 w-48 h-48 border-2 border-orange-300 rounded-full animate-ping-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-amber-200/60">
          {/* Brand & About */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent mb-4">
              Mehendi By Hari
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
              Creating timeless henna art for your most precious moments — from bridal elegance to festive joy.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/_happy.happydayy_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-orange-600 hover:text-orange-700 transition-colors"
                aria-label="Instagram profile"
              >
                <FaInstagram size={22} />
              </a>
              <a 
                href="https://youtube.com/@happy.happydayy?si=FaEzv1uWiMtASlRc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 transition-colors"
                aria-label="YouTube channel"
              >
                <FaYoutube size={22} />
              </a>
              <a 
                href="https://wa.me/916380599589" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 transition-colors"
                aria-label="WhatsApp chat"
              >
                <FaWhatsapp size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-5">Quick Links</h4>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>
                <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-orange-600 transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/gallery?service=Bridal Mehendi" className="hover:text-orange-600 transition-colors">Bridal Mehendi</Link>
              </li>
              <li>
                <Link to="/gallery?service=Festive Mehendi" className="hover:text-orange-600 transition-colors">Festive Designs</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-600 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-5">Our Services</h4>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>Bridal Mehendi</li>
              <li>Festive & Party Mehendi</li>
              <li>Arabic Style Designs</li>
              <li>Traditional Indian Patterns</li>
              <li>Kids & Fun Mehendi</li>
              <li>Custom & Personalized Art</li>
            </ul>
          </div>

          {/* Get in Touch – now fully clickable and responsive */}
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-gray-700 text-sm">
              {/* Phone – opens dialer */}
              <li>
                <a 
                  href="tel:+916380599589" 
                  className="flex items-center gap-3 hover:text-orange-600 transition-colors group"
                  aria-label="Call us"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaPhoneAlt className="text-white" />
                  </div>
                  <span>+91 63805 99589</span>
                </a>
              </li>

              {/* WhatsApp – opens WhatsApp chat */}
              <li>
                <a 
                  href="https://wa.me/916380599589" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-orange-600 transition-colors group"
                  aria-label="Message on WhatsApp"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaWhatsapp className="text-white" />
                  </div>
                  <span>+91 63805 99589 (WhatsApp)</span>
                </a>
              </li>

              {/* Email – opens email client */}
              <li>
                <a 
                  href="mailto:hpydayy7@gmail.com" 
                  className="flex items-center gap-3 hover:text-orange-600 transition-colors group"
                  aria-label="Send email"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaEnvelope className="text-white" />
                  </div>
                  <span>hpydayy7@gmail.com</span>
                </a>
              </li>

              {/* Location – static text (no link) */}
              <li className="mt-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-gray-600">
                  Tiruppur, Tamil Nadu<br />
                  Available across major cities
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar + Disclaimer */}
        <div className="pt-8 text-center text-sm text-gray-600">
          <p className="mb-3">
            © {currentYear} Mehendi By Hari. All Rights Reserved.
          </p>

          <div className="max-w-3xl mx-auto text-gray-500 leading-relaxed text-xs md:text-sm">
            <p className="mb-2">
              <strong>Disclaimer:</strong> All designs showcased are for inspiration purposes only. 
              Actual henna color, longevity, and final appearance may vary depending on skin type, 
              climate, aftercare, and application technique.
            </p>
            <p>
              We do not claim ownership of cultural or traditional motifs used in designs. 
              Booking is subject to availability and prior consultation. No portion of this website 
              may be reproduced without permission.
            </p>
          </div>

          <p className="mt-6 text-amber-700/80 text-xs">
            Crafted with <span className="text-red-500">♥</span> for beautiful moments
          </p>
        </div>
      </div>
    </footer>
  );
}