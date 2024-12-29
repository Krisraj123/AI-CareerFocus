
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Upload, FileText, Briefcase, Wand2, AlertCircle } from 'lucide-react';
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const applications = [
    {
      title: "Cover Letter Generator",
      description: "Create professional cover letters tailored to your experience",
      icon: FileText,
      color: "bg-blue-100",
      href: "/cover-letter"
    },
    {
      title: "Resume Polisher",
      description: "Get AI-powered suggestions to enhance your resume",
      icon: Wand2,
      color: "bg-purple-100",
      href: "/resume-polisher"
    },
    {
      title: "Career Advisor",
      description: "Receive personalized career guidance and insights",
      icon: Briefcase,
      color: "bg-green-100",
      href: "/career-advisor"
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file?.type === 'application/pdf') {
      setPdfUploaded(true);
      setFileName(file.name);
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Tools Dashboard</h1>
          <p className="text-lg text-gray-600">Enhance your job search with our AI-powered tools</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Upload Resume</h2>
              <p className="text-gray-600 mt-1">Upload your resume to unlock all features</p>
            </div>
            <Upload className="w-8 h-8 text-gray-400" />
          </div>

          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="flex-1 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg px-6 py-4 hover:border-gray-400 transition-colors"
            >
              <div className="text-center">
                <p className="text-gray-600">
                  {fileName || "Drop your PDF resume here or click to browse"}
                </p>
              </div>
            </label>
            <button
              onClick={() => document.getElementById('resume-upload').click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Files
            </button>
          </div>
        </div>

        {/* Alert */}
        {!pdfUploaded && (
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <p className="text-amber-700">Please upload your resume to access the tools below</p>
          </div>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app.title}
              className={`relative group ${
                pdfUploaded ? 'cursor-pointer' : 'opacity-50'
              }`}
            >
              {pdfUploaded ? (
                <Link href={app.href}>
                  <div className="h-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className={`${app.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                        <app.icon className="w-6 h-6 text-gray-700" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {app.title}
                      </h3>
                      <p className="text-gray-600">{app.description}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="h-full bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className={`${app.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <app.icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {app.title}
                    </h3>
                    <p className="text-gray-600">{app.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m0 0v2m0-2h2m-2 0H10"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}


