import React, { useContext, useEffect } from "react";
import { Alert } from "react-bootstrap";
import NoteContext from "../context/notes/NoteContext";

function AlertDismissible() {
    const { hideAlert, state } = useContext(NoteContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            hideAlert();
        }, 2000);
        return () => clearTimeout(timer);
    }, [hideAlert]);

    return (
        state.showAlert && (
            <Alert variant="danger" onClose={() => hideAlert()} dismissible>
                <Alert.Heading>{state.alertType}</Alert.Heading>
                <p>{state.alertText}</p>
            </Alert>
        )
    );
}

export default AlertDismissible;
