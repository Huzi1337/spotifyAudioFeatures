import { Link, useNavigate } from "react-router-dom";
import Authentication from "./Authentication";
import "./Login.scss";
import { useRef, useState } from "react";
import { signIn } from "aws-amplify/auth";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (emailRef.current && passwordRef.current) {
      let email = emailRef.current.value;
      let password = passwordRef.current.value;

      if (!validateInput(email, password)) {
        setError("Invalid email address or password.");
        return;
      }
      await attemptSignIn(email, password);

      function validateInput(email: string, password: string) {
        let emailFormatIsValid = /^.+@.+\..+$/g.test(email);

        return emailFormatIsValid || password.trim().length <= 0;
      }
      async function attemptSignIn(email: string, password: string) {
        try {
          const { isSignedIn } = await signIn({
            username: email,
            password,
          });
          if (isSignedIn) navigate("/v2/home");
        } catch (error) {
          setError("Error: " + (error as Error).message);
        }
      }
    }
  };

  return (
    <Authentication
      link={<Link to={"/v2/signup"}>Sign up to Audify</Link>}
      altText="Don't have an account yet? "
      headText="Log in to Audify"
    >
      <form onSubmit={submitHandler} className="login__form">
        {error && <h1>Elo error</h1>}
        <label>Email Address</label>
        <input ref={emailRef} placeholder="Email Address" />
        <label>Password</label>
        <input ref={passwordRef} placeholder="Password" />
        <button className="login__submit" type="submit">
          Log in
        </button>
      </form>
    </Authentication>
  );
};

export default Login;
