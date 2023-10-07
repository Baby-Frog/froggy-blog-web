const TwitterIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 256 256"
      {...props}
    >
      <g
        fill="#6b6b6b"
        fillRule="nonzero"
        stroke="none"
        strokeWidth={1}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        strokeDashoffset={0}
      >
        <g transform="scale(10.66667,10.66667)">
          <path d="M4.4043,3c-0.647,0 -1.02625,0.72877 -0.65625,1.25977l5.98828,8.55859l-6.01172,7.02734c-0.389,0.454 -0.06675,1.1543 0.53125,1.1543h0.66406c0.293,0 0.57172,-0.12856 0.76172,-0.35156l5.23828,-6.13672l3.94336,5.63477c0.375,0.534 0.98667,0.85352 1.63867,0.85352h3.33398c0.647,0 1.02625,-0.72781 0.65625,-1.25781l-6.31836,-9.04297l5.72656,-6.70898c0.332,-0.39 0.05497,-0.99023 -0.45703,-0.99023h-0.8457c-0.292,0 -0.56977,0.12761 -0.75977,0.34961l-4.8418,5.66016l-3.60156,-5.1543c-0.374,-0.536 -0.98467,-0.85547 -1.63867,-0.85547z" />
        </g>
      </g>
    </svg>
  );
};

export default TwitterIcon;
