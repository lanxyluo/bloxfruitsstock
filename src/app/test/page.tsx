'use client'

import React from 'react'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold text-foreground mb-4">
        Test Page
      </h1>
      <p className="text-xl text-muted-foreground">
        This is a simple test page to verify basic functionality.
      </p>
      <div className="mt-8">
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Go to Home
        </a>
      </div>
    </div>
  )
}

