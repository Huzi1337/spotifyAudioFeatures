import { Link } from "react-router-dom";
import Authentication from "./Authentication";
import { useCallback, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { validateEmail, validatePassword } from "../utils/inputValidators";
import { signUp } from "aws-amplify/auth";
import SubmitBtn from "../components/SubmitBtn";

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
      error={error}
    >
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
        <ul>
          The password must contain:
          <li>10 characters</li>
          <li>At least 1 letter</li>
          <li>At least 1 number</li>
          <li>At least 1 special character</li>
        </ul>

        <SubmitBtn text="Create an account" isLoading={isLoading} />
      </form>
    </Authentication>
  );
};

export default SignUp;
