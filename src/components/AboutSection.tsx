export default function AboutSection() {
  return (
    <section id="about" className="section-light py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-anton text-4xl text-dark-gray mb-6">
              About the Partnership
            </h2>
            <div className="font-poppins text-lg text-gray-600 space-y-4">
              <p>
                M-taka has partnered with Practical Action to transform waste management in Kisumu 
                through the Clean Rivers, Clean Homes (CRICHOW) project.
              </p>
              <p>
                This collaboration leverages <span className="text-mtaka-green font-semibold">M-taka&apos;s innovative digital platform</span> 
                to track waste at household level, empower informal waste groups, and build a cleaner 
                and healthier environment for urban communities.
              </p>
              <p>
                Together, the partnership focuses on <span className="text-practical-orange font-semibold">digitizing household waste monitoring</span>, 
                supporting community waste handlers, and aligning local action with county and national 
                waste management goals.
              </p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-mtaka-green">
            <h3 className="font-anton text-2xl text-dark-gray mb-4">Key Highlights</h3>
            <ul className="font-poppins space-y-3">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-mtaka-green rounded-full mr-3"></span>
                Household-level waste tracking
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-practical-orange rounded-full mr-3"></span>
                Community empowerment initiatives
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-mtaka-green rounded-full mr-3"></span>
                Real-time data dashboards
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-practical-orange rounded-full mr-3"></span>
                Environmental impact measurement
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}