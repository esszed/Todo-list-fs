//modules
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')

const port = 3000

const app = express()

//paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

//view  engine
app.set('view engine', 'ejs')
app.set('views', viewsPath)

//express settings
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(publicDirectoryPath))

//database coonnect
mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

//schemas

const itemsSchema = {
  name: String,
  checked: Boolean
}

const Item = mongoose.model('Item', itemsSchema)

const listsSchema = {
  name: String,
  items: [itemsSchema]
}
const List = mongoose.model('List', listsSchema)

//app

let currentNumber = 0
app.get('/', (req, res) => {
  let today = new Date()
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }
  let day = today.toLocaleDateString('en-UK', options)

  List.find({}, (err, lists) => {
    if (lists.length === 0) {
      currentList = { name: '', items: [] }
    } else {
      currentList = lists[currentNumber]
    }
    res.render('index', {
      day,
      lists,
      currentList
    })
  })
})

app.post('/addItem', (req, res) => {
  List.find({}, (err, lists) => {
    const item = new Item({
      name: req.body.newItem
    })
    item.save()
    lists[currentNumber].items.push(item)
    lists[currentNumber].save()
  })

  res.redirect('/')
})

app.post('/addList', (req, res) => {
  const list = new List({
    name: req.body.listName,
    tasks: []
  })
  list.save()
  res.redirect('/')
})

app.get('/switch', (req, res) => {
  List.find({}, (err, lists) => {
    currentNumber = lists.findIndex(element => element._id == req.query.id)
    res.redirect('/')
  })
})

app.get('/deletelist', (req, res) => {
  List.find({}, (err, lists) => {
    let index = lists.findIndex(element => element._id == req.query.id)
    if (currentNumber === index) {
      currentNumber = 0
    }
  })

  List.findByIdAndRemove({ _id: req.query.id }, err => {
    if (err) {
      console.log(err)
    }
  })

  res.redirect('/')
})

app.get('/deletetask', (req, res) => {
  let currentId
  List.find({}, (err, lists) => {
    currentId = lists[currentNumber]._id

    List.findOneAndUpdate(
      { _id: currentId },
      { $pull: { items: { _id: req.query.id } } },
      err => {
        if (err) {
          console.log(err)
        }
        Item.findByIdAndDelete({ _id: req.query.id }, err => {
          if (err) {
            console.log(err)
          }
          res.redirect('/')
        })
      }
    )
  })
})

app.listen(port, () => {
  console.log(`App is running on port:${port}`)
})
