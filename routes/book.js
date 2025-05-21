var express = require("express")
var router= express.Router()
var book= require("../resources/book")

router.get("/",function(req,res){
  console.log('in / books')
    res.render("book",{title:'book app title',bookList: book})
})
router.get("/add",function(req,res){
    res.render("addbook",{title:'add book'})
})
router.post("/save", function (req, res, next) {
  book.push({ ...req.body,
     _id: `00${book.length + 1}` });
  res.redirect("/book");
});
router.get("/edit/:_id", function (req, res, next) {
  console.log(req.params._id);
  const books = book.find((book) => book._id === req.params._id);
  res.render("editbook", { title: "Edit Books", book: books});
});

router.post("/saveEdited/:_id", function (req, res, next) {
  const currIndex = book.findIndex((book) => req.params._id === book._id);
  book.splice(currIndex, 1, { ...req.body, _id: req.params._id });
  res.redirect("/book");
});

router.get("/delete/:_id", function(req, res) {
  const currIndex = book.findIndex((books) => books._id === req.params._id);
  console.log()
  if (currIndex !== -1) {
    book.splice(currIndex, 1);
  }
  res.redirect("/book");
}); 
module.exports= router;