export default function productModel(sequelize, DataTypes) {
    const Product = sequelize.define("product", {
        image: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        published: {
            type: DataTypes.BOOLEAN
        }
    });

    return Product;
}
