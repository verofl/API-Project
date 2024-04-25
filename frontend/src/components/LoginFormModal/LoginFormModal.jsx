import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUser = async (e) => {
    e.preventDefault();
    return dispatch(
      sessionActions.login({ credential: "HighLady", password: "Rhysand" })
    ).then(closeModal);
  };

  const disablePassword = password.length < 6;
  const disableUsername = credential.length < 4;

  return (
    <div className="login-modal">
      <h1 className="login-header">Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-labels">
          <input
            className="login-inputs"
            type="text"
            value={credential}
            placeholder="Username or Email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="login-labels">
          <input
            className="login-inputs"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button
          className="login-button"
          type="submit"
          disabled={disablePassword && disableUsername}
        >
          Log In
        </button>
        <a href="/" onClick={demoUser} className="demo-user-link">
          Log in as Demo User
        </a>
      </form>
    </div>
  );
}

export default LoginFormModal;
