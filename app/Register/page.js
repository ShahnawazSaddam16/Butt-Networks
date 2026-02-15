import React from "react";
import Navbar from "../components/Navbar";

const Register = () => {
  return (
    <>
      <Navbar />

      <section className="flex flex-col justify-center items-center min-h-screen px-6 lg:px-24 py-20 bg-gradient-to-br from-indigo-50 to-white">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
            Join the <span className="text-blue-600">Ultimate Web Dev Challenge</span>
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-xl text-gray-700">
            Sign up now and take your first step toward mastering HTML, CSS, and JavaScript with real-world tasks.
          </p>
        </header>

        {/* Registration Form */}
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Create Your Account
          </h2>

          <form className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-xl transition duration-300"
            >
              Register & Start Challenge
            </button>
          </form>

          {/* Info / Progress Note */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            📈 Your progress will be tracked as you complete challenges and unlock new modules.
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;
