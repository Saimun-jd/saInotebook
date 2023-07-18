import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

function AddNoteForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const authToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNDYwYzAyNzJkMzQ5NDA0NTM0ODVmIn0sImlhdCI6MTY4OTU0Mjg0OH0.5bYUNKDOz9glyBBTKfB7ODVD6JMAVZEuLMJqErEUq8E";
    const navigate = useNavigate();
    const { addNote } = useContext(NoteContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // create new note object
        const newNote = { title, description, tag, date: new Date() };

        // add note to context
        addNote(newNote);

        // send POST request to backend with note data
        try {
            await fetch("http://localhost:5000/api/notes/addnote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": `${authToken}`,
                },
                body: JSON.stringify({ title, description, tag }),
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        // handle success
                        console.log(result);
                    },
                    // handle errors
                    (error) => {
                        console.log(error);
                    }
                );
        } catch (error) {
            console.log("error fetching data");
        }

        navigate("/");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    placeholder="write your title..."
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    style={{height: '15rem'}}
                    value={description}
                    placeholder="your descriptions goes here...."
                    onChange={(event) => setDescription(event.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="tag">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                    type="text"
                    value={tag}
                    placeholder="tag"
                    onChange={(event) => setTag(event.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Note
            </Button>
        </Form>
    );
}

export default AddNoteForm;
