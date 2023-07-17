import { useEffect, useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        const authToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNDYwYzAyNzJkMzQ5NDA0NTM0ODVmIn0sImlhdCI6MTY4OTU0Mjg0OH0.5bYUNKDOz9glyBBTKfB7ODVD6JMAVZEuLMJqErEUq8E";

        const requestOptions = {
            method: "POST",
            headers: { "auth-token": `${authToken}` },
        };

        fetch("http://localhost:5000/api/auth/getuser", requestOptions)
            .then((res) => res.json())
            .then(
                (result) => {
                    // update state with notes data
                    setUser(result);
                    console.log(result);
                },
                // handle errors
                (error) => {
                    console.log(error);
                }
            );
    }, []);

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
