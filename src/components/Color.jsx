import React from 'react';
import { db } from '../appwrite/databases';

const Color = ({ color, selectedNote, notes, setNotes }) => {
    const changeColor = () => {
        try{
            const currentNodeIndex = notes.findIndex(
                (note) => note.$id === selectedNote.$id
            );
            
            const updatedNote = {
                ...notes[currentNodeIndex],
                colors: JSON.stringify(color)
            };

            const newNotes = [...notes];
            newNotes[currentNodeIndex] = updatedNote;
            setNotes(newNotes);

            db.notes.update(selectedNote.$id, {colors : JSON.stringify(color)});
            
        }catch(error){
            alert("You must select a note before changing colors");
        }     
    }
    return (
        <div
            className="color"
            onClick={changeColor}
            style={{ backgroundColor: color.colorHeader }}
        >
        </div>
    )
}

export default Color
