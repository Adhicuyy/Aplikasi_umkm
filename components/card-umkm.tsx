'use client'

import React from 'react';
import Card from './card';
import Rating from './rating';
import ButtonWhatsapp from './button-whatsapp';
import { Product } from '@/app/generated/prisma';
import Link from 'next/link';

interface IProps {
  data: Product & {
    averageRating: number;
    totalReviews: number;
    account: {
      id: number;
      businessName: string;
      image: string | null;
      status: string;
      phone: string;
    };
  };
  hiddenOwner?: boolean;
}

function CardUMKM({ data, hiddenOwner }: IProps) {
  const account = data.account;

  return (
    <Card className="h-full flex flex-col">
      <div className="relative">
        <img
          src={data.image!}
          alt={data.name}
          className="w-full h-52 object-cover"
        />
        {!hiddenOwner && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full capitalize">
            {account.status}
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-1 text-gray-800">
          {data.name}
        </h3>

        <div className="mb-3 flex flex-wrap gap-1">
          {data.tags?.split(',').map((tag, index) => (
            <span
              key={index}
              className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full capitalize"
            >
              {tag.trim()}
            </span>
          ))}
        </div>

        <div className="flex-1">
          <p className="text-gray-600 text-sm mb-4">
            {data.description || 'Tidak ada deskripsi tersedia.'}
          </p>
        </div>

        {!hiddenOwner && (
          <div className="w-full flex items-center gap-4 mb-3">
            <div className="w-12 aspect-square rounded-full bg-gray-200 overflow-hidden">
              <img
                src={account.image!}
                alt="profile image"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <Link
                href={`/umkm/${account.id}`}
                className="text-sm font-semibold hover:underline"
              >
                {account.businessName}
              </Link>
              <div className="flex items-center">
                <Rating
                  value={data.averageRating}
                  reviewCount={data.totalReviews}
                />
              </div>
            </div>
          </div>
        )}

        <ButtonWhatsapp
          phone={account.phone || ''}
          businessName={account.businessName}
          fullWidth
          className="mt-2"
        />
      </div>
    </Card>
  );
}

export default CardUMKM;
