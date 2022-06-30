import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './dropDown.css'


export default function DropDowList(props) {


  /*
  ** In this component we loop though the webProjects array in stats(from parent) 
  ** and pass it down to props.item, And display each project title in the drop-dow menu.
  */
  /* 
  ** We also change(go to item) the Project List component when
  ** selecting one of the drop-down options 
  */

 
   return (
     <Box sx={{ minWidth: 120 }}>
       <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Project List</InputLabel>
         <Select
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           name="DropDowList"
           label="Project List"
           onChange={props.handleChoseOption}
           readOnly={false}
         >
          {props.item.map(item => (
            <MenuItem 
            key={item.id} 
            value={"#"+item.title} 
            onClick={props.handleClick}
            >
              {item.title}
              </MenuItem>
          ))}
         </Select>
       </FormControl>
     </Box>
   );
 }
