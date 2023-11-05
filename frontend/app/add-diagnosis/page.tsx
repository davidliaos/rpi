"use client"

import { Josefin_Sans } from 'next/font/google'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import Dark from '@/components/Dark'
import { UserButton } from '@clerk/nextjs'
import {useForm} from 'react-hook-form'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Label } from "@/components/ui/label"
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'

const jose = Josefin_Sans({weight: '700', subsets: ['latin'] })

const FormSchema = z.object({
    title: z.string({required_error: "title required"}),
    patient_category: z.string({
        required_error: "Please select a patient category"
    }),
    gender: z.string().optional(),
    ethnicity: z.string().optional(),
    symptoms: z.string().min(30, {
        message: "symptom description is not long enough"
    }).max(300, {
        message: "symptom description is too long"
    }),
    patient_history: z.string().min(30, {
        message: "patient history description is not long enough"
    }).max(300, {
        message: "patient history description is too long"
    }).optional(),
    family_history: z.string().min(30, {
        message: "family history description is not long enough"
    }).max(300, {
        message: "family history description is too long"
    }).optional(),
    social_history: z.string().min(30, {
        message: "social history description is not long enough"
    }).max(300, {
        message: "social history description is too long"
    }).optional(),
    examination_findings: z.string().min(30, {
        message: "examination findings is not long enough"
    }).max(500, {
        message: "examination findings is too long"
    }).optional(),
    diagnosis: z.string().min(20, {
        message: "diagnosis is not long enough"
    }).max(500, {
        message: "diagnosis is too long"
    }),
})

export default function AddDiagnosis() {
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema)
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        try{
        await fetch(`http://localhost:3001/post`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data),
        })
        }catch(e) {
            console.log(e)
        }
    }

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
        <div className='flex h-wap items-center justify-center'>

        <Card className="w-[550px] max-h-[600px] overflow-y-scroll">
      <CardHeader>
        <CardTitle>Add diagnosis</CardTitle>
        <CardDescription>Enter detailed information about your diagnostic findings.</CardDescription>
      </CardHeader>
      <CardContent className="">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField 
        control={form.control}
        name="title"
        render={({field}) => (
            <FormItem>
              <FormLabel className="after:content-star after:text-red-600">Title</FormLabel>
              <Input {...field} placeholder="Title of the diagnosis" />
              <FormMessage />
            </FormItem>
        )}
        />
        <h1 className='text-xl font-bold'>Patient</h1>
        <FormField
          control={form.control}
          name="patient_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:content-star after:text-red-600">Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="patient category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="infant">Infant</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="adolescent">Adolescent</SelectItem>
                  <SelectItem value="adult">Adult</SelectItem>
                  <SelectItem value="elderly">Elderly</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="patient gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="trans">Trans</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ethnicity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ethnicity</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="patient ethnicity" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="african">African</SelectItem>
                  <SelectItem value="asian">Asian</SelectItem>
                  <SelectItem value="caucasian">Caucasian</SelectItem>
                  <SelectItem value="hispanic">Hispanic</SelectItem>
                  <SelectItem value="native_american">Native American</SelectItem>
                  <SelectItem value="pacific_islander">Pacific Islander</SelectItem>
                  <SelectItem value="middle_eastern">Middle Eastern</SelectItem>
                  <SelectItem value="mixed_race">Mixed Race</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <h1 className='text-xl font-bold'>Clinical Information</h1>
        <FormField 
        control={form.control}
        name="symptoms"
        render={({field}) => (
            <FormItem>
              <FormLabel className="after:content-star after:text-red-600">Symptoms</FormLabel>
              <Textarea {...field} placeholder="Description of patient symptoms" />
              <FormMessage />
            </FormItem>
        )}
        />
        <FormField 
        control={form.control}
        name="patient_history"
        render={({field}) => (
            <FormItem>
              <FormLabel>Patient history</FormLabel>
              <Textarea {...field} placeholder="Description of patient history" />
              <FormMessage />
            </FormItem>
        )}
        />
        <FormField 
        control={form.control}
        name="family_history"
        render={({field}) => (
            <FormItem>
              <FormLabel>Family history</FormLabel>
              <Textarea {...field} placeholder="Description of family history" />
              <FormMessage />
            </FormItem>
        )}
        />
        <FormField 
        control={form.control}
        name="social_history"
        render={({field}) => (
            <FormItem>
              <FormLabel>Social history</FormLabel>
              <Textarea {...field} placeholder="Description of social history" />
              <FormMessage />
            </FormItem>
        )}
        />
        <h1 className='text-xl font-bold'>Diagnosis</h1>
        <FormField 
        control={form.control}
        name="examination_findings"
        render={({field}) => (
            <FormItem>
              <FormLabel>Examination findings</FormLabel>
              <Textarea {...field} placeholder="Description of examination findings" />
              <FormMessage />
            </FormItem>
        )}
        />
        <FormField 
        control={form.control}
        name="diagnosis"
        render={({field}) => (
            <FormItem>
              <FormLabel className="after:content-star after:text-red-600">Diagnosis</FormLabel>
              <Textarea {...field} placeholder="Final diagnosis" />
              <FormMessage />
            </FormItem>
        )}
        />
        <div className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit">Post</Button>
        </div>
      </form>
    </Form>
      </CardContent>
    </Card>

        </div>
    </div>
  )
}