import { useCallback, useEffect, useReducer, useState } from "react";
import NoteContext from "./NoteContext";
import ACTIONS from "./actions";
import reducer from "./reducer";

const initState = {
    showAlert: false,
    alertType: "",
    alertText: "",
};

const NoteState = (props) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const displayAlert = (alertType, alertText) => {
        dispatch({ type: ACTIONS.DISPLAY_ALERT, payload: { alertType, alertText } });
    };
    const hideAlert = () => {
        dispatch({type: ACTIONS.HIDE_ALERT});
    }


    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const authToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNDYwYzAyNzJkMzQ5NDA0NTM0ODVmIn0sImlhdCI6MTY4OTU0Mjg0OH0.5bYUNKDOz9glyBBTKfB7ODVD6JMAVZEuLMJqErEUq8E";

        const requestOptions = {
            method: "GET",
            headers: { "auth-token": `${authToken}` },
        };

        fetch("http://localhost:5000/api/notes/fetchnotes", requestOptions)
            .then((res) => res.json())
            .then(
                (result) => {
                    // update state with notes data
                    setNotes(result);
                    console.log(result);
                },
                // handle errors
                (error) => {
                    console.log(error);
                }
            );
    }, []);

    const addNote = useCallback((newNote) => {
        setNotes((notes) => [...notes, newNote]);
    }, []);

    return (
        <NoteContext.Provider value={{ notes, addNote, displayAlert, hideAlert, state }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
