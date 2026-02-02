// Footer.jsx
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
              <a href="https://www.instagram.com/_happy.happydayy_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" 
                 className="text-orange-600 hover:text-orange-700 transition-colors">
                <FaInstagram size={22} />
              </a>
              <a href="https://l.instagram.com/?u=https%3A%2F%2Fyoutube.com%2F%40happy.happydayy%3Fsi%3DFaEzv1uWiMtASlRc%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnbIxSkCIWLuI3_UqAQXxHP25Gl61QEewgmH4iU-Lj5M0V0iVU3BLJniWsrxw_aem_1ZniWQMGkofbg44fPNJkxQ&e=AT2W5X7VaqnQBw7OJyR1B6JHjjQhy614XMSs-nOwNekF47frhLxHYdgUpqgHcI_KN5R32YbJ6VKYHHDjSldZrVU_XX2tvXx80xvIoTVE6g" target="_blank" rel="noopener noreferrer"
                 className="text-orange-600 hover:text-orange-700 transition-colors">
                <FaYoutube size={22} />
              </a>
              <a href="https://wa.me/916380599589" target="_blank" rel="noopener noreferrer"
                 className="text-orange-600 hover:text-orange-700 transition-colors">
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

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-gray-700 text-sm">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-orange-600" />
                <span>+91 63805 99589</span>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-orange-600" />
                <span>+91 63805 99589</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-orange-600" />
                <span>hpydayy7@gmail.com</span>
              </li>
              <li className="mt-4">
                <p className="text-gray-600">
                  Tiruppur, Tamil Nadu<br />
                  Available across major cities
                </p>
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