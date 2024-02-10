import { signIn, type SignInInput } from "aws-amplify/auth";
//FME.S7tSz.f@5Zn
async function handleSignIn({ username, password }: SignInInput) {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    console.log(isSignedIn, nextStep);
    return isSignedIn;
  } catch (error) {
    return (error as Error).message;
  }
}

export default handleSignIn;
