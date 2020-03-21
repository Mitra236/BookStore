import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import '../App.css';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom'

const GET_BOOK = gql `
    query GetBook($id: ID!) {
        getBook:book(id: $id) {
            title
            description
            author {
                id
                firstName
                lastName
            }
            genre {
                name
            }
        }
    }
`

const UPDATE_BOOK = gql `
    mutation UpdateBook($id: ID!, $title: String!, $description: String!) {
        updateBook(id: $id, title: $title, description: $description)
    }
`
function Book(props) {
    const {id} = props.match.params
    const { data, loading, error } = useQuery(GET_BOOK, { variables: {id}, pollInterval: 500})
    const [updateBook] = useMutation(UPDATE_BOOK)
    var [oldTitle, setTitle] = useState('')

    if(!data) return 'Not found'
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    let title;
    let desc;

    return (
        <div className = "book">
            <nav className="navbar navbar-expand-lg navbar-default">          
                <a className="navbar-brand" href="#">{data.getBook.title}</a> 
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
                                <input type="text" className="form-control" defaultValue={oldTitle=data.getBook.title} ref={node => { title = node; }} />
                            </div>
                            <div className="form-group">
                                <p>Author</p>
                                <Link to = {"/author/" + data.getBook.author.id}><input type="text" disabled="disabled" className="form-control" value={data.getBook.author.firstName + " " + data.getBook.author.lastName} />[1]</Link>
                            </div>
                            <div className="form-group">
                                <p>Genre</p>
                                <input type="text" disabled="disabled" className="form-control" defaultValue={data.getBook.genre.name} />
                            </div>
                            <div className="form-group">
                                <p>Summary</p>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue={data.getBook.description} ref={node => { desc = node; }}></textarea>
                            </div>
                            <div className="form-group" id="btnForm">
                                <input type="submit" className="btnSubmit" value="Edit" onClick={(e) => {
                                    e.preventDefault()
                                    updateBook({ variables: {id: id, title: title.value, description: desc.value}});
                                    
                                }}
                                />
                            </div>
                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book;