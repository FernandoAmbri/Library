class Book {
  constructor(
    title = "unknown",
    author = "unknown",
    numberPages = 0,
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.numberPages = numberPages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook() {}

  deleteBook() {}
}

const btn_addBook = document.querySelector("#add-book");
const displayForm = document.querySelector(".form-container");
const cardsContainer = document.querySelector(".cards-container");
const form = document.querySelector("form");

const input_title = document.querySelector("#title");
const input_author = document.querySelector("#author");
const input_pages = document.querySelector("#pages");
const checkbox = document.querySelector("#isRead");
const book_error = document.querySelector(".book-added");
const close_form = document.querySelector(".close");

let myLibrary = [];
let beenRead = false;

function Book(title, author, numeroPages, isRead) {
  this.title = title;
  this.author = author;
  this.numeroPages = numeroPages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  let title = input_title.value;
  let author = input_author.value;
  let pages = input_pages.value;

  let book = new Book(title, author, pages, beenRead);
  if (verifyBook(book) === true) {
    myLibrary.push(book);
    displayBooks(myLibrary[myLibrary.length - 1], myLibrary.length - 1);
    clearInputs();
    book_error.style.display = "none";
  } else {
    book_error.style.display = "block";
  }
}

function verifyBook(obj_book) {
  return myLibrary.every((book) => book["title"] !== obj_book["title"]);
}

function createDiv(index) {
  let div = document.createElement("div");
  div.classList.add("card");
  div.setAttribute("id", index);
  return div;
}

function createSpan(id, content) {
  let span = document.createElement("span");
  span.setAttribute("id", id);
  span.textContent = content;
  return span;
}

function displayBooks(book, card_index) {
  let card = createDiv(card_index);
  let span_title = createSpan("title-book", book["title"]);
  let span_author = createSpan("author-book", book["author"]);
  let span_pages = createSpan("pages-book", book["numeroPages"]);

  let button_read = document.createElement("button");

  if (book["isRead"] === false) {
    button_read.setAttribute("id", "not-read");
    button_read.textContent = "Not read";
  } else {
    button_read.setAttribute("id", "been-read");
    button_read.textContent = "Read";
  }

  let button_remove = document.createElement("button");
  button_remove.setAttribute("id", "remove");
  button_remove.textContent = "Remove";

  card.appendChild(span_title);
  card.appendChild(span_author);
  card.appendChild(span_pages);
  card.appendChild(button_read);
  card.appendChild(button_remove);

  cardsContainer.appendChild(card);

  button_remove.addEventListener("click", () => {
    myLibrary.splice(Number(card_index), 1);
    cardsContainer.removeChild(card);
  });

  button_read.addEventListener("click", (e) => {
    if (book["isRead"] === true) {
      book["isRead"] = false;
      e.target.setAttribute("id", "not-read");
      e.target.textContent = "Not read";
    } else {
      book["isRead"] = true;
      e.target.setAttribute("id", "been-read");
      e.target.textContent = "Read";
    }
  });
}

function clearInputs() {
  form.reset();
}

btn_addBook.addEventListener("click", (e) => {
  displayForm.style.display = "flex";
});

checkbox.addEventListener("change", (e) => {
  if (beenRead === false) {
    beenRead = true;
  } else {
    beenRead = false;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

close_form.addEventListener("click", (e) => {
  clearInputs();
  book_error.style.display = "none";
  displayForm.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === displayForm) {
    clearInputs();
    book_error.style.display = "none";
    displayForm.style.display = "none";
  }
});
