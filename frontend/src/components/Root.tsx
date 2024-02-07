import { Link, Outlet, useLocation } from "react-router-dom";
import "./Root.scss";

const pages = ["home", "about"];

const Root = () => {
  const { pathname } = useLocation();
  const currentPage = pathname.split("/").pop();
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
        </ul>
      </div>
      <div className="topbar">
        <button>Sign Up</button>
        <button>Log In</button>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
