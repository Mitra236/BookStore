module.exports = {
    BookStore: {
        books: (parent, args, context, info) => parent.getBooks(),
    },
    Author: {
        books: (parent, args, context, info) => parent.getBooks()
    },
    Genre: {
        books: (parent, args, context, info) => parent.getBooks()
    },
    Book: {
        bookStore: (parent, args, context, info) => parent.getBookStore(),
        author: (parent, args, context, info) => parent.getAuthor(),
        genre: (parent, args, context, info) => parent.getGenre()
    },
    
    Query: {
        bookStores: (parent, args, { db }, info) => db.bookStore.findAll(),
        authors: (parent, args, { db }, info) => db.author.findAll(),
        books: (parent, args, { db }, info) => db.book.findAll(),
        genres: (parent, args, { db }, info) => db.genre.findAll(),
        bookStore: (parent, { id }, { db }, info) => db.bookStore.findByPk(id),
        author: (parent, { id }, { db }, info) => db.author.findByPk(id),
        book: (parent, { id }, { db }, info) => db.book.findByPk(id), 
        genre: (parent, { id }, { db }, info) => db.genre.findByPk(id), 
    },
    Mutation: {
        createBook: (parent, { title, description, authorId, genreId }, { db }, info) => 
            db.book.create({
                title: title,
                description: description,
                authorId: authorId,
                genreId: genreId,
                bookStoreId: 1
            }),
        updateBook: (parent, { title, description, id }, { db }, info) => 
            db.book.update({
                title: title,
                description: description
            },
            {
               where: {
                   id: id
               }
            }),
        deleteBook: (parent, { id }, { db }, info) =>
            db.book.destroy({
                where: {
                    id: id
                }
            })
    }
};