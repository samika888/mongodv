var express = require("express")
var router= express.Router()
const Boook= require('../models/book.model');
var book= require("../resources/book")


// router.get("/", async function(req,res){
//   const books= await Boook.find({});
//   console.log('in / books')
//     res.render("book",{title:'book app title',bookList: books})
// })
router.get("/", async function (req, res) {
  const books =await Boook.find({});
  res.render("book", { title: "Book App Title", bookList: books });
});
router.get("/add",function(req,res){
    res.render("addbook",{title:'add book'})
})
// router.post('/save', function(req, res, ){
//     Book.push({
//      ...req.body,
//      _id:`00${Book.length+1}`
//     })
//     res.redirect("/book");
// })
router.post("/save", async function (req, res, next) {
  try{
  const Book = await Boook.create(req.body)
  res.status(200).redirect('/book')
}
catch(error){
res.status(500).json({message: error.message})
}
});

router.get("/edit/:_id", async function (req, res, next) {
  try{
  const book= await Boook.findById(req.params._id)
  // console.log(req.params._id);
  // const books = book.find((book) => book._id === req.params._id);
  res.render("editbook", { title: "Edit Books", book})
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
});

// router.post("/saveEdited/:_id", function (req, res, next) {
//   const currIndex = book.findIndex((book) => req.params._id === book._id);
//   book.splice(currIndex, 1, { ...req.body, _id: req.params._id });
//   res.redirect("/book");
// });

router.post("/saveEdited/:_id", async function (req, res, next) {
  const book = await Boook.findByIdAndUpdate( req.params._id, req.body);
 if (!book) {
    return res.status(404).json({message: "Error updating book"})
  }
  res.redirect('/book')
 })
;

router.get("/delete/:_id", function(req, res) {
  const currIndex = book.findIndex((books) => books._id === req.params._id);
  console.log()
  if (currIndex !== -1) {
    book.splice(currIndex, 1);
  }
  res.redirect("/book");
}); 
module.exports= router;