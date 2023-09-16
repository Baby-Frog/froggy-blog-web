const EditIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="48px"
      height="48px"
      viewBox="0,0,256,256"
      {...props}
    >
      <g
        fill="#000000"
        fillRule="nonzero"
        stroke="none"
        strokeWidth={1}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        strokeDashoffset={0}
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={{ mixBlendMode: "normal" }}
      >
        <g transform="scale(5.33333,5.33333)">
          <path d="M40.5,6c-0.38375,0 -0.76755,0.14645 -1.06055,0.43945l-17.97656,17.97852l-1.46289,3.58203l3.58203,-1.46289l17.97852,-17.97656c0.585,-0.586 0.585,-1.53509 0,-2.12109c-0.293,-0.293 -0.6768,-0.43945 -1.06055,-0.43945zM12.5,7c-3.01977,0 -5.5,2.48023 -5.5,5.5v23c0,3.01977 2.48023,5.5 5.5,5.5h23c3.01977,0 5.5,-2.48023 5.5,-5.5v-17c0.00765,-0.54095 -0.27656,-1.04412 -0.74381,-1.31683c-0.46725,-0.27271 -1.04514,-0.27271 -1.51238,0c-0.46725,0.27271 -0.75146,0.77588 -0.74381,1.31683v17c0,1.39823 -1.10177,2.5 -2.5,2.5h-23c-1.39823,0 -2.5,-1.10177 -2.5,-2.5v-23c0,-1.39823 1.10177,-2.5 2.5,-2.5h17c0.54095,0.00765 1.04412,-0.27656 1.31683,-0.74381c0.27271,-0.46725 0.27271,-1.04514 0,-1.51238c-0.27271,-0.46725 -0.77588,-0.75146 -1.31683,-0.74381z" />
        </g>
      </g>
    </svg>
  );
};

export default EditIcon;
