const Image = sequelize.define('image', {
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
