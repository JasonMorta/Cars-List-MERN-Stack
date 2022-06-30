import React from 'react'
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import './addIcon.css'


export default function AddIcon(props) {




  return (
    <div className='add-icon'>
      <Icon sx={{ color: green[500] }}
      onClick={props.handleAddItem} >add_circle</Icon>
    </div>
  );
}
