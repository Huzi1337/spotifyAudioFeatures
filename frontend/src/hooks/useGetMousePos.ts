import { useEffect, useState } from "react";

function useGetMousePos() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

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
