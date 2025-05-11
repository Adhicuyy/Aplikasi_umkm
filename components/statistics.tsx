import React from 'react';
import Card from './card';

interface StatisticsProps {
  averageRating: number;
  totalReviews: number;
}

function Statistics({ averageRating, totalReviews }: StatisticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-white h-full">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Average Rating</h3>
            <div className="bg-yellow-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800">{averageRating.toFixed(1)}</div>
        </div>
      </Card>

      <Card className="bg-white h-full">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500 font-medium">Total Reviews</h3>
            <div className="bg-purple-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800">{totalReviews}</div>
        </div>
      </Card>
    </div>
  );
}

export default Statistics;
