"use client";

import React, { useState } from "react";
import { User2, Phone, X } from "lucide-react";
import { FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Team_Member = [
  {
    name: "Shahnawaz Saddam Butt",
    role: "Founder & Full-Stack Developer",
    contact: {
      phone: "+92 300 1234567",
      email: "shahnawaz@example.com",
      github: "https://github.com/ShahanwazSaddam144",
    },
  },
  {
    name: "Muhammad Ali",
    role: "Brand Ambassador",
    contact: {
      phone: "+92 301 7654321",
      email: "mali@example.com",
      instagram: "@m.ali.dev",
    },
  },
  {
    name: "Wahb Amir",
    role: "AI Expert",
    contact: {
      phone: "+92 302 1122334",
      email: "wahb@example.com",
      github: "https://github.com/wahb-amir",
    },
  },
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <>
      <section className="mt-20 py-10" id="team">
        <header className="flex flex-col justify-center items-center text-center">
          <div className="Ambassador bg-blue-50 px-4 py-1 flex gap-2 rounded-[5px]">
            <User2 size={15} className="mt-1 text-blue-500" />
            <h1 className="font-semibold text-blue-500 uppercase">
              Our Team
            </h1>
          </div>
        </header>

        <div className="flex justify-center items-center gap-5 mt-10 flex-wrap">
          {Team_Member.map((member, index) => (
            <div
              key={index}
              className="Ambassador rounded-xl p-6 shadow-lg w-72 text-center bg-white hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg shadow-md">
                  {getInitials(member.name)}
                </div>
              </div>

              <h2 className="Ambassador-P text-lg font-semibold text-gray-800">
                {member.name}
              </h2>
              <p className="text-blue-500 text-sm mb-4">{member.role}</p>

              <button
                onClick={() => setSelectedMember(member)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                View Contact
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* POPUP */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-[320px] shadow-2xl relative animate-scaleIn">
            {/* Close */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg">
                {getInitials(selectedMember.name)}
              </div>
            </div>

            <h2 className="text-center font-semibold text-gray-800">
              {selectedMember.name}
            </h2>
            <p className="text-center text-blue-500 text-sm mb-5">
              {selectedMember.role}
            </p>

            {/* Contact Icons */}
            <div className="flex justify-center gap-4">
              {selectedMember.contact.phone && (
                <div className="bg-green-500 p-3 rounded-full text-white hover:scale-110 transition cursor-pointer">
                  <FaWhatsapp />
                </div>
              )}

              {selectedMember.contact.email && (
                <div className="bg-gray-700 p-3 rounded-full text-white hover:scale-110 transition cursor-pointer">
                  <MdEmail />
                </div>
              )}

              {selectedMember.contact.github && (
                <div className="bg-black p-3 rounded-full text-white hover:scale-110 transition cursor-pointer">
                  <FaGithub />
                </div>
              )}

              {selectedMember.contact.instagram && (
                <div className="bg-pink-500 p-3 rounded-full text-white hover:scale-110 transition cursor-pointer">
                  <FaInstagram />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Team;