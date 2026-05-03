import express from "express";
import data from "./data.json" with { type: "json" };

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// 🏠 HOME PAGE (EJS)
app.get("/", (req, res) => {
  const bookName = req.query.book;

  let books = data;

  if (bookName) {
    books = data.filter((book) => book.title.toLowerCase().includes(bookName.toLowerCase()));
  }

  res.render("index", { books });
});

// 📦 API ENDPOINT
app.get("/api/books", (req, res) => {
  const search = req.query.search;

  if (!search) {
    return res.json(data);
  }

  const filteredBooks = data.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));

  res.json(filteredBooks);
});

// 🚀 SERVER START
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
