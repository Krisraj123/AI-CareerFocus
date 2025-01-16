"use client";

import { useState, useRef } from "react";
import { UserCheck, ArrowLeft, Target, FileSearch, Send, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { usePDF } from "@/context/PDFContext";

export default function CareerAdvisor() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const { selectedFile } = usePDF();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append('pdf', selectedFile as Blob);

    try {
      const response = await fetch('https://nameisjack-career-coach.hf.space/career_advisor', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setResult(data.career_advisor);
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      setResult("An error occurred while generating career advice. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] opacity-5 mix-blend-overlay"></div>
      <div className="container mx-auto px-4 py-16 relative">
        <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card className="max-w-2xl mx-auto p-8 border border-primary/10 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary/10 rounded-full p-3">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Career Advisor</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Target className="h-4 w-4" />
                <span className="text-sm">Target Position</span>
              </div>
              <Input name="position" placeholder="Position Name" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <FileSearch className="h-4 w-4" />
                <span className="text-sm">Job Details</span>
              </div>
              <Textarea
                name="description"
                placeholder="Job Description"
                className="min-h-[200px]"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              <Send className="mr-2 h-4 w-4" />
              {isLoading ? "Analyzing..." : "Get Career Advice"}
            </Button>
          </form>

          {result && (
            <div ref={resultRef} className="mt-8 pt-8 border-t border-primary/10">
              <h2 className="text-xl font-semibold mb-4">Career Advice</h2>
              <div className="bg-primary/5 p-6 rounded-lg">
                <p className="whitespace-pre-wrap">{result}</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
