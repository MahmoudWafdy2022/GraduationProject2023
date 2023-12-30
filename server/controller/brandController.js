const BrandModel = require('../models/brandModel');
const httpStatusText = require("../utils/httpStatusText")
const slugify = require("slugify")

// @desc    Get list of brands
// @route   GET /brands
// @access  Public
const getAllBrands = async(req,res)=>{
    const page = req.query.page*1||1
    const limit = req.query.limit*1||1
  const skip = (page-1)*limit
    const listOfBrands = await BrandModel.find({}).skip(skip).limit(limit)
  return  res.status(200).json({status:httpStatusText.SUCCESS,numOfBrands:listOfBrands.length,data:{listOfBrands}})


}

// @desc    Get specific brand by id
// @route   GET /brands/:id
// @access  Public
const getSingleBrand = async(req,res)=>{
    try{   
const getBrand = await BrandModel.findById(req.params.BrandId)
if(!getBrand){
   return res.status(404).json({status:httpStatusText.FAIL,data:null,msg:`NO Brand for this ${req.params.BrandId}`})
}
return res.status(200).json({status:httpStatusText.SUCCESS,data:getBrand})
}catch(err){
    return res.status(400).json({status:httpStatusText.ERROR,data:null,msg:err.message})
}
}

// @desc    Create brand
// @route   POST  /brands
// @access  Private
const createBrand = async(req,res)=>{
    try{
const {name} = req.body
const newBrand = new BrandModel({name,slug:slugify(name)})
await newBrand.save();
res.status(201).json({status:httpStatusText.SUCCESS,data:{Brand:newBrand}})
    }catch(err){
        res.status(400).json({status:httpStatusText.ERROR,msg:err.message})
    }
}

// @desc    Update specific brand
// @route   PUT brands/:id
// @access  Private
const updateBrand =async(req,res)=>{
    try{
const name = req.body.name
     const Brand = await BrandModel.updateOne({_id:req.params.BrandId},{$set:{slug:slugify(name),...req.body}})

     if(Brand.matchedCount==0){
        return res.status(404).json({status:httpStatusText.FAIL,data:null,msg:`NO Brand for this ${req.params.BrandId}`})
     }

     return res.status(200).json({status:httpStatusText.SUCCESS,data:{Brand:Brand}})
    }catch(err){
 res.status(400).json({status:httpStatusText.ERROR,msg:err.message})
    }
     }

// @desc    Delete specific brand
// @route   DELETE brands/:id
// @access  Private
const deleteBrand = async (req,res)=>{
    try{
  const deleteBrand = await BrandModel.deleteOne({_id:req.params.BrandId})
   if(deleteBrand.deletedCount==0){
       return res.status(404).json({status:httpStatusText.FAIL,data:null,msg:`NO Brand for this ${req.params.BrandId}`})
    }
    return res.status(200).json({status:httpStatusText.SUCCESS,data:deleteBrand})
    }
    catch(err){
res.status(400).json({msg:err.message})

    }
    }

 
 




module.exports = {createBrand,getAllBrands,getSingleBrand,updateBrand,deleteBrand}