export default function ObjectivesSection() {
  const objectives = [
    {
      title: "Digitize waste tracking",
      description: "Deploy the M-taka digital platform to record household-level waste quantities, types, and collection frequency.",
      icon: "📱"
    },
    {
      title: "Support informal waste groups",
      description: "Build the capacity of waste handlers with tools, training, and digital monitoring systems.",
      icon: "👥"
    },
    {
      title: "Promote waste segregation at source",
      description: "Encourage households to separate wet and dry waste for recycling and composting.",
      icon: "♻️"
    },
    {
      title: "Strengthen community engagement",
      description: "Foster partnerships with schools and community-based organizations to drive behavior change.",
      icon: "🤝"
    },
    {
      title: "Generate data for decision-making",
      description: "Provide real-time dashboards for Practical Action, M-taka, and local authorities to plan effective waste management strategies.",
      icon: "📊"
    }
  ];

  return (
    <section id="objectives" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-anton text-4xl text-dark-gray mb-6">
            Objectives of the Partnership
          </h2>
          <p className="font-poppins text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive approach to transforming waste management through strategic initiatives
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((objective, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-mtaka-green hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{objective.icon}</div>
              <h3 className="font-anton text-xl text-dark-gray mb-3">
                {objective.title}
              </h3>
              <p className="font-poppins text-gray-600 leading-relaxed">
                {objective.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}