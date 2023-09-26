const TickIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 11.5455L8.95226 16.3289C9.33979 16.7033 9.95421 16.7033 10.3417 16.3289L20 7"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default TickIcon;
