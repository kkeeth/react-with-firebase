// src/SignUp.tsx
import React, { useState, ChangeEvent, MouseEvent } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const createUser = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // サインアップ成功
      })
      .catch((error) => {
        console.log(error.code, error.message);
        // エラー処理
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
        </div>
        <div className="button-root">
          <button onClick={createUser}>サインアップ</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
