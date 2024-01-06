import { useEffect, useRef, useState } from "react";

type Options = {
  runOnFirstRender: boolean;
  delay: number;
};

const defaultOptions: Options = {
  delay: 1000,
  runOnFirstRender: false,
};

function useDelay(
  callback: Function,
  dependencies: any[] = [],
  { delay, runOnFirstRender }: Options = defaultOptions
) {
  const countDown = useRef<NodeJS.Timeout | null>(null);
  const [isFirstRender, setIsFirstRender] = useState(!runOnFirstRender);

  useEffect(() => {
    validateAfterDelay();

    function validateAfterDelay() {
      if (isFirstRender) {
        setIsFirstRender(false);
        return;
      }

      const { current } = countDown;

      if (current) clearTimeout(current);

      countDown.current = setTimeout(() => {
        console.log("Executing after delay.");
        callback();
      }, delay);
    }
  }, [...dependencies]);
}

export default useDelay;
