import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import BookStore from "./components/bookstore"
import Book from "./components/book"
import AddBook from "./components/addBook"
import Author from "./components/author"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = "/" component = {BookStore}/>
          <Route exact path = "/book/:id" component = {Book}/>
          <Route exact path = "/author/:id" component = {Author}/>
          <Route exact path = "/addBook" component = {AddBook}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;