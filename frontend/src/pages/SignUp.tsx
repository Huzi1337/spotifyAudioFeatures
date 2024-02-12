import { Link } from "react-router-dom";
import Authentication from "./Authentication";
import { useCallback, useRef } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import useAuth from "../hooks/useAuth";
import { validateEmail, validatePassword } from "../utils/inputValidators";
import { signUp } from "aws-amplify/auth";

const signUpFields = ["Email Address", "Password"];
const redirectURL = "/v2/home";

const SignUp = () => {
  const refs = Array.from({ length: 2 }, () => useRef<HTMLInputElement>(null));
  const validators = [
    useCallback(validateEmail, []),
    useCallback(validatePassword, []),
  ];

  const { onSubmit, error, isLoading } = useAuth({
    refs,
    validators,
    redirectURL,
    authFn,
  });

  async function authFn() {
    const { nextStep } = await signUp({
      username: (refs[0].current as HTMLInputElement).value,
      password: (refs[1].current as HTMLInputElement).value,
      options: {
        userAttributes: {
          email: (refs[0].current as HTMLInputElement).value,
        },
        autoSignIn: true,
      },
    });

    sessionStorage.setItem(
      "email",
      (refs[0].current as HTMLInputElement).value
    );

    return nextStep.signUpStep;
  }

  return (
    <Authentication
      link={
        <Link className="login__redirect" to={"/v2/login"}>
          Log in to Audify
        </Link>
      }
      altText="Already have an Audify account? "
      headText="Create an Audify account"
    >
      {error && (
        <p className="login__error">
          <img src="/errorWhite.svg" width={24} height={24} />
          {error}
        </p>
      )}
      <form onSubmit={onSubmit} className="login__form">
        {signUpFields.map((field, index) => (
          <>
            <label key={`label${index}`}>{field}</label>
            <input
              key={`input${index}`}
              ref={refs[index]}
              type={field != "Password" ? "text" : "password"}
              placeholder={field}
            />
          </>
        ))}

        <button className="login__submit" type="submit">
          {isLoading ? (
            <BeatLoader
              size={8}
              speedMultiplier={1}
              loading={true}
              color="#000000"
            />
          ) : (
            "Create an account"
          )}
        </button>
      </form>
    </Authentication>
  );
};

export default SignUp;
