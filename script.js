let myLibrary = [];

//user input
let addButton = document.querySelector(".addBook");
let formInput = document.querySelector("#bookInfo");
let addCard = document.getElementById("showCard");
let bookCard = document.querySelector(".bookCard");

let bookGrid = document.querySelector(".gridWrapper");

let currentBook = 0;

function Book(title, author, pages, haveRead) {
  (this.title = title),
    (this.author = author),
    (this.pages = pages),
    (this.haveRead = haveRead);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

//display the form

addButton.addEventListener("click", displayForm);

function displayForm() {
  
  let formStyles = window.getComputedStyle(formInput);
  let visibility = formStyles.getPropertyValue("display");

  if (visibility == "block") {
    formInput.style.display = "none";
  } else {
    formInput.style.display = "block";
  }
}

//taking the form
formInput.addEventListener("submit", function (e) {
  e.preventDefault();

  
  let bookTitle = formInput.elements["bookTitle"];
  let authorName = formInput.elements["authorName"];
  let pages = formInput.elements["pageNum"];
  let haveRead = formInput.elements["haveRead"];
 
  bookTitle = bookTitle.value;
  authorName = authorName.value;
  pages = pages.value;
  haveRead = haveRead.value;

  let book1 = new Book(bookTitle, authorName, pages, haveRead);

  addBookToLibrary(book1);
  //pass in the current element
  addToLib(myLibrary.length);
  e.target.reset();
  displayForm();
});

function addToLib(bookNum) {
 

  currentBook = myLibrary.length - 1;

  const bookCard = document.createElement("div");
  const del = document.createElement("div");

  bookCard.classList.add("bookCard");
  bookCard.id = bookNum;

  //remove the dom element
  bookCard.addEventListener("click", function (e) {
    //gets its placenemt in the parent element nodelist
    let selectedBook = e.target;
    if (selectedBook.classList == "exitButton") {
      removeBook(selectedBook.parentNode.id);
      this.remove();
    }
  });

  del.classList.add("exitButton");
  del.innerText = "x";

  let bookInfo = [
    myLibrary[currentBook].title,
    `By: ${myLibrary[currentBook].author}`,
    `# of pages: ${myLibrary[currentBook].pages}`,
    `Read?: ${readText(currentBook)}`,
  ];

  let nodes = bookInfo.map((book) => {
    let div = document.createElement("div");
    div.textContent = book;
    return div;
  });

  bookCard.append(...nodes);
  bookCard.append(del);

  bookCard.children[0].id = "title";

  bookGrid.appendChild(bookCard);
}

function removeBook(bookNum) {
  bookNum--;
  myLibrary.splice(bookNum, 1);
}

function readText(currentBook) {
  let read;
  if (myLibrary[currentBook].haveRead == "true") {
    read = "Yes";
  } else {
    read = "No";
  }
  return read;
}
