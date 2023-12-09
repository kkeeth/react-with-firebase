import "./App.css";
import Signup from "./Signup";
// import Signin from "./Signin";
import { AuthProvider } from "../contexts/AuthContext";
// import { signInWithPopup } from "firebase/auth";
// import { auth } from "../firebase";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Signup />
      </AuthProvider>
      {/* <button onClick={() => signInWithPopup(auth, GAuthProvider)}>
        Sign In
      </button> */}
    </>
  );
};

export default App;
