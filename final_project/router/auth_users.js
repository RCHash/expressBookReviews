const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
    // filter for the username and password
    const foundUser=users.filter((user) => {
        user.username===username && user.password===password
    });
    // if there was a match
    if (foundUser.length>0) {
        return true;
    // otherwise
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    // get the username and password
    const username=req.body.username;
    const password=req.body.password;
    // check whether both were provided
    if (username && password) {
        if (authenticatedUser(username,password)) {
            // get the access token
            let accessToken = jwt.sign({data: password}, 'access', { expiresIn: 60 * 60 });
            req.session.authorization = {accessToken,username};
            // send success response
            return res.status(200).json({message: "User "+user+" logged in"});
        } else {
            // send failure response
            return res.status(400).json({message: "Bad request"});
        }
    } else {
        // send failure response
        return res.status(400).json({message: "Bad request"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  // get the isbn from the request
  const isbn=req.params.isbn;
  // get the data from the request body
  const review=req.body.review;
  // get the username
  const username=req.session.authorization.username;
  // check whether there's such isbn
  if (books[isbn]) {
    // add the user's review
    book[isbn].reviews[username]=review;
  //otherwise
  } else {
    // send a failure message
    return res.status(404).json({message: "ISBN not found"});
  }
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
