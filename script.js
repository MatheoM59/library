const bookCollection = [];
let title;
let author;
let pages;
let read;

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
function display() {
  const container = document.querySelector('.library');
  container.innerHTML = '';
  for (let i = 0; i < bookCollection.length; i++) {
    const card = document.createElement('div');
    card.innerHTML = `
    <h2>${bookCollection[i].title}</h2>
    <p>Auteur : ${bookCollection[i].author}</p>
    <p>Pages : ${bookCollection[i].pages}</p>
    <p>${bookCollection[i].read}</p>
  `;
    container.appendChild(card);
  }
}

const dialog = document.getElementById('dialog');
document.getElementById('btnAdd').addEventListener('click', () => {
  dialog.showModal();
});
document.getElementById('close').addEventListener('click', () => {
  dialog.close();
});

document.getElementById('submit').addEventListener('click', (event) => {
  event.preventDefault();
  title = document.getElementById('title').value;
  author = document.getElementById('author').value;
  pages = document.getElementById('pages').value;
  read = document.getElementById('read').checked;
  addBookToLibrary(title, author, pages, read);
  display();
  dialog.close();
});

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(crypto.randomUUID(), title, author, pages, read);
  bookCollection.push(newBook);
}

addBookToLibrary('La femme de ménage', 'Freida McFadden', 432, 'unread');
addBookToLibrary(
  'Astérix en Lusitanie',
  'Fabcaro et Didier Conrad',
  48,
  'read'
);
addBookToLibrary(
  'Les Secrets de la femme de ménage',
  'Freida McFadden',
  352,
  'read'
);
addBookToLibrary('La psy', 'Freida McFadden', 384, 'read');
display();
