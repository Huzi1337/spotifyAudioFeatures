import "./About.scss";

const features = [
  "Searching and saving song Spotify ids.",
  "Fetching and displaying song audio features.",
  "Authorization and authentication with AWS Cognito.",
];

function About() {
  return (
    <div className="about__container">
      <h1>
        <span>Audify</span>
      </h1>
      <br />
      <h3>
        Conceived as means to access Spotify Web API for a research project,
        Audify consists of frontend developed in React and Node.js backend API
        running via AWS Gateway.{" "}
      </h3>
      <br />
      <h3>
        In its current state Audify has the following features:
        <ul>
          {features.map((feat) => (
            <li key={feat}>{feat}</li>
          ))}
        </ul>
      </h3>
    </div>
  );
}

export default About;
