// Array to store all Book objects
const myLibrary = [];

// ---- BOOK CONSTRUCTOR ----
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); 
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

// 🔥 NEW: Prototype function to toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
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
  container.innerHTML = ""; 

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.setAttribute("data-id", book.id);

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "Read ✔" : "Not read ❌"}</p>

      <button class="toggle-btn" data-id="${book.id}">
        ${book.read ? "Mark as Unread" : "Mark as Read"}
      </button>

      <button class="remove-btn" data-id="${book.id}">
        Remove
      </button>
    `;

    container.appendChild(card);
  });

  addRemoveListeners();
  addToggleListeners();
}

// ---- REMOVE BUTTON ----
function addRemoveListeners() {
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idToRemove = e.target.getAttribute("data-id");
      const index = myLibrary.findIndex((book) => book.id === idToRemove);
      if (index !== -1) myLibrary.splice(index, 1);
      displayBooks();
    });
  });
}

// ---- TOGGLE READ STATUS BUTTON ----
function addToggleListeners() {
  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      const book = myLibrary.find((b) => b.id === id);

      if (book) {
        book.toggleRead();   // 🔥 update object  
      }

      displayBooks();         // 🔄 re-render UI
    });
  });
}
// ---- FORM & MODAL LOGIC ----
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn");
const form = document.getElementById("book-form");

// Open modal
newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

// Close modal
cancelBtn.addEventListener("click", () => {
  dialog.close();
  form.reset();
});

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const pages = document.getElementById("book-pages").value;
  const read = document.getElementById("book-read").checked;

  addBookToLibrary(title, author, pages, read);

  dialog.close();
  form.reset();
});


// ---- sample data ----
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Atomic Habits", "James Clear", 288, true);
