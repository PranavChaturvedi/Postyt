import React, { useEffect, useState } from 'react'
import NoteCard from '../components/NoteCard';
import { db } from "../appwrite/databases"
import Controls from '../components/Controls';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const getNotes = async () => {
    const response = await db.notes.list();

    setNotes(response.documents);
  }

  useEffect(() => {
    getNotes()
  }, []);
  return (
    <div>
      {notes.map((note) => (
        <NoteCard
          key={note.$id}
          note={note}
          setNotes={setNotes}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        />
      ))}
      <Controls 
        setNotes={setNotes} 
        selectedNote={selectedNote}
        notes={notes}
      />
    </div>
  )
}

export default NotesPage;
