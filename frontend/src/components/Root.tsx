import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Root.scss";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { signOut } from "@aws-amplify/auth";
import { useRef } from "react";

const pages = ["home", "about"];
const authPages = ["profile", "audioFeatures"];

const Root = () => {
  const { authStatus } = useAuthenticator();
  const { pathname } = useLocation();
  const currentPage = pathname.split("/").pop();
  const navigate = useNavigate();
  console.log(authStatus);
  const topbarRef = useRef<HTMLDivElement>(null);
  return (
    <div className="root__container">
      <div className="sidebar">
        <h1>Audify</h1>
        <ul>
          {pages.map((page) => (
            <div className="linkContainer" key={page}>
              {page === currentPage && <div className="circle" />}
              <Link to={page}>
                {page.charAt(0).toUpperCase() + page.substring(1)}
              </Link>
            </div>
          ))}
          {authStatus === "authenticated" &&
            authPages.map((page) => (
              <div className="linkContainer" key={page}>
                {page === currentPage && <div className="circle" />}
                <Link to={page}>
                  {page.charAt(0).toUpperCase() + page.substring(1)}
                </Link>
              </div>
            ))}
        </ul>
      </div>
      <div ref={topbarRef} className="topbar">
        {authStatus != "authenticated" ? (
          <div>
            <button onClick={() => navigate("/v2/signup")}>Sign Up</button>
            <button onClick={() => navigate("/v2/login")}>Log In</button>
          </div>
        ) : (
          <button className="signout" onClick={async () => await signOut()}>
            Sign Out
          </button>
        )}
      </div>
      <main>
        <Outlet context={topbarRef} />
      </main>
    </div>
  );
};

export default Root;
