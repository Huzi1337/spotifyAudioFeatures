import { useEffect, useRef, useState } from "react";

function useClickOutside<T extends HTMLElement>() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    window.addEventListener("click", checkClick);

    function checkClick({ target }: MouseEvent) {
      setIsVisible((prev) => {
        if (ref.current) {
          if (
            prev &&
            target != ref.current &&
            !ref.current.contains(target as Node)
          ) {
            return false;
          }
        }
        return prev;
      });
    }

    return () => {
      window.removeEventListener("click", checkClick);
    };
  }, []);

  return { isVisible, setIsVisible, ref };
}

export default useClickOutside;
