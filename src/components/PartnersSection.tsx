import Link from "next/link";

export default function PartnersSection() {
  return (
    <section id="partners" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-anton text-4xl text-dark-gray mb-6">
            The Partners
          </h2>
          <p className="font-poppins text-xl text-gray-600 max-w-3xl mx-auto">
            Combining international development expertise with local innovation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Practical Action */}
          <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-practical-orange">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-practical-orange rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                PA
              </div>
              <h3 className="font-anton text-3xl text-dark-gray">
                Practical Action
              </h3>
              <p className="font-poppins text-practical-orange font-semibold">
                International Development Organization
              </p>
            </div>
            
            <div className="font-poppins text-gray-600 space-y-4">
              <p>
                Practical Action is an international development organization that works with 
                communities to put ingenious ideas into practice, tackling some of the world&apos;s 
                toughest challenges.
              </p>
              <p>
                Through innovation, collaboration, and community-led approaches, Practical Action 
                empowers people living in poverty to build sustainable livelihoods, strengthen 
                resilience, and improve their living environments.
              </p>
              <p>
                <span className="text-practical-orange font-semibold">In Kisumu</span>, Practical Action is supporting 
                community mobilization, capacity building of waste groups, and integration of 
                circular economy practices.
              </p>
            </div>
          </div>

          {/* M-taka */}
          <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-mtaka-green">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-mtaka-green rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                M
              </div>
              <h3 className="font-anton text-3xl text-dark-gray">
                M-taka
              </h3>
              <p className="font-poppins text-mtaka-green font-semibold">
                Kenyan Social Enterprise
              </p>
            </div>
            
            <div className="font-poppins text-gray-600 space-y-4">
              <p>
                M-taka is a Kenyan social enterprise revolutionizing waste management through 
                technology and community empowerment.
              </p>
              <p>
                Its digital monitoring platform enables real-time waste tracking, household 
                profiling, and performance dashboards for waste actors, local governments, 
                and partner organizations.
              </p>
              <p>
                <span className="text-mtaka-green font-semibold">M-taka&apos;s mission</span> is to create 
                inclusive, data-driven waste systems that generate income opportunities for informal 
                collectors, reduce pollution, and promote a circular economy across African cities.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-green-50 to-orange-50 p-12 rounded-lg">
          <h3 className="font-anton text-3xl text-dark-gray mb-4">
            Ready to explore the data?
          </h3>
          <p className="font-poppins text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Access real-time dashboards and insights from the CRICHOW project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="btn-primary text-center">
              Access Dashboard
            </Link>
            <a href="#home" className="btn-secondary text-center">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}