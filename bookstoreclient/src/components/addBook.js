import React from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import '../App.css';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom'

const ALL_AUTHORS_AND_GENRES = gql `
    query AuthorsAndGenres {
        getAuthors: authors {
            id
            firstName
            lastName
        }

        getGenres: genres {
            id
            name
        }
    }
`;

const ADD_BOOK = gql `
  mutation CreateBook($title: String!, $description: String!, $authorId: ID!, $genreId: ID!) {
    createBook(title: $title, description: $description, authorId: $authorId, genreId: $genreId) {
        title
    }
  }
`;

function AddBook() {
    const { data, loading, error } = useQuery(ALL_AUTHORS_AND_GENRES)
    const [createBook] = useMutation(ADD_BOOK)

    if(!data) return 'Not found'
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    let title;
    let desc;
    let genreId = 0;
    let authorId = 0;
    
    return (
        <div className = "addBook">
            <nav className="navbar navbar-expand-lg navbar-default">          
                <a className="navbar-brand" href="#">Add Book</a> 
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-12 login-form-1">
                        <h3><i class="fa fa-book"></i></h3>
                        <form>
                            <div className="form-group">
                                <p>Title</p>
                                <input type="text" className="form-control" placeholder="Enter title" ref={node => { title = node; }} />
                            </div>
                            <div className="form-group">
                                <p>Author</p>
                                <select className="form-control" ref={node => { authorId = node; }} >{data.getAuthors.map((author) => 
                                    
                                    <option value = {author.id}>{author.firstName + " " + author.lastName}</option>
                                    
                                )}</select>
                            </div>
                            <div className="form-group">
                                <p>Genre</p>
                                <select className="form-control" ref={node => { genreId = node; }} >{data.getGenres.map((genre) => 
                                    <option value = {genre.id}>{genre.name}</option>
                                )}</select>
                            </div>
                            
                            <div className="form-group">
                                <p>Summary</p>
                                <textarea class="form-control" placeholder="Enter description" id="exampleFormControlTextarea1" rows="3" ref={node => { desc = node; }}></textarea>
                            </div>
                            <div className="form-group" id="btnForm">
                               <Link to="/"><input type="submit" className="btnSubmit" value="Create" onClick={(e) => {
                                    e.preventDefault()
                                    createBook({ variables: {title: title.value, description: desc.value, authorId: authorId.value, genreId: genreId.value}});    
                                    title.value = ''
                                    desc.value = ''
                                    authorId = 0
                                    genreId = 0

                                }}
                                /></Link> 
                            </div>
                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBook;