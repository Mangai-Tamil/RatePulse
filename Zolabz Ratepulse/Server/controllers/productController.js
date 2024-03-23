
import db from '../models/index.js';
// Assuming '../models' exports the necessary database models
import multer from 'multer';
import path from 'path';


// create main Model
const Product = db.products
const Review = db.reviews
const Login=db.login



// main work

// 1. create product

const addProduct = async (req, res) => {

    let info = {

        image: req.file.path,

        title: req.body.title,
     
        email: req.body.email,
        password: req.body.password,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)

}


const register = async (req, res) => {

    let info = {

        
        name: req.body.name,
     
        email: req.body.email,
        password: req.body.password,
       
    }

    const login = await Login.create(info)
    res.status(200).send(login)
    console.log(login)

}



// 2. get all products

const getAllProducts = async (req, res) => {

    let products = await Product.findAll({})
    res.status(200).send(products)

}

// 3. get single product

const getOneProduct = async (req, res) => {

    let id = req.params.id
    let product = await Product.findOne({ where: { id: id } })
    res.status(200).send(product)

}

// 4. update Product

const updateProduct = async (req, res) => {

    let id = req.params.id

    const product = await Product.update(req.body, { where: { id: id } })

    res.status(200).send(product)


}

// 5. delete product by id

const deleteProduct = async (req, res) => {

    let id = req.params.id

    await Product.destroy({ where: { id: id } })

    res.status(200).send('Product is deleted !')

}

// 6. get published product

const getPublishedProduct = async (req, res) => {

    const products = await Product.findAll({ where: { published: true } })

    res.status(200).send(products)

}

// 7. connect one to many relation Product and Reviews

const getProductReviews = async (req, res) => {

    const id = req.params.id

    const data = await Product.findOne({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}

// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')


export {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProductReviews,
    upload,

    register
};