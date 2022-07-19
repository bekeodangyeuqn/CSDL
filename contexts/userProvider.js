import { useState, useEffect, createContext } from 'react';

export const userContext = createContext();

function setLocalStorage(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log(e)
    }
  }
  
  function getLocalStorage(key) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      console.log(e);
    }
  }

const UserProvider = (props) => {
    const [user, setUser] = useState(() => getLocalStorage("user"));

    useEffect(() => {
        setLocalStorage("user", user);
      }, [user]);

    return (
        <userContext.Provider value={{user, setUser}}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserProvider;