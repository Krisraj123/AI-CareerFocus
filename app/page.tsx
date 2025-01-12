"use client";

import { useState } from "react";
import { Upload, FileText, BookOpen, UserCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { usePDF } from "@/context/PDFContext";

export default function Home() {
  const { selectedFile, setSelectedFile } = usePDF();
  const router = useRouter();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] opacity-5 mix-blend-overlay"></div>
      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              Career Document Assistant
            </h1>
            <p className="text-muted-foreground text-lg">
              Transform your career documents with AI-powered tools
            </p>
          </div>

          <Card className="p-8 border border-primary/10 bg-card/50 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-primary/25 rounded-lg p-8 transition-all hover:border-primary/50 hover:bg-primary/5">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer space-y-4 text-center">
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {selectedFile ? selectedFile.name : "Click to upload PDF"}
                    </p>
                    <p className="text-xs text-muted-foreground">PDF (max. 10MB)</p>
                  </div>
                </label>
              </div>

              {selectedFile && (
                <div className="grid gap-4 md:grid-cols-3 animate-in fade-in-50 duration-500">
                  <Card 
                    className="group p-6 hover:bg-primary/5 transition-all cursor-pointer border border-primary/10 hover:border-primary/20"
                    onClick={() => router.push('/cover-letter')}
                  >
                    <div className="space-y-4 text-center">
                      <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit group-hover:scale-110 transition-transform">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Cover Letter Generator</h3>
                        <p className="text-sm text-muted-foreground">
                          Create compelling cover letters
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card 
                    className="group p-6 hover:bg-primary/5 transition-all cursor-pointer border border-primary/10 hover:border-primary/20"
                    onClick={() => router.push('/resume-polisher')}
                  >
                    <div className="space-y-4 text-center">
                      <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit group-hover:scale-110 transition-transform">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Resume Polisher</h3>
                        <p className="text-sm text-muted-foreground">
                          Enhance your resume content
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card 
                    className="group p-6 hover:bg-primary/5 transition-all cursor-pointer border border-primary/10 hover:border-primary/20"
                    onClick={() => router.push('/career-advisor')}
                  >
                    <div className="space-y-4 text-center">
                      <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit group-hover:scale-110 transition-transform">
                        <UserCheck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Career Advisor</h3>
                        <p className="text-sm text-muted-foreground">
                          Get personalized career guidance
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}