import React from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./FloatingButton.css";

function FloatingButton() {
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.currentTarget.disabled = true;
        navigate("addnote");
    };

    return (
        <Button className="floating-button" onClick={handleClick}>
            <FaPlus />
        </Button>
    );
}

export default FloatingButton;
