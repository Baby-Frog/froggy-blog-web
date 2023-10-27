import React from "react";
import { displayAlternativeImage } from "src/utils/displayAlternativeImage";

const HandledImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <>
      <img
        src={props.src}
        alt={props.alt}
        onError={displayAlternativeImage}
        className={props.className}
      />
    </>
  );
};

export default HandledImage;
