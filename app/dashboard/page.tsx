import React from 'react';
import { ChevronRight } from 'lucide-react';
import Statistics from '@/components/statistics';
import ReviewCard from '@/components/card-review';
import Header from '@/components/header';
import Footer from '@/components/footer';
import TableProducts from './_components/table-products';
import QuickActions from './_components/quick-actions';
import RecentReviews from './_components/recent-reviews';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAccountByToken } from '@/data/account';
import Link from 'next/link';
import { Account, Product, Review } from '../generated/prisma';

type Reviews = (Review & {
  account: {
    ownerName: string;
    image: string | null;
    id: number;
  }
})[];

type AccountResponse = Account & {
  products?: Product[];
  reviews?: Reviews;
  averageRating: number;
  totalReviews: number;
};

async function DashboardPage() {
  const cookie = await cookies();
  const token = cookie.get('auth')?.value;
  if (!token) redirect('/login');

  const res = await getAccountByToken(token);
  const account = res.data as AccountResponse;
  if (!res.success) throw Error(res.message);
  if (!account) redirect('/404');

  return (
    <div>
      <Header scrolledEffect={false} token={token} />
      <div className="bg-gray-100 min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {account.ownerName}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/profile">
                <button className="px-5 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200 cursor-pointer">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <img
                src={account.image!}
                alt={account.businessName}
                className="w-24 h-24 rounded-lg object-cover mr-6"
              />
              <div className="mt-4 md:mt-0">
                <div className="flex items-center">
                  <h2 className="text-xl font-bold text-gray-800">{account.businessName}</h2>
                  <span className="ml-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {account.status}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{account.address}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span
                    className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full capitalize"
                  >
                    {account.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Statistics totalReviews={account.totalReviews} averageRating={account.averageRating} />

          <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-6 mt-8">
            <RecentReviews data={account.reviews || []} />
            <QuickActions />
          </div>

          <TableProducts data={account.products || []} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;