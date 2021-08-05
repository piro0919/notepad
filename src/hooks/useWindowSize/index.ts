import { useEffect, useState } from "react";

export type WindowSize = {
  innerHeight: number;
  innerWidth: number;
};

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    innerHeight: 0,
    innerWidth: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerHeight, innerWidth } = window;

      setWindowSize({
        innerHeight,
        innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
