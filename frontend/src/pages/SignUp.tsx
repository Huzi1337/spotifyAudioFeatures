import { Link } from "react-router-dom";
import Authentication from "./Authentication";
import { useRef, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

const signUpFields = ["Email Address", "Username", "Password"];

const SignUp = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formRefs = Array.from({ length: 3 }, () =>
    useRef<HTMLInputElement>(null)
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
      <form onSubmit={submitHandler} className="login__form">
        {signUpFields.map((field, index) => (
          <>
            <label>{field}</label>
            <input
              ref={formRefs[index]}
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
