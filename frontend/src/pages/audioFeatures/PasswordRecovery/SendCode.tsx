import { useEffect, useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import { resetPassword } from "aws-amplify/auth";
import { validateEmail } from "../../../utils/inputValidators";
import { URLS } from "../../../main";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../PasswordRecovery";
import BeatLoader from "react-spinners/BeatLoader";
import SubmitBtn from "../../../components/SubmitBtn";

function SendCode() {
  const recoverRefs = [useRef<HTMLInputElement>(null)];
  const recoverValidators = [validateEmail];

  const { onSubmit, error, isLoading } = useAuth({
    refs: recoverRefs,
    validators: recoverValidators,
    redirectURL: `${URLS.recoverPassword}/resetPassword`,
    authFn: recoverFn,
  });
  const { setError, setEmail } = useOutletContext<OutletContext>();
  useEffect(() => {
    setError(error);
  }, [error]);

  async function recoverFn() {
    const username = (recoverRefs[0].current as HTMLInputElement).value;
    const { nextStep } = await resetPassword({
      username,
    });
    setEmail(username);

    return nextStep.resetPasswordStep;
  }
  return (
    <form onSubmit={onSubmit}>
      <label>Email Address</label>
      <input placeholder="Email Address" />
      <SubmitBtn isLoading={isLoading} text="Send reset code" />
    </form>
  );
}

export default SendCode;
