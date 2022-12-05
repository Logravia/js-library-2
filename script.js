let myLibrary = [];

const table = document.querySelector("#book-table");
const inputs = document.querySelectorAll("input");
const saveBtn = document.querySelector("#save");

function Book(title="", author="", published=1990, rating=0, read=false) {
  this.title = title;
  this.author = author;
  this.published = published;
  this.rating = rating;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

const addBook = function (book) {
  myLibrary.push(book);
}

const newRow = function (book, id=0) {
  let row = document.createElement("tr");

  for (prop in book) { // fill cells with prop vals

    if (Object.prototype.hasOwnProperty.call(book, prop)) {
      let cell = document.createElement("td");
      cell.textContent = book[prop];
      row.appendChild(cell);
    }
  }
    row.appendChild(newDelBtn(id));
    row.appendChild(newReadBtn(id));
    row.appendChild(newEditBtn(id));
    table.appendChild(row);
}

const displayLibrary = function() {
  for (let i = 0; i < myLibrary.length; i++) {
    newRow(myLibrary[i], i);
  }
}

const refreshDisplay = function() {
  table.replaceChildren();
  displayLibrary();
}

const clearForm = function () {
  inputs.forEach((element)=>{
    element.value="";
  });
  elements[4].checked=false;
};

const fillForm = function (book) {
  inputs.forEach((element)=>{
    element.value=book[element.name];
  });
  inputs[4].checked=book.read;
}

const removeBook = function(id) {
  myLibrary.splice(id,1);
}

const newReadBtn = function(id) {
  btn = document.createElement("button");
  btn.value = id;
  btn.textContent = myLibrary[id].read ? "Read" : "Unread";
  btn.addEventListener("click",e=>{
    index = Number(e.currentTarget.value);
    myLibrary[index].toggleRead();
    refreshDisplay();
  });
  return btn;
}

const newDelBtn = function(id) {
  btn = document.createElement("button");
  btn.value = id;
  btn.textContent = "Delete"
  btn.addEventListener("click",e=>{
    removeBook(e.currentTarget.value);
    refreshDisplay();
  });
  return btn;
}

const newEditBtn = function(id) {
  btn = document.createElement("button");
  btn.value = id;
  btn.textContent = "Edit"

  btn.addEventListener("click",e=>{
    index = e.currentTarget.value;
    bookToEdit = myLibrary[index];
    fillForm(bookToEdit);
    removeBook(index);
    refreshDisplay();
  });
  return btn;
}

const gatherFormData = function () {
  let book = new Book;
  inputs.forEach((element)=>{
    book[element.name] = element.value;
  });
  book.read = inputs[4].checked;
  return book;
}

saveBtn.addEventListener("click", (e)=>{
  addBook(gatherFormData());
  refreshDisplay();
  clearForm();
})

displayLibrary();
