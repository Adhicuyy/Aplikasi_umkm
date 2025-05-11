'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from './button'

interface IProps {
  placeholder?: string;
  label?: string;
  defaultValue?: string;
}

function SearchFilter({ placeholder, label, defaultValue }: IProps) {
  const [search, setSearch] = useState(defaultValue || '')
  const router = useRouter()

  const handleSearch = () => {
    router.push(`?q=${encodeURIComponent(search.trim())}`);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="space-y-2">
        <label htmlFor="search" className="inline-block font-medium text-gray-700">
          {label}
        </label>
        <div className="w-full flex gap-4">
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
          />
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SearchFilter
