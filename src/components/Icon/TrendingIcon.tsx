const TrendingIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width={28}
      height={29}
      viewBox="0 0 28 29"
      fill="none"
      {...props}
    >
      <path
        fill="#fff"
        d="M0 .8h28v28H0z"
      />
      <g
        opacity="0.8"
        clipPath="url(#trending_svg__clip0)"
      >
        <path
          fill="#fff"
          d="M4 4.8h20v20H4z"
        />
        <circle
          cx={14}
          cy="14.79"
          r="9.5"
          stroke="#000"
        />
        <path
          d="M5.46 18.36l4.47-4.48M9.97 13.87l3.67 3.66M13.67 17.53l5.1-5.09M16.62 11.6h3M19.62 11.6v3"
          stroke="#000"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="trending_svg__clip0">
          <path
            fill="#fff"
            transform="translate(4 4.8)"
            d="M0 0h20v20H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TrendingIcon;
