'use client'

import { deleteProduct } from '@/actions/product';
import { Product } from '@/app/generated/prisma'
import { Trash } from 'lucide-react'
import React, { useTransition } from 'react'
import { toast } from 'sonner';

interface IProps {
  data: Product[];
}

function TableProducts({ data }: IProps) {
  const [loading, startServer] = useTransition();

  const handleDelete = (id: number) => {
    const toastId = toast.loading('Deleting...');
    startServer(() => {
      deleteProduct(id)
        .then((data) => {
          toast.dismiss(toastId);
          if (data.success) {
            toast.success(data.message);
            window.location.reload();
          } else {
            toast.error(data.message);
          }
        });
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-md mt-8">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Products</h2>
        </div>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.length > 0 && data.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-md object-cover" src="https://images.pexels.com/photos/7426867/pexels-photo-7426867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">Rp {product.price}</p>
                  </td>
                  <td className="px-6 py-4 max-w-[100px] md:max-w-[200px]">
                    <p className="text-sm text-gray-900">{product.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-full flex flex-wrap gap-2 items-center">
                      {product.tags?.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full capitalize"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      className="text-orange-500 hover:text-orange-600 disabled:opacity-50 cursor-pointer"
                      onClick={() => handleDelete(product.id)}
                      disabled={loading}
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TableProducts