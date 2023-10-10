const RemoveIcon = (props: JSX.IntrinsicElements["svg"]) => {
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
        cx={12}
        cy={12}
        r={9}
        stroke="currentColor"
      />
      <path
        d="M7.5 12H16.5"
        stroke="currentColor"
      />
    </svg>
  );
};

export default RemoveIcon;
