// src/components/ui/StarRating.tsx
'use client';

import React from 'react';
import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  max?: number;
  size?: number;
  color?: string;      // color of filled stars
  emptyColor?: string; // color of empty outline
  readOnly?: boolean;
  onChange?: (value: number) => void;
  className?: string;
};

export function StarRating({
  rating,
  max = 5,
  size = 22,
  color = '#facc15',       // Tailwind yellow-400
  emptyColor = '#d1d5db',  // Tailwind gray-300
  readOnly = true,
  onChange,
  className = '',
}: StarRatingProps) {
  const [hover, setHover] = React.useState<number | null>(null);

  const displayValue = hover ?? rating;
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {stars.map((i) => {
        const fillPercent = Math.min(Math.max(displayValue - (i - 1), 0), 1);

        return (
          <span
            key={i}
            className="relative"
            style={{
              width: size,
              height: size,
              cursor: readOnly ? 'default' : 'pointer',
              display: 'inline-block',
            }}
            onMouseEnter={() => !readOnly && setHover(i)}
            onMouseLeave={() => !readOnly && setHover(null)}
            onClick={() => !readOnly && onChange?.(i)}
          >
            {/* EMPTY STAR (outline) */}
            <Star
              size={size}
              strokeWidth={1.8}
              className="absolute inset-0"
              style={{ color: emptyColor }}
            />

            {/* FULL STAR (filled) */}
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: fillPercent * 100 + '%' }}
            >
              <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill={color}
                stroke={color}
                strokeWidth="1.5"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 
                  9.24l-7.19-.61L12 2 9.19 8.63 
                  2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </span>
          </span>
        );
      })}
    </div>
  );
}
