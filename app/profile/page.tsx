import React from 'react'
import ProfileLayout from './_layouts/profile-layout'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAccountByToken } from '@/data/account';
import Header from '@/components/header';
import Footer from '@/components/footer';

async function ProfilePage() {
  const cookie = await cookies();
  const token = cookie.get('auth')?.value;
  if (!token) redirect('/login');

  const res = await getAccountByToken(token, true);
  const account = res.data;
  if (!res.success) throw Error(res.message);
  if (!account) redirect('/404');

  return (
    <div>
      <Header scrolledEffect={false} token={token} />
      <ProfileLayout token={token} data={account} />
      <Footer />
    </div>
  )
}

export default ProfilePage