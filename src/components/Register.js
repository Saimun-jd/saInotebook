import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Register = () => {
    const initState = {
        name: "",
        email: "",
        password: "",
        isMember: false,
    };
    const [userState, setUserState] = useState(initState);

    const handleSubmit = async (event) => {
        event.preventDefault();
        var formData = {};
        if (userState.isMember) {
            formData = {
                email: userState.email,
                password: userState.password,
            };
        } else {
            formData = {
                name: userState.name,
                email: userState.email,
                password: userState.password,
            };
        }

        try {
            var url = "http://localhost:5000/api/auth";
            if (userState.isMember) {
                url = url.concat("/login");
            } else {
                url = url.concat("/createuser");
            }

            console.log(formData);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();
            const authToken = data.authtoken;
            console.log(authToken);
        } catch (error) {
            console.log("Internal server error");
        }
    };

    const handleChange = (event) => {
        setUserState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <>
            <h2>{userState.isMember ? "Login" : "Register"}</h2>
            <Form onSubmit={handleSubmit}>
                {!userState.isMember && (
                    <>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </>
                )}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {userState.isMember ? "Login" : "Register"}
                </Button>
            </Form>
            <Button
                variant="link"
                onClick={() =>
                    setUserState((prevState) => ({
                        ...prevState,
                        isMember: !userState.isMember,
                    }))
                }
            >
                {userState.isMember
                    ? "Not a member? Register"
                    : "Already a member? Login"}
            </Button>
        </>
    );
};

export default Register;
