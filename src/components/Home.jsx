import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex flex-col relative overflow-hidden">
      {/* Subtle Henna-inspired background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-amber-300 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-amber-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-amber-200 rounded-full"></div>
      </div>
      
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-16 px-4 max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center w-full gap-12 animate-fade-in">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left transform transition-all duration-700 ease-out hover:scale-105">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
              Artistry in Every Stroke
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed opacity-0 animate-slide-up delay-200">
              Bringing traditional Mehendi art to life with contemporary designs and meticulous detail. 
              Celebrate your moments with exquisite henna that tells your story.
            </p>
            <Link
              to="/gallery"
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl shadow-md mx-auto lg:mx-0 opacity-0 animate-slide-up delay-400"
            >
              View Our Gallery
            </Link>
          </div>
          
          {/* Right: Image */}
          <div className="flex-1 flex justify-center lg:justify-end px-2 lg:px-0 opacity-0 animate-slide-in-right delay-600">
            <div className="relative group">
              <img
                src="/494e7be5048705ba16835b18341abb95.jpg"  // Fixed path: Public assets use leading '/'
                alt="Mehendi hand design"
                className="w-full max-w-md lg:max-w-lg rounded-2xl shadow-2xl object-cover transform transition-all duration-700 ease-out group-hover:rotate-3 group-hover:scale-105 border-4 border-white/50"
              />
              {/* Subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* New Services Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-amber-800 to-orange-600 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our range of Mehendi services tailored for every occasion. From intricate bridal designs to playful festive patterns, we create beauty that lasts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Service 1: Bridal Mehendi */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-staggered-fade-in" style={{ animationDelay: '0ms' }}>
            <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Bridal Mehendi</h3>
              <p className="text-gray-600 text-sm mb-4 text-center leading-relaxed">Elegant and intricate designs for your special day, blending tradition with personal touches. Full hands and feet coverage with lasting color.</p>
              <Link
                to="/gallery?service=Bridal Mehendi"  // Updated: Passes service as query param
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-center font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                View
              </Link>
            </div>
          </div>

          {/* Service 2: Festive Mehendi */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-staggered-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2h12a2 2 0 012 2v2M5 11h14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Festive Mehendi</h3>
              <p className="text-gray-600 text-sm mb-4 text-center leading-relaxed">Vibrant patterns for festivals and parties. Quick application with bold motifs to match your celebratory vibe.</p>
              <Link
                to="/gallery?service=Festive Mehendi"  // Updated: Passes service as query param
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-center font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                View
              </Link>
            </div>
          </div>

          {/* Service 3: Arabic Style */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-staggered-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Arabic Style</h3>
              <p className="text-gray-600 text-sm mb-4 text-center leading-relaxed">Minimalist and bold geometric patterns inspired by Arabic art. Perfect for modern brides and elegant events.</p>
              <Link
                to="/gallery?service=Arabic Style"  // Updated: Passes service as query param
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-center font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                View
              </Link>
            </div>
          </div>

          {/* Service 4: Traditional Indian */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-staggered-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Traditional Indian</h3>
              <p className="text-gray-600 text-sm mb-4 text-center leading-relaxed">Rich floral and paisley motifs rooted in Indian heritage. Ideal for weddings and cultural celebrations.</p>
              <Link
                to="/gallery?service=Traditional Indian"  // Updated: Passes service as query param
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-center font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                View
              </Link>
            </div>
          </div>

          {/* Service 5: Kids Mehendi */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-staggered-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Kids Mehendi</h3>
              <p className="text-gray-600 text-sm mb-4 text-center leading-relaxed">Fun, simple designs with stickers and glitter for little ones. Safe, quick, and full of joy for birthdays and events.</p>
              <Link
                to="/gallery?service=Kids Mehendi"  // Updated: Passes service as query param
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-center font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                View
              </Link>
            </div>
          </div>

          {/* Service 6: Custom Designs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-staggered-fade-in" style={{ animationDelay: '500ms' }}>
            <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Custom Designs</h3>
              <p className="text-gray-600 text-sm mb-4 text-center leading-relaxed">Personalized Mehendi incorporating your initials, symbols, or themes. Consult with us for a unique masterpiece.</p>
              <Link
                to="/gallery?service=Custom Designs"  // Updated: Passes service as query param
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl text-center font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}