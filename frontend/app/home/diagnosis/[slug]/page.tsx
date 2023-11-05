"use client"
import { useEffect, useState } from "react"
import { CaretUpIcon, CaretDownIcon } from '@radix-ui/react-icons'

interface DataModel {
  title: String,
  patient: {
    category: String,
    gender: String,
    ethnicity: String,
  },
  clinical_information: {
    symptoms: String,
    patient_history: String,
    family_history: String,
    social_history: String
  },
  diagnosis: {
    examination_findings: String,
    diagnosis: String
  }
  created: String,
  points: number
}

export default function Diagnoses({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<DataModel>()
  useEffect(() => {
    (async () => {
      const posts = await fetch('http://localhost:3001/query-by-title', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: params.slug
        })
      })
      const json_posts = await posts.json()
      setData({...json_posts.data, points: json_posts.points, created: json_posts.createdAt})
    })()
  }, [])
  console.log(data)
  return (
    <div>
      {data ? 
      <>
        <div className="flex items-center">
          <div>
            <CaretUpIcon width={30} height={30} className="cursor-pointer"/>
            <h3 className="ms-1">{data.points}</h3>
            <CaretDownIcon width={30} height={30} className="cursor-pointer"/>
          </div>
          <h1 className="text-2xl font-bold ms-4">{data.title}</h1>
        </div>
        <p>Posted: {data.created}</p>
        <h2 className="text-xl font-bold mt-8">Patient</h2>
        <p>Category: {data.patient.category}</p>
        <p>Gender: {data.patient.gender}</p>
        <p>Ethnicity: {data.patient.ethnicity}</p>
        <h2 className="text-xl font-bold mt-8">Clinical Information</h2>
        <p>Patient history: {data.clinical_information.patient_history}</p>
        <p>Family history: {data.clinical_information.family_history}</p>
        <p>Social history: {data.clinical_information.social_history}</p>
        <h2 className="text-xl font-bold mt-8">Diagnosis</h2>
        <p>Elimination findings history: {data.diagnosis.examination_findings}</p>
        <p>Diagnosis history: {data.diagnosis.diagnosis}</p>
      </> 
      : 
      <></>
      }
    </div>
  )
}