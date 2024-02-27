import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Root.scss";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { signOut } from "@aws-amplify/auth";
import { MouseEvent, useEffect, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";

const pages = ["home", "about"];
const authPages = ["profile", "audioFeatures"];

const Root = () => {
  const { authStatus } = useAuthenticator();
  const { pathname } = useLocation();
  const currentPage = pathname.split("/").pop();
  const navigate = useNavigate();
  const topbarRef = useRef<HTMLDivElement>(null);
  const { isVisible, setIsVisible, ref } = useClickOutside<HTMLDivElement>();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  useEffect(() => {
    window.addEventListener("resize", checkIfMobile);
    function checkIfMobile() {
      setIsMobile(window.innerWidth <= 900);
    }

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  function mobileShowMenuHandler(e: MouseEvent) {
    e.stopPropagation();
    setIsVisible((prev) => !prev);
  }

  return (
    <div className="root__container">
      <div
        ref={ref}
        className={isMobile ? `sidebar${isVisible ? "" : " hide"}` : "sidebar"}
      >
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
        {isMobile && !isVisible && (
          <button onClick={mobileShowMenuHandler} className="root__showMenu" />
        )}
      </div>
      <div ref={topbarRef} className="topbar">
        {authStatus != "authenticated" ? (
          <div className="topbar__authentication">
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
