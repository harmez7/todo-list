import React, { useEffect, useState, useMemo, useRef } from "react"
import { nanoid } from "nanoid"
import Editor from "./Editor"
import Sidebar from "./Sidebar"

const TodoList = () => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("SAVED_NOTES")) || []
  )
  const [currentNote, setCurrentNote] = useState(notes?.[0] ?? {})
  const TEXTAREA_REF = useRef()

  // FOCUS ON THE EDITOR WHEN SELECTING A NOTE
  useEffect(() => {
    TEXTAREA_REF.current.focus()
  }, [currentNote])

  // PUT NOTES IN THE SIDEBAR
  const sidebarNotes = notes.map((note) => {
    const title = () =>
      note.body.charAt(0) === "#" || !note.body
        ? "Untitled note"
        : note.body.trim().slice(0, 13).split("#")[0]
    return (
      <div
        id={note.id}
        key={note.id}
        className={`sidebar_notes-list_note ${note.active && "active"}`}
        onClick={() => sidebarNotesClickHandler(note.id)}
        title={title()}
      >
        {title()}
      </div>
    )
  })

  //SIDEBAR NOTES CLICK HANDLER
  const sidebarNotesClickHandler = (selectedNoteID) => {
    removeActiveNotes()
    const note = notes.find((note) => note.id === selectedNoteID)
    note.active = true
    setCurrentNote(note)
    setNotes([...notes])
  }

  //TEXTAREA ONCHANGE HANDLER
  const inputHandler = (inputText) => {
    if (!currentNote.id) return
    const currNote = findCurrentNote
    currNote.body = inputText
    const currNoteIndex = notes.indexOf(currNote)
    const newNotes = notes.filter((note, index) => index != currNoteIndex)
    newNotes.unshift(currNote) // push the note to the top when writing
    setNotes(newNotes)
  }

  const findCurrentNote = useMemo(
    (id = currentNote.id) =>  notes.find((note) => note.id === id),
    [currentNote]
  )

  const addNote = () => {
    if (notes.length > 7) {
      alert("You are at maximum note capacity.\n:(")
      return
    }
    removeActiveNotes()
    const newNote = {
      id: nanoid(),
      body: "Untitled note#",
      active: true,
    }
    const newNotes = notes.filter((note) => note?.id && note.body)
    setNotes([newNote, ...newNotes])
    setCurrentNote(newNote)
  }

  const deleteNote = () => {
    if (notes.length === 0 || !currentNote.id) return
    const currNote = findCurrentNote
    const currNoteIndex = notes.indexOf(currNote)
    const newNotes = notes.filter((note, index) => index != currNoteIndex)
    setNotes(newNotes)
    setCurrentNote({ body: "Deleted! Start a note to begin." })
  }

  const saveNotes = () => {
    localStorage.setItem("SAVED_NOTES", JSON.stringify(notes))
    alert("All the notes has been saved in the local storage .")
  }

  const removeActiveNotes = () => notes.forEach((note) => (note.active = false))

  return (
    <div className="todo-list">
      <Sidebar sidebarNotes={sidebarNotes} addNote={addNote} />
      <Editor
        inputHandler={inputHandler}
        deleteNote={deleteNote}
        currentActiveNote={currentNote?.body ?? "* Start a note to begin* :)"}
        TEXTAREA_REF={TEXTAREA_REF}
        saveNotes={saveNotes}
      />
    </div>
  )
}

export default TodoList
