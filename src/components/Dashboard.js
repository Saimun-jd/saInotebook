import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Note from "./Note";
import NoteContext from "../context/notes/NoteContext";

function Dashboard() {
    const notes = useContext(NoteContext);

    return (
        <Container>
            <Row>
                {notes.map((note) => (
                    <Col xs={12} md={6} lg={4} xl={3} key={note._id}>
                        <Note
                            title={note.title ? note.title.slice(0,45) : ""}
                            description={note.description ? note.description.slice(0,88) : ""}
                            tag={note.tag}
                            date={note.date}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Dashboard;
