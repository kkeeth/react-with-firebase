import React, { useState, ChangeEvent, MouseEvent } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { handleFirebaseError } from "../utils/handleFirebaseError";
import { isValidEmail, isValidPassword } from "../utils/validations";

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isValidEmail(e.target.value)) {
      setError("無効なメールアドレスです。");
    } else {
      setError("");
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (!isValidPassword(e.target.value)) {
      setError("パスワードは6文字以上です。");
    } else {
      setError("");
    }
  };

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
    if (!isValidPassword(e.target.value)) {
      setError("パスワードは6文字以上です。");
    } else {
      setError("");
    }
  };

  const signInWithEmail = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("パスワードが一致しません。");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // ログイン成功
      })
      .catch((firebaseError) => {
        setError(handleFirebaseError(firebaseError));
        // エラー処理
      });
  };

  const signInWithGoogle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;
      })
      .catch((firebaseError) => {
        setError(handleFirebaseError(firebaseError));
        // const credential =
        //   GoogleAuthProvider.credentialFromError(firebaseError);
        console.log(firebaseError.code, firebaseError.message);
        // エラー処理
      });
  };

  return (
    <>
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
        <p>
          アカウントをお持ちではない方は<a href="/signup">会員登録</a>へ
        </p>
      </div>
      <div className="button-root">
        <button
          disabled={!email || !password || !passwordConfirm}
          onClick={signInWithEmail}
        >
          メールでログイン
        </button>
        <button onClick={signInWithGoogle}>Google でログイン</button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </>
  );
};

export default Signin;
