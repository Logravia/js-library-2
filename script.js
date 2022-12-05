let myLibrary = [new Book("The Hobbit", "J.R.R. Tolkien", 1937)];

let table = document.querySelector("#book-table");

function Book(title, author, pubDate, rating=0, read=false) {
  this.title = title;
  this.author = author;
  this.pubDate = pubDate;
  this.rating = rating;
  this.read = read;
}

Book.prototype = {
  toggleRead: ()=> this.read = !this.read
}

const addBookToLibrary = data => {
  myLibrary.push(new Book(data.title, data.author, data.pubDate,
                          data.rating, data.read));
}

const newRow = (book, id=0) => {
  let row = document.createElement("tr");

  for (prop in book) { // fill cells with prop vals
    let cell = document.createElement("td");
    cell.textContent = book[prop];
    row.appendChild(cell);
  }
    row.appendChild(newDelBtn(id));
    table.appendChild(row);
}

const displayLibrary = () => {
  for (let i = 0; i < myLibrary.length; i++) {
    newRow(myLibrary[i], i);
  }
}

const refreshDisplay = () => {
  table.replaceChildren();
  displayLibrary();
}

const removeBook = id => {
  myLibrary.splice(id,1);
}

const newDelBtn = id => {
  btn = document.createElement("button");
  btn.id = id;
  btn.textContent = "DELETE"
  btn.addEventListener("click",e=>{
    removeBook(e.currentTarget.id);
    refreshDisplay();
  });
  return btn;
}

displayLibrary();
