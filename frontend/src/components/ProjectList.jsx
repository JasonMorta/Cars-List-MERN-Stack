import * as React from "react";
import "./list.css";
import trash from "../trash_50px.png";
import edit from "../edit_64px.png";

export default function ProjectList(props) {
  const projectItem = props.listItem.map((item) => (
    <div className="container" id={item.title} key={item.id}>
      <p>
        <span>Title</span>
      </p>
      <p>{item.title}</p>
      <p>
        <span>Description</span>
      </p>
      <p>{item.description}</p>
      <p>
        <span>URL</span>
      </p>
      <a href={item.URL} target="_black">
        <p>{item.URL}</p>
      </a>

      <div className="edit" id={item.id} onClick={props.handleEdit}>
        <img 
        src={edit} 
        alt="edit" 
        id={item.id} 
        data-title={item.title} 
        data-name={item.description}
        data-url={item.URL} />
      </div>

      <div className="delete" id={item.id} onClick={props.handleDelete}>
        <img src={trash} alt="delete" id={item.id} />
      </div>
    </div>
  ));

  return <>{projectItem}</>;
}
