export const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="26" height="26" rx="13" fill="currentColor" />
    <rect width="26" height="26" rx="13" stroke="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.3677 16.4319H11.624C11.4517 16.4319 11.3046 16.371 11.1828 16.2491C11.0609 16.1273 11 15.9802 11 15.8079V10.1923C11 10.02 11.0609 9.87295 11.1828 9.75111C11.3046 9.62928 11.4517 9.56836 11.624 9.56836C11.7963 9.56836 11.9433 9.62928 12.0652 9.75111C12.187 9.87295 12.2479 10.02 12.2479 10.1923V15.184H15.3677C15.54 15.184 15.6871 15.2449 15.8089 15.3667C15.9307 15.4886 15.9917 15.6356 15.9917 15.8079C15.9917 15.9802 15.9307 16.1273 15.8089 16.2491C15.6871 16.371 15.54 16.4319 15.3677 16.4319Z"
      fill="#4E4E4E"
    />
  </svg>
);

export const SliderHandle = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute left-0 top-0"
  >
    <circle cx="26" cy="26" r="26" fill="url(#paint0_linear)" />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="26"
        y1="0"
        x2="26"
        y2="52"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#A41580" />
        <stop offset="1" stopColor="#DC0277" />
      </linearGradient>
    </defs>
  </svg>
);
