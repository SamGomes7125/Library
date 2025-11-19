// Store all books here
const myLibrary = [];

// Book constructor
function Book(title, author, pages, hasRead) {
  this.id = crypto.randomUUID(); // unique stable ID
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.info = function () {
    const readStatus = this.hasRead ? "already read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
  };
}

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, hasRead) {
  const newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);
  return newBook; 
}

