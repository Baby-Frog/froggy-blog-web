const LongArrowUpIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width={19}
      height={19}
      style={{ ...props.style, transform: "rotate(180deg)" }}
      {...props}
    >
      <path d="M5.4 8.4L4 9.733l5.517 6.11L15 9.803 13.6 8.4l-4.1 4.2-4.1-4.2z" />
      <path
        d="M8.5 4h2v9h-2z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default LongArrowUpIcon;
