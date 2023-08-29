const CloseButtonIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 15L1 1"
        stroke="#121219"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M15 1L1 15"
        stroke="#121219"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CloseButtonIcon;
