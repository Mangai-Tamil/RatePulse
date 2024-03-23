import * as dbConfig from '../config/dbConfig.js';

import { Sequelize, DataTypes } from 'sequelize';

import productModel from './productModel.js';
import reviewModel from './reviewModel.js';
import userModel from './userModel.js';

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize



db.products = productModel(sequelize, DataTypes);
db.reviews = reviewModel(sequelize, DataTypes);
db.logins = userModel(sequelize, DataTypes);

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})



// 1 to Many Relation

db.products.hasMany(db.reviews, {
    foreignKey: 'product_id',
    as: 'review'
})

db.reviews.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product'
})


export default db