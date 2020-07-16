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

app.get("/", (req, res) => {
  res.render('index', {
    message: "Hello World",
  });
});

app.listen(port, () => {
  console.log(`App is running on port:${port}`);
});
