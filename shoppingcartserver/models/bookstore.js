module.exports = (sequelize, DataTypes) => {
    const BookStore = sequelize.define('bookStore', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    },
        {
            freezeTableName: true
        }
    );

    BookStore.associate = ( models ) => { BookStore.hasMany(models.book)};

    return BookStore;
}