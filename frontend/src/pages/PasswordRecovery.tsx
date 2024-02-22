import { useState } from "react";
import Authentication from "./Authentication";

import { Outlet } from "react-router-dom";

export type OutletContext = {
  email: string;
  error: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

function PasswordRecovery() {
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [error, setError] = useState("");
  console.log("mainerror", error);
  return (
    <Authentication
      altText=""
      error={error}
      headText="Password Recovery"
      link={<></>}
    >
      <Outlet context={{ email, setEmail, error, setError }} />
    </Authentication>
  );
}

export default PasswordRecovery;
