const Product = require('./../models/productModel')
const errorHandler = require('./../helpers/dbErrorHandler')
const fs = require('fs')
const formidable = require('formidable')
// const extend = require('lodash/extend')
// const defaultImage = require('./../../assets/default')
const getProductById = async(req, res, next, id)=>{

    try {
        
        const product = await Product.findById(id).populate('businesses', '_id name').exec()
        if(!product) 
            return res.status(400).json({
                error: 'Product not found'
            })
        req.product = product
        next()
    } catch (error) {
        return res.status(400).json({
            error: 'Could not retrieve product'
        })
    }
}
const getProducts = async(req, res, next)=>{
    const product = await Product.find({})
    res.status(200).json({
        data: product
    })
}

const createProduct = async(req, res, next)=>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,async(err, fields, files)=>{
        if(err){
            return res.status(400).json({
                message:'File could not be uploaded'
            })
        }
        let product = new Product(fields)
        product.business = req.business
        if(files.image){
            product.image.data = fs.readFileSync(files.image.path)
            product.image.contentType = files.image.type
        }
        try {
          let result = await product.save()
          res.json(reslt)
        } catch (err) {
          return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
        }
    })
}

const deleteProduct = async(req, res, next)=>{
    try{

        const productId = req.params.productId
        await Product.findByIdAndDelete(productId)
        res.status(200).json({
            data: null,
            message: 'Product deleted'
        })
    }
    catch(error){
        next(error)
    }

}

const updateProduct = async(req, res, next)=>{
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Photo could not be uploaded"
      })
    }
    let product = req.product
    product = extend(product, fields)
    product.updated = Date.now()
    if(files.image){
      product.image.data = fs.readFileSync(files.image.path)
      product.image.contentType = files.image.type
    }
    try {
      let result = await product.save()
      res.json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}
const decreaseQuantity = async (req, res, next) => {
    let bulkOps = req.body.order.products.map((item) => {
      return {
          "updateOne": {
              "filter": { "_id": item.product._id } ,
              "update": { "$inc": {"quantity": -item.quantity} }
          }
      }
     })
     try {
       await Product.bulkWrite(bulkOps, {})
       next()
     } catch (err){
        return res.status(400).json({
          error: "Could not update product"
        })
     }
  }
  
const increaseQuantity = async (req, res, next) => {
    try {
      await Product.findByIdAndUpdate(req.product._id, {$inc: {"quantity": req.body.quantity}}, {new: true})
      .exec()
        next()
    } catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }
const photo = (req, res, next)=>{
    if(req.product.image.data){
        res.set('Content-Type', req.product.image.contentType)
        return res.send(req.product.image.data)
    }
    next()
}
const defaultPhoto = (req, res) =>{
    return res.sendFile(process.cwd()+defaultImage)
}
const read = (req, res)=>{
    req.product.image = undefined 
    return res.json(req.product)
}
const listByBusiness = async(req, res)=>{
    try {
        let products = await Product.find({shop: req.business._id}).populate('businesses', '_id business_name').select('-image')
        res.json(products)

    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        })
    }
}
const listLatest = async(req, res)=>{
    try {
        let products = await Product.find({}).sort('-created').limit(5).populate('businesses', '_id business_name').exec()
        res.json(products)
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(error)
        })
    }
}
const dealsOfTheWeek = async(req, res)=>{
    try {
        let products = await Product.find({}).sort('-listoftheweek').limit(10).populate('businesses', '_id busines_name').exec()
        res.json(products)
    } catch (error) {
        return res.status(400).json({
            error:errorHandler.getErrorMessage(error)
        })
    }
}
const listRelated = async(req, res)=>{
    try {
        let products = await Product.find({'_id': { "$ne":req.product},'category': req.product.category}).limit(5).populate('businesses', '_id business_name').exec()
        res.json(products)
    } catch (error) {
        error: errorHandler.getErrorMessage(error)
    }
}
const listCategories = async(req, res)=>{
    try {
        let products = await Product.distinct('category', {})
        res.json(products)
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
    }
}
const list = async(req, res)=>{
    const query = {}
    if(req.query.search)
        query.name = {'$regex':req.query.search, '$options':'i'}
    if(req.query.category && req.query.category != 'All')
        query.category = req.query.category
    try {
        let products = await Product.find(query).populate('businesses', '_id business_name').select('-image').exec()
        res.json(products)
    } catch (error) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
          })
    }
}
module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    increaseQuantity,
    decreaseQuantity,
    defaultPhoto,
    photo,
    read,
    listLatest,
    listByBusiness,
    dealsOfTheWeek,
    listRelated,
    listCategories,
    list
}
