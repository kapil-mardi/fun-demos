function NoteTaker({addNote}) {


    return (
        <form onSubmit={addNote}>
        <fieldset>
            <legend>Note Taker</legend>
            <textarea 
            rows="10" 
            cols="30" 
            placeholder="Write your notes here..."
            id="noteTaker"></textarea>
        </fieldset>
        <button type="submit">Add Note</button>
        </form>
    )
}

export default NoteTaker;