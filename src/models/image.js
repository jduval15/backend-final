const Image = sequelize.define('image', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publicId: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
