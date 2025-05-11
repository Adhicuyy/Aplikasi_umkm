'use client'

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const featureList = [
  {
    title: "Find Nearby",
    description: "Discover local food businesses in your area",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
    ),
  },
  {
    title: "Rate & Review",
    description: "Share your culinary experiences with others",
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </>
    ),
  },
  {
    title: "Direct Contact",
    description: "Connect with owners via WhatsApp",
    icon: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </>
    ),
  },
];

function Hero() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/products?q=${encodeURIComponent(search.trim())}`);
  }

  return (
    <div className="relative bg-gray-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          filter: 'brightness(40%)',
        }}
      />

      <div className="relative container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          Discover Local <span className="text-orange-500">Culinary</span> Treasures
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Connect with authentic local food businesses around you and support small culinary entrepreneurs
        </p>

        <div className="w-full max-w-2xl bg-white rounded-full overflow-hidden flex items-center p-1.5 shadow-lg">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products"
            className="flex-grow py-3 px-4 text-gray-800 focus:outline-none"
          />
          <button
            type="button"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full py-3 px-8 transition-colors duration-200 flex items-center"
            onClick={handleSearch}
          >
            <Search size={20} className="mr-2" />
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl">
          {featureList.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-orange-500 rounded-full p-3 mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
