import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
      </div>
      <div className="p-6">
        <div className="w-full flex flex-col gap-4">
          <Link href="/product/create">
            <button className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="font-medium text-gray-800">Add New Product</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </Link>

          <Link href="/profile">
            <button className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-800">Update Profile</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default QuickActions