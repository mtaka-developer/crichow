
import HeroSlideshowWrapper from "./HeroSlideshowWrapper";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Slideshow */}
      <HeroSlideshowWrapper />
      
      {/* Hero Content - z-20 to appear above overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h1 className="font-anton text-5xl md:text-7xl mb-6 text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)'}}>
            <span className="text-mtaka-green" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)'}}>M-taka</span> & <span className="text-practical-orange" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)'}}>Practical Action</span>
          </h1>
        </div>
        
        <div>
          <h2 className="font-anton text-2xl md:text-4xl text-white mb-8" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.5)'}}>
            Clean Rivers, Clean Homes (CRICHOW) Project
          </h2>
        </div>
        
        <div>
          <p className="font-poppins text-xl text-white/90 max-w-3xl mx-auto mb-10" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.4)'}}>
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