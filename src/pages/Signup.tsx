// src/SignUp.tsx
import React, { useState, ChangeEvent, MouseEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { handleFirebaseError } from "../utils/handleFirebaseError";
import { isValidEmail, isValidPassword } from "../utils/validations";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isValidEmail(e.target.value)) {
      setError("無効なメールアドレスです。");
    } else {
      setError("");
    }
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

  const createUser = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("パスワードが一致しません。");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // サインアップ成功
      })
      .catch((firebaseError) => {
        setError(handleFirebaseError(firebaseError));
      });
  };

  return (
    <>
      <div className="card-content">
        <div className="input-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="input-form">
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePasswordChange}
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
            アカウントをお持ちの方は<a href="/signin">サインイン</a>へ
          </p>
        </div>
        <div className="button-root">
          <button disabled={!email || !password} onClick={createUser}>
            サインアップ
          </button>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </>
  );
};

export default SignUp;
