import React, { useContext, useState } from "react";
import NoteContext from "../context/Notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Added successfully", "success");
  };
  return (
    <div>
      <form className="my-3">
        <div className="col-md-4 mb-3"><h2 style={{padding: "20px 0px"}}>Add a Note</h2>
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title" value={note.title}
            aria-describedby="emailHelp"
            onChange={onChange} minLength={5} required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description" value={note.description}
            onChange={onChange} minLength={5} required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag" value={note.tag}
            onChange={onChange}
          />
        </div>
        <button style={{fontWeight: "bold"}} disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-3" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
