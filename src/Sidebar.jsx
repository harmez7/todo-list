const Sidebar = ({sidebarNotes, addNote}) => {
  
  return (
    <div className='sidebar'>
      <h2>Notes</h2>
      <div className='sidebar_notes-list'>{sidebarNotes}
      <div
      className = 'sidebar_notes-list_note add-note'
      title = "Add a note"
      onClick = {() => addNote()}
      >+</div>
      </div>
    </div>
  )
}

export default Sidebar