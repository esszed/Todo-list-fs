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

let lists = [{ name: "Important", tasks: ["Buy milk"] }];
let currentTask = 0;
app.get("/", (req, res) => {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-UK", options);
  res.render("index", {
    listTitle: day,
    lists: lists,
    name: lists[currentTask].name,
    tasks: lists[currentTask].tasks,
  });
});

app.post("/addItem", (req, res) => {
  lists[currentTask].tasks.push(req.body.newItem);
  res.redirect("/");
});

app.post("/addList", (req, res) => {
  lists.push({ name: req.body.listName, tasks: [] });
  res.redirect("/");
});

app.get("/switch", (req, res) => {
  currentTask = lists.findIndex((element) => element.name == req.query.name);
  res.redirect("/");
});

app.get("/delete", (req, res) => {
  let deleteList = lists.findIndex((element) => element.name == req.query.name);
  if (deleteList == currentTask) {
    currentTask = 0;
  }
  lists.splice(deleteList, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`App is running on port:${port}`);
});
