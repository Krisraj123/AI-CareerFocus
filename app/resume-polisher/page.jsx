'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ArrowLeft, Wand2 } from 'lucide-react'
import { motion } from "framer-motion"

export default function ResumePolisher() {
  const [positionName, setPositionName] = useState('')
  const [polishInstructions, setPolishInstructions] = useState('')
  const [polishedResume, setPolishedResume] = useState('')

  const polishResume = () => {
    const resume = `Polished Resume for ${positionName}:

Polish Instructions: ${polishInstructions}

[Your polished resume would appear here, tailored to the position and following the given instructions.]`

    setPolishedResume(resume)
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
              <Wand2 className="w-10 h-10 text-primary" />
              <div>
                <CardTitle className="text-3xl">Resume Polisher</CardTitle>
                <CardDescription>Get AI-powered suggestions to enhance your resume</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="positionName" className="text-sm font-medium">Position Name</label>
              <Input
                id="positionName"
                placeholder="e.g. Senior Software Engineer"
                value={positionName}
                onChange={(e) => setPositionName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="polishInstructions" className="text-sm font-medium">Polish Instructions</label>
              <Textarea
                id="polishInstructions"
                placeholder="Enter specific instructions for polishing your resume..."
                value={polishInstructions}
                onChange={(e) => setPolishInstructions(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
            <Button onClick={polishResume} className="w-full">Polish Resume</Button>
          </CardContent>
        </Card>
      </motion.div>

      {polishedResume && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Polished Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={polishedResume}
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

