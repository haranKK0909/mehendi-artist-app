import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Login from './components/Admin/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import Footer from './components/Footer';
import Contact from './components/Contact'; // ← Make sure this import exists

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-amber-800 via-orange-800 to-red-800 p-4 text-white shadow-xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <ul className="flex space-x-6 justify-between items-center max-w-6xl mx-auto relative z-10">
            <li className="flex space-x-8">
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

            <li className="ml-auto flex items-center space-x-6">
              {user ? (
                <>
                  <Link 
                    to="/admin/dashboard" 
                    className="relative hover:text-amber-200 transition-all duration-300 ease-in-out hover:scale-110 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Admin Dashboard
                  </Link>
                  <button 
                    onClick={() => auth.signOut()} 
                    className="relative hover:text-amber-200 transition-all duration-300 ease-in-out hover:scale-110 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/admin/login" 
                  className="relative hover:text-amber-200 transition-all duration-300 ease-in-out hover:scale-110 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-300 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Admin Login
                </Link>
              )}
            </li>
          </ul>
        </nav>

        {/* Main content – grows to fill space */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />  {/* ← Added Contact route */}
            
            {/* Protect admin routes */}
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

        {/* Footer appears on every page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;