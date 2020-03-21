module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('author', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        biography: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
        {
            freezeTableName: true
        }
    );

    Author.associate = ( models ) => { Author.hasMany(models.book)};

    return Author;
}