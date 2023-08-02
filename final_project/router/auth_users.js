const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  for(let x in users ){
    if(users[x].username == req.body.username && users[x].password == req.body.password){
      let accessToken = jwt.sign({data: req.body.username},'access',{expiresIn:60*60})
      req.session.authorization = {accessToken}
      return res.status(200).json({message:"User logged in successfully"})
    }
  }
  return res.status(400).json({message: "Please login"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const review = req.query.review;
  const ISBN = req.params.isbn;
  for(let x in books) {
    if(x === ISBN){
      books[x].review = review
      return res.status(202).json({message:`The review for the book with ISBN ${ISBN} added/updated successfully`})
    }else{
      return res.status(400).json({message: "Something went wrong"});
    }
  }
  
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const ISBN = req.params.isbn;
  const user = req.user.data;
  for(let x in books) {
    if(x === ISBN){
      books[x].review = {}
      return res.status(201).json({message:`The review for the book with ISBN ${ISBN} posted by ${user} deleted successfully`})
    }else{
      return res.status(400).json({message: "Something went wrong"});
    }
  }
  
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
