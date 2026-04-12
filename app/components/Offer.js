import React from "react";
import Link from "next/link";

const Offer = () => {
  return (
    <>
      <section className="Offer mt-5">
        <div className="text-center">
          <h1 className="font-extrabold text-[40px]">Have a Project?</h1>
          <p className="font-bold mt-2 text-[18px] text-gray-700">
            Lets collaborate to bring your next digital product to life.
          </p>
          <Link href="/Contact">
            <button
              className="px-6 py-3 mt-5 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition"
              type="button"
            >
              Get in Touch
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Offer;
