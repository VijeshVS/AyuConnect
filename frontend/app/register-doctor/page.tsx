"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [spec, setSpec] = useState("");
  const router = useRouter();

  function regDoc(e: any) {
    e.preventDefault(); // Prevent default form submission
    if (!name || !email || !phone || !spec) {
      toast.error("Please fill in all fields!"); // Validation feedback
      return;
    }

    // Save doctor details to local storage
    localStorage.setItem(
      "doctor",
      JSON.stringify({ name, email, phone, spec })
    );
    toast.success("Doctor registered successfully!");
    router.push("/give-diagnosis"); // Navigate to the next page
  }

  return (
    <div
      style={{
        backgroundImage: 'url("/bg-doctor.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex justify-center items-center min-h-screen bg-gray-100"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register Doctor</h1>
        <form onSubmit={regDoc}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="specialization"
              className="block text-gray-700 font-medium mb-2"
            >
              Specialization:
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded-lg hover:bg-[#ff999e] bg-[#ff787f] focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
