import React from 'react';
import AddButton from './AddButton';
import Color from './Color';
import colors from "../assets/colors.json";


const Controls = ({ setNotes, selectedNote, notes }) => {
  return (
    <div id="controls">
      <AddButton setNotes={setNotes} />
      {colors.map((color) => (
        <Color 
          key={color.id} 
          color={color}
          selectedNote={selectedNote}
          notes={notes}
          setNotes={setNotes}
        />
      ))}
    </div>
  )
}

export default Controls
