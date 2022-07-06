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

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }

  deleteBook(index) {
    this.books = this.books.filter((book, i) => i !== index);
  }

  getBook(index) {
    return this.books.find((book, i) => i === index);
  }
}

const library = new Library();

const input_title = document.getElementById("title");
const input_author = document.getElementById("author");
const input_pages = document.getElementById("pages");
const checkbox = document.getElementById("isRead");
const openForm = document.getElementById("open_form");
const btn_close_form = document.getElementById("close_form");

const displayForm = document.querySelector(".form-container");
const cardsContainer = document.querySelector(".cards-container");
const book_error = document.querySelector(".book-added");
const form = document.querySelector("form");

function resetBooksGrid() {
  cardsContainer.innerHTML = "";
}

function updateBooksGrid() {
  resetBooksGrid();
  library.books.forEach((book, index) => createBookCard(book, index));
}

function getBookFromInput() {
  let title = input_title.value,
    author = input_author.value,
    pages = input_pages.value,
    isRead = checkbox.checked;
  return new Book(title, author, pages, isRead);
}

function addBookToLibrary() {
  const newBook = getBookFromInput();

  if (library.isInLibrary(newBook)) {
    book_error.style.display = "block";
    return;
  }
  book_error.style.display = "none";
  library.addBook(newBook);
  updateBooksGrid();
}

function toggleRead(e) {
  let index = Number(e.target.parentElement.id);
  const book = library.getBook(index);
  book.isRead = !book.isRead;
  updateBooksGrid();
}

function removeBookLibrary(e) {
  let index = Number(e.target.parentElement.id);
  library.deleteBook(index);
  updateBooksGrid();
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

function createBookCard(book, card_index) {
  let card = createDiv(card_index);
  let span_title = createSpan("title-book", book["title"]);
  let span_author = createSpan("author-book", book["author"]);
  let span_pages = createSpan("pages-book", book["numberPages"]);

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

  button_remove.onclick = removeBookLibrary;
  button_read.onclick = toggleRead;
}

function showForm() {
  displayForm.style.display = "flex";
  form.reset();
}

function closeForm() {
  form.reset();
  book_error.style.display = "none";
  displayForm.style.display = "none";
}

openForm.onclick = showForm;
btn_close_form.onclick = closeForm;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

window.addEventListener("click", (e) => {
  if (e.target === displayForm) {
    closeForm();
  }
});
