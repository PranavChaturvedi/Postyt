import React, { useRef } from 'react';
import Plus from '../icons/Plus';
import colors from '../assets/colors.json';
import { db } from "../appwrite/databases";

const AddButton = ({ setNotes }) => {

    const startingPositon = useRef(10);

    const addNote = async () => {
        const payload = {
            position: JSON.stringify({
                x: startingPositon.current,
                y: startingPositon.current
            }),
            colors: JSON.stringify(colors[0])
        };
        startingPositon.current += 10;
        const response = await db.notes.create(payload);
        setNotes((prevState) => [response, ...prevState]);
    }
    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    )
}

export default AddButton;
