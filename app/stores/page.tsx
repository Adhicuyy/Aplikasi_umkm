import Button from '@/components/button'
import Card from '@/components/card';
import Footer from '@/components/footer';
import Header from '@/components/header'
import Rating from '@/components/rating';
import SearchFilter from '@/components/search-filter';
import { getAllAccounts } from '@/data/account';
import { SearchParams } from 'next/dist/server/request/search-params';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react'

async function StoresPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const cookie = await cookies();
  const token = cookie.get('auth')?.value;
  const q = (await searchParams).q || '';

  const res = await getAllAccounts();
  const stores = res.data || [];
  if (!res.success) throw Error(res.message);

  return (
    <div>
      <Header scrolledEffect={false} token={token} />
      <div className="bg-orange-500">
        <div className="container mx-auto px-4 py-36">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Featured Food Businesses
          </h1>
          <p className="text-white text-lg opacity-90 mb-6">
            Discover these exceptional culinary SMEs that have been handpicked for their unique offerings and customer satisfaction.
          </p>

          <SearchFilter
            placeholder="Search by store name"
            label="Search a stores"
            defaultValue={q as string}
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {stores.length} Results Found
          </h2>
        </div>

        {stores.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stores.map((stores) => (
              <Link href={`/stores/${stores.id}`} key={stores.email}>
                <Card
                  hoverable
                  className="h-full transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={stores.image!}
                      alt={stores.businessName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full capitalize">
                      {stores.status}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1 text-gray-800">{stores.businessName}</h3>

                    <div className="flex items-center mb-2">
                      <Rating value={stores.averageRating} size="sm" reviewCount={stores.totalReviews} />
                    </div>

                    <div className="mb-3">
                      <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full capitalize">
                        {stores.category}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-4">
                      {stores.description}
                    </p>

                    <div className="text-gray-500 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="block flex-1">{stores.address}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p>Stores is empty</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default StoresPage