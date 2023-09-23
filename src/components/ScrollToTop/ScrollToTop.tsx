import { Fragment, useEffect } from "react";
import useScrolled from "src/hooks/useScrolled";
import $ from "jquery";

const ScrollToTopButton = () => {
  const { height, isScrolled, setIsScrolled } = useScrolled(400);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > height) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, [height, setIsScrolled]);
  const scrollUp = () => {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      400,
    );
  };
  return (
    <Fragment>
      <div
        onClick={scrollUp}
        aria-hidden
      ></div>
    </Fragment>
  );
};

export default ScrollToTopButton;
