"use client"

import { Button } from "@/components/ui/button"
import { Josefin_Sans } from 'next/font/google'
import { useTheme } from "next-themes"
import { useRouter } from 'next/navigation'
import Dark from '@/components/Dark'
import { useState } from 'react'

const jose = Josefin_Sans({weight: '700', subsets: ['latin'] })

export default function Home() {

  const { setTheme } = useTheme()
  const router = useRouter()
  const [showVirus, setShowVirus] = useState(false) 


  return (
    <div className="h-[100%] grid-background">
      <Dark />

      <img 
          src="/images/medverselogo.png" 
          alt="Logo" 
          className="absolute rounded-full w-[7%] h-[20] top-[34%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 mt-5 p-1 bg-black" 
      />

      <div className="relative">
        <img
          src="/images/doctors/doctor1.webp"
          alt="blah"
          className="absolute circle-animation rounded-full top-[500px] right-[300px] z-0 w-[100px] h-[100px] p-1 bg-black"
        />

 {showVirus && ( // conditionally render the image
          <img
            src="/images/virus.png"
            alt="asd"
            className="absolute rounded-full top-[300px] right-[200px] z-0 w-[100px] h-[100px]"
          />
        )}

        <img
          src="/images/doctors/doctor2.png"
          alt="asd"
          className="absolute circle-animation-reverse rounded-full top-[200px] w-[160px] h-[160px] right-[400px] z-0 p-1 bg-black"
        />
        <img
          src="/images/doctors/doctor3.png"
          alt="asd"
          className="absolute circle-animation rounded-full top-[400px] w-[120px] h-[120px] right-[630px] z-0 p-1 bg-black"
        />

        <img
          src="/images/doctors/doctor4.jpg"
          alt="asd"
          className="absolute circle-animation-reverse rounded-full top-[400px] w-[100px] h-[100px] right-[930px] z-0 p-1 bg-black"
        />

      <img
          src="/images/doctors/doctor5.jpg"
          alt="asd"
          className="absolute circle-animation rounded-full top-[200px] w-[130px] h-[130px] right-[1130px] z-0 p-1 bg-black"
        />

      <img
          src="/images/doctors/doctor6.jpg"
          alt="asd"
          className="absolute circle-animation-reverse rounded-full top-[600px] w-[150px] h-[150px] right-[1130px] z-0 p-1 bg-black"
        />
      </div>
      <div className="flex flex-col justify-center items-center h-[100%] z-10 relative col-span-3 row-span-3">
        <h1 className={"text-9xl block " + jose.className}>Medverse</h1>
        <div className="flex gap-8">
          <Button onClick={() => router.push('/sign-up')}>Sign up</Button>
          <Button variant="outline" onClick={() => router.push('/sign-in')}>Sign in</Button>
        </div>
        <Button 
          className="s-[2%] absolute bottom-1 right-1 opacity-0 hover:opacity-100" 
          onClick={() => setShowVirus(!showVirus)} 
        >
          Toggle Virus
        </Button>
      </div>
    </div>
  )
  
}