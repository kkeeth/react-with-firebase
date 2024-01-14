import { useReducer, useEffect, useState } from "react";
import "./Signup.css";
import { useAuth } from "../contexts/AuthContext";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const initialState = {
  email: "",
  password: "",
  passwordconfirm: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setEmail":
      return {
        ...state,
        email: action.payload,
      };
    case "setPassword":
      return {
        ...state,
        password: action.payload,
      };
    case "setPasswordConfirm":
      return {
        ...state,
        passwordconfirm: action.payload,
      };
    case "setIsButtonDisabled":
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case "signupSuccess":
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case "signupFailed":
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case "setIsError":
      return {
        ...state,
        isError: action.payload,
      };
    default:
      return state;
  }
};

const Signup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (
      state.email.trim() &&
      state.password.trim() &&
      state.passwordconfirm.trim()
    ) {
      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    } else {
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });
    }
  }, [state.email, state.password, state.passwordconfirm]);

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleSignup();
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setSuccessMessage("");
      dispatch({
        type: "setIsButtonDisabled",
        payload: true,
      });

      await signup(state.email, state.passwordconfirm);
      dispatch({
        type: "signupSuccess",
        payload: "Signup Successfully",
      });

      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
      setSuccessMessage("アカウントの作成に成功しました");
    } catch (e) {
      console.log(e);

      switch (e.code) {
        case "auth/network-request-failed":
          setError(
            "通信がエラーになったのか、またはタイムアウトになりました。通信環境がいい所で再度やり直してください。"
          );
          break;
        case "auth/weak-password":
          setError("パスワードが短すぎます。6文字以上を入力してください。");
          break;
        case "auth/invalid-email":
          setError("メールアドレスが正しくありません");
          break;
        case "auth/email-already-in-use":
          setError(
            "メールアドレスがすでに使用されています。ログインするか別のメールアドレスで作成してください"
          );
          break;
        case "auth/user-disabled":
          setError("入力されたメールアドレスは無効（BAN）になっています。");
          break;
        default:
          setError(
            "アカウントの作成に失敗しました。通信環境がいい所で再度やり直してください。"
          );
      }

      dispatch({
        type: "setIsButtonDisabled",
        payload: false,
      });
    }
  };

  const handleEmailChange = (event) => {
    dispatch({
      type: "setEmail",
      payload: event.target.value,
    });
  };

  const handlePasswordChange = (event) => {
    dispatch({
      type: "setPassword",
      payload: event.target.value,
    });
  };

  const handlePasswordConfirmChange = (event) => {
    dispatch({
      type: "setPasswordConfirm",
      payload: event.target.value,
    });
  };

  return (
    <form className="container" autoComplete="off">
      <div className="card">
        <div className="header">
          <h3>Sign UP</h3>
        </div>
        <div className="card-content">
          <div className="input-form">
            {error && <div className="helper-text">{error}</div>}
            {successMessage && (
              <div className="helper-text">{successMessage}</div>
            )}
            <input
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
            />
            {state.isError && <p className="helper-text">{state.helperText}</p>}
          </div>
          <div className="input-form">
            <input
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
            {state.isError && <p className="helper-text">{state.helperText}</p>}
          </div>
          <div className="input-form">
            <input
              id="password-confirm"
              type="password"
              label="Password-confirm"
              placeholder="Password-confirm"
              onChange={handlePasswordConfirmChange}
              onKeyPress={handleKeyPress}
            />
            {state.isError && <p className="helper-text">{state.helperText}</p>}
          </div>
          もしアカウントがあるなら
          <button onClick={() => signInWithPopup(auth, GAuthProvider)}>
            Sign In
          </button>
        </div>
        <div className="button-root">
          <button
            size="large"
            color="secondary"
            className="signup-btn"
            onClick={handleSignup}
            disabled={state.isButtonDisabled}
          >
            Signup
          </button>
        </div>
      </div>
    </form>
  );
};

export default Signup;
