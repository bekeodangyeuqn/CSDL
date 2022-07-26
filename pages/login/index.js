import React, { useState, useContext } from "react";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { login } from '../../axios_api/login'
import { userContext } from "../../contexts/userProvider";
import styles from "../../styles/Register.module.css";

function LoginForm() {
  const router = useRouter();

  const { setUser } = useContext(userContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('user')
  const [error, setError] = useState();


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === 'role') {
      setRole(value)
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await login({ email, password, role })
      if (result.status === 200) {
        console.log(result)
        setUser(result.data)
        toast.success(result.data)
        router.push('/')
      } 
      else {
        toast.error(result.response.data)
        console.log(result)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  };

  return (
    // <div className={styles.form}>
    //   <div className={styles.form_body}>
    //     <div className={styles.email}>
    //       <label className={styles.form__label} htmlFor="email">
    //         Email{" "}
    //       </label>
    //       <input
    //         type="email"
    //         id="email"
    //         className={styles.form__input}
    //         value={email}
    //         onChange={(e) => handleInputChange(e)}
    //         placeholder="Email"
    //       />
    //     </div>
    //     <div className="password">
    //       <label className={styles.form__label} htmlFor="password">
    //         Password{" "}
    //       </label>
    //       <input
    //         className={styles.form__input}
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => handleInputChange(e)}
    //         placeholder="Password"
    //       />
    //     </div>
    //   </div>
    //   <div className={styles.footer}>
    //     <button onClick={() => handleSubmit()} type="submit" className="btn">
    //       Login
    //     </button>
    //   </div>
    // </div>
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900" onClick={() => handleSubmit()}>Sign in</h2>
        </div>
        <div className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"
                value={email}
                onChange={(e) => handleInputChange(e)} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"
                value={password}
                onChange={(e) => handleInputChange(e)} />
            </div>
          </div>

          <div className="flex items-center">
            <p className="mx-2 block text-sm text-gray-900"> You are:  </p>

            <select
              id='role'
              value={role}
              onChange={(e) => handleInputChange(e)}
              className="appearance-none relative border px-3 py-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
              <option value='user'>Reader</option>
              <option value='librarian'>Librarian</option>
              <option value='admin'>Admin</option>
            </select>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => handleSubmit()}>
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Sign in
            </button>
            <div className="text-center text-red-500">
              {error}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
