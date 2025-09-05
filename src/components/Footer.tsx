
export default function Footer() {
  return (
    <footer className="bg-dark-gray text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* CRICHOW Branding */}
          <div className="md:col-span-2">
            <div className="font-anton text-3xl mb-4">
              <span className="text-mtaka-green">CRI</span>
              <span className="text-practical-orange">CHOW</span>
            </div>
            <p className="font-poppins text-gray-300 mb-6 max-w-md">
              Transforming waste management in Kisumu through the partnership between 
              M-taka and Practical Action. Building cleaner communities through digital innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-anton text-xl text-white mb-4">Quick Links</h3>
            <ul className="font-poppins space-y-3">
              <li>
                <a href="#about" className="text-gray-300 hover:text-mtaka-green transition-colors">
                  About Partnership
                </a>
              </li>
              <li>
                <a href="#objectives" className="text-gray-300 hover:text-mtaka-green transition-colors">
                  Objectives
                </a>
              </li>
              <li>
                <a href="#coverage" className="text-gray-300 hover:text-mtaka-green transition-colors">
                  Coverage Areas
                </a>
              </li>
              <li>
                <a href="#partners" className="text-gray-300 hover:text-mtaka-green transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Impact */}
          <div>
            <h3 className="font-anton text-xl text-white mb-4">Impact Stats</h3>
            <div className="font-poppins space-y-3">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-mtaka-green mr-2" style={{ fontFamily: 'monospace' }}>
                  138
                </span>
                <span className="text-gray-300 text-sm">Households</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-practical-orange mr-2" style={{ fontFamily: 'monospace' }}>
                  13
                </span>
                <span className="text-gray-300 text-sm">Waste Groups</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-mtaka-green mr-2" style={{ fontFamily: 'monospace' }}>
                  13
                </span>
                <span className="text-gray-300 text-sm">Wards Covered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Credits */}
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-anton text-lg text-white mb-4">Partnership</h4>
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-mtaka-green rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                    M
                  </div>
                  <p className="font-poppins text-xs text-gray-400">M-taka</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-practical-orange rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                    PA
                  </div>
                  <p className="font-poppins text-xs text-gray-400">Practical Action</p>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-poppins text-gray-300">
                © 2025 <span className="text-mtaka-green">CRI</span><span className="text-practical-orange">CHOW</span>
              </p>
              <p className="font-poppins text-sm text-gray-400 mt-1">
                Clean Rivers, Clean Homes Initiative
              </p>
              <p className="font-poppins text-sm text-gray-400">
                Kisumu County, Kenya
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}