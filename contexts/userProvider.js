import { useState, useEffect, createContext } from 'react';

export const userContext = createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            let user = JSON.parse(savedUser);
            setUser(user);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        // console.log(JSON.parse(localStorage.getItem('user')))
    }, [user]);

    return (
        <userContext.Provider value={{ user, setUser }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserProvider;