import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../../PasswordRecovery";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { validateCode, validatePassword } from "../../../utils/inputValidators";
import SubmitBtn from "../../../components/SubmitBtn";
import { URLS } from "../../../main";
import { confirmResetPassword } from "aws-amplify/auth";

function ResetPassword() {
  const { email, setError } = useOutletContext<OutletContext>();
  const refs = Array.from({ length: 2 }, () => useRef<HTMLInputElement>(null));
  const validators = [validateCode, validatePassword];
  const { error, isLoading, onSubmit } = useAuth({
    refs,
    validators,
    redirectURL: `${URLS.recoverPassword}/success`,
    authFn: resetPassword,
  });

  async function resetPassword() {
    const [{ current: code }, { current: newPassword }] = refs;
    if (code && newPassword) {
      console.log({
        confirmationCode: code.value,
        newPassword: newPassword.value,
        username: email,
      });
      const data = await confirmResetPassword({
        confirmationCode: code.value,
        newPassword: newPassword.value,
        username: email,
      });
      console.log(data);
    }
  }

  useEffect(() => {
    setError(error);
  }, [error]);

  const [code, setCode] = useState("");
  function codeChangeHandler(e: React.ChangeEvent) {
    const newCode = (e.target as HTMLInputElement).value
      .split("")
      .filter((char) => /\d/g.test(char))
      .join("");
    setCode(newCode);
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Code</label>
      <input
        ref={refs[0]}
        value={code}
        onChange={codeChangeHandler}
        maxLength={6}
        placeholder="Code"
      />
      <label>New password</label>
      <input ref={refs[1]} placeholder="New password" />
      <SubmitBtn isLoading={isLoading} text="Change password" />
    </form>
  );
}

export default ResetPassword;
