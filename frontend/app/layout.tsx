import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs";
import {dark, shadesOfPurple} from '@clerk/themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Medverse',
  description: 'Empowering Diagnostic Collaboration, Anonymously',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-[100%]'>
      <ClerkProvider appearance={{
        baseTheme: shadesOfPurple
      }}>
        <body className={"h-[100%] " + inter.className}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
            {children}
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  )
}
