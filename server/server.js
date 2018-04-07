const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public"); // the ".." is used to go UP a Directory
/* PORT is the ENVIRONMENT Variable that "Heroku" AUTOMATICALLY set for us, IF the 'PORT' exists this means 
that we are ON Heroku and we DO want to use THIS value, IF it DOESN'T exist we're going to use the DEFAULT
port 3000 on our Local Machine */
const port = process.env.PORT || 3000;

// We've created an Express Application that is going to SERVE up ALL the files from the 'public' Directory
app.use(express.static(publicPath));

/* With this code below we're making sure that our App works REGARDLESS of WHAT page the User try to enter, so
when the User request something that ISN'T inside the 'public' Folder THEN we'll give back the 'index.html' */
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up!");
});
