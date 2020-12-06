const Business = require('./../models/businessModel')
const errorHandler = require('./../helpers/dbErrorHandler')


const createBusiness = async(req, res, next)=>{
    const business = new Business(req.body)
    try {
      await business.save()
      return res.status(200).json({
        message: "Successfully signed up!"
      })
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
}
const getBusinesses = async(req, res, next)=>{
    const business = await Business.find({})
    res.status(200).json({
        data: business
    })
}

const getBusiness = async(req, res, next)=>{
    try {
        const businessId = req.params.businessId
        const business = await Business.findById(businessId)
        if(!business) return next(new Error('Business does not exist'))
        res.status(200).json({
            data: business
        })
    } catch (error) {
        next(error)
    }
}

const updateBusiness = async(req, res, next)=>{
    try {
        const update = req.body
        const businessId = req.params.businessId
        const business = await Business.findByIdAndUpdate(businessId, update)
        res.status(200).json({
            data: business,
            message: 'Business has been updated'
        })
    } catch (error) {
        next(Error)
    }
}

const deleteBusiness = async(req, res, next)=>{
    try {
        const businessId = req.params.businessId
        await Business.findByIdAndDelete(businessId)
        res.status(200).json({
            data:null,
            message: 'Business account deleted'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createBusiness,
    getBusinesses,
    getBusiness,
    updateBusiness,
    deleteBusiness
}