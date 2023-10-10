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
        strokeWidth={2}
      />
      <path
        d="M18 18L6 6"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  );
};

export default RemoveIcon;
