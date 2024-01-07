import { useState } from "react";
import useDelay from "./useDelay";

function useValidateInput(input: string) {
  const [invalidLines, setInvalidLines] = useState<Set<number>>(new Set());

  const { isTimeout } = useDelay(() => {
    validateInput();
  }, [input]);

  return { isValidating: isTimeout, invalidLines };

  function validateInput() {
    let invalid: Set<number> = new Set();
    input.split("\n").forEach((line, index) => {
      const [title, artist] = line.split(";");
      if (!title || !artist || !title.length || !artist.length) {
        console.log(`Invalid line ${index + 1}`);
        invalid.add(index + 1);
      }
    });
    setInvalidLines(invalid);
  }
}

export default useValidateInput;
