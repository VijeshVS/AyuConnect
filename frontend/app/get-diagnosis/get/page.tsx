"use client";
import Loading from "@/app/components/Loading";
import React, { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("Hi what problem are u facing");
  const [answer, setAnswer] = useState("");
  const [done, setDone] = useState(false);

  async function res() {
    const res = await axios.get('https://catfact.ninja/fact')
    console.log(res)
  }

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
              {question}
            </label>
            {done ? (
              <></>
            ) : (
              <>
                <input
                  type="text"
                  placeholder=""
                  id="patientName"
                  name="patientName"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="p-3 text-lg w-80 mb-5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={res}
                  className="px-6 py-3 text-lg bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Next
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default page;
