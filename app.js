// Book Constructor
function Book(title, author, isbn ) {
  this.title = title;
  this.author = author;
  this.isbn = isbn
}


// UI constructor
function UI(){}


// Add Book to list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // Create an element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href="#" class="delete">X<a></td>
  `;
  
  list.appendChild(row);
}


// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  // div.appenChild(document.createTextNode(message));
  div.innerText = message;
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
} 


// Delete Book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}


// Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";

}


// Event Listeners for add book
document.querySelector("#book-form").addEventListener("submit",
 function(e) {
  //  Get form values
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate 
  if (title === '' && author === '' && isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields ', 'error' );
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added!', 'success');
  
    // Clear Fields 
    ui.clearFields();
  }
  
  e.preventDefault();
  });


// Event listener for delete
document.getElementById('book-list').addEventListener
('click', function(e) {
  
  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});