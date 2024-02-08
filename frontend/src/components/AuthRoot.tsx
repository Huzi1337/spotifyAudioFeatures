import { withAuthenticator } from "@aws-amplify/ui-react";
import Root from "./Root";

const AuthRoot = () => {
  return <Root />;
};

export default withAuthenticator(AuthRoot);
