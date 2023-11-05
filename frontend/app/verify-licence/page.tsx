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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
    const [imageSrc, setImageSrc] = useState('');

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = function (loadEvent: any) {
            setImageSrc(loadEvent.target.result);
          };
    
          reader.readAsDataURL(file);
        }

        setTimeout(() => {
          router.push('/home')
        }, 3000)
      };
  return (
    <div className="flex items-center justify-center h-[100%]">
        <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Upload medical certification</CardTitle>
        <CardDescription>Click on the box below to upload your medical citification.</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Input className="cursor-pointer" id="picture" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
          {imageSrc && <img src={imageSrc} alt="Uploaded" />}
      </CardContent>
    </Card>
    </div>
  )
}