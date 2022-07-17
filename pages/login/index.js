import React, { useState } from "react";
import styles from "../../styles/Register.module.css";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = () => {
    console.log(firstName, lastName, email, password, confirmPassword);
  };

  return (
    <div className={styles.form}>
      <div className={styles.form_body}>
        <div className={styles.email}>
          <label className={styles.form__label} htmlFor="email">
            Email{" "}
          </label>
          <input
            type="email"
            id="email"
            className={styles.form__input}
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>
        <div className="password">
          <label className={styles.form__label} htmlFor="password">
            Password{" "}
          </label>
          <input
            className={styles.form__input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
      </div>
      <div className={styles.footer}>
        <button onClick={() => handleSubmit()} type="submit" className="btn">
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
