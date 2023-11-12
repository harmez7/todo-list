const Editor = ({currentActiveNote, inputHandler, deleteNote,
TEXTAREA_REF, saveNotes}) => {

  return (
    <div className='editor'>
        <div className="editor_tools">
          <span
            className='editor_tools_tool editor_tools_save-button'
            onClick={() => saveNotes()}
            title='Save all notes in the storage'
            >Save notes</span>

          <span
          className='editor_tools_tool editor_tools_delete-button'
          onClick={() => deleteNote()}
          title='Delete this note'
          >Delete</span>
        </div>

        <div className='editor_textarea'>
          <textarea
          className='editor_textarea_textarea'
          value={currentActiveNote}
          ref={TEXTAREA_REF}
          onChange={e => inputHandler(e.target.value)}
          />
        </div>
    </div>
  )
}

export default Editor