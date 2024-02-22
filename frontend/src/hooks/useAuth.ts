import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInApiResponse } from "../types";
import { autoSignIn } from "aws-amplify/auth";

type Args = {
  refs: React.RefObject<HTMLInputElement>[];
  validators: ((value: string) => boolean)[];
  authFn: () => Promise<SignInApiResponse>;
  redirectURL?: string;
};

function useAuth({ refs, validators, authFn, redirectURL = "" }: Args) {
  if (refs.length != validators.length)
    console.error("The number of refs and validators is not equal");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);
      refs.forEach(({ current }, i) => {
        if (!current || (current && !validators[i](current.value)))
          throw new Error("Invalid fields.");
      });
      const status = await authFn();
      console.log(status);
      switch (status) {
        case "CONFIRM_SIGN_UP":
          navigate("/v2/confirm");
          break;
        case "COMPLETE_AUTO_SIGN_IN":
          await autoSignIn();
          if (redirectURL.length != 0) navigate(redirectURL);
          break;
        default:
          if (redirectURL.length != 0) navigate(redirectURL);
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return { error, isLoading, onSubmit };
}

export default useAuth;
