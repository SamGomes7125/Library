// Array to store all Book objects
const myLibrary = [];

// ---- BOOK CONSTRUCTOR ----
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // unique stable ID
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "read" : "not read yet"
  }`;
};

// ---- ADD BOOK TO LIBRARY ----
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

// ---- DISPLAY BOOKS ----
function displayBooks() {
  const container = document.querySelector(".books-container");
  container.innerHTML = ""; // Clear previous content

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.setAttribute("data-id", book.id); // 🔥 Associate DOM with object

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "Read ✔" : "Not read ❌"}</p>

      <button class="remove-btn" data-id="${book.id}">
        Remove
      </button>
    `;

    container.appendChild(card);
  });

  addRemoveListeners();
}

// ---- REMOVE BOOK ----
function addRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idToRemove = e.target.getAttribute("data-id");

      // Remove from array
      const index = myLibrary.findIndex((book) => book.id === idToRemove);
      if (index !== -1) {
        myLibrary.splice(index, 1);
      }

      // Re-render UI
      displayBooks();
    });
  });
}

// ---- OPTIONAL: Add some starter books for testing ----
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Atomic Habits", "James Clear", 288, true);
