import React from "react";
import Link from "next/link";

const Challenge = () => {
  return (
    <section className="Challenge mt-20 px-6 lg:px-24 py-20" id="challenge">
      {/* Header */}
      <header className="flex flex-col justify-center items-center text-center gap-6">
        
        {/* Big Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Take the <span className="text-blue-600">Ultimate Web Dev Challenge</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-3xl text-xl text-gray-700">
          Grow your skills with real tasks — start with HTML, then master CSS,
          and unlock JavaScript challenges as you progress. This challenge adapts
          to your journey and tracks your improvement.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Link
            href="/Register"
            className="text-white bg-blue-600 hover:bg-blue-700 font-semibold px-8 py-3 rounded-xl transition duration-300"
          >
            Start Challenge
          </Link>

          <button className="text-blue-600 border border-blue-600 hover:bg-blue-100 font-semibold px-8 py-3 rounded-xl transition duration-300">
            Learn More
          </button>
        </div>
      </header>

      {/* Progress Info */}
      <div className="mt-10 text-center text-gray-700">
        <p className="text-lg">
          📈 Your progress is tracked. Unlock new modules as you achieve
          milestones. Each task brings you closer to real-world web dev
          experience.
        </p>
      </div>
    </section>
  );
};

export default Challenge;
