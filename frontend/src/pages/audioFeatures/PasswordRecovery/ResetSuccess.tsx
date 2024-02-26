import { useNavigate } from "react-router-dom";
import { URLS } from "../../../main";

function ResetSuccess() {
  const navigate = useNavigate();
  return (
    <form>
      <h2>Password reset successfully.</h2>
      <button onClick={() => navigate(URLS.logIn)}>Log in</button>
    </form>
  );
}

export default ResetSuccess;
