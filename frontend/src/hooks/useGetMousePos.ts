import { useEffect, useState } from "react";

function useGetMousePos() {
  const [x, setX] = useState<number>(-window.innerWidth);
  const [y, setY] = useState<number>(-window.innerHeight);

  useEffect(() => {
    window.addEventListener("mousemove", tooltipPositionHandler);

    function tooltipPositionHandler(e: MouseEvent) {
      setX(e.clientX);
      setY(e.clientY);
    }
    return () => {
      window.removeEventListener("mousemove", tooltipPositionHandler);
    };
  }, []);

  return { x, y };
}

export default useGetMousePos;
