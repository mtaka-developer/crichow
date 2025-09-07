
import HeroSlideshowWrapper from "./HeroSlideshowWrapper";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Slideshow */}
      <HeroSlideshowWrapper />
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h1 className="font-anton text-5xl md:text-7xl mb-6 text-white drop-shadow-lg">
            <span className="text-mtaka-green drop-shadow-lg">M-taka</span> & <span className="text-practical-orange drop-shadow-lg">Practical Action</span>
          </h1>
        </div>
        
        <div>
          <h2 className="font-anton text-2xl md:text-4xl text-white mb-8 drop-shadow-lg">
            Clean Rivers, Clean Homes (CRICHOW) Project
          </h2>
        </div>
        
        <div>
          <p className="font-poppins text-xl text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-md">
            Transforming waste management in Kisumu through digital innovation, 
            community empowerment, and sustainable environmental solutions.
          </p>
        </div>
        
        <div className="flex justify-center">
          <a 
            href="#about" 
            className="btn-primary text-center"
          >
            Explore Our Impact
          </a>
        </div>
      </div>
      
    </section>
  );
}