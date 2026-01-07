import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import BookingForm from './BookingForm'; // Import the BookingForm component

export default function Gallery() {
  const [designs, setDesigns] = useState([]); // Renamed from images for clarity
  const [filterStyle, setFilterStyle] = useState('');
  const [sortBy, setSortBy] = useState('Newest Arrivals');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For debugging
  const [showFilters, setShowFilters] = useState(false); // Mobile toggle for sidebar

  // States for booking modal
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  // New states for image full-view modal
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchDesigns();
  }, [filterStyle, sortBy]);

  const fetchDesigns = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching designs with filter:', filterStyle, 'sort:', sortBy); // Debug
      let q = query(collection(db, 'images'), orderBy('createdAt', 'desc'));
     
      // Apply style filter (string equality) - single block
      if (filterStyle) {
        q = query(q, where('style', '==', filterStyle)); // Assumes 'style' is string field
        console.log('Applied style filter:', filterStyle); // Debug
      }
     
      // Optional: Chain tags filter if needed (uncomment to enable both)
      // if (filterStyle) {
      //   q = query(q, where('tags', 'array-contains', filterStyle));
      // }

      const querySnapshot = await getDocs(q);
      let fetchedDesigns = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
     
      console.log('Raw fetched designs:', fetchedDesigns.length); // Debug count
     
      // Client-side sorting for price
      if (sortBy === 'Price Low to High') {
        fetchedDesigns.sort((a, b) => parseFloat(a.price?.replace('$', '') || 0) - parseFloat(b.price?.replace('$', '') || 0));
      } else if (sortBy === 'Price High to Low') {
        fetchedDesigns.sort((a, b) => parseFloat(b.price?.replace('$', '') || 0) - parseFloat(a.price?.replace('$', '') || 0));
      }
     
      setDesigns(fetchedDesigns);
    } catch (err) {
      console.error('Fetch error:', err); // Full log
      if (err.code === 'permission-denied') {
        setError('Permissions denied - check Firestore rules and index status.');
      } else if (err.code === 'failed-precondition') {
        setError('Query needs index - check Firebase console (Indexes tab) for creation status.');
      } else {
        setError(err.message || 'Failed to load designs');
      }
    } finally {
      setLoading(false);
    }
  };

  // Open booking modal for a design
  const openBookingModal = (design) => {
    setSelectedDesign(design);
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setSelectedDesign(null);
  };

  // New: Open full-view image modal
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage(null);
  };

  const toggleFilters = () => setShowFilters(!showFilters);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center animate-pulse">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-500">Loading beautiful designs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center bg-red-50 p-6 rounded-xl shadow-lg max-w-md border border-red-200 animate-fade-in">
          <p className="text-red-600 mb-4 font-medium">Error: {error}</p>
          <button onClick={fetchDesigns} className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-md">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden">
      {/* Animated background henna patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-amber-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-orange-400 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-amber-200 rounded-full animate-ping"></div>
      </div>
     
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header with subtle animation */}
          <div className="flex justify-between items-center mb-8 animate-fade-in-down">
            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
              Our Mehendi Gallery
            </h1>
            <div className="text-sm text-gray-600 opacity-0 animate-fade-in-up delay-500">Discover exquisite designs</div>
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={toggleFilters}
            className="md:hidden mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>

          {/* Main Layout: Sidebar + Grid - Responsive Stack */}
          <div className={`flex gap-8 ${showFilters ? 'md:flex-row flex-col' : 'md:flex-row flex-col'}`}>
            {/* Left Sidebar: Filters with modern glassmorphism - Hidden on mobile unless toggled */}
            <div className={`w-full md:w-64 flex-shrink-0 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 md:block ${showFilters ? 'block' : 'hidden'}`}>
              <h2 className="text-xl font-semibold mb-6 text-gray-800 animate-fade-in">Filter Designs</h2>
             
              {/* Style Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                <select
                  value={filterStyle}
                  onChange={(e) => setFilterStyle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                >
                  <option value="">All Styles</option>
                  <option value="Traditional">Traditional</option>
                  <option value="Modern">Modern</option>
                  <option value="Minimalist">Minimalist</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
                >
                  <option value="Newest Arrivals">Newest Arrivals</option>
                  <option value="Price Low to High">Price Low to High</option>
                  <option value="Price High to Low">Price High to Low</option>
                </select>
              </div>
            </div>

            {/* Grid with staggered animation - Full width on mobile */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {designs.length > 0 ? (
                  designs.map((design, index) => (
                    <div
                      key={design.id}
                      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 hover:rotate-1 cursor-pointer animate-staggered-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }} // Staggered load
                    >
                      {/* Image with zoom hover - Now clickable for full view */}
                      <div 
                        className="relative overflow-hidden cursor-zoom-in"
                        onClick={() => openImageModal(design.url)}
                      >
                        <img
                          src={design.url}
                          alt={design.title}
                          className="w-full h-48 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Top-right Icons: Modern floating badges */}
                        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                          <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-110">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-3 bg-red-500/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-110">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Content with gradient accents - Compact on mobile */}
                      <div className="p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                          {design.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">{design.description}</p>
                       
                        {/* Tags with hover pop - Wrap on mobile */}
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                          {design.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-xs text-amber-800 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                       
                        {/* Price with shine effect */}
                        <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-3 sm:mb-4 animate-pulse-slow">
                          {design.price}
                        </p>
                       
                        {/* Call-to-action - Triggers booking modal */}
                        <button
                          onClick={() => openBookingModal(design)}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 sm:py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 sm:py-16 animate-fade-in">
                    <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center animate-spin-slow">
                      <svg className="w-10 sm:w-12 h-10 sm:h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <p className="text-lg sm:text-xl text-gray-500 font-medium">No designs available yet. Check back soon!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal - Now renders BookingForm */}
      {bookingModalOpen && (
        <BookingForm
          selectedDesign={selectedDesign}
          onClose={closeBookingModal}
        />
      )}

      {/* New: Full-View Image Modal */}
      {imageModalOpen && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Full image */}
            <img
              src={selectedImage}
              alt="Full view"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}