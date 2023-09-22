let books = [];
let currentPage = 1;
const itemsPerPage = 10; // 10 items per page

document.addEventListener("DOMContentLoaded", function() {
    fetch('kjvdatawithidkey1.json')
        .then(response => response.json())
        .then(data => {
            books = data;
            displayBooks(books.slice(0, itemsPerPage));
        });
});

function displayBooks(displayedBooks) {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');

    leftColumn.innerHTML = '';
    rightColumn.innerHTML = '';

    displayedBooks.forEach((book, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h2>${book.book}</h2><p>${book.verse}</p>`;
        
        if (index < 5) {
            leftColumn.appendChild(card);
        } else {
            rightColumn.appendChild(card);
        }
    });
}

function search() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.book.toLowerCase().includes(query) || 
        book.verse.toLowerCase().includes(query)
    );
    currentPage = 1; // Reset to first page after search
    displayBooks(filteredBooks.slice(0, itemsPerPage));
}

function updatePage(increment) {
    const start = (currentPage - 1 + increment) * itemsPerPage;
    const end = start + itemsPerPage;
    currentPage += increment;

    displayBooks(books.slice(start, end));
}

function firstPage() {
    currentPage = 1;
    displayBooks(books.slice(0, itemsPerPage));
}

function lastPage() {
    currentPage = Math.ceil(books.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;

    displayBooks(books.slice(start));
}
