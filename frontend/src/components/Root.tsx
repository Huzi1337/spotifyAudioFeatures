import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Root.scss";
import { useAuthenticator } from "@aws-amplify/ui-react";

const pages = ["home", "about"];
const authPages = ["profile", "audioFeatures"];

const Root = () => {
  const { authStatus, signOut } = useAuthenticator();
  const { pathname } = useLocation();
  const currentPage = pathname.split("/").pop();
  const navigate = useNavigate();
  console.log(authStatus);
  return (
    <div className="root__container">
      <div className="sidebar">
        <h1>Audify</h1>
        <ul>
          {pages.map((page) => (
            <div className="linkContainer">
              {page === currentPage && <div className="circle" />}
              <Link to={page}>
                {page.charAt(0).toUpperCase() + page.substring(1)}
              </Link>
            </div>
          ))}
          {authStatus === "authenticated" &&
            authPages.map((page) => (
              <div className="linkContainer">
                {page === currentPage && <div className="circle" />}
                <Link to={page}>
                  {page.charAt(0).toUpperCase() + page.substring(1)}
                </Link>
              </div>
            ))}
        </ul>
      </div>
      <div className="topbar">
        {authStatus != "authenticated" ? (
          <>
            <button onClick={() => navigate("/v2log/home")}>Sign Up</button>
            <button onClick={() => navigate("/v2log/home")}>Log In</button>
          </>
        ) : (
          <button
            onClick={() => {
              signOut();
              navigate("/v2/home");
            }}
          >
            Sign Out
          </button>
        )}
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
