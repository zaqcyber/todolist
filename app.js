const express = require('express');
const bodyParser = require('body-parser');
//const date = require(__dirname +"/date.js");
const mongoose = require('mongoose');

const port = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/todoListDB');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


const itemsSchema = new mongoose.Schema(
    {   name: {
        type: String,
        required: true
    }
    });

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
    name: "Buy Food",
});

const item2 = new Item({
    name: "Cook Food",
});

const item3 = new Item({
    name: "Eat Food",
});

const arr = [item1, item2, item3];



app.get('/', (req, res) => {

    //const day = date();

    Item.find().then(function(items){
        if (items.length === 0) {
            Item.insertMany(arr).then(function () {
            console.log("Successfully inserted Multiple docs into collection");
            }).catch(function (err) {
                console.log(err);
            });
            res.redirect('/');
        } else {
            res.render('list', {listTitle: "Today", newListItem: items});
        }
        // mongoose.connection.close();
    });

    
});

app.post('/', (req, res) => {

    let itemName = req.body.newItem;
    const newItem = new Item({
        name: itemName,
    });
    newItem.save();
    res.redirect('/');
    // console.log(req.body.list);
    // if (req.body.list === 'Work') {
    //     workItems.push(item);
    //     res.redirect('/work');
    // } else{
    //     items.push(item);
    //     res.redirect('/');
    // }
      
});

app.post("/delete", (req, res)=>{
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId).then(function () {
        console.log("Successfully deleted one item");
        }).catch(function (err) {
            console.log(err);
        });
    res.redirect('/');
});


// app.get('/:customListName', function userIdHandler (req, res) {
//     console.log(req.params.customListName);
//   });

// app.get('/work', (req, res) => {
//     res.render('list', {listTitle: "Work List", newListItem: workItems});
// });

app.get('/about', (req, res) => {
    res.render("about");
});

app.listen(process.env.PORT || port, () => {
console.log(`Server started on port ${port}`)
});

