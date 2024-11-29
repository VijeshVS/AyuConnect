"use client";
import React, { useState } from "react";
import Loading from "../components/Loading";

const page = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: 'url("/bg-patient.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col p-8 bg-white min-w-[300px] min-h-[200px] justify-center shadow-lg rounded-xl">
        {loading ? (
          <Loading />
        ) : (
          <>
            <h1 className="mb-5 text-3xl font-bold text-gray-800">
              Enter Patient Details
            </h1>
            <label htmlFor="patientName" className="mb-2 text-lg text-gray-700">
              What is your name?
            </label>
            <input
              type="text"
              placeholder="Enter your name..."
              id="patientName"
              name="patientName"
              className="p-3 text-lg w-80 mb-5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 text-lg bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
