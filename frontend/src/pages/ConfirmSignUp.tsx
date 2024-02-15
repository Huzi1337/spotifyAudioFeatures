import { confirmSignUp } from "aws-amplify/auth";
import useAuth from "../hooks/useAuth";
import Authentication from "./Authentication";
import { useEffect, useRef } from "react";
import { validateCode } from "../utils/inputValidators";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";

const redirectURL = "/v2/home";

const ConfirmSignUp = () => {
  const navigate = useNavigate();
  const refs = [useRef<HTMLInputElement>(null)];
  const validators = [validateCode];
  const { error, isLoading, onSubmit } = useAuth({
    redirectURL,
    authFn,
    refs,
    validators,
  });

  useEffect(() => {
    if (!sessionStorage.getItem("email")) navigate("/v2/login");
  }, []);

  async function authFn() {
    const username = sessionStorage.getItem("email") as string;
    const { nextStep } = await confirmSignUp({
      username,
      confirmationCode: (refs[0].current as HTMLInputElement).value,
    });
    return nextStep.signUpStep;
  }

  return (
    <Authentication
      link={<></>}
      altText="The code has been sent to your email address."
      headText="Confirm your email address."
    >
      {error && (
        <p className="login__error">
          <img src="/errorWhite.svg" width={24} height={24} />
          {error}
        </p>
      )}
      <form onSubmit={onSubmit} className="login__form">
        <label>Verification code</label>
        <input ref={refs[0]} placeholder="Verification code" />

        <button className="login__submit" type="submit">
          {isLoading ? (
            <BeatLoader
              size={8}
              speedMultiplier={1}
              loading={true}
              color="#000000"
            />
          ) : (
            "Confirm email address"
          )}
        </button>
      </form>
    </Authentication>
  );
};

export default ConfirmSignUp;
