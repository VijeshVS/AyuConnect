"use client";
import { useRouter } from "next/navigation";
import React from "react";

const diagnoses = [
  {
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
  },
  {
    patient_name: "Jane Smith",
    patient_sex: "Female",
    patient_age: 38,
    disease_predicted_1: "Hyperthyroidism",
    disease_predicted_2: "Anxiety",
    disease_predicted_3: "Chronic Fatigue Syndrome",
    symptom_list: ["Rapid heartbeat", "Weight loss", "Anxiety", "Tiredness"],
    conversation_list: [
      "Discussed anxiety management on 2023-02-05",
      "Follow-up on thyroid function tests on 2023-04-11",
      "Reported persistent fatigue on 2023-06-22",
    ],
    medicines: "Methimazole, Sertraline, Vitamin D",
  },
];

const DiagnosisList: React.FC = () => {
  const router = useRouter();
  return (
    <div
      style={{
        backgroundImage: 'url("/bg-patient.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-5"
    >
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Requested Diagnoses
        </h1>
        <ul className="space-y-4">
          {diagnoses.map((diagnosis, index) => (
            <li
              key={diagnosis.patient_name}
              className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {diagnosis.disease_predicted_1}
              </h2>

              <button
                onClick={() => {
                  localStorage.setItem("d", JSON.stringify(diagnoses[index]));
                  router.push("/get-diagnosis/view");
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                View Diagnosis
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiagnosisList;
