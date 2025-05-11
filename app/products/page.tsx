import Button from '@/components/button'
import CardUMKM from '@/components/card-umkm'
import Footer from '@/components/footer'
import Header from '@/components/header'
import SearchFilter from '@/components/search-filter'
import { getAllProducts } from '@/data/product'
import { SearchParams } from 'next/dist/server/request/search-params'
import { cookies } from 'next/headers'
import React from 'react'

async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const cookie = await cookies();
  const token = cookie.get('auth')?.value;
  const q = (await searchParams).q || '';

  const res = await getAllProducts(q as string);
  const products = res.data || [];
  if (!res.success) throw Error(res.message);

  return (
    <div>
      <Header scrolledEffect={false} token={token} />
      <div className="bg-orange-500">
        <div className="container mx-auto px-4 py-36">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Explore Culinary Businesses
          </h1>
          <p className="text-white text-lg opacity-90 mb-6">
            Discover local food treasures from across various categories and locations
          </p>

          <SearchFilter
            placeholder="Search by name or keyword"
            label="Search a product"
            defaultValue={q as string}
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {products.length} Results Found
          </h2>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((products) => (
              <CardUMKM key={products.id} data={products} />
            ))}
          </div>
        ) : (
          <p>Products is empty</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ProductsPage