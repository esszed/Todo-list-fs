const path = require("path");
const express = require("express");
const app = express();
const ejs = require("ejs");
const port = 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");

app.set("view engine", "ejs");
app.set("views", viewsPath);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDirectoryPath));


let tasks=[]

app.get("/", (req, res) => {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-UK", options);
  res.render("index", {
    day: day,
    tasks:tasks
  });
});

app.post("/addItem", (req, res) => {
  tasks.push(req.body.newItem)
  res.redirect('/')
});

app.listen(port, () => {
  console.log(`App is running on port:${port}`);
});
