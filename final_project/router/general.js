const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here

  const {username,password} = req.body;
  if(users.username != username){
    users.push({username,password})
    return res.status(201).json({message : `${username} Registered successfully, now you can loggin`})
  }
  return res.status(400).json({message: "user exists already please login"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify({books},null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn
  return res.status(200).json(books[ISBN]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const AUTHOR = req.params.author
  console.log(AUTHOR)
  for(let x in books){
    if(books[x].author === AUTHOR){
      const obj = {
        isdn : x,
        title : books[x].title,
        reviews : books[x].reviews
      }
      console.log(obj)
      return res.status(200).send(JSON.stringify({bookByAuthor : obj},null,4));
    }
  }
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const Title = req.params.title;
  for(let x in books){
    if(books[x].title === Title){
      let obj ={
        isbn : x,
        author : books[x].author,
        reviews : books[x].reviews
      }
      return res.status(200).send(JSON.stringify({bookByTitle : obj},null,4))
    }
  }
  //Write your code here
  return res.status(400).json({message: "Title not found"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  for(let x in books){
    if(x === ISBN){
      return res.status(200).send(JSON.stringify(books[x].reviews))
    }
  }
  return res.status(400).json({message: "Book not found"});
});

module.exports.general = public_users;
