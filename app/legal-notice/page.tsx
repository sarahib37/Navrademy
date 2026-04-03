import { Construction } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
    <Construction className="w-12 h-12 text-muted-foreground mb-4" />
    <h1 className="text-2xl font-heading font-bold text-foreground mb-2">This page is under construction</h1>
    <Link href="/" className="text-primary hover:underline mt-2">Go Home</Link>
  </div>
  )
}