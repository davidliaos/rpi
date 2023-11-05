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
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [number, setNumber] = useState(0)
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
      setNumber(json_posts.points)
    })()
  }, [])
  console.log(data)
  return (
    <div className="">
      {data ? 
      <div className="">
        <div className="">
          <div className="flex items-center">
            <div>
              <CaretUpIcon 
                width={30} 
                height={30} 
                className={`cursor-pointer ${upvoted ? 'text-green-500' : ''}`} 
                onClick={() => {
                  setUpvoted(!upvoted);
                  if (downvoted) setDownvoted(false);
                  setNumber(number + 1)
                }}
              />
              <h3 className="ms-1">{number}</h3>
              <CaretDownIcon 
                width={30} 
                height={30} 
                className={`cursor-pointer ${downvoted ? 'text-red-500' : ''}`} 
                onClick={() => {
                  setDownvoted(!downvoted);
                  if (upvoted) setUpvoted(false);
                  setNumber(number - 1)
                }}
              />
            </div>
          <h1 className="text-2xl font-bold ms-4">{data.title}</h1>
            </div>
          <p>Posted: {data.created} | Username: N7bQ8sL2fX</p>
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
        </div>
        <div>
          <h1>3 Comments</h1>
        </div>
      </div> 

      : 
      <></>
      }
    </div>
  )
}