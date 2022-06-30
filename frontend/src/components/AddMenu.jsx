import React from "react";
import "./add.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


export default function AddMenu(props) {

  //switches between update and save button
let saveBtn =  props.saveOrUpdateBtn ? 
              <Button 
              onClick={props.saveItemBtn}
              variant="contained"
              >{ props.btn_spinner ? 
                <i className="fa fa-spinner fa-spin" style={{fontSize: "24px"}}></i> :
                'SAVE'} </Button>
              :
              <Button 
              onClick={props.updateItemBtn}
              variant="contained"> { props.btn_spinner ? 
                <i className="fa fa-spinner fa-spin" style={{fontSize: "24px"}}></i> :
                'UPDATE'} </Button>;


  return (
    <>
      <div className="list-container" style={{ display: `${props.itemMenuUI}` }}>
        {props.switchHeading ? <h3>Add Project</h3>: <h3>Edit Item</h3>}
        <div id="text-field">
          <TextField
            required={props.saveOrUpdateBtn ? true:false}
            className="textField"
            id="outlined-required"
            label={props.label_title ? props.label_title : "Title"}
            variant="standard"
            onChange={props.handleTitle}
            value={props.input_value_title}
            placeholder="Title"
          />
          <TextField
            required={props.saveOrUpdateBtn ? true:false}
            className="textField"
            id="outlined-basic"
            label={props.label_title ? props.label_des : "Description"}
            variant="standard"
            onChange={props.handleDescription}
            value={props.input_value_des}
            placeholder="Description"
          />
          <TextField
            required={props.saveOrUpdateBtn ? true:false}
            className="textField"
            id="outlined-basic"
            label={props.label_title ? props.label_url : "URL"}
            variant="standard"
            onChange={props.handleURL}
            value={props.input_value_url}
            placeholder="URL"
          />

          {saveBtn}

          <Button 
          onClick={props.closeBox}
          variant="contained"
          >close </Button>
        </div>
      </div>
    </>
  );
}
