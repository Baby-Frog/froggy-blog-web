const DashboardIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Dashboard"
      {...props}
    >
      <path
        d="M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z"
        stroke="currentColor"
      />
      <path
        d="M8 8.5h8M8 15.5h5M8 12h8"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default DashboardIcon;
