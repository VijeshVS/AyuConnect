"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
  <div style={{
    backgroundImage: 'url("/dash.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  }} 
   className="h-screen bg-gray-100 min-h-screen flex flex-col items-center">
    <header className="header text-black bg-white w-full py-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold">Welcome to Ayu Connect</h1>
      <p className="text-base mt-2">Your trusted platform for connecting doctors and patients</p>
    </header>
    <section className="features justify-center items-center flex flex-col space-x-8 md:flex-row h-full w-full">
      <div className="feature bg-white shadow-md rounded-lg p-6 w-80 text-center">
        <h2 className="text-2xl font-semibold mb-2">Patient Portal</h2>
        <p className="text-gray-700">Get AI-powered diagnosis, find the best doctors, and manage your health records.</p>
        <button onClick={()=>router.push('/get-diagnosis')} className="mt-4 bg-[#ff787f] text-white py-2 px-4 rounded hover:bg-[#ff999e] transition duration-300">Get Diagnosis</button>
      </div>
      <div className="feature bg-white shadow-md rounded-lg p-6 w-80 text-center">
        <h2 className="text-2xl font-semibold mb-2">Doctors Portal</h2>
        <p className="text-gray-700">Manage your appointments, connect with patients, and grow your practice.</p>
        <button onClick={()=>router.push('/give-diagnosis')} className="mt-4 bg-[#ff787f] text-white py-2 px-4 rounded hover:bg-[#ff999e] transition duration-300">Give diagnosis</button>
      </div>
    </section>
    <footer className="text-black bg-white w-full py-4 flex justify-center">
      <p>&copy; 2024 Ayu Connect. All rights reserved.</p>
    </footer>
  </div>
  );
}
