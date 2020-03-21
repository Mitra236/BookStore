module.exports = `
    type BookStore {
        id: ID!,
        name: String!,
        books: [Book!]!
    }

    type Author {
        id: ID!
        firstName: String!
        lastName: String!
        biography: String!
        books: [Book!]!
    }

    type Book {
        id: ID!
        title: String!
        description: String!
        authorID: ID!
        author: Author!
        bookStoreID: ID
        bookStore: BookStore
        genreID: ID!
        genre: Genre!
    }

    type Genre {
        id: ID!
        name: String!,
        books: [Book]
    }

    type Query {
        bookStores: [BookStore!]!
        bookStore(id: ID!) : BookStore
        books: [Book!]!
        book(id: ID!) : Book
        genres: [Genre!]!
        genre(id: ID!) : Genre
        authors: [Author!]!
        author(id: ID!) : Author
    }

    type Mutation {
        createBook(title: String!, description: String!, authorId: ID!, genreId: ID!) : Book!
        updateBook(id: ID!, title: String!, description: String!): [Int!]!
        deleteBook(id: ID!): Int!
    }
`;