"use client"

import { Button } from "@/components/ui/button"
import { Josefin_Sans } from 'next/font/google'
import { useTheme } from "next-themes"
import { useRouter } from 'next/navigation'
import Dark from '@/components/Dark'


const jose = Josefin_Sans({weight: '700', subsets: ['latin'] })

export default function Home() {

  const { setTheme } = useTheme()
  const router = useRouter()

  return (
    <div className="h-[100%]">
      <Dark />

      <div className="relative">
        <img
          src="/images/doctors/doctor1.webp"
          alt="blah"
          className="absolute circle-animation rounded-full top-[500px] right-[300px] z-0 w-[100px] h-[100px]"
        />
        <img
          src="/images/doctors/doctor2.png"
          alt="asd"
          className="absolute circle-animation-reverse rounded-full top-[200px] w-[100px] h-[100px] right-[400px] z-0"
        />
        <img
          src="/images/doctors/doctor3.png"
          alt="asd"
          className="absolute circle-animation rounded-full top-[400px] w-[100px] h-[100px] right-[630px] z-0"
        />

        <img
          src="/images/doctors/doctor4.jpg"
          alt="asd"
          className="absolute circle-animation-reverse rounded-full top-[400px] w-[100px] h-[100px] right-[930px] z-0"
        />

      <img
          src="/images/doctors/doctor5.jpg"
          alt="asd"
          className="absolute circle-animation rounded-full top-[200px] w-[100px] h-[100px] right-[1130px] z-0"
        />

      <img
          src="/images/doctors/doctor6.jpg"
          alt="asd"
          className="absolute circle-animation-reverse rounded-full top-[600px] w-[100px] h-[100px] right-[1130px] z-0"
        />
      </div>
      
      <div className="flex flex-col justify-center items-center h-[100%] z-10 relative">
        <h1 className={"text-9xl block " + jose.className}>Medverse</h1>
        <div className="flex gap-8">
          <Button onClick={() => router.push('/sign-up')}>Sign up</Button>
          <Button variant="outline" onClick={() => router.push('/sign-in')}>Sign in</Button>
        </div>
      </div>
    </div>
  )
}
