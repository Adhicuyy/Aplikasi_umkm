'use client'

import React, { useTransition } from 'react';
import { ChefHat, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas';
import { registerAccount } from '@/actions/register';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const [loading, startServer] = useTransition();
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    startServer(() => {
      registerAccount(data)
        .then((data) => {
          if (data.success) {
            toast.success(data.message);
            navigate.push('/login');
            reset();
          } else {
            toast.error(data.message);
          }
        });
    })
  };

  return (
    <div className="bg-gray-50">
      <div className="min-h-screen container mx-auto px-4 flex flex-col items-center justify-center py-10">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <ChefHat className="w-12 h-12 text-orange-500 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-gray-800">Register Your Food Business</h2>
              <p className="text-gray-600">Join our growing community of culinary entrepreneurs</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    {...register('email')}
                    className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
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

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register('password')}
                    className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    {...register('confirmPassword')}
                    className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
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
                Register Business
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
