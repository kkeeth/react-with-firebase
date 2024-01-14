import { useState, useEffect } from "react";
import "./App.css";
import Signup from "./Signup";
import { AuthProvider, GAuthProvider } from "../contexts/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  return (
    <>
      <AuthProvider>
        <Signup />
      </AuthProvider>
    </>
  );
};

export default App;
