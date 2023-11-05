"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
  points: number
}

export default function Home() {
    const router = useRouter()
    const [data, setData] = useState<DataModel[]>([])
    useEffect(() => {
      (async () => {
        const posts = await fetch('http://localhost:3001/top-posts')
        const json_posts = await posts.json()
        console.log(json_posts.map((data: any) => {return {...data.data, points: data.points}}))
        setData(json_posts.map((data: any) => {return {...data.data, points: data.points}}))
      })()
    }, [])

  return (
    <div>
        <div className="flex justify-between w-[100%]">
            <h1 className="text-4xl">Top Diagnoses</h1>
            <Button onClick={() => router.push('/add-diagnosis')}>Add Diagnosis</Button>
        </div>
        <div>
          {data.length === 0 ? 
          <></>
          : 
          <>
          {data.map((data) => (
            <Card className="mt-8 cursor-pointer hover:bg-slate-500" onClick={() => {router.push(`/home/diagnosis/${data.title}`)}}>
              <CardHeader>
                <CardTitle>{data.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <h1>Votes: {data.points}</h1>
              </CardContent>
            </Card>
          ))}
          </>
          
          
          
          }
        
        </div>
    </div>
  )
}