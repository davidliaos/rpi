"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()
  return (
    <div>
        <div className="flex justify-between w-[100%]">
            <h1 className="text-4xl">Top Diagnoses</h1>
            <Button onClick={() => router.push('/add-diagnosis')}>Add Diagnosis</Button>
        </div>
    </div>
  )
}