export default function AboutSection() {
  return (
    <section id="about" className="section-light py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-anton text-4xl text-dark-gray mb-6">
            About the <span className="text-mtaka-green">Partnership</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-poppins text-lg text-gray-600 space-y-4">
              <p>
                M-taka has partnered with Practical Action to transform waste management in Kisumu 
                through the Clean Rivers, Clean Homes (CRICHOW) project.
              </p>
              <p>
                This collaboration leverages M-taka&apos;s innovative digital platform 
                to track waste at household level, empower informal waste groups, and build a cleaner 
                and healthier environment for urban communities.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {/* Waste Management Icon */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-mtaka-green/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-mtaka-green" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-anton text-lg text-dark-gray mb-2">Waste Management</h3>
              <p className="font-poppins text-sm text-gray-600">Transform collection systems</p>
            </div>

            {/* Digital Platform Icon */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-practical-orange/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-practical-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0117.25 17H2.75A1.75 1.75 0 011 15.25V4.75zm16.5 0a.25.25 0 00-.25-.25H2.75a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h14.5a.25.25 0 00.25-.25V4.75z" />
                  <path fillRule="evenodd" d="M6 10.75A.75.75 0 016.75 10h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75zM6 7.25A.75.75 0 016.75 6.5h3a.75.75 0 010 1.5h-3A.75.75 0 016 7.25z" />
                </svg>
              </div>
              <h3 className="font-anton text-lg text-dark-gray mb-2">Digital Platform</h3>
              <p className="font-poppins text-sm text-gray-600">Real-time tracking system</p>
            </div>

            {/* Community Empowerment Icon */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-mtaka-green/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-mtaka-green" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                </svg>
              </div>
              <h3 className="font-anton text-lg text-dark-gray mb-2">Community Empowerment</h3>
              <p className="font-poppins text-sm text-gray-600">Support local groups</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}