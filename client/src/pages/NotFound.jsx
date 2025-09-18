import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold">404</h2>
        <p className="mt-2 text-slate-600">Page not found.</p>
        <Link to="/" className="mt-4 inline-block text-primary-600">Go home</Link>
      </div>
    </div>
  )
}