import * as productController from '../controllers/productController.js';
import * as reviewController from '../controllers/reviewController.js';
import * as userController from '../controllers/userController.js';


// import controllers review, products



// router
import { Router } from 'express';
const router = Router();



// use routers
router.post('/addProduct' , productController.upload , productController.addProduct)
router.post('/addUser' ,  userController.addUser)



router.get('/allProducts', productController.getAllProducts)

router.get('/published', productController.getPublishedProduct)




// Review Url and Controller
router.post('/addReview/:id', reviewController.addReview)
router.get('/allReviews', reviewController.getAllReviews)

// get product Reviews
router.get('/getProductReviews/:id', productController.getProductReviews)




// Products router
router.get('/:id', productController.getOneProduct)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)


export { router };
