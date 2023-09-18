type TSearchIconProps = {
  variants?: "primary" | "secondary";
};

const SearchIcon = (props: JSX.IntrinsicElements["svg"] & TSearchIconProps) => {
  const { variants = "primary" } = props;
  if (variants === "primary") {
    return (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle
          cx={11}
          cy={11}
          r={6}
          stroke="#222222"
        />
        <path
          d="M11 8C10.606 8 10.2159 8.0776 9.85195 8.22836C9.48797 8.37913 9.15726 8.6001 8.87868 8.87868C8.6001 9.15726 8.37913 9.48797 8.22836 9.85195C8.0776 10.2159 8 10.606 8 11"
          stroke="#222222"
          strokeLinecap="round"
        />
        <path
          d="M20 20L17 17"
          stroke="#222222"
          strokeLinecap="round"
        />
      </svg>
    );
  } else {
    return (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        aria-label="Search"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.1 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0zm6.94-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .8-.79l-3.74-3.73A8.05 8.05 0 0 0 11.04 3v.01z"
          fill="currentColor"
        />
      </svg>
    );
  }
};

export default SearchIcon;
