import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import '../addBook.css';
import { gql } from 'apollo-boost';

const GET_AUTHOR = gql `
    query GetAuthor($id: ID!) {
        author(id: $id) {     
            firstName
            lastName
            biography
        }
    }
`

function Author(props) {
    const {id} = props.match.params
    const { data, loading, error } = useQuery(GET_AUTHOR, { variables: {id}})

    if(!data) return 'Not found'
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div className = "book">
            <nav className="navbar navbar-expand-lg navbar-default">          
                <a className="navbar-brand" href="#">{data.author.firstName + " " + data.author.lastName}</a> 
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
            <div className="container author-container">
                <div className="row">
                    <div className="col-md-12 author-form-1">
                        <h3><i class="fa fa-user"></i></h3>
                        <form>
                            <div className="form-group">
                                <p>FirstName</p>
                                <input type="text" className="form-control" defaultValue={data.author.firstName} />
                            </div>
                            <div className="form-group">
                                <p>LastName</p>
                                <input type="text" disabled="disabled" className="form-control" value={data.author.lastName} />
                            </div>
                            <div className="form-group">
                                <p>Biography</p>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue={data.author.biography} ></textarea>
                            </div>
                            <div className="form-group" id="btnForm">
                             
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Author;