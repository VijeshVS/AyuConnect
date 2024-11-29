"use client";
import React, { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";

const patientInfoMock = {
  patient_name: "John Doe",
  patient_sex: "Male",
  patient_age: 45,
  disease_predicted_1: "Diabetes",
  disease_predicted_2: "Hypertension",
  disease_predicted_3: "Asthma",
  symptom_list: ["Fatigue", "Shortness of breath", "Increased thirst"],
  conversation_list: [
    "Discussed high blood sugar levels on 2023-01-15",
    "Follow-up on medication adherence on 2023-02-10",
    "Reported symptoms of breathlessness on 2023-03-20",
  ],
  medicines: "Metformin, Amlodipine, Salbutamol Inhaler",
};

type PatientInfo = {
  patient_name: string;
  patient_sex: string;
  patient_age: number;
  disease_predicted_1: string;
  disease_predicted_2: string;
  disease_predicted_3: string;
  symptom_list: string[];
  conversation_list: string[];
  medicines: string;
};



const PatientInfoComponent: React.FC = () => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>(patientInfoMock);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const patient = JSON.parse(localStorage.getItem('patient') || "");
    setPatientInfo(patient)
  },[])

  const fetchPatientInfo = () => {
    // api call
    setLoading(false);
  };

  const [medicines, setMedicines] = useState("");
  const [list, setList] = useState<string[]>([]);

  if (loading) <Loading />;

  return (
    <div
      className="py-8"
      style={{
        backgroundImage: 'url("/bg-patient.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Patient Information
          </h1>
          <p className="text-gray-600">Overview of patient's medical data</p>
        </div>

        {/* Patient Details */}
        <div className="bg-white p-4 rounded-md shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Basic Information
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <p>
              <span className="font-medium text-gray-800">Name:</span>{" "}
              {patientInfo.patient_name}
            </p>
            <p>
              <span className="font-medium text-gray-800">Sex:</span>{" "}
              {patientInfo.patient_sex}
            </p>
            <p>
              <span className="font-medium text-gray-800">Age:</span>{" "}
              {patientInfo.patient_age}
            </p>
          </div>
        </div>

        {/* Predicted Diseases */}
        <div className="bg-white p-4 rounded-md shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Predicted Diseases
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>{patientInfo.disease_predicted_1}</li>
            <li>{patientInfo.disease_predicted_2}</li>
            <li>{patientInfo.disease_predicted_3}</li>
          </ul>
        </div>

        {/* Symptoms */}
        <div className="bg-white p-4 rounded-md shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Symptoms</h2>
          <ul className="list-disc list-inside text-gray-600">
            {patientInfo.symptom_list.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </div>

        {/* Conversations */}
        <div className="bg-white p-4 rounded-md shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Conversations
          </h2>
          <ul className="space-y-2 text-gray-600">
            {patientInfo.conversation_list.map((conversation, index) => (
              <li key={index} className="p-2 bg-gray-100 rounded-md shadow-sm">
                {conversation}
              </li>
            ))}
          </ul>
        </div>
        {/* Medicines */}
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Medicines
          </h2>
          <p className="text-gray-600">{list.join(", ")}</p>
        </div>
        <div className="bg-white mt-8 p-4 rounded-xl shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Remarks</h2>
          
        </div>
        <div className="flex justify-center mt-4">
        </div>
      </div>
    </div>
  );
};

export default PatientInfoComponent;
