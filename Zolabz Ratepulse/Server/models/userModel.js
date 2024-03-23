export default function userModel(sequelize, DataTypes) {

    const Login = sequelize.define("logins", {
     
       name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        }
    
    })

    return Login

}