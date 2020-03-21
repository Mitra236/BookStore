module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('genre', {
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

    Genre.associate = ( models ) => { Genre.hasMany(models.book)};

    return Genre;
}