import { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import { validatePassword } from "../utils/inputValidators";
import { updatePassword } from "aws-amplify/auth";
import "./Profile.scss";
import SubmitBtn from "../components/SubmitBtn";

function Profile() {
  const refs = Array.from({ length: 2 }, () => useRef<HTMLInputElement>(null));
  const validators = [validatePassword, validatePassword];
  const [isSuccess, setIsSuccess] = useState(false);
  const { error, isLoading, onSubmit } = useAuth({
    refs,
    validators,
    authFn: changePassword,
  });

  async function changePassword() {
    const [{ current: oldPassword }, { current: newPassword }] = refs;
    if (oldPassword && newPassword) {
      await updatePassword({
        newPassword: newPassword.value,
        oldPassword: oldPassword.value,
      });
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
    }
  }

  return (
    <div className="profile__container">
      <h1>Profile Page</h1>
      <p>You can change your password here!</p>
      {error && (
        <p className="profile__error">
          <img src="/errorWhite.svg" width={24} height={24} />
          {error}
        </p>
      )}
      {isSuccess && (
        <p className="profile__success">Password changed successfully.</p>
      )}
      <form onSubmit={onSubmit}>
        <label>Old password</label>
        <input type="password" ref={refs[0]} />
        <label>New password</label>
        <input ref={refs[1]} />
        <SubmitBtn text="Change password" isLoading={isLoading} />
      </form>
    </div>
  );
}

export default Profile;
