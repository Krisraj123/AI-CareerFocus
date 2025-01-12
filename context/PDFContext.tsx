"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

type PDFContextType = {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
};

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export function PDFProvider({ children }: { children: ReactNode }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <PDFContext.Provider value={{ selectedFile, setSelectedFile }}>
      {children}
    </PDFContext.Provider>
  );
}

export function usePDF() {
  const context = useContext(PDFContext);
  if (context === undefined) {
    throw new Error('usePDF must be used within a PDFProvider');
  }
  return context;
}