import { useEffect, useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import { resetPassword } from "aws-amplify/auth";
import { validateEmail } from "../../../utils/inputValidators";
import { URLS } from "../../../main";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../PasswordRecovery";
import SubmitBtn from "../../../components/SubmitBtn";

function SendCode() {
  const refs = [useRef<HTMLInputElement>(null)];
  const validators = [validateEmail];

  const { onSubmit, error, isLoading } = useAuth({
    refs,
    validators,
    redirectURL: `${URLS.recoverPassword}/resetPassword`,
    authFn: recoverFn,
  });
  const {
    setError,
    setEmail,
    error: teror,
  } = useOutletContext<OutletContext>();
  console.log("teror", teror);
  useEffect(() => {
    console.log(error);
    setError(error);
  }, [error]);

  async function recoverFn() {
    console.log("boop");
    const username = (refs[0].current as HTMLInputElement).value;
    const { nextStep } = await resetPassword({
      username,
    });
    setEmail(username);
    sessionStorage.setItem(
      "email",
      (refs[0].current as HTMLInputElement).value
    );

    return nextStep.resetPasswordStep;
  }
  return (
    <form onSubmit={onSubmit}>
      <label>Email Address</label>
      <input ref={refs[0]} placeholder="Email Address" />
      <SubmitBtn isLoading={isLoading} text="Send reset code" />
    </form>
  );
}

export default SendCode;
