const express = require('express');
const app = express();
const fs = require('fs');
//Store JSONstring in variable
let JSONstring = fs.readFileSync('WebProject.json');
const helmet = require("helmet");// Helmet helps you secure your Express apps by setting various HTTP headers.

//Helmet Reference: https://www.npmjs.com/package/helmet
app.use(helmet());


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/*You will now be able to get data passed through in the 
body of the HTTP POST or PUT request using req.body (e.g.req.body.name)*/


//Listening on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});



//convert JSONstring to an JSONobject
let JSONobject = JSON.parse(JSONstring);

//Convert the JSONobject back to a string
//and write it to WebProject.json
function saveToJSON() {
   //convert JSONobject back to new_JSONstring
   let new_JSONstring = JSON.stringify(JSONobject);

   fs.writeFile('WebProject.json', new_JSONstring, (err) => {
      if (err) { // handle andy errors when writing to list.
         console.log("something is broken");
      } else {
         console.log("File saved!");
      }
   })
};

//USE POSTMAN
//1.  Display array items on port 8080.
//2.  Create a POSt request that adds an item to array.
//3.  Delete an array item with a specified id.
//4.  Able to Update an array item title or description.

//METHODS I'LL USE
//GET = Gets data from teh sever.
//POST = Add items to array.
//PUT = Updated data on the server.
//DELETE =delete item with specific id.

let reply = "";

//Increment each ID by 1 that gets pushed/add to JSONobject.
//The initial value will be the length of JSONobject-array.
let item_id = JSONobject.length;

//==========================================================POST
//WITH POST:
//User will be able to add a new item to the JSONobject-array.
//User must enter specific KEY's in postman with any value to make a successful POST request
//On POST user will see there new item in JSONobject-array
app.post('/add', (req, res) => {
  
   item_id+1;

   //This Item stores the user data as an object.
   //This object will then be pushed into the JSONobject-array.
   let newItem = {
      "id": item_id,
      "title": `${req.body.post_title}`,
      "description": `${req.body.post_description}`,
      "URL": `${req.body.post_url}`
   }

   //Check key.values pairs before push().
   //User must add the correct KEY's to POST any data.
   if (!req.body.post_title || !req.body.post_description || !req.body.post_url) {
      res.send(`OOPS, something is wrong. You can have any VALUE, but your KEY's must be:
      title,
      description,
      url `)

   } else {

      //push newItem-object to JSONobject-object
      JSONobject.push(newItem)
      saveToJSON()
      res.send(JSONobject)
   }
});

//==========================================================GET
//Displays project list on sever/postman
app.get('/api', (req, res) => { //GET method

   JSONobject.forEach(
      item => { //Loop over each object item
      reply += `
      Title:  ${item.title}
      Description:  ${item.description}
      URL:  ${item.URL}
      ID: ${item.id}
      `
   }
   );
   res.send(JSONobject) //sends array item to server.
});

//==========================================================DELETE
//delete any item from JSONobject-array by it's ID
//The user must enter id as the KEY and then any number as teh VALUE.
app.delete('/delete', (req, res) => {

   //Find the index of the chose item using  query.id.
   //In postman, the user inputs a VALUE, if the value/id exist, that values object is removed.
   let indexOfObject = JSONobject.findIndex(object => {
      return object.id == req.body.id;
   });

   //This will run based on the length of JSONobject-array
   if (req.body.id > JSONobject.length) {
      res.send("OOPs, that id does not exist or is has already been removed.")
   } else if (req.body.id == -1) {
      res.send("OOPs, add a number grater the -0")
   } else {

     // res.send(`${JSONobject[req.body.id].title} was removed`)
      JSONobject.splice(indexOfObject, 1);
      JSONobject.forEach((item, index) => item.id = index)//updated array item id's with new values
      //rewrite id's in order
      saveToJSON()
      res.send(JSONobject)
     //log(JSONobject)
   }
   
});


//==========================================================PUT/update
//The user can update an object in postman:
//User must 1st add the id as a KEY to find the object item
//then add the title, description and url KEY's with any values to update that item
app.put('/update', (req, res) => { //GET method

   //We need to find the items index.
   let index = JSONobject.findIndex(object => {
      return object.id == req.body.put_id;
   });

   //This adds the user update if an update was made. Else, it stays the same
   JSONobject[index].title = req.body.put_title ?
   JSONobject[index].title = req.body.put_title :
   JSONobject[index].title = JSONobject[index].title;

   JSONobject[index].description = req.body.put_description ?
   JSONobject[index].description = req.body.put_description :
   JSONobject[index].description = JSONobject[index].description;

   JSONobject[index].url = req.body.put_url ?
   JSONobject[index].url = req.body.put_url :
   JSONobject[index].url = JSONobject[index].url;
   saveToJSON()
   res.send(JSONobject)
});