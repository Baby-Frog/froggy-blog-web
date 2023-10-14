const ExploreIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      height={24}
      width={24}
      {...props}
    >
      <circle
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm3.94-14.84l.14-1-.88.48-5.9 3.2-.22.12-.03.24-.99 6.64-.14.99.88-.48 5.9-3.2.22-.11.03-.25.99-6.63zM9.2 16l.72-4.85 3.59 2.51L9.2 16zm1.3-5.67l3.58 2.51L14.8 8l-4.3 2.33z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ExploreIcon;
