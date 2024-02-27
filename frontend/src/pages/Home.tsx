import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { URLS } from "../main";
import "./Home.scss";

function Home() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const ref = useOutletContext<React.RefObject<HTMLDivElement>>();
  const navigate = useNavigate();

  return (
    <div className="home__container">
      <h1>
        Welcome to <span>Audify</span>
      </h1>
      <h3>Seeking for an easy way to access Spotify audio stats?</h3>
      <h3>See, king, you need to look no further!</h3>
      {authStatus === "authenticated" ? (
        <>
          <h3>Choose your feature in the side menu and browse away!</h3>
        </>
      ) : (
        <>
          <h3>
            Access Spotify Web API with <span>Audify</span> today!
          </h3>
          <div className="home__btnContainer">
            <button onClick={() => navigate(URLS.signUp)}>Sign up</button>
            <button onClick={() => navigate(URLS.logIn)}>Log in</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
