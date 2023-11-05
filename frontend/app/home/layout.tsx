"use client"

import { Josefin_Sans } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Dark from '@/components/Dark'


const jose = Josefin_Sans({weight: '700', subsets: ['latin'] })

export default function Home({
    children,
  }: {
    children: React.ReactNode
 }) {
    const pathname = usePathname()
  return (
    <div>
        <header className="border-b h-[60px] w-[100%] flex items-center">
            <Link href="/home" className={"ms-6 text-xl block  " + jose.className}>Medverse</Link>

            <div className='ms-[50px] w-[50%] relative'>
                <Input className=" ps-8"type="text" placeholder="Search" />

                <MagnifyingGlassIcon width={20} height={20} className='absolute top-2 left-2' />
            </div>

            <div className='flex gap-8 ms-[20%] items-center'>
                <Button variant="outline" size="icon" className="">
                    <EnvelopeClosedIcon width={20} height={20}/>
                </Button>
                <UserButton afterSignOutUrl='/'/>
                <Dark />
            </div>
        </header>

        <div className="flex min-h-wap w-[100%]">
            <div className="flex flex-col w-[20%] border-e min-h-[100%]">
                <Link href="/home" className={`h-[50px] flex items-center ms-4 ps-2 ${pathname == '/home' ? 'bg-slate-400/40 font-bold' : ''}`}>Home</Link>
                <Link href="/home/diagnoses" className={`h-[50px] flex items-center ms-4 ps-2 ${pathname.startsWith('/home/diagnoses') || pathname.startsWith('/home/diagnosis')  ? 'bg-slate-400/40 font-bold' : ''}`}>Diagnoses</Link>
                <Link href="/home/tags" className={`h-[50px] flex items-center ms-4 ps-2 ${pathname == '/home/tags' ? 'bg-slate-400/40 font-bold' : ''}`}>Tags</Link>
            </div>
            <div className="ms-8 mt-8 me-8 w-[100%]">
                {children}
            </div>
        </div>
    </div>
  )
}