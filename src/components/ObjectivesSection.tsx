export default function ObjectivesSection() {
  const objectives = [
    {
      title: "Digitize waste tracking",
      description: "Deploy the M-taka digital platform to record household-level waste quantities and types.",
      color: "green"
    },
    {
      title: "Support informal waste groups",
      description: "Build capacity of waste handlers with tools and digital monitoring systems.",
      color: "orange"
    },
    {
      title: "Promote waste segregation",
      description: "Encourage households to separate wet and dry waste for recycling.",
      color: "green"
    },
    {
      title: "Strengthen community engagement",
      description: "Foster partnerships with schools and organizations to drive behavior change.",
      color: "orange"
    },
    {
      title: "Generate data insights",
      description: "Provide real-time dashboards for effective waste management strategies.",
      color: "green"
    }
  ];

  return (
    <section id="objectives" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-anton text-4xl text-dark-gray mb-6">
            Objectives of the <span className="text-practical-orange">Partnership</span>
          </h2>
          <p className="font-poppins text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive approach to transforming waste management through strategic initiatives
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((objective, index) => {
            const isGreen = objective.color === "green";
            const colorClass = isGreen ? "text-mtaka-green" : "text-practical-orange";
            const bgColorClass = isGreen ? "bg-mtaka-green/10" : "bg-practical-orange/10";
            
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 ${bgColorClass} rounded-full flex items-center justify-center mb-4`}>
                  {index === 0 && (
                    <svg className={`w-6 h-6 ${colorClass}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0117.25 17H2.75A1.75 1.75 0 011 15.25V4.75zm16.5 0a.25.25 0 00-.25-.25H2.75a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h14.5a.25.25 0 00.25-.25V4.75z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg className={`w-6 h-6 ${colorClass}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg className={`w-6 h-6 ${colorClass}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                    </svg>
                  )}
                  {index === 3 && (
                    <svg className={`w-6 h-6 ${colorClass}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.784.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.784-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.784-.785L15.98 1.804zM6.495 6.003a1 1 0 00-.99 0L2.72 7.36a1 1 0 00-.38 1.55l1.92 2.4a1 1 0 000 1.38l-1.92 2.4a1 1 0 00.38 1.55l2.784 1.357a1 1 0 00.99 0l2.784-1.357a1 1 0 00.38-1.55l-1.92-2.4a1 1 0 010-1.38l1.92-2.4a1 1 0 00-.38-1.55L6.495 6.003z" />
                    </svg>
                  )}
                  {index === 4 && (
                    <svg className={`w-6 h-6 ${colorClass}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <h3 className="font-anton text-xl text-dark-gray mb-3">
                  {objective.title}
                </h3>
                <p className="font-poppins text-gray-600 leading-relaxed">
                  {objective.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}