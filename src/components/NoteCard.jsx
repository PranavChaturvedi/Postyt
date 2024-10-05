import React, { useEffect, useRef, useState } from 'react'
import Spinner from '../icons/Spinner';
import DeleteButton from './DeleteButton';
import { setNewOffset, autoGrow, setZIndex, bodyParser } from '../utils';
import { db } from '../appwrite/databases';

const NoteCard = ({ note, setNotes, selectedNote, setSelectedNote }) => {
  const body = bodyParser(note.body);
  const [position, setPostion] = useState(JSON.parse(note.position));
  const [saving, setSaving] = useState(false);
  const colors = JSON.parse(note.colors);
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);
  const keyUpTimer = useRef(null);

  let mouseStartPosition = { x: 0, y: 0 };

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  const onMouseDown = (e) => {
    if (e.target.className === "card-header") {
      mouseStartPosition.x = e.clientX;
      mouseStartPosition.y = e.clientY;

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', mouseUp);

      setZIndex(cardRef.current);
      setSelectedNote(note);
    }
  };

  const mouseMove = (e) => {
    const mouseMoveDirection = {
      x: mouseStartPosition.x - e.clientX,
      y: mouseStartPosition.y - e.clientY
    }

    mouseStartPosition.x = e.clientX;
    mouseStartPosition.y = e.clientY;

    const newPostion = setNewOffset(cardRef.current, mouseMoveDirection);
    setPostion(newPostion);
  };

  const mouseUp = () => {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData('position', newPosition);
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };

    try {
      await db.notes.update(note.$id, payload)
    } catch (error) {
      console.error(error);
    }

    setSaving(false);
  };

  const handleKeyUp = () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }
    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value)
    }, 2000);
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      ref={cardRef}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
        onMouseDown={onMouseDown}
      >
        <DeleteButton setNotes={setNotes} noteId={note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>
              Saving...
            </span>
          </div>
        )}
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          onKeyUp={handleKeyUp}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => { autoGrow(textAreaRef) }}
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
        >
        </textarea>

      </div>
    </div>
  )
}

export default NoteCard;
