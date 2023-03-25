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

  //need getters and setters to be able to use the book info
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

  // set
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
  //probably need to have something that returns a books spot in the array
}

//bookcard that can be put on the dom

class bookCard {
  constructor() {
    this.cardElement = document.createElement("div");
    let del = document.createElement("div");

    this.cardElement.classList.add("bookCard");
    del.classList.add("exitButton");
    del.innerText = "x";

    this.cardElement.append(del);

    this.cardElement.addEventListener("click", removeBook);
  }

  //fill the card with the specific book from the array
  fillCard(cardNum, lib) {
    //get the book from the library and then get the info fromt he book
    let currentBook = lib.getLibrary[cardNum];

    let bookInfo = [
      `title:${currentBook.getTitle}`,
      `By: ${currentBook.getAuthor}`,
      `# of pages: ${currentBook.getPages}`,
      `Read?: ${currentBook.getHaveRead}`,
    ];

    let nodes = bookInfo.map((book) => {
      let div = document.createElement("div");
      div.textContent = book;
      return div;
    });
    //need to get
    this.cardElement.append(...nodes);
    // cardElement.append(del);
  }
  get getCard() {
    return this.cardElement;
  }
}


//display book card to gride in the display controller
// lib.addBook("LOTR", "tolkein", 69, true);
// lib.addBook("LOTR sequel", "RR martin", 69, true);
// console.log(lib.getLibrary[1]);
// console.log(lib);
// let bookElement = new bookCard();
// let bookElement2 = new bookCard();
// bookElement.fillCard(0, lib);
// bookElement2.fillCard(1, lib);
// let card = bookElement.createCard();

// grid.append(bookElement.getCard);
// grid.append(bookElement2.getCard);
// lib.removeBook(1);

// removing the bookcard event listener original

function removeBook(){
//remove book card froim the dom 
var index = Array.from(grid.children).indexOf(this);
lib.removeBook(index);
this.remove();
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
  let newBookCard =new bookCard();
  // let book1 = new Book(bookTitle, authorName, pages, haveRead);
//need the current number to fill it with 
  //next in the lib to be filled 
  newBookCard.fillCard(lib.getLibrary.length-1, lib);

  grid.append(newBookCard.getCard);

  // //pass in the current element
  // addToLib(myLibrary.length);
  e.target.reset();
  displayForm();
});



const lib = new library();