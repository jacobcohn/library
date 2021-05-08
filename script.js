let myLibrary = [];
let readBtns, removeBtns;

// book constructor
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', () => addBookToLibrary());

function addBookToLibrary() {
    // create the book object from user input
    const userInput = new Book(prompt('Title?'), prompt('Author?'), prompt('Pages?'));
    // add book object to myLibrary and display it
    myLibrary.push(userInput);
    updateLibrary();
}

function updateLibrary() {
    // updates position
    myLibrary.forEach(item => {
        const containsItem = element => element == item;
        const bookPosition = myLibrary.findIndex(containsItem);
        item.position = bookPosition;
    })
    // updates display
    deleteCurrentDisplay();
    displayMyLibrary();
    // updates readBtns and removeBtns
    readBtns = Array.from(document.querySelectorAll('.readBtn'));
    removeBtns = Array.from(document.querySelectorAll('.removeBtn'));
    addEventsToBtns();
}


const booksGrid = document.querySelector('#booksGrid');

function deleteCurrentDisplay() {
    while (booksGrid.firstChild) {
        booksGrid.removeChild(booksGrid.firstChild);
    }
}

function displayMyLibrary() {
    // loop that goes through all objects in array
    myLibrary.forEach(item => {
        // creates book card for each book
        const bookCard = document.createElement('div')
        booksGrid.appendChild(bookCard);
        bookCard.id = item.position + ' Book Card';
        bookCard.classList.toggle('bookCard');
        // creates div element for each property of each book
        for (let key in item) {
            if (key !== 'position') {
                const bookCardProperties = document.createElement('div');
                bookCard.appendChild(bookCardProperties);
                bookCardProperties.innerHTML = key + ': ' + item[key];
                bookCardProperties.id = item.position + ' ' + key;
                bookCardProperties.classList.toggle(key);
            }
        }
        // creating read button
        const readBtn = document.createElement('button');
        bookCard.appendChild(readBtn);
        readBtn.innerHTML = 'Read';
        readBtn.id = item.position + ' readBtn';
        readBtn.classList.toggle('readBtn');
        readBtn.classList.toggle('read');
        // creating remove button
        const removeBtn = document.createElement('button');
        bookCard.appendChild(removeBtn);
        removeBtn.innerHTML = 'Remove';
        removeBtn.id = item.position + ' removeBtn';
        removeBtn.classList.toggle('removeBtn');
    }) 
}

function addEventsToBtns() {
    // switches between 'Read' and 'Not Read' when readBtn clicked
    readBtns.forEach(item => {
        item.addEventListener('click', e => {
            if (e.target.classList.contains('read')) {
                item.innerHTML = 'Not Read';
            } else {
                item.innerHTML = 'Read';
            };
            item.classList.toggle('read');
            item.classList.toggle('not-read');
        })
    })
    // remove book card when removeBtn clicked
    removeBtns.forEach(item => {
        item.addEventListener('click', e => {
            const bookCardPosition = e.target.id.split(' ')[0];
            myLibrary.splice(bookCardPosition, 1);
            updateLibrary();
        })
    })
}