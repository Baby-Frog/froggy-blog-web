import React from "react";

const CopyIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.5 9.68l.6-.6a5 5 0 0 1 1.02 7.87l-2.83 2.83a5 5 0 0 1-7.07-7.07l2.38-2.38c0 .43.05.86.12 1.3l-1.8 1.79a4 4 0 0 0 5.67 5.65l2.82-2.83a4 4 0 0 0-1.04-6.4l.14-.16zm-1 4.64l-.6.6a5 5 0 0 1-1.02-7.87l2.83-2.83a5 5 0 0 1 7.07 7.07l-2.38 2.39c0-.43-.05-.87-.12-1.3l1.8-1.8a4 4 0 1 0-5.67-5.65L10.6 7.76a4 4 0 0 0 1.04 6.4l-.13.16z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CopyIcon;
