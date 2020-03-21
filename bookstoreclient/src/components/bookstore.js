import React, { useState } from 'react';
import '../App.css';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom'

const READ_BOOKSTORE = gql `
  query BookStores {
    bookTitles: bookStores {
      name
      books {
        id
        title
      }
    }

    bookInfo: bookStores {
      books {
        id
        description
      }
    }
  }
`;

const DELETE_BOOK = gql `
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

function BookStore() {
    const { data, loading, error } = useQuery(READ_BOOKSTORE)
    const [deleteBook] = useMutation(DELETE_BOOK, {refetchQueries: [
      { query: READ_BOOKSTORE }
    ]})
    const [value, getValue] = useState(0)

    if(!data) return 'Not found'
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    var counter = 1;

    return (  
        <div className = "app">
            <nav className="navbar navbar-expand-lg navbar-default">
                {data.bookTitles.map((bookStore) => 
                    <a className="navbar-brand" href="#">{bookStore.name}</a>
                )}
                <Link to = "/addBook"><a className="navbar-brand" href="#">Add Book</a></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
            <h3 className="books">Books</h3>
            <table className="table table-striped" id="bookTable">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th></th>
                </tr>
                </thead>
                {data.bookTitles.map((bookStore) =>  {         
                    return (             
                    <tbody>     
                        {bookStore.books.map((book) => 
                            <tr data-toggle="collapse" data-target="#demo1" className="accordion-toggle" onClick={() => getValue(book.id)}>
                            <td>{counter++}</td>
                            <td><Link to = {"/book/" + book.id}>{book.title}</Link></td>
                            <td><button className="btn" onClick={ () => deleteBook({variables: {id: book.id}}) }><i className="fa fa-trash"></i></button></td>
                            </tr>
                        )} 
                        {data.bookInfo.map((bookInfo) => bookInfo.books.map((book) =>                             
                        <tr>  
                            {book.id === value ?
                            (<td colSpan="3" className="hiddenRow">
                                <div className="accordion-body collapse" id="demo1">    
                                    {book.description} 
                                </div>        
                            </td>) : null  
                            }                
                        </tr>       
                        ))}
                    </tbody>
                    )
                })}
            </table>
            {/* <footer>
              2020
        </footer> */}
        </div>
        
    )
    
}

export default BookStore;
