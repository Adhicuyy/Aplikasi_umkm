import React from 'react';

type RatingProps = {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
};

const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  size = 'md',
  showValue = true,
  reviewCount,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const starSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const roundedValue = Math.round(value * 10) / 10;

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center">
        {[...Array(max)].map((_, i) => {
          const starFill = i < Math.floor(value)
            ? 'text-yellow-400'
            : (i < Math.ceil(value) && i >= Math.floor(value))
              ? 'text-yellow-400' // half star, but we'll use full for simplicity
              : 'text-gray-300';

          return (
            <svg
              key={i}
              className={`${starSizes[size]} ${starFill} ${sizeClasses[size]}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
      </div>

      {showValue && (
        <span className={`ml-1 ${sizeClasses[size]} font-medium text-gray-700`}>
          {roundedValue}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className={`ml-1 ${sizeClasses[size]} text-gray-500`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default Rating;