'use client'

import React, { useTransition } from 'react';
import { ChefHat, LoaderCircle, Trash, Upload } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '@/schemas';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Account } from '@/app/generated/prisma';
import { updateProfile } from '@/actions/account';

interface IProps {
  token: string;
  data: Account;
}

function ProfileLayout({ token, data }: IProps) {
  const [loading, startServer] = useTransition();
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      address: data.address,
      businessName: data.businessName,
      category: data.category,
      description: data.description,
      email: data.email,
      ownerName: data.ownerName,
      phone: data.phone,
      image: data.image || ''
    }
  });

  const image = watch('image');

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    startServer(() => {
      updateProfile(data, token)
        .then((data) => {
          if (data.success) {
            toast.success(data.message);
            navigate.push('/dashboard');
            reset();
          } else {
            toast.error(data.message);
          }
        });
    })
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString();
      setValue("image", base64String); // ⬅️ set ke form
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-gray-50 pt-14 md:pt-20">
      <div className="min-h-screen container mx-auto px-4 flex flex-col items-center justify-center py-10">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <ChefHat className="w-12 h-12 text-orange-500 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
              <p className="text-gray-600">Join our growing community of culinary entrepreneurs</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                {!image ? (
                  <label className="w-full cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full border border-dashed border-gray-300 p-6 rounded-lg">
                      <Upload className="w-6 h-6 text-gray-500 mb-2" />
                      <p className="text-base text-gray-600">Click to upload an image</p>
                      <p className="text-xs text-gray-400 mt-1">Format JPG, PNG, SVG. Max 2MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={loading}
                    />
                  </label>
                ) : (
                  <div className="relative w-full h-[200px] border border-gray-300 border-dashed rounded-lg">
                    <img
                      src={image}
                      alt="preview"
                      className="h-full w-auto mx-auto object-contain rounded"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-red-500 text-white text-xl cursor-pointer hover:shadow-md transition"
                      onClick={() => setValue("image", "")}
                      disabled={loading}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    {...register('businessName')}
                    className={`w-full px-4 py-2 border ${errors.businessName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                  />
                  {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName.message}</p>}
                </div>

                <div>
                  <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    id="ownerName"
                    {...register('ownerName')}
                    className={`w-full px-4 py-2 border ${errors.ownerName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                  />
                  {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    disabled
                    {...register('email')}
                    className={`w-full px-4 py-2 border disabled:text-gray-300 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Address
                </label>
                <input
                  type="text"
                  id="address"
                  {...register('address')}
                  className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Category
                </label>
                <select
                  id="category"
                  {...register('category')}
                  className={`w-full px-4 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                >
                  <option value="">Select a category</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="cafe">Café</option>
                  <option value="street food">Street Food</option>
                  <option value="bakery">Bakery</option>
                  <option value="catering">Catering</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Description
                </label>
                <textarea
                  id="description"
                  {...register('description')}
                  rows={4}
                  className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>

              <Button type="submit" fullWidth disabled={loading} className="gap-2">
                {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
                Update
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
