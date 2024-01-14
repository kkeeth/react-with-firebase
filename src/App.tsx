import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import "./App.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { auth } from "./firebase";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {currentUser ? (
        <>
          <div>ログイン済み: {currentUser.email}</div>
          <button onClick={() => auth.signOut()}>ログアウト</button>
        </>
      ) : (
        <form className="container" autoComplete="off">
          <div className="card">
            {window.location.pathname === "/signup" ? <Signup /> : <Signin />}
          </div>
        </form>
      )}
    </>
  );
};

export default App;
