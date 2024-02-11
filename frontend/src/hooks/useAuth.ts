import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Args = {
  refs: React.RefObject<HTMLInputElement>[];
  validatorFn: () => boolean;
  authFn: (args: any) => Promise<boolean>;
  redirectURL: string;
};

function useAuth({ refs, validatorFn, authFn, redirectURL }: Args) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit() {
    try {
      setIsLoading(true);
      if (!validatorFn()) throw new Error("Invalid fields.");
      if (await authFn(true)) navigate(redirectURL);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return { error, isLoading, onSubmit };
}

export default useAuth;
