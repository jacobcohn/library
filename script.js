const LOTF = {
    title: 1,
    author: 2,
    pages: 3,
    read: 4,
}
const GOT = {
    title: 5,
    author: 6,
    pages: 7,
    read: 8,
}
let myLibrary = [LOTF, GOT];

// book constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    // create the book object from user input
    const userInput = new Book(prompt('Title?'), prompt('Author?'), prompt('Pages?'), prompt('Read?'));
    // add book object to myLibrary and display it
    myLibrary.push(userInput);
    displayMyLibrary();
}

function displayMyLibrary() {
    const booksGrid = document.querySelector('#booksGrid');
    // (MAYBE) deletes all current DOM
    // loop that goes through all objects in array
    myLibrary.forEach(item => {
        // creates book card for each book
        const bookCard = document.createElement('div')
        booksGrid.appendChild(bookCard);
        bookCard.id = item.title + ' Book Card';
        bookCard.classList.toggle('bookCard');
        // creates div element for each property of each book
        for (let key in item) {
            const bookCardProperties = document.createElement('div');
            bookCard.appendChild(bookCardProperties);
            bookCardProperties.innerHTML = item[key];
            bookCardProperties.id = item.title + ' ' + key;
            bookCardProperties.classList.toggle(key);
        }
    });  
}

displayMyLibrary();