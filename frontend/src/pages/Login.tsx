import { Link } from "react-router-dom";
import Authentication from "./Authentication";
import { useCallback, useRef } from "react";
import { signIn } from "aws-amplify/auth";
import { validateEmail, validatePassword } from "../utils/inputValidators";
import "./Login.scss";
import useAuth from "../hooks/useAuth";
import { URLS } from "../main";
import SubmitBtn from "../components/SubmitBtn";

const redirectURL = "/v2/home";
const testEmail = "aaudifyuser@gmail.com";
const testPassword = "password$1";

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

  function testAccountHandler() {
    const [{ current: email }, { current: password }] = refs;
    if (email && password) {
      email.value = testEmail;
      password.value = testPassword;
    }
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
      error={error}
    >
      <form onSubmit={onSubmit} className="login__form">
        <label>Email Address</label>
        <input ref={refs[0]} placeholder="Email Address" />
        <label>Password</label>
        <input type="password" ref={refs[1]} placeholder="Password" />
        <SubmitBtn text="Log in" isLoading={isLoading} />
        <button onClick={testAccountHandler}>Use test account</button>

        <Link
          className="login__forgotPassword"
          to={`${URLS.recoverPassword}/sendCode`}
        >
          Forgot your password?
        </Link>
      </form>
    </Authentication>
  );
};

export default Login;
