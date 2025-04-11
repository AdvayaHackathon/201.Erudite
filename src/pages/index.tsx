import React from 'react';
import Head from 'next/head';
import HealthMonitor from '../components/HealthMonitor';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Health Monitor</title>
        <meta name="description" content="Real-time health monitoring using webcam" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Health Monitor
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          This application uses your webcam to monitor vital signs including heart rate,
          respiratory rate, and stress levels in real-time using remote photoplethysmography (rPPG).
        </p>
        
        <HealthMonitor />
      </main>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Health Monitor. All rights reserved.</p>
      </footer>
    </div>
  );
} 