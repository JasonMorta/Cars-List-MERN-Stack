import React from "react";
import "./add.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function EditItem(props) {
  
  //  const [state, setSate] = useState({
  //     addItem: true,
  //     hide: "block",
  // })

  //close AddMenu
  // function closeBox() {
  //   setNewItemMenu('none');
  // }

  // function handleTitle(e) {
  //   console.log(e.target.value)
  // }

  // function saveAndClose(){
  //   setNewItemMenu('none');
  // }
 
  //opens AddMenu


  return (
    <>
      <div className="list-container" style={{ display: `${props.itemMenuUI}` }}>
         <h3>Edit item</h3>
        <div id="text-field">
          <TextField
            className="textField"
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={props.handleTitle}
          />
          <TextField
            className="textField"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            onChange={props.handleDescription}
          />
          <TextField
            className="textField"
            id="outlined-basic"
            label="URL"
            variant="outlined"
            onChange={props.handleURL}
          />

          <Button 
          onClick={props.saveAndClose}
          variant="contained"
          >SAVE </Button>

          <Button 
          onClick={props.closeBox}
          variant="contained"
          >close </Button>
        </div>
      </div>
    </>
  );
}
