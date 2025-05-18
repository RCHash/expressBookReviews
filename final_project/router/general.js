const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  // send a JSON string with the books
  res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    // get the ISBN
    const isbn=req.params.isbn;
    // filter for that isbn and send it
    res.send(JSON.stringify(books[isbn]));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    // get the author from the request
    const author=req.params.author;
    // initialize the found marker
    let marker=false;
    // initialize the aBooks array
    let aBooks=[];
    // map the book entries
    for (let [key, value] of Object.entries(books)) {
        // if the book entry matches the 
        if (books[key].author===author) {
            // reset the marker
            marker=true;
            // append to the aBooks array
            aBooks.push(books[key]);
        }
    };
    // if the author was found
    if (marker) {
        // send the books info
        res.send(JSON.stringify(aBooks));
    } else {
        //Write your code here
        return res.status(404).json({message: "Author not found"});
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    // get the author from the request
    const title=req.params.title;
    // initialize the found marker
    let marker=false;
    // initialize the aBooks array
    let aBooks=[];
    // map the book entries
    for (let [key, value] of Object.entries(books)) {
        // if the book entry matches the 
        if (books[key].title===title) {
            // reset the marker
            marker=true;
            // append to the aBooks array
            aBooks.push(books[key]);
        }
    };
    // if the author was found
    if (marker) {
        // send the books info
        res.send(JSON.stringify(aBooks));
    } else {
        //Write your code here
        return res.status(404).json({message: "Title not found"});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
