import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const READ_BOOKSTORE = gql `
  query BookStores {
    bookStores {
      books {
        title
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(READ_BOOKSTORE)

  if(!data) return <p>Not found</p>
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error</p>

  return (
    <div className = "app">
      <ul>
        {data.bookStores.map((bookStore) => 
          <li key = {bookStore.id} className = "w-100"></li>
        )}
      </ul>
    </div>
  )
}

export default App;