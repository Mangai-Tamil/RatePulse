export default function reviewModel(sequelize, DataTypes) {
    const Review = sequelize.define("review", {
        rating: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        useremail: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        }
    });

    return Review;
}
