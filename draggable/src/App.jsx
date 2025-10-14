import { useState } from 'react'
import './App.css'
import Draggable from './Draggable'
import NoteTaker from './NoteTaker'
import useLocalStorage from './LocalStorage'

function App() {
  const [notes, updateNotes] = useLocalStorage('notes', [])

  const addNote = (event) => {
    event.preventDefault();
    const noteContent = event.target.elements.noteTaker.value;
    if (noteContent.trim() === "") return;
    updateNotes('notes', [...notes, {t: noteContent}]);
    event.target.reset();
  }

  return (
    <>
      <div className='container'>
        <NoteTaker addNote={addNote} />
        <div className='draggable'>
          {notes.map(note => (
            <Draggable
              key={note.t}
              initialX = { note.initialX }
              initialY = { note.initialY }
              onPositionChange = {(x, y) => {
                note.initialX = x;
                note.initialY = y;
                updateNotes('notes', [...notes])
              }}>
              <div className='note'>{note.t}</div>
            </Draggable>
          ))}
      </div>
    </div >
    </>
  )
}

export default App
