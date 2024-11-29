"use client";
import { useRouter } from "next/navigation";
import React from "react";

const GetDiagnosisPage: React.FC = () => {
  const router = useRouter();
  return (
    <div
      style={{
        backgroundImage: 'url("/bg-patient.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex flex-col items-center justify-center h-screen"
    >
      <div className="text-black bg-white flex flex-col p-8 rounded-xl items-center">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold mb-4">
            Welcome to the Health Portal
          </h1>
          <p className="text-lg opacity-80">
            Get accurate diagnosis and manage your health with ease.
          </p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => router.push("/get-diagnosis/portal")}
            className="m-2 p-4 text-lg bg-[#ff787f] text-white rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-[#ff999e] focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Portal
          </button>
          <button
            onClick={() => router.push("/get-diagnosis/get")}
            className="m-2 p-4 text-lg hover:bg-[#ff999e] text-white rounded-lg shadow-lg transform transition-transform hover:scale-105 bg-[#ff787f] focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Get Diagnosis 
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetDiagnosisPage;
