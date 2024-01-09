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
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    runAfterDelay();

    function runAfterDelay() {
      if (isFirstRender) {
        setIsFirstRender(false);
        return;
      }
      setIsTimeout(true);

      const { current } = countDown;

      if (current) clearTimeout(current);

      countDown.current = setTimeout(() => {
        console.log("Executing after delay.");
        callback();
        setIsTimeout(false);
      }, delay);
    }
  }, [...dependencies]);

  return { isTimeout };
}

export default useDelay;
