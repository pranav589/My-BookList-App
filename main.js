//book class:Represent Books
class Book{
  constructor(title,author, isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
    
  }
}

//Ui class:Handle UI task

class UI{
  static displayBooks(){
    const books=Store.getBooks();
    books.forEach((book)=>UI.addBookToList(book));
  }
  static addBookToList(book){
    const list=document.querySelector('#book-list');
    const row=document.createElement('tr');
    row.innerHTML=
      `<td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a hre='#' class='btn btn-danger btn-sm delete'>X</a></td>`;
    list.appendChild(row)
  }
  
  static deleteBook(el){
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();
      
    }
  }
  
  static showAlert(message,className){
    const div=document.createElement('div');
    div.className=`alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container=document.querySelector('.container');
    const form=document.querySelector('#book-form');
    container.insertBefore(div,form);
    //vanish in 3sec 
    setTimeout(()=>document.querySelector('.alert').remove(),3000)
  }
  
  
  static clearField(){
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';
}
}

//store class:handle storage

class Store{
  static getBooks(){
    let books;
    if(localStorage.getItem('books')===null){
      books=[]
    }else{
      books=JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  
  static addBook(book){
    const books=Store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
    
  }
  
  static removeBook(isbn){
    const books=Store.getBooks();
    books.forEach((book, index)=>{
      if(book.isbn===isbn){
        books.splice(index,1);
      }
    });
    localStorage.setItem('books',JSON.stringify(books))
  }
}

//event: display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks)

//event:add a Book
document.querySelector('#book-form'). addEventListener('submit',(e)=>{
   //Prevent actual submit
   e.preventDefault();
 
  //Get form Values
  const title=document.querySelector('#title').value;
  const author=document.querySelector('#author').value;
  const isbn=document.querySelector('#isbn').value;
  
  //validate
  if(title===''|| author===''|| isbn===''){
    UI.showAlert('Please fill in all fields','danger')
  }
  else{
    //instantiate a book
    const book = new Book(title, author, isbn)
    
    
    // add book to UI
    UI.addBookToList(book);
    
    //add book to store;
    Store.addBook(book);
    
    
    //success message
    UI.showAlert('Book Added','success');
    //clear fields
    UI.clearField();
    }
})
  
  
  
//event:remove a book
document.querySelector('#book-list'). addEventListener('click',(e)=>{
  
  //remove book from UI
  UI.deleteBook(e.target);
  
  //remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
  
  //show book removed message
  UI.showAlert('Book Removed','success')
})