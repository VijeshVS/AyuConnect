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
    {
      patient_name: "Robert Brown",
      patient_sex: "Male",
      patient_age: 60,
      disease_predicted_1: "COPD",
      disease_predicted_2: "Arthritis",
      disease_predicted_3: "Heart Disease",
      symptom_list: ["Chronic cough", "Joint pain", "Shortness of breath"],
      conversation_list: [
        "Discussed smoking cessation on 2023-01-30",
        "Follow-up on heart health on 2023-04-05",
        "Reported worsening knee pain on 2023-07-15",
      ],
      medicines: "Tiotropium, Ibuprofen, Aspirin",
    },
    {
      patient_name: "Emily Davis",
      patient_sex: "Female",
      patient_age: 29,
      disease_predicted_1: "PCOS",
      disease_predicted_2: "Migraines",
      disease_predicted_3: "Anxiety",
      symptom_list: [
        "Irregular periods",
        "Frequent headaches",
        "Nausea",
        "Mood swings",
      ],
      conversation_list: [
        "Discussed hormonal imbalance on 2023-03-12",
        "Follow-up on migraine treatment on 2023-05-15",
        "Reported increased anxiety on 2023-08-09",
      ],
      medicines: "Metformin, Sumatriptan, Clonazepam",
    },
    {
      patient_name: "Michael Johnson",
      patient_sex: "Male",
      patient_age: 50,
      disease_predicted_1: "Type 2 Diabetes",
      disease_predicted_2: "Hyperlipidemia",
      disease_predicted_3: "Sleep Apnea",
      symptom_list: [
        "Increased hunger",
        "Frequent urination",
        "Fatigue",
        "Snoring",
      ],
      conversation_list: [
        "Discussed lifestyle changes for diabetes on 2023-02-25",
        "Follow-up on cholesterol levels on 2023-04-20",
        "Reported sleep disturbances on 2023-06-30",
      ],
      medicines: "Glipizide, Atorvastatin, CPAP machine",
    },
    {
      patient_name: "Sarah Lee",
      patient_sex: "Female",
      patient_age: 33,
      disease_predicted_1: "Endometriosis",
      disease_predicted_2: "Chronic Pelvic Pain",
      disease_predicted_3: "Anxiety",
      symptom_list: ["Pelvic pain", "Heavy menstrual bleeding", "Fatigue"],
      conversation_list: [
        "Discussed treatment options for endometriosis on 2023-01-10",
        "Follow-up on pelvic pain management on 2023-03-18",
        "Reported irregular cycles on 2023-06-22",
      ],
      medicines: "Naproxen, Birth control pills, Clonazepam",
    },
    {
      patient_name: "David Clark",
      patient_sex: "Male",
      patient_age: 40,
      disease_predicted_1: "Gout",
      disease_predicted_2: "Obesity",
      disease_predicted_3: "Hypertension",
      symptom_list: [
        "Joint pain",
        "Swelling in feet",
        "Headaches",
        "Shortness of breath",
      ],
      conversation_list: [
        "Discussed weight management on 2023-02-01",
        "Follow-up on gout flare-ups on 2023-03-30",
        "Reported worsening headaches on 2023-05-18",
      ],
      medicines: "Allopurinol, Lisinopril, Furosemide",
    },
  ];

  function generateDiagnosis() {}

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

  if (loading) return <Loading />;

  return (
    <div
      style={{
        backgroundImage: 'url("/bg-doctor.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen bg-gray-100 py-12 px-24"
    >
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
          {diagnoses.map((diagnosis, index) => (
            <div
              key={diagnosis.patient_name}
              className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1430/1430453.png"
                alt={diagnosis.patient_name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">
                  {diagnosis.disease_predicted_1}
                </h3>
                <p className="text-gray-600">{diagnosis.patient_name}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "patient",
                      JSON.stringify(diagnoses[index])
                    );
                    router.push("/give-diagnosis/generate");
                  }}
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
