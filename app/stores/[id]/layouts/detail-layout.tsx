'use client'

import { Account, Product, Review } from '@/app/generated/prisma';
import ButtonWhatsapp from '@/components/button-whatsapp';
import ReviewCard from '@/components/card-review';
import CardUMKM from '@/components/card-umkm';
import Rating from '@/components/rating';

import { Mail, Map, Phone } from 'lucide-react';
import { useState } from 'react';
import AddReviewAlert from './add-review-alert';
import Button from '@/components/button';

type Reviews = (Review & {
  account: {
    ownerName: string;
    image: string | null;
    id: number;
    email: string;
  }
})[];

interface IProps {
  data: Account & {
    products?: Product[];
    reviews?: Reviews;
    averageRating: number;
    totalReviews: number;
  };
  token: string;
  yourEmail: string;
}

function DetailLayout({ data, token, yourEmail }: IProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'reviews' | 'about'>('products');
  const [reviews, setReviews] = useState<Reviews>(data.reviews || []);
  const [addReviewDisplay, setAddReviewDisplay] = useState(false);

  return (
    <div className="pt-10 md:pt-16">
      <div className="relative">
        <div
          className="w-full h-64 md:h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.image})` }}
        />

        <div className="container mx-auto px-4">
          <div className="bg-white rounded-t-3xl -mt-10 relative z-10 shadow-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold text-gray-800">{data.businessName}</h1>
                  <span className="ml-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {data.status}
                  </span>
                </div>

                <div className="flex items-center mt-2 mb-3">
                  <Rating value={data.averageRating} reviewCount={data.totalReviews} />
                </div>

                <div className="mb-4">
                  <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full capitalize">
                    {data.category}
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-0">
                <ButtonWhatsapp
                  phone={data.phone}
                  businessName={data.businessName}
                  size="lg"
                />
              </div>
            </div>

            <div className="flex items-center text-gray-600 mt-2">
              <Map size={18} className="mr-2" />
              <span>{data.address}</span>
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex overflow-x-auto">
                <button
                  className={`py-2 px-4 font-medium text-sm mr-4 border-b-2 whitespace-nowrap ${activeTab === 'products'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  onClick={() => setActiveTab('products')}
                >
                  Menu & Products
                </button>
                <button
                  className={`py-2 px-4 font-medium text-sm mr-4 border-b-2 whitespace-nowrap ${activeTab === 'reviews'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews ({(reviews || []).length})
                </button>
                <button
                  className={`py-2 px-4 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'about'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  onClick={() => setActiveTab('about')}
                >
                  About
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'products' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Menu & Products</h2>
            {(data.products || []).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(data.products || []).map((product) => (
                  <CardUMKM
                    key={product.id}
                    hiddenOwner
                    data={{
                      ...product,
                      averageRating: data.averageRating,
                      totalReviews: data.totalReviews,
                      account: {
                        businessName: data.businessName,
                        id: data.id,
                        image: data.image,
                        phone: data.phone,
                        status: data.status
                      }
                    }}
                  />
                ))}
              </div>
            ) : (
              <p>Products is empty</p>
            )}
          </>
        )}

        {activeTab === 'reviews' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Reviews</h2>
              <Button
                onClick={() => setAddReviewDisplay(true)}
                disabled={!!reviews.find((review) => review.account.email === yourEmail)}
              >
                Write a Review
              </Button>
            </div>

            {(reviews).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(reviews).map((review) => (
                  <ReviewCard
                    key={review.id}
                    data={review}
                  />
                ))}
              </div>
            ) : (
              <p>Reviews is empty</p>
            )}
          </>
        )}

        {activeTab === 'about' && (
          <>
            <h2 className="text-2xl font-bold mb-6">About {data.businessName}</h2>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Business Description</h3>
              <p className="text-gray-700 mb-6">
                {data.description}
              </p>

              <h3 className="text-xl font-semibold mb-4">Owner Information</h3>
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{data.ownerName}</p>
                  <p className="text-gray-600 text-sm">Business Owner</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="flex items-center mb-2">
                <Phone size={20} className="text-orange-500 mr-2" />
                <p className="text-gray-700">{data.phone}</p>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="text-orange-500 mr-2" />
                <p className="text-gray-700">{data.email}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <AddReviewAlert
        storeId={data.id}
        open={addReviewDisplay}
        onOpenChange={setAddReviewDisplay}
        token={token}
        onSuccessAdd={(data) => {
          setReviews((prev) => [data, ...prev])
        }}
      />
    </div>
  );
};

export default DetailLayout;