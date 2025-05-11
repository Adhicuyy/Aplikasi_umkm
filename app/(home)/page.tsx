import React from 'react'
import Featured from './_layouts/featured'
import Hero from './_layouts/hero'
import Header from '@/components/header'
import { cookies } from 'next/headers'
import Footer from '@/components/footer'

async function HomePage() {
  const cookie = await cookies();
  const token = cookie.get('auth')?.value;

  return (
    <div>
      <Header token={token} />
      <Hero />
      <Featured />
      <Footer />
    </div>
  )
}

export default HomePage