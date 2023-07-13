import React, { useState } from "react";

function CreateArea(props) {

  // const [title, setTitle] = useState("");
  // const [text, setText] = useState("");
  // using the below method instead of creating multiple useStates like above.

  const [noteText, setNoteText] = useState({
    title: "",
    content: ""
  });

  function handleTitleChange(event) {
    const { name, value } = event.target;
    setNoteText(prevValue => {
      return { ...prevValue, [name]: value };
      // [name] this syntax turns the name key from just a key to the value of the key.
    });
  }

  function submit(event) {
    props.onAdd(noteText);
    setNoteText({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        <input
          onChange={handleTitleChange}
          name="title"
          value={noteText.title}
          placeholder="Title"

        />

        <textarea
          onChange={handleTitleChange}
          name="content"
          value={noteText.content}
          placeholder="Take a note..."
          rows="3" />

        <button onClick={submit}>Add</button>

      </form>
    </div>
  );
}

export default CreateArea;