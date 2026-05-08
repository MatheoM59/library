// --- Données ---
let bookCollection = [];

// --- Constructeur ---
function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// --- Prototype ---
Book.prototype.toggleRead = function () {
  this.read = this.read === 'Lu' ? 'Pas encore lu' : 'Lu';
};

// --- Fonctions ---
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(crypto.randomUUID(), title, author, pages, read);
  bookCollection.push(newBook);
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
      <button class="delete">Supprimer le livre</button>
      <button class="status">Changer le status de lecture</button>
    `;
    card.dataset.id = bookCollection[i].id;
    const btnDelete = card.querySelector('.delete');
    btnDelete.addEventListener('click', () => {
      bookCollection = bookCollection.filter(
        (book) => book.id !== card.dataset.id
      );
      display();
    });
    const btnStatus = card.querySelector('.status');
    btnStatus.addEventListener('click', () => {
      bookCollection[i].toggleRead();
      display();
    });
    container.appendChild(card);
  }
}

// --- Données initiales ---
addBookToLibrary('La femme de ménage', 'Freida McFadden', 432, 'Pas encore lu');
addBookToLibrary('Astérix en Lusitanie', 'Fabcaro et Didier Conrad', 48, 'Lu');
addBookToLibrary(
  'Les Secrets de la femme de ménage',
  'Freida McFadden',
  352,
  'Lu'
);
addBookToLibrary('La psy', 'Freida McFadden', 384, 'Lu');
display();

// --- Événements ---
const dialog = document.getElementById('dialog');

document.getElementById('btnAdd').addEventListener('click', () => {
  dialog.showModal();
});

document.getElementById('close').addEventListener('click', () => {
  dialog.close();
});

document.getElementById('submit').addEventListener('click', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  let read = document.getElementById('read').checked;
  if (read == false) {
    read = 'Pas encore lu';
  } else {
    read = 'Lu';
  }
  addBookToLibrary(title, author, pages, read);
  display();
  dialog.close();
});
