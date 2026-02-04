import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Login from './components/Admin/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import Contact from './components/Contact';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar – ONLY public links: Home, Gallery, Contact Us */}
        <nav className="bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 p-4 text-white shadow-xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <ul className="flex flex-wrap justify-center sm:justify-between items-center gap-6 sm:gap-8 max-w-7xl mx-auto relative z-10">
            <li className="flex flex-wrap gap-6 sm:gap-8 justify-center">
              <Link 
                to="/" 
                className="relative hover:text-amber-200 transition-all duration-300 ease-in-out hover:scale-110 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </Link>
              <Link 
                to="/gallery" 
                className="relative hover:text-amber-200 transition-all duration-300 ease-in-out hover:scale-110 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                Gallery
              </Link>
              <Link 
                to="/contact"
                className="relative hover:text-amber-200 transition-all duration-300 ease-in-out hover:scale-110 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                Contact Us
              </Link>
            </li>

            {/* No admin link here at all – removed completely */}
          </ul>
        </nav>

        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin routes still exist (accessible via direct URL), but no link in navbar */}
            <Route 
              path="/admin/login" 
              element={!user ? <Login /> : <Navigate to="/admin/dashboard" replace />} 
            />
            <Route 
              path="/admin/dashboard" 
              element={user ? <AdminDashboard /> : <Navigate to="/admin/login" replace />} 
            />

            {/* 404 */}
            <Route path="*" element={
              <div className="p-12 text-center text-2xl font-medium text-gray-600">
                404 – Page Not Found
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;