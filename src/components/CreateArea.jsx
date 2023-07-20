import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { useEffect, useRef } from "react"; // to set ref to the div 

function CreateArea(props) {

  // const [title, setTitle] = useState("");
  // const [text, setText] = useState("");
  // using the below method instead of creating multiple useStates like above.
  const [isExpanded, setExpanded] = useState(false);

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

  function expand() {
    setExpanded(true);
  }

  // This code below is for setting 
  // isExpanded to false if outside click is detected :
  useEffect(() => {
    document.addEventListener("click", handleClickOutside)
  }, [])

  const refOne = useRef(null);

  const handleClickOutside = (e) => {
    if(!refOne.current.contains(e.target)){
      setExpanded(false);
    }
  }

  return (
    <div>
      <form className="create-note" ref={refOne}>
        {isExpanded && (
          <input
            onChange={handleTitleChange}
            name="title"
            value={noteText.title}
            placeholder="Title"

          />
        )}


        <textarea
          onClick={expand}
          onChange={handleTitleChange}
          name="content"
          value={noteText.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1} />

        <Zoom in={isExpanded}>
          <Fab onClick={submit}>
            <AddIcon />
          </Fab>
        </Zoom>

      </form>
    </div>
  );
}

export default CreateArea;