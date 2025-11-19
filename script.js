const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add a book to the array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();  // refresh UI after adding
}

// Display all books on the page
function displayBooks() {
  const container = document.getElementById("library-display");
  container.innerHTML = ""; // clear before redisplay

  myLibrary.forEach((book) => {
    // Create card
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
      <p><small>ID: ${book.id}</small></p>
    `;

    container.appendChild(card);
  });
}

addBookToLibrary("Harry Potter", "J.K. Rowling", 350, true);
addBookToLibrary("Atomic Habits", "James Clear", 280, false);
