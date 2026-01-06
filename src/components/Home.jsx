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
    </div>
  );
}