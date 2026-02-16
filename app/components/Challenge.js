"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

const Challenge = () => {
  const [popup, setPopup] = useState(false);

  return (
    <>
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
          <button
          onClick={()=>{setPopup(true)}}
            className="text-white bg-blue-600 hover:bg-blue-700 font-semibold px-8 py-3 rounded-xl transition duration-300"
          >
            Start Challenge
          </button>

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

{/* Pop up */}
{popup && (
  <div className="inset-0 fixed flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 px-4">
    
    {/* Popup Card */}
    <div className="w-full sm:w-[500px] bg-white rounded-2xl shadow-2xl p-8 relative animate-fadeIn">
      
      {/* Close Button */}
      <button
        onClick={() => setPopup(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
      >
        <X size={22} />
      </button>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        Challenge Not Open Yet
      </h2>

      {/* Message */}
      <p className="text-gray-600 text-center leading-relaxed">
        The Ultimate Web Dev Challenge is currently not open.
        Stay tuned — it will be available soon!
      </p>
    </div>
  </div>
)}

    </>
  );
};

export default Challenge;
