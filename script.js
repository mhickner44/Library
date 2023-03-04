let myLibrary = [];

//user input
let addButton = document.querySelector(".addBook");
let formInput = document.querySelector("#bookInfo");
let addCard = document.getElementById("showCard");
let bookCard = document.querySelector(".bookCard");

let bookGrid = document.querySelector(".gridWrapper");

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
  //if logic
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

  //gets the input fields
  let bookTitle = formInput.elements["bookTitle"];
  let authorName = formInput.elements["authorName"];
  let pages = formInput.elements["pageNum"];
  let haveRead = formInput.elements["haveRead"];
  //gets the values from those fields
  bookTitle = bookTitle.value;
  authorName = authorName.value;
  pages = pages.value;
  haveRead = haveRead.value;

  let book1 = new Book(bookTitle, authorName, pages, haveRead);

  addBookToLibrary(book1);
  addToLib();
  e.target.reset();
  displayForm();
  console.log(myLibrary);
});
let count=0;
function addToLib() {
 //this is adding the same book right now 
//use a count or loop? and draw evertime


  const bookCard = document.createElement("div");
  bookCard.classList.add("bookCard");
  // arrray of book values
  let bookInfo = [
    myLibrary[count].title,
    `By: ${myLibrary[count].author}`,
    `# of pages: ${myLibrary[count].pages}`,
    myLibrary[count].haveRead,
  ];

  let nodes = bookInfo.map((book) => {
    let div = document.createElement("div");
    div.textContent = book;
    return div;
  });

  bookCard.append(...nodes);
  bookGrid.appendChild(bookCard);
  count++;
}
