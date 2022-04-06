const express = require("express");

const router = express.Router();

// Controller
// import controller here
const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getProfileUser,
} = require("../controllers/user");

const {
  addTrans,
  getTrans,
  getTransaction,
  updateTrans,
} = require("../controllers/trans");

const {
  addBooks,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/books");

const { addMyListBook } = require("../controllers/myListBook");

const { register, login, checkAuth } = require("../controllers/auth");

const { auth } = require("../middlewares/auth");

//import middlewares
const { uploadFile } = require("../middlewares/uploadFile");
const { uploadFiletrans } = require("../middlewares/uploadFiletrans");

// Route

// add route here
router.post("/user", addUser);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

//get profile
router.get("/profile/:id", getProfileUser);

//get transaction

router.post("/transaction", auth, uploadFiletrans("transferProof"), addTrans);
router.get("/transactions", auth, getTrans);
router.get("/transaction/:id", getTransaction);
router.patch("/transaction/:id", updateTrans);

//auth
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

//books
router.post("/books", auth, uploadFile("abautThisBook", "image"), addBooks);
router.get("/books", auth, getBooks);
router.get("/book/:id", auth, getBook);
router.patch("/book/:id", updateBook);
router.delete("/book/:id", deleteBook);

//listBook
router.post("myListBook", auth, addMyListBook);

module.exports = router;
