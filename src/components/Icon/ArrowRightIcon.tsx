const ArrowRightIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 19 19"
      aria-hidden="true"
      style={{
        transform: "rotate(180deg)",
      }}
    >
      <path
        d="M11.47 13.97L6.99 9.48 11.47 5l.55.5-3.99 3.98 4 4z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default ArrowRightIcon;
