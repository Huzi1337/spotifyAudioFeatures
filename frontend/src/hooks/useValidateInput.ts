import { useState } from "react";
import useDelay from "./useDelay";

function useValidateInput(input: string) {
  const [isValid, setIsValid] = useState(false);

  const { isTimeout } = useDelay(() => {
    validateInput();
  }, [input]);

  return { isValid, isValidating: isTimeout };

  function validateInput() {
    let result = true;
    input.split("\n").forEach((line, index) => {
      const [title, artist] = line.split(";");
      if (!title || !artist || !title.length || !artist.length) {
        console.log(`Invalid line ${index + 1}`);
        result = false;
      }
    });
    setIsValid(result);
  }
}

export default useValidateInput;
