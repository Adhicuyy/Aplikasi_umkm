import React from 'react'
import CreateLayout from '../_layouts/create-layout'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Header from '@/components/header';
import Footer from '@/components/footer';

async function CreateProductPage() {
  const cookie = await cookies();
  const token = cookie.get('auth')?.value;
  if (!token) redirect('/login');

  return (
    <div>
      <Header scrolledEffect={false} token={token} />
      <CreateLayout token={token} />
      <Footer />
    </div>
  )
}

export default CreateProductPage