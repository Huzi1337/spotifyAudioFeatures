import { Link } from "react-router-dom";
import Authentication from "./Authentication";
import { useCallback, useRef } from "react";
import { signIn } from "aws-amplify/auth";
import BeatLoader from "react-spinners/BeatLoader";
import { validateEmail, validatePassword } from "../utils/inputValidators";
import "./Login.scss";
import useAuth from "../hooks/useAuth";

const redirectURL = "/v2/home";

const Login = () => {
  const refs = Array.from({ length: 2 }, () => useRef<HTMLInputElement>(null));
  const validators = [
    useCallback(validateEmail, []),
    useCallback(validatePassword, []),
  ];
  const { error, isLoading, onSubmit } = useAuth({
    refs,
    validators,
    authFn,
    redirectURL,
  });

  async function authFn() {
    const { nextStep } = await signIn({
      username: (refs[0].current as HTMLInputElement).value,
      password: (refs[1].current as HTMLInputElement).value,
    });
    if (nextStep.signInStep != "DONE")
      sessionStorage.setItem(
        "email",
        (refs[0].current as HTMLInputElement).value
      );
    return nextStep.signInStep;
  }

  return (
    <Authentication
      link={
        <Link className="login__redirect" to={"/v2/signup"}>
          Sign up to Audify
        </Link>
      }
      altText="Don't have an account yet? "
      headText="Log in to Audify"
    >
      {error && (
        <p className="login__error">
          <img src="/errorWhite.svg" width={24} height={24} />
          {error}
        </p>
      )}
      <form onSubmit={onSubmit} className="login__form">
        <label>Email Address</label>
        <input ref={refs[0]} placeholder="Email Address" />
        <label>Password</label>
        <input type="password" ref={refs[1]} placeholder="Password" />

        <button className="login__submit" type="submit">
          {isLoading ? (
            <BeatLoader
              size={8}
              speedMultiplier={1}
              loading={true}
              color="#000000"
            />
          ) : (
            "Log in"
          )}
        </button>
      </form>
    </Authentication>
  );
};

export default Login;
