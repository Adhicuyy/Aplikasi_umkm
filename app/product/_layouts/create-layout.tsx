'use client'

import React, { useTransition } from 'react';
import { ChefHat, LoaderCircle, Trash, Upload } from 'lucide-react';
import Button from '@/components/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/schemas';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createProduct } from '@/actions/product';

interface IProps {
  token: string;
}

function CreateLayout({ token }: IProps) {
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
    resolver: zodResolver(productSchema),
  });

  const image = watch('image');

  const onSubmit = (data: z.infer<typeof productSchema>) => {
    startServer(() => {
      createProduct(data, token)
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
              <h2 className="text-2xl font-bold text-gray-800">Create Your Product</h2>
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
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={image}
                      alt="preview"
                      fill
                      className="object-contain rounded"
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    inputMode="numeric"
                    {...register('price')}
                    className={`w-full px-4 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                  />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  {...register('tags')}
                  placeholder="Example: Manis,Masakan Padang,Gurih"
                  className={`w-full px-4 py-2 border ${errors.tags ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
                />
                {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
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
                Create Product
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLayout;
