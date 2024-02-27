import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URLS } from "../main";

function useCheckAuth() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  const navigate = useNavigate();
  useEffect(() => {
    if (authStatus != "authenticated") navigate(URLS.home);
  }, [authStatus]);

  return authStatus === "authenticated";
}

export default useCheckAuth;
