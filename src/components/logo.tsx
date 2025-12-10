import Link from "next/link";
import React from "react";

type LogoProps = {
  className?: string;
  size?: number; // controls height of the mark in px
  color?: string; // CSS color for the mark and text (defaults to current color)
};

// Gramly logo component
// - Uses an inline SVG mark + text so it is easy to theme and scale
// - Tailwind-friendly: pass `className` to control layout
// - Defaults chosen to match a modern SaaS look

export default function Logo({ className = "", size = 32, color = "currentColor" }: LogoProps) {
  const height = size;
  const width = Math.round(size * 4.2); // wide enough to include text

  return (
    <div className={"inline-flex items-center gap-3 " + className} aria-hidden={false}>
      {/* Logo mark */}
      <svg
        width={height}
        height={height}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Gramly logo"
      >
        {/* circular gradient background */}
        <defs>
          <linearGradient id="g-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id="soft" x="-10%" y="-10%" width="120%" height="120%" filterUnits="objectBoundingBox">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feBlend in="SourceGraphic" in2="blur" mode="normal" />
          </filter>
        </defs>

        <rect width="64" height="64" rx="14" fill="url(#g-mark)" />

        {/* stylized "G" mark */}
        <path
          d="M42 20c-6.627 0-12 5.373-12 12s5.373 12 12 12c2.761 0 5.26-0.892 7.29-2.388" 
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M44 36h-6"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Text */}
      <Link href={"/"} className="inline-flex"></Link>
      <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0 mr-20">
        <span
          className="text-2xl font-extrabold tracking-tight"
          style={{ color }}
        >
          Gramly
        </span>
      </div>
    </div>
  );
}
