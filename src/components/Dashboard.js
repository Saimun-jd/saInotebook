import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import NoteContext from "../context/notes/NoteContext";
import Note from "./Note";
import FloatingButton from "./FloatingButton";

function Dashboard() {
    const { notes } = useContext(NoteContext);

    const [showComponent, setShowComponent] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setShowComponent(true);
        } else {
            setShowComponent(false);
        }
    }, [location]);

    return (
        <>
            <Container>
                <Row>
                    {notes.map((note, index) => (
                        <Col xs={12} md={3} sm={6} key={index}>
                            <Note
                                title={
                                    note.title ? note.title.slice(0, 45) : ""
                                }
                                description={
                                    note.description
                                        ? note.description.slice(0, 88)
                                        : ""
                                }
                                tag={note.tag}
                                date={note.date}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        {showComponent && <FloatingButton />}
        </>
    );
}

export default Dashboard;
