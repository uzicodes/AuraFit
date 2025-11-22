'use client';

import { AuthProvider } from '@/Provider/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import Navbar from '@/Components/Shared/Navbar';
import Footer from '@/Components/Shared/Footer';
import '../src/index.css';
import '../src/App.css';
import '../src/button.css';

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <div className="min-h-[calc(100vh-216px)]">
              {children}
            </div>
            <Footer />
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
