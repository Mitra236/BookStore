module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('book', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        } 
    },
        {
            freezeTableName: true
        }
    );

    Book.associate = ( models ) => { Book.belongsTo(models.genre), Book.belongsTo(models.author), Book.belongsTo(models.bookStore) };

    return Book;
}