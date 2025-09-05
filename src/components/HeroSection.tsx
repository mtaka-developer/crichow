import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="home" className="bg-gradient-to-br from-green-50 to-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-anton text-5xl md:text-7xl mb-6">
          <span className="text-mtaka-green">M-taka</span> & <span className="text-practical-orange">Practical Action</span>
        </h1>
        <h2 className="font-anton text-2xl md:text-4xl text-dark-gray mb-8">
          Clean Rivers, Clean Homes (CRICHOW) Project
        </h2>
        <p className="font-poppins text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Transforming waste management in Kisumu through digital innovation, 
          community empowerment, and sustainable environmental solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#coverage" className="btn-primary text-center">
            Explore Our Impact
          </a>
          <Link href="/login" className="btn-secondary text-center">
            Access Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}