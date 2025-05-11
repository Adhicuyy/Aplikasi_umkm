import React from 'react'
import DetailLayout from './layouts/detail-layout'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAccountById } from '@/data/account';
import { Params } from 'next/dist/server/request/params';
import Header from '@/components/header';
import Footer from '@/components/footer';

async function DetailStorePage({ params }: { params: Promise<Params> }) {
  const cookie = await cookies();
  const token = cookie.get('auth')?.value;
  const id = (await params).id || '';
  if (!token) redirect('/login');
  if (isNaN(+id)) redirect('/404');

  const res = await getAccountById(+id, token);
  const account = res.data;
  if (!res.success) throw Error(res.message);
  if (!account) redirect('/404');

  return (
    <div>
      <Header scrolledEffect={false} token={token} />
      <DetailLayout data={account} token={token} yourEmail={res.yourEmail} />
      <Footer />
    </div>
  )
}

export default DetailStorePage