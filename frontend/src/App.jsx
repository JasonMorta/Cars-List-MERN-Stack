import "./App.css";
import ProjectList from "./components/ProjectList";
import React, { Component } from "react";
import AddMenu from "./components/AddMenu";
//import DropDowList from './components/DropDownList';
import AddIcon from "./components/AddIcon";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switchHeading: false,
      saveOrUpdateBtn: true,
      hideItemMenuUI: "none",
      itemMenuUI: "none", //sets the input field css to "display or none"
      input_value_title: "",
      input_value_des: "",
      input_value_url: "",
      item_id: "",
      item_title: "",
      item_description: "",
      item_url: "",
      project_list: [],
      label_title: false,
      label_des: "",
      label_url: "",
      updateState: "",
      blurry_bg: false, // blur's out the background when addItemUI is shown.
    };
    //this.request = this.request.bind(this)
  }

  //API POST request to retrieve data
  request = async function () {
    const response = await fetch("/api");
    const data = await response.json(); //convert data to json
    this.setState({ project_list: data });
  };

  //fetch data when page is loaded
  componentDidMount() {
    this.request();
  }

  //ADD BUTTON (+)
  //open's itemMenuUI
  //This function only opens the itemMenuUIU and clears input field values
  handleAddItem = () => {
    this.setState({
      saveOrUpdateBtn: true,
      switchHeading: true,
      hideItemMenuUI: "block",
      input_value_title: this.item_title,
      input_value_des: this.item_description,
      input_value_url: this.item_url,
      btn_spinner: false,
      blurry_bg: true,
      label_title: "",
      label_des: "",
      label_url: "",
      item_title: "",
      item_description: "",
      item_url: "",
    });
  };

  //CLOSE BUTTON
  //This function only closes the itemMenuUI
  //If nothing was added
  closeBox = (e) => {
    this.setState({
      hideItemMenuUI: "none",
      input_value_title: "",
      input_value_des: "",
      input_value_url: "",
      label_title: "",
      label_des: "",
      label_url: "",
      blurry_bg: false,
    });
  };

  //SAVE item to List and close itemMenuUI BUTTON
  //When the SAVE button is clicked, it makes a post request to my backend and updated the UI with the added data
  saveItemBtn = () => {
    fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        post_title: this.state.item_title,
        post_description: this.state.item_description,
        post_url: this.state.item_url,
      }),

      //handle errors
    })
      .then((res) => res.json())
      .then((response) =>
        this.setState({
          //Where state gets updated and reloads component.
          project_list: response,
          hideItemMenuUI: "none",
          input_value_title: "",
          input_value_des: "",
          input_value_url: "",
          blurry_bg: false,
          btn_spinner: true,
        })
      )
      .catch((error) => console.log("Error:", error));
  };

  //DELETE item from list BUTTON
  handleDelete = (e) => {
    fetch("/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        item_id: e.target.id,
      }),

      //handle errors
    })
      .then((res) => res.json())
      .then((response) => this.setState({ project_list: response }))
      .catch((error) => alert("Error:", error));

    // this.request()
  };

  //EDIT BUTTON. This function is called when the users clicks the edit button.
  //I'm using dataset-attribute to store the current item's data in the edit-icon element, which
  //is then stored in state.
  //So every edit icon, has the data of that list's item store in itself. So that when I click "edit"
  //icon, it's data is pushed to the input fields in the addItemUI.
  handleEdit = (e) => {
    // e.target.useMap = e.target.title
    this.setState({
      btn_spinner: false,
      switchHeading: false,
      hideItemMenuUI: "block",
      label_title: e.target.dataset.title,
      label_des: e.target.dataset.name,
      label_url: e.target.dataset.url,
      input_value_title: this.item_title,
      input_value_des: this.item_description,
      input_value_url: this.item_url,
      saveOrUpdateBtn: false,
      item_id: e.target.id,
      blurry_bg: true, //blur background when(edit,Add,Update)
    });

    //target values are obtained from the image(part of the .map)
  };

  //The UPDATE BUTTON is located inside the itemMenuUI component
  //This updates the selected item with new values
  //The user can choose to update any value. Only the added values will be applied
  updateItemBtn = (e) => {
    fetch("/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        put_id: this.state.item_id,
        put_title: this.state.item_title,
        put_description: this.state.item_description,
        put_url: this.state.item_url,
      }),
      //handle errors
    })
      .then((res) => res.json())
      .then((response) =>
        this.setState({
          //Where state get updated and reloads page.
          project_list: response,
          hideItemMenuUI: "none",
          title: "",
          item_description: "",
          item_url: "",
          btn_spinner: true,
          blurry_bg: false,
          label_title: "",
          label_des: "",
          label_url: "",
        })
      )
      .catch((error) => alert("Error:", error));
    this.setState({ hideItemMenuUI: "none" });
  };

  //INPUT FIELDS AddMenuUI option.
  //These handlers listen for user input changes on the input.value element
  //When the user types in some text into the input field, that text is stored in state.
  //Title
  handleTitle = (e) => {
    this.setState({ item_title: e.target.value });
  };
  //Description
  handleDescription = (e) => {
    this.setState({ item_description: e.target.value });
  };
  //URL
  handleURL = (e) => {
    this.setState({ item_url: e.target.value });
  };

  render() {
    return (
      <div className="App">

        {/* Add new item Icon */}
        <AddIcon handleAddItem={this.handleAddItem.bind(this)} />
        
        <section className="App-header">
          <h1>My Project List</h1>

          {/* Blur the container background when calling adding/updating items */}
          <div
            className="item-container"
            style={
              this.state.blurry_bg
                ? { filter: "blur(3px)" }
                : { filter: "blur(0px)" }
            }
            >
            {/* Project List Items */}
            <ProjectList
              listItem={this.state.project_list}
              key={this.state.item_id}
              handleEdit={this.handleEdit.bind(this)}
              handleDelete={this.handleDelete.bind(this)}
            />
          </div>

          {/* the menu to add or update an item */}
          <AddMenu
            btn_spinner={this.state.btn_spinner}
            input_value_title={this.state.input_value_title}
            input_value_des={this.state.input_value_des}
            input_value_url={this.state.input_value_url}
            saveOrUpdateBtn={this.state.saveOrUpdateBtn}
            label_des={this.state.label_des}
            label_url={this.state.label_url}
            label_title={this.state.label_title}
            switchHeading={this.state.switchHeading}
            itemMenuUI={this.state.hideItemMenuUI}
            handleTitle={this.handleTitle.bind(this)}
            handleDescription={this.handleDescription.bind(this)}
            handleURL={this.handleURL.bind(this)}
            saveItemBtn={this.saveItemBtn.bind(this)}
            updateItemBtn={this.updateItemBtn.bind(this)}
            closeBox={this.closeBox.bind(this)}
          />
        </section>

      </div>
    );
  }
}
