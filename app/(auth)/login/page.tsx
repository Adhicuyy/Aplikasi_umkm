'use client';

import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChefHat, LoaderCircle } from 'lucide-react';
import Button from '@/components/button';
import Link from 'next/link';
import { loginSchema } from '@/schemas';
import { loginAccount } from '@/actions/login';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [loading, startServer] = useTransition();
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    startServer(() => {
      loginAccount(data)
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

  return (
    <div className="bg-gray-50">
      <div className="min-h-screen container mx-auto px-4 flex flex-col items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-8 py-12">
            <div className="text-center mb-8">
              <ChefHat className="w-12 h-12 text-orange-500 mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-600">Sign in to manage your food business</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register('password')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your password"
                />
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
              </div>

              <Button type="submit" fullWidth disabled={loading} className="gap-2">
                {loading && <LoaderCircle className="w-4 h-4 animate-spin" />}
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                  Register your business
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
