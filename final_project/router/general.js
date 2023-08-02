const express = require('express');
const axios = require('axios');
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
public_users.get('/',async (req, res) => {
  //Write your code here
  const result = new Promise((resolve,reject)=>{
    resolve(books)
  })
  const value = await result
  return res.status(200).send(JSON.stringify({books:value},null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async(req, res) =>{
  //Write your code here
  const ISBN = req.params.isbn
  const result = new Promise((resolve,reject)=>{
    resolve(books[ISBN])
  })
  const value = await result
  return res.status(200).json(value);
 });
  
// Get book details based on author
public_users.get('/author/:author',async(req, res) =>{
  //Write your code here
  const AUTHOR = req.params.author
  
  for(let x in books){
    if(books[x].author === AUTHOR){
      const obj = {
        isdn : x,
        title : books[x].title,
        reviews : books[x].reviews
      }
      console.log(obj)
      const result = new Promise((resolve,reject)=>{
        resolve(obj)
      })
      const value = await result
      return res.status(200).send(JSON.stringify({bookByAuthor : value},null,4));
    }
  }
  
});

// Get all books based on title
public_users.get('/title/:title',async(req, res) =>{
  const Title = req.params.title;
  for(let x in books){
    if(books[x].title === Title){
      let obj ={
        isbn : x,
        author : books[x].author,
        reviews : books[x].reviews
      }
      const result = new Promise((resolve,reject)=>{
        resolve(obj)
      })
      const value = await result
      return res.status(200).send(JSON.stringify({bookByTitle : value},null,4))
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
