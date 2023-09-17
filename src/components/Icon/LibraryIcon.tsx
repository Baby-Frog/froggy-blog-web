const LibraryIcon = (props: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width={80}
      height={80}
      viewBox="0,0,256,256"
      {...props}
    >
      <g
        fill="none"
        fillRule="nonzero"
        stroke="none"
        strokeWidth={1}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        strokeDashoffset={0}
      >
        <g transform="scale(3.2,3.2)">
          <path
            d="M2.5,72.5h75v5h-75z"
            fill="#ffeea3"
          />
          <path
            d="M77,73v4h-74v-4h74M78,72h-76v6h76v-6z"
            fill="#ba9b48"
          />
          <path
            d="M62.5,23.5h7v44h-7z"
            fill="#ffeea3"
          />
          <path
            d="M69,24v43h-6v-43h6M70,23h-8v45h8v-45z"
            fill="#ba9b48"
          />
          <path
            d="M46.5,23.5h7v44h-7z"
            fill="#ffeea3"
          />
          <path
            d="M53,24v43h-6v-43h6M54,23h-8v45h8v-45z"
            fill="#ba9b48"
          />
          <path
            d="M26.5,23.5h7v44h-7z"
            fill="#ffeea3"
          />
          <path
            d="M33,24v43h-6v-43h6M34,23h-8v45h8v-45z"
            fill="#ba9b48"
          />
          <g>
            <path
              d="M10.5,23.5h7v44h-7z"
              fill="#ffeea3"
            />
            <path
              d="M17,24v43h-6v-43h6M18,23h-8v45h8v-45z"
              fill="#ba9b48"
            />
          </g>
          <g>
            <path
              d="M6.5,67.5h67v5h-67z"
              fill="#e8d47b"
            />
            <path
              d="M73,68v4h-66v-4h66M74,67h-68v6h68v-6z"
              fill="#ba9b48"
            />
          </g>
          <g>
            <path
              d="M6.5,24.5v-6.183l33.5,-15.764l33.5,15.764v6.183z"
              fill="#ffeea3"
            />
            <path
              d="M40,3.105l33,15.529v5.366h-66v-5.365l33,-15.53M40,2l-34,16v7h68v-7l-34,-16z"
              fill="#ba9b48"
            />
          </g>
          <g>
            <path
              d="M40,11.5c-2.48528,0 -4.5,2.01472 -4.5,4.5c0,2.48528 2.01472,4.5 4.5,4.5c2.48528,0 4.5,-2.01472 4.5,-4.5c0,-2.48528 -2.01472,-4.5 -4.5,-4.5z"
              fill="#e8d47b"
            />
            <path
              d="M40,12c2.206,0 4,1.794 4,4c0,2.206 -1.794,4 -4,4c-2.206,0 -4,-1.794 -4,-4c0,-2.206 1.794,-4 4,-4M40,11c-2.761,0 -5,2.239 -5,5c0,2.761 2.239,5 5,5c2.761,0 5,-2.239 5,-5c0,-2.761 -2.239,-5 -5,-5z"
              fill="#ba9b48"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default LibraryIcon;