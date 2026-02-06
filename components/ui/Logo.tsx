import React from "react";

interface LogoProps {
  className?: string;
  variant?: "color" | "white";
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "h-8",
  variant = "color",
  showText = true,
}) => {
  const textColor =
    variant === "white"
      ? "text-white"
      : "text-[#1e3a8a] dark:text-blue-400"; // Added dark mode support

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-square text-inherit"
      >
        <path
          d="M10.5 12C10.5 10.3431 11.8431 9 13.5 9H22L16 33H13.5C11.8431 33 10.5 31.6569 10.5 30V12Z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M22 9H28.5C30.1569 9 31.5 10.3431 31.5 12V16.5L18.5 20L22 9Z"
          fill="url(#paint1_linear)"
        />
        <path
          d="M16 14L22 9L23.5 14L18 31L16 14Z"
          fill="white"
          fillOpacity="0.2"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="10.5"
            y1="9"
            x2="22"
            y2="33"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="18.5"
            y1="20"
            x2="31.5"
            y2="9"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span className={`font-bold tracking-tight text-2xl ${textColor}`}>
          Tractus
        </span>
      )}
    </div>
  );
};

export default Logo;
