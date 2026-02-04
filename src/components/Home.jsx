import { Link } from 'react-router-dom';
import Footer from './Footer'; // Adjust path if your Footer is in a different location

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-white to-orange-100 relative overflow-hidden">
      {/* Subtle Henna-inspired background elements */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-28 sm:w-32 h-28 sm:h-32 border-2 border-amber-400/70 rounded-full animate-pulse"></div>
        <div className="absolute bottom-[15%] right-[8%] w-20 sm:w-24 h-20 sm:h-24 border-2 border-orange-400/70 rounded-full animate-bounce"></div>
        <div className="absolute top-[45%] left-[20%] w-14 sm:w-16 h-14 sm:h-16 border-2 border-amber-300/60 rounded-full animate-ping-slow"></div>
      </div>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center w-full gap-10 lg:gap-16">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left space-y-6 lg:space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent drop-shadow-md">
              Artistry in Every Stroke
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Bringing traditional Mehendi art to life with contemporary designs and meticulous detail.  
              Celebrate your moments with exquisite henna that tells your story.
            </p>
            <Link
              to="/gallery"
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 text-white px-7 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-md mx-auto lg:mx-0"
            >
              View Our Gallery
            </Link>
          </div>

          {/* Right: Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <img
                src="/494e7be5048705ba16835b18341abb95.jpg"
                alt="Mehendi hand design"
                className="w-full rounded-2xl shadow-2xl object-cover transform transition-all duration-700 group-hover:rotate-3 group-hover:scale-105 border-4 border-white/60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-600/15 to-transparent rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our range of Mehendi services tailored for every occasion. From intricate bridal designs to playful festive patterns, we create beauty that lasts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Bridal Mehendi */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50/90">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">Bridal Mehendi</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-5 text-center leading-relaxed">
                Elegant and intricate designs for your special day, blending tradition with personal touches.
              </p>
              <Link
                to="/gallery?service=Bridal Mehendi"
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-center font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02]"
              >
                View Designs
              </Link>
            </div>
          </div>

          {/* Festive Mehendi */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50/90">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">Festive Mehendi</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-5 text-center leading-relaxed">
                Vibrant patterns for festivals and parties. Quick application with bold motifs.
              </p>
              <Link
                to="/gallery?service=Festive Mehendi"
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-center font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02]"
              >
                View Designs
              </Link>
            </div>
          </div>

          {/* Arabic Style */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50/90">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">Arabic Style</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-5 text-center leading-relaxed">
                Minimalist and bold geometric patterns inspired by Arabic art.
              </p>
              <Link
                to="/gallery?service=Arabic Style"
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-center font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02]"
              >
                View Designs
              </Link>
            </div>
          </div>

          {/* Traditional Indian */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50/90">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">Traditional Indian</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-5 text-center leading-relaxed">
                Rich floral and paisley motifs rooted in Indian heritage.
              </p>
              <Link
                to="/gallery?service=Traditional Indian"
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-center font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02]"
              >
                View Designs
              </Link>
            </div>
          </div>

          {/* Kids Mehendi */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50/90">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">Kids Mehendi</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-5 text-center leading-relaxed">
                Fun, simple designs with stickers and glitter for little ones.
              </p>
              <Link
                to="/gallery?service=Kids Mehendi"
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-center font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02]"
              >
                View Designs
              </Link>
            </div>
          </div>

          {/* Custom Designs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
            <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-50 to-orange-50/90">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">Custom Designs</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-5 text-center leading-relaxed">
                Personalized Mehendi incorporating your initials, symbols, or themes.
              </p>
              <Link
                to="/gallery?service=Custom Designs"
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-center font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-[1.02]"
              >
                View Designs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - only on Home page */}
      <Footer />
    </div>
  );
}