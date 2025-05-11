import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

async function LayoutAuth({ children }: { children: React.ReactNode }) {
  const cookie = await cookies();
  const token = cookie.get('auth')?.value;

  if (!!token) redirect('/');

  return children;
}

export default LayoutAuth