
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";
import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <main className="min-h-screen py-8">
          <Provider>
          {children}
          </Provider>
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}
