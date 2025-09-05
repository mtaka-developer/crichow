export default function CoverageSection() {
  const stats = [
    {
      number: "138",
      label: "Households",
      description: "Active households participating in the program"
    },
    {
      number: "13",
      label: "Groups",
      description: "Community waste handler groups"
    },
    {
      number: "13",
      label: "Wards",
      description: "Areas covered, expanding to 14 in Phase 2"
    }
  ];

  const areas = [
    "Manyatta", "Nyalenda", "Kibuye", "Obunga", 
    "Otonglo", "Kamakowa", "Migosi", "Kolwa Central",
    "Kolwa East", "South West Kisumu", "Central Kisumu",
    "Market Milimani", "Kondele"
  ];

  return (
    <section id="coverage" className="section-light py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-anton text-4xl text-dark-gray mb-6">
            Households, Groups, and <span className="text-mtaka-green">Coverage</span>
          </h2>
          <p className="font-poppins text-xl text-gray-600">
            Our impact across Kisumu City
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const colors = ["text-mtaka-green", "text-practical-orange", "text-mtaka-green"];
            return (
              <div key={index} className="text-center bg-white p-8 rounded-lg shadow-sm">
                <div className={`text-6xl font-anton ${colors[index]} mb-2`}>
                  {stat.number}
                </div>
                <h3 className="font-anton text-2xl text-dark-gray mb-2">
                  {stat.label}
                </h3>
                <p className="font-poppins text-gray-600">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Map and Areas */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="font-anton text-2xl text-dark-gray mb-6">Coverage Areas</h3>
            <p className="font-poppins text-gray-600 mb-6">
              The pilot project spans 13 wards across Kisumu City. Expansion to all 14 wards 
              is planned in Phase 2 to ensure city-wide representation.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {areas.map((area, index) => (
                <div 
                  key={index} 
                  className="bg-white p-3 rounded border-l-4 border-mtaka-green font-poppins text-sm text-black"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="font-anton text-2xl text-dark-gray mb-6 text-center">
              Kisumu City Map
            </h3>
            {/* Placeholder for map */}
            <div className="bg-gradient-to-br from-green-100 to-orange-100 h-80 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="font-poppins text-gray-600">
                  Interactive Kisumu City Map
                </p>
                <p className="font-poppins text-sm text-gray-500 mt-2">
                  Showing coverage areas and expansion plans
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}