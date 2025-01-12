'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ArrowLeft, Briefcase } from 'lucide-react'
import { motion } from "framer-motion"

export default function CareerAdvisor() {
  const [positionApplied, setPositionApplied] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [careerAdvice, setCareerAdvice] = useState('')

  const getCareerAdvice = () => {
    const advice = `Career Advice for ${positionApplied}:

Based on the job description provided, here's some tailored advice for your application:

1. Key Skills: Focus on highlighting skills that directly match the job requirements.
2. Experience Alignment: Emphasize past experiences that are most relevant to this role.
3. Industry Knowledge: Demonstrate your understanding of the industry and company.
4. Unique Value Proposition: Clearly articulate what sets you apart from other candidates.
5. Application Strategy: Tailor your resume and cover letter to specifically address the job description.

Remember, your application should clearly show how your background and skills make you an ideal candidate for this ${positionApplied} position.`

    setCareerAdvice(advice)
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
              <Briefcase className="w-10 h-10 text-primary" />
              <div>
                <CardTitle className="text-3xl">Career Advisor</CardTitle>
                <CardDescription>Receive personalized career guidance and insights</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="positionApplied" className="text-sm font-medium">Position Applied</label>
              <Input
                id="positionApplied"
                placeholder="e.g. Senior Marketing Manager"
                value={positionApplied}
                onChange={(e) => setPositionApplied(e.target.value)}
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
            <Button onClick={getCareerAdvice} className="w-full">Get Career Advice</Button>
          </CardContent>
        </Card>
      </motion.div>

      {careerAdvice && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Career Advice</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={careerAdvice}
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

