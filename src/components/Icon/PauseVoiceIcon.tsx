const PauseVoiceIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={6}
        y={5}
        width={4}
        height={14}
        rx={1}
        fill="currentColor"
      />
      <rect
        x={14}
        y={5}
        width={4}
        height={14}
        rx={1}
        fill="currentColor"
      />
    </svg>
  );
};

export default PauseVoiceIcon;
