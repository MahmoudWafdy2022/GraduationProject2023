const categoryModel = require("../models/CategoryModel")
const httpStatusText = require("../utils/httpStatusText")
const slugify = require("slugify")


const createCategory = async(req,res)=>{
    try{
const {name} = req.body
const newCategory = new categoryModel({name,slug:slugify(name)})
await newCategory.save();
res.status(201).json({status:httpStatusText.SUCCESS,data:{Category:newCategory}})
    }catch(err){
        res.status(400).json({status:httpStatusText.ERROR,msg:err.message})
    }
}

const getAllCategories = async(req,res)=>{
    const page = req.query.page*1||1
    const limit = req.query.limit*1||1
  const skip = (page-1)*limit
    const listOfCategories = await categoryModel.find({}).skip(skip).limit(limit)
  return  res.status(200).json({status:httpStatusText.SUCCESS,numOfCategories:listOfCategories.length,data:{listOfCategories}})


}

const getSingleCategory = async(req,res)=>{
    try{

           
const getCategory = await categoryModel.findById(req.params.categoryId)
if(!getCategory){
   return res.status(404).json({status:httpStatusText.FAIL,data:null,msg:`NO category for this ${req.params.categoryId}`})
}
return res.status(200).json({status:httpStatusText.SUCCESS,data:getCategory})
}catch(err){

    return res.status(400).json({status:httpStatusText.ERROR,data:null,msg:err.message})

}
}

const updateCategory =async(req,res)=>{
    try{
const name = req.body.name

     const Category = await categoryModel.updateOne({_id:req.params.categoryId},{$set:{slug:slugify(name),...req.body}})

     if(Category.matchedCount==0){
        return res.status(404).json({status:httpStatusText.FAIL,data:null,msg:`NO category for this ${req.params.categoryId}`})
     }

     return res.status(200).json({status:httpStatusText.SUCCESS,data:{Category:Category}})
    }catch(err){
 res.status(400).json({status:httpStatusText.ERROR,msg:err.message})
    }
     }
 
 
 const deleteCategory = async (req,res)=>{
     try{
   const deleteCategory = await categoryModel.deleteOne({_id:req.params.categoryId})
    if(deleteCategory.deletedCount==0){
        return res.status(404).json({status:httpStatusText.FAIL,data:null,msg:`NO category for this ${req.params.categoryId}`})
     }
     return res.status(200).json({status:httpStatusText.SUCCESS,data:deleteCategory})
     }
     catch(err){
 res.status(400).json({msg:err.message})
 
     }
     }



module.exports = {createCategory,getAllCategories,getSingleCategory,updateCategory,deleteCategory}