import CountingAnimationWrapper from "./CountingAnimationWrapper";
import MapWrapper from "./MapWrapper";

export default function CoverageSection() {
  const stats = [
    {
      number: 138,
      label: "Households",
      description: "Active households participating in the program"
    },
    {
      number: 13,
      label: "Groups",
      description: "Community waste handler groups"
    },
    {
      number: 6,
      label: "Wards",
      description: "Key wards covered in the pilot project"
    }
  ];

  const areas = [
    "Kaloleni Shaurimoyo Ward",
    "Nyalenda A Ward", 
    "Nyalenda B Ward",
    "Railways Ward",
    "Manyatta A Ward",
    "Central Ward"
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
                  <CountingAnimationWrapper
                    from={0}
                    to={stat.number}
                    duration={2.5}
                    className={colors[index]}
                  />
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
              The CRICHOW project operates across 6 key wards in Kisumu City, focusing on 
              areas with high waste generation and community engagement potential.
            </p>
            
            <div className="grid grid-cols-1 gap-3">
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
              Interactive Kisumu City Map
            </h3>
            <MapWrapper />
          </div>
        </div>
      </div>
    </section>
  );
}