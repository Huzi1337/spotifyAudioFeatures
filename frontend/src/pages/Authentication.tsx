import { Link } from "react-router-dom";
import "./Authentication.scss";

type Props = {
  children: React.ReactNode;
  link: React.ReactNode;
  altText: string;
  headText: string;
  error: string;
};

const Authentication = ({
  children,
  headText,
  link,
  altText,
  error,
}: Props) => {
  return (
    <div className="auth__container">
      <div className="auth__topbar">
        <Link to={"/v2/home"}>Audify</Link>
      </div>
      <main className="auth__content">
        <h1 className="auth__header">{headText}</h1>
        <div className="line" />
        {error && (
          <p className="auth__error">
            <img src="/errorWhite.svg" width={24} height={24} />
            {error}
          </p>
        )}
        {children}
        <div className="line" />
        <p>
          {altText} {link}
        </p>
      </main>
    </div>
  );
};

export default Authentication;
