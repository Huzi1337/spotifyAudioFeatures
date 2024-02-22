import { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import Authentication from "./Authentication";
import { resetPassword } from "aws-amplify/auth";
import { validateEmail } from "../utils/inputValidators";
import { Outlet } from "react-router-dom";

export type OutletContext = {
  email: string;
  error: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <Authentication
      altText=""
      error=""
      headText="Password Recovery"
      link={<></>}
    >
      <Outlet context={{ email, setEmail, error, setError }} />
    </Authentication>
  );
}

export default PasswordRecovery;
