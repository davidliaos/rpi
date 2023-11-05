"use client"
import { useEffect, useState } from "react"
import { CaretUpIcon, CaretDownIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { MagicWandIcon } from '@radix-ui/react-icons'

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
  const [aiText, setAiText] = useState("")
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
      const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [
            {
              "role": "system",
              "content": "You are an expert doctor and you are giving your opinion on a diagnosis"
            },
            {
              "role": "user",
              "content": JSON.stringify(json_posts)
            }
          ]
        })
      })

      const jsonGPT = await gptResponse.json()
      setAiText(jsonGPT.choices[0].message.content)
    })()
  }, [])
  return (
    <div className="">
      {data ? 
      <div className="pb-8">
        <div className="">
          <div className="flex items-center">
            <div>
              <CaretUpIcon width={30} height={30} className="cursor-pointer"/>
              <h3 className="ms-1">{data.points}</h3>
              <CaretDownIcon width={30} height={30} className="cursor-pointer"/>
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
          <div className="flex items-center mt-2">
            <p>Upload:</p>
            <Image className="ms-4" src="/images/eye.jpg" width={180} height={180} alt="alt" />
          </div>

          <div>
            {aiText === "" ? 
            <Image width={30} height={30} alt="alt" src="https://media.tenor.com/JeNT_qdjEYcAAAAj/loading.gif"/>
            : 
            <div className="border mt-4 p-4 rounded-lg">
              <div className="flex items-center">
                <p className="me-2">AI</p>
                <MagicWandIcon />
              </div>
              <p>{aiText}</p>
            </div>
            }
          </div>
        </div>
        <div>
          <h1 className="mt-16 font-bold italic">3 Comments</h1>
          <div className="mt-8 border p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Image className="rounded-full" alt="blah" width={30} height={30} src='https://avatars.githubusercontent.com/u/7940847'/>
              <h3 className="ms-4 font-bold">4mP6vZr9tQ</h3>
            </div>
            <p>It seems like a well-considered diagnosis. Migraines with aura, especially with a family history, are certainly plausible. However, considering her academic stress, it would also be worth evaluating for tension-type headaches, which can be exacerbated by stress factors. Cognitive-behavioral therapy could be beneficial alongside the neurology referral.</p>
          </div>
          <div className="mt-8 border p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Image className="rounded-full" alt="blah" width={30} height={30} src='https://avatars.githubusercontent.com/u/7940848'/>
              <h3 className="ms-4 font-bold">G5hR4vB2pX</h3>
            </div>
            <p>The diagnosis of migraine with aura is supported by the patient's history and family background. Given that the patient is a young adult, it might also be worth investigating lifestyle factors that could contribute to her symptoms. Adequate hydration, sleep, and a balanced diet are crucial, particularly for a student under stress. Has she noticed any specific triggers, such as caffeine or lack of sleep?</p>
          </div>
          <div className="mt-8 border p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Image className="rounded-full" alt="blah" width={30} height={30} src='https://avatars.githubusercontent.com/u/7940849'/>
              <h3 className="ms-4 font-bold">T8k6ZsQ1Hv</h3>
            </div>
            <p>Your diagnosis process seems thorough, but in addition to referring to neurology, have you considered an ophthalmologic evaluation? Sometimes visual stress can manifest as migraines with aura, and given that she's a student who likely spends a lot of time reading or in front of screens, ruling out eye strain or the need for vision correction might be valuable.</p>
          </div>
        </div>
      </div> 
      : 
      <></>
      }
    </div>
  )
}