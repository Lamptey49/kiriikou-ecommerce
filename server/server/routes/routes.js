const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const businessController = require('../controllers/businessController')
const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')

router.get('/', (req, res)=>{
   res.send('Server is up and running')
})
/**
 * User Routes
 */
router.post('/signup', userController.signUp)
router.post('/auth/login', authController.signin)
router.get('/auth/user/:userId', authController.requireSignin, authController.hasAuthorization, userController.getUser)
router.get('/auth/users', authController.requireSignin,authController.hasAuthorization, authController.grantAccess('readAny', 'profile'),  userController.getUsers)
router.put('/auth/user/:userId', authController.requireSignin, authController.hasAuthorization, authController.grantAccess('updateAny','profile'), userController.updateUser)
router.delete('/auth/user/:userId', authController.requireSignin, authController.hasAuthorization, authController.grantAccess('deleteAny','profile'), userController.deleteUser)
router.route('/auth/auth/signout').get(userController.signOut)
router.param('userId', userController.getUser)
// End of User Routes
/**
 * Company/ Business Routes
 */
router.post('/api/register', businessController.createBusiness )
router.get('/api/businesses',  authController.requireSignin, authController.grantAccess('readAny', 'business'), businessController.getBusinesses)
router.get('/api/business/:businessId',  authController.requireSignin, authController.grantAccess('readAny', 'business'), businessController.getBusiness,)
router.put('/api/business/:businessId', authController.requireSignin, authController.grantAccess('updateAny', 'business'), businessController.updateBusiness)
router.delete('/api/business/:businessId', businessController.deleteBusiness, authController.requireSignin)

/**
 * Product Routes
 * list, create, update and delete routes here....
 */
router.post('/api/new/product',authController.requireSignin, authController.grantAccess('create','product'), productController.createProduct)
router.get('/api/products', authController.requireSignin, authController.grantAccess('readAny', 'product'), productController.getProducts)
router.get('/api/product/:productId', authController.requireSignin, authController.grantAccess('readAny', 'product'), productController.getProductById)
router.put('/api/product/:productId', authController.requireSignin, authController.grantAccess('deleteAny','product'), productController.updateProduct)
router.delete('/api/product/:productId', authController.requireSignin, productController.deleteProduct)

/**
 * Order Routes
 */
router.route('/api/create/new/orders/:userId')
.post(authController.requireSignin, productController.decreaseQuantity, orderController.createOrder )
router.route('/api/orders/business/:businessId')
.get(authController.requireSignin, orderController.listByShop)
module.exports = router