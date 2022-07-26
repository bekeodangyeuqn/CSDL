import { useState, useEffect, createContext } from 'react';

export const userContext = createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                let user = JSON.parse(savedUser);
                if (user.user_id) {
                    setUser(user);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        // console.log(JSON.parse(localStorage.getItem('user')))
        console.log({ user })
    }, [user]);

    return (
        <userContext.Provider value={{ user, setUser }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserProvider;