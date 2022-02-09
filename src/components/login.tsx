import { Auth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Login = ({ auth }: { auth: Auth }) => {
  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  return (
    <div className="Login">
      <h1>Welcome to Daki Chat</h1>
      <p>
        A web group chat built out of boredom and some serverless functions 💀
      </p>
      <button onClick={signIn}>
        Signin with Google <FcGoogle />
      </button>
    </div>
  );
};

export default Login;
