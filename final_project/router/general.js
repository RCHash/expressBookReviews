const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    // get the username and password
    const username=req.body.username;
    const password=req.body.password;
    // check whether both were provided
    if (username && password) {
        // add to the users array
        users.push({"username":username, "password":password});
        // send successful response
        return res.status(200).json({message: "User "+username+" registered successfully"});
    } else {
        // send failure response
        return res.status(400).json({message: "Bad request"});
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    // create a promise to get the books information
    const get_books=new Promise((resolve, reject) => {
        // get the books information
        resolve(res.send(JSON.stringify(books)));
    });
    // use the promise
    get_books;
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    // get the ISBN
    const isbn=req.params.isbn;
    // create a promise to fetch book information
    const get_book=new Promise((resolve, reject) => {
        // filter for that isbn
        const specificBook=books[isbn];
        // send the information on the book
        resolve(res.send(JSON.stringify(specificBook)));
    });
    // use the promise to get information on the book
    get_book;
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    // get the author from the request
    const author=req.params.author;
    // create a promise to get the books information
    const get_books=new Promise((resolve, reject) => {
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
            resolve(res.send(JSON.stringify(aBooks)));
        } else {
            // send failure response
            resolve(res.status(404).send(JSON.stringify({message: "Author not found"})));
        }
    });
    // use the promise to get the books
    get_books;
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
    // get the author from the request
    const title=req.params.title;
    // create a promise to get the books information
        const get_books=new Promise((resolve, reject) => {
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
        // if the title was found
        if (marker) {
            // send the books info
            resolve(res.send(JSON.stringify(aBooks)));
        } else {
            // send failure response
            resolve(res.status(404).send(JSON.stringify({message: "Title not found"})));
        }
    });
    // use the promise to get the data
    get_books;
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    // get the isbn from the request
    const isbn=req.params.isbn;
    // filter for that isbn and send the reviews
    res.send(JSON.stringify(books[isbn].reviews));
});

module.exports.general = public_users;