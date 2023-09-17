type TChevronIconProps = {
  direction?: "up" | "down" | "left" | "right";
};

const ChevronIcon = ({ direction = "down" }: TChevronIconProps) => {
  if (direction === "down") {
    return (
      <svg
        width={12}
        height={12}
        viewBox="0 0 15 15"
      >
        <path
          d="M3.85 5.15a.5.5 0 0 0-.7.7l4.35 4.36 4.35-4.36a.5.5 0 1 0-.7-.7L7.5 8.79 3.85 5.15z"
          fillRule="evenodd"
        />
      </svg>
    );
  }
};

export default ChevronIcon;
