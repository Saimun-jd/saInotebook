import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import GlobalContext from "../context/GlobalContext";
import NoteContext from "../context/notes/NoteContext";
import Note from "./Note";
import FloatingButton from "./FloatingButton";

function Dashboard() {
    const { notes } = useContext(NoteContext);
    const { toggleAddNote, addButtonOn } = useContext(GlobalContext);
    toggleAddNote(true);
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
            {addButtonOn && <FloatingButton />}
        </>
    );
}

export default Dashboard;
