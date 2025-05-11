import { Review } from '@/app/generated/prisma';
import ReviewCard from '@/components/card-review'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

type Reviews = (Review & {
  account: {
    ownerName: string;
    image: string | null;
    id: number;
  }
})[];

interface IProps {
  data: Reviews;
}

function RecentReviews({ data }: IProps) {
  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Recent Reviews</h2>
          {data.length > 0 && (
            <Link href={`/stores/${data[0].accountId}`}>
              <button className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center">
                View All
                <ChevronRight size={16} className="ml-1" />
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="p-6 space-y-4">
        {data.length > 0 ? data.map((review) => (
          <ReviewCard
            key={review.id}
            data={review}
          />
        )) : (
          <p>Reviews is empty</p>
        )}
      </div>
    </div>
  )
}

export default RecentReviews