'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText } from 'lucide-react'
import { motion } from "framer-motion"

export default function CoverLetterGenerator() {
  const [companyName, setCompanyName] = useState('')
  const [jobPosition, setJobPosition] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [generatedLetter, setGeneratedLetter] = useState('')

  const generateCoverLetter = () => {
    const letter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobPosition} position at ${companyName}. After carefully reviewing the job description, I am confident that my skills and experience align well with the requirements of this role.

[Your generated cover letter content would appear here, tailored to the company, job position, and job description provided.]

Thank you for your consideration. I look forward to the opportunity to discuss how I can contribute to ${companyName}'s success.

Sincerely,
[Your Name]`

    setGeneratedLetter(letter)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link href="/" className="inline-flex items-center mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <FileText className="w-10 h-10 text-primary" />
              <div>
                <CardTitle className="text-3xl">Cover Letter Generator</CardTitle>
                <CardDescription>Create a tailored cover letter for your job application</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="companyName" className="text-sm font-medium">Company Name</label>
              <Input
                id="companyName"
                placeholder="e.g. Tech Innovations Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="jobPosition" className="text-sm font-medium">Job Position</label>
              <Input
                id="jobPosition"
                placeholder="e.g. Senior Software Engineer"
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="jobDescription" className="text-sm font-medium">Job Description</label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
            <Button onClick={generateCoverLetter} className="w-full">Generate Cover Letter</Button>
          </CardContent>
        </Card>
      </motion.div>

      {generatedLetter && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Generated Cover Letter</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedLetter}
                readOnly
                className="min-h-[300px] resize-none"
              />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

