import React from 'react';
import Card from './card';
import Rating from './rating';
import { Review } from '@/app/generated/prisma';

type ReviewCardProps = {
  data: Review & {
    account: {
      ownerName: string;
      image: string | null;
    };
  };
};

const ReviewCard: React.FC<ReviewCardProps> = ({ data }) => {
  const formattedDate = new Date(data.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="h-full">
      <div className="p-4">
        <div className="flex items-start mb-4">
          <img
            src={data.account.image || '/default-avatar.png'}
            alt={data.account.ownerName}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <h4 className="font-medium text-gray-800">{data.account.ownerName}</h4>
            <div className="flex items-center">
              <Rating value={data.rating} showValue={false} size="sm" />
              <span className="text-gray-500 text-sm ml-2">{formattedDate}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600">{data.comment}</p>
      </div>
    </Card>
  );
};

export default ReviewCard;
