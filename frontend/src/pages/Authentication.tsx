import "./Authentication.scss";

type Props = {
  children: React.ReactNode;
  link: React.ReactNode;
  altText: string;
  headText: string;
};

const Authentication = ({ children, headText, link, altText }: Props) => {
  return (
    <div className="auth__container">
      <div className="auth__topbar">
        <h3>Audify</h3>
      </div>
      <main className="auth__content">
        <h1 className="auth__header">{headText}</h1>
        <div className="line" />
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
