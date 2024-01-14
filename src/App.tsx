import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import "./App.css";
import Signin from "./components/Signin";
import { auth } from "./firebase";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {currentUser ? (
        <>
          <div>ログイン済み: {currentUser.email}</div>
          <button onClick={() => auth.signOut()}>ログアウト</button>
        </>
      ) : (
        <Signin />
      )}
    </>
  );
};

export default App;
