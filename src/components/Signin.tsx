import React, { useState, ChangeEvent, MouseEvent } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const signInWithEmail = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // ログイン成功
      })
      .catch((error) => {
        console.log(error);
        // エラー処理
      });
  };

  const signInWithGoogle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(token, user);
      })
      .catch((error) => {
        // エラー処理
      });
  };

  return (
    <>
      <form className="container" autoComplete="off">
        <div className="card">
          <div className="card-content">
            <div className="input-form">
              <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
                value={email}
              />
            </div>
            <div className="input-form">
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
              />
            </div>
            <div className="input-form">
              <input
                id="password-confirm"
                type="password"
                placeholder="Password-confirm"
                onChange={handlePasswordConfirmChange}
                value={passwordConfirm}
              />
            </div>
          </div>
          <div className="button-root">
            <button onClick={signInWithEmail}>メールでログイン</button>
            <button onClick={signInWithGoogle}>Google でログイン</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signin;
