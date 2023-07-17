import React from 'react';
import { Card } from 'react-bootstrap';
import '../Note.css';

function Note({ title, description, tag, date }) {
  const newDate = new Date(date).toUTCString();
  return (
    <Card className="note-card">
      <Card.Header className="note-header">{title}</Card.Header>
      <Card.Body className="note-body">
        <Card.Text>{description}</Card.Text>
        <Card.Text><span className="note-tag">{tag}</span></Card.Text>
        <Card.Text><small className="note-date">{newDate}</small></Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Note;