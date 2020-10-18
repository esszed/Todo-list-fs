"use strict";

//modules
var path = require('path');

var express = require('express');

var mongoose = require('mongoose');

var ejs = require('ejs');

var port = 3000;
var app = express(); //paths

var publicDirectoryPath = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views'); //view  engine

app.set('view engine', 'ejs');
app.set('views', viewsPath); //express settings

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express["static"](publicDirectoryPath)); //database coonnect mongodb://localhost:27017/todolistDB

mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}); //schemas

var itemsSchema = {
  name: String,
  checked: Boolean
};
var Item = mongoose.model('Item', itemsSchema);
var listsSchema = {
  name: String,
  items: [itemsSchema]
};
var List = mongoose.model('List', listsSchema); //app

var currentNumber = 0;
app.get('/', function _callee(req, res) {
  var today, options, day;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          today = new Date();
          options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          };
          day = today.toLocaleDateString('en-UK', options);
          _context.next = 5;
          return regeneratorRuntime.awrap(List.find({}, function (err, lists) {
            if (lists.length === 0) {
              currentList = {
                name: '',
                items: []
              };
            } else {
              currentList = lists[currentNumber];
            }

            res.render('index', {
              day: day,
              lists: lists,
              currentList: currentList
            });
          }));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post('/addItem', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(List.find({}, function (err, lists) {
            var item = new Item({
              name: req.body.newItem,
              checked: false
            });
            item.save();
            lists[currentNumber].items.push(item);
            lists[currentNumber].save();
          }));

        case 2:
          res.redirect('/');

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post('/addList', function (req, res) {
  var list = new List({
    name: req.body.listName,
    tasks: []
  });
  list.save();
  res.redirect('/');
});
app.get('/switch', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(List.find({}, function (err, lists) {
            currentNumber = lists.findIndex(function (element) {
              return element._id == req.query.id;
            });
            res.redirect('/');
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get('/deletelist', function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(List.find({}, function (err, lists) {
            var index = lists.findIndex(function (element) {
              return element._id == req.query.id;
            });

            if (currentNumber === index) {
              currentNumber = 0;
            } else {
              currentNumber = currentNumber - 1;
            }
          }));

        case 2:
          _context4.next = 4;
          return regeneratorRuntime.awrap(List.findByIdAndRemove({
            _id: req.query.id
          }, function (err) {
            if (err) {
              console.log(err);
            }
          }));

        case 4:
          res.redirect('/');

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.get('/deletetask', function _callee5(req, res) {
  var currentId;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(List.find({}, function (err, lists) {
            currentId = lists[currentNumber]._id;
            List.findOneAndUpdate({
              _id: currentId
            }, {
              $pull: {
                items: {
                  _id: req.query.id
                }
              }
            }, function (err) {
              if (err) {
                console.log(err);
              }

              Item.findByIdAndDelete({
                _id: req.query.id
              }, function (err) {
                if (err) {
                  console.log(err);
                }

                res.redirect('/');
              });
            });
          }));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.get('/check', function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(List.find({}, function (err, lists) {
            currentList = lists[currentNumber];
            var index = currentList.items.findIndex(function (element) {
              return element._id == req.query.id;
            });
            var item = currentList.items[index];
            item.checked = !item.checked;
            currentList.save();
            res.redirect('/');
          }));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.listen(port, function () {
  console.log("App is running on port:".concat(port));
});