const grid = document.querySelector(".gridWrapper");
let addButton = document.querySelector(".addBook");
let formInput = document.querySelector("#bookInfo");

class book {
  constructor(title, author, pages, haveRead) {
    this._title = title;
    this._author = author;
    this._pages = pages;
    this._haveRead = haveRead;
  }

  get getTitle() {
    return this._title;
  }
  get getAuthor() {
    return this._author;
  }
  get getPages() {
    return this._pages;
  }
  get getHaveRead() {
    return this._haveRead;
  }

  set setTitle(bookTitle) {
    return (this._title = bookTitle);
  }
  set setAuthor(bookAuthor) {
    return (this._author = bookAuthor);
  }
  set setPages(numPages) {
    return (this._pages = numPages);
  }
  set setHaveRead(read) {
    return (this._haveRead = read);
  }
}

class library {
  constructor() {
    this.library = [];
  }

  addBook(title, author, pages, haveRead) {
    let newBook = new book(title, author, pages, haveRead);
    this.library.push(newBook);
    return newBook;
  }

  removeBook(bookPlacement) {
    this.library.splice(bookPlacement, 1);
  }

  get getLibrary() {
    return this.library;
  }
 
}


class bookCard {
  constructor() {
    this.cardElement = document.createElement("div");
    let del = document.createElement("div");

    this.cardElement.classList.add("bookCard");
    del.classList.add("exitButton");
    del.innerText = "x";

    this.cardElement.append(del);
    del.addEventListener("click", removeBook);
  }

  //fill the card with the specific book from the array
  fillCard(cardNum, lib) {
    let currentBook = lib.getLibrary[cardNum];

    let bookInfo = [
      `${currentBook.getTitle}`,
      `By: ${currentBook.getAuthor}`,
      `# of pages: ${currentBook.getPages}`,
      `Read?: ${currentBook.getHaveRead}`,
    ];

    let nodes = bookInfo.map((book) => {
      let div = document.createElement("div");
      div.textContent = book;
      return div;
    });
  
    this.cardElement.append(...nodes);
    this.cardElement.children[1].id = "title";
  
  }
  get getCard() {
    return this.cardElement;
  }
}



function removeBook() {
  var index = Array.from(grid.children).indexOf(this.parentNode);
  lib.removeBook(index);
  this.parentNode.remove();
}

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

  lib.addBook(bookTitle, authorName, pages, haveRead);
  let newBookCard = new bookCard();

  newBookCard.fillCard(lib.getLibrary.length - 1, lib);

  grid.append(newBookCard.getCard);

  e.target.reset();
  displayForm();
});

const lib = new library();
