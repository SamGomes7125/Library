const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Display books
function displayBooks() {
  const container = document.getElementById("library-display");
  container.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
    `;

    container.appendChild(card);
  });
}
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn");
const form = document.getElementById("book-form");

newBookBtn.addEventListener("click", () => dialog.showModal());

cancelBtn.addEventListener("click", () => dialog.close());

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop form from refreshing page

  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const pages = document.getElementById("book-pages").value;
  const read = document.getElementById("book-read").checked;

  addBookToLibrary(title, author, pages, read);

  form.reset();
  dialog.close();
});

