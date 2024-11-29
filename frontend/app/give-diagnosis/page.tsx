"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Loading from "../components/Loading";

const DoctorDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [doctor, setDoc] = useState({
    name: "Vijesh",
    email: "vijesh@gmail.com",
    phone: "989878",
    spec: "optmal",
  });

  const diagnoses = [
    {
      id: 1,
      disease: "Hypertension",
      patientName: "Alice Smith",
      patientAvatar: "https://via.placeholder.com/50",
      contact: "+1 987 654 321",
    },
    {
      id: 2,
      disease: "Diabetes",
      patientName: "Bob Johnson",
      patientAvatar: "https://via.placeholder.com/50",
      contact: "+1 456 789 123",
    },
    {
      id: 3,
      disease: "Asthma",
      patientName: "Charlie Brown",
      patientAvatar: "https://via.placeholder.com/50",
      contact: "+1 321 654 987",
    },
  ];

  function generateDiagnosis() {
    
  }

  // Function to handle button click
  const handleGenerateDiagnosis = (diagnosis: any) => {
    alert(
      `Generating diagnosis for ${diagnosis.patientName} (${diagnosis.disease})`
    );
    // Add your custom logic here
  };
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("doctor")) {
      toast.info("Please register to continue");
      router.push("/register-doctor");
      return;
    }

    const doctor = JSON.parse(localStorage.getItem("doctor") || "");
    console.log(doctor);
    setDoc(doctor);
    setLoading(false);
  }, []);

  if(loading) return <Loading/>

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Doctor Profile */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/doctor-avatar-3d-icon-download-in-png-blend-fbx-gltf-file-formats--medical-medicine-profession-pack-people-icons-8179550.png?f=webp"
            alt="Doctor Avatar"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-semibold">{doctor.name}</h1>
            <p className="text-gray-600">{doctor.spec}</p>
            <p className="text-gray-600">{doctor.email}</p>
            <p className="text-gray-600">{doctor.phone}</p>
          </div>
        </div>
      </div>

      {/* Diagnoses List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Diagnoses</h2>
        <div className="space-y-4">
          {diagnoses.map((diagnosis) => (
            <div
              key={diagnosis.id}
              className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1430/1430453.png"
                alt={diagnosis.patientName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{diagnosis.disease}</h3>
                <p className="text-gray-600">{diagnosis.patientName}</p>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href={`tel:${diagnosis.contact}`}
                  className="text-blue-500 font-medium"
                >
                  {diagnosis.contact}
                </a>
                <button
                  onClick={() => handleGenerateDiagnosis(diagnosis)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Generate Diagnosis
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
