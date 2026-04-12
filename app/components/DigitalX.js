import React from "react";

const project = {
  title: "Digital-X",
  subtitle: "Our New Project",
  description: `Digital-X is our latest project where we built a full-featured web application using Next.js, Tailwind CSS, and modern APIs. It’s responsive, fast, and user-centric.`,
  features: [
    "SSR + SSG using Next.js",
    "Dark / Light mode support",
    "Responsive design",
    "Animations & micro-interactions",
    "Clean & modular code",
  ],
  imageUrl: "/digital-x.png",
  liveUrl: "https://digital-x.buttnetworks.com",
  repoUrl: "https://github.com/ShahanwazSaddam144/digital-x",
};

const DigitalX = () => {
  return (
    <section className="DigitalX mt-20 mb-20 px-4 sm:px-8 lg:px-16">
      <header className="text-center mb-12">
        <h2 className="font-extrabold text-4xl sm:text-5xl">
          {project.subtitle}
        </h2>
        <h3 className="DigitalX-Title mt-2 text-gray-900 font-bold text-3xl sm:text-4xl">
          {project.title}
        </h3>
      </header>

      <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left: text / info */}
        <div className="flex-1 space-y-6">
          <p className="DigitalX text-gray-700 leading-relaxed">
            {project.description}
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {project.features.map((feat, idx) => (
              <li
                key={idx}
                className="DigitalX-ul hover:text-gray-900 transition-colors"
              >
                {feat}
              </li>
            ))}
          </ul>

          <div className="flex space-x-4 mt-6">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              View Live
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
            >
              Source Code
            </a>
          </div>
        </div>

        {/* Right: image / screenshot */}
        <div className="flex-1">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={project.imageUrl}
              alt={`${project.title} preview`}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalX;
