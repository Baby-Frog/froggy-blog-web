import { useEffect, useState } from "react";

export default function useScrolled(height: number) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > height) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, [height]);
  return {
    isScrolled,
    height,
    setIsScrolled,
  };
}
