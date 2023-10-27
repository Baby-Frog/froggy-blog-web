import DefaultErrorImage from "src/assets/no-img-avaliable.png";

export const displayAlternativeImage = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  if (e.currentTarget.src !== DefaultErrorImage) {
    e.currentTarget.src = DefaultErrorImage;
  }
};
