import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/categoryModel.js";

export const createCategory = asyncHandler(async(req,res,next)=>{
try {
    
    const {categoryId} = req.params;
    const {name} = req.body;
    if (!name) {
        res.status(400)
        throw new Error("Name is required")
    }
    const existedCategory = await Category.findOne({name})
    if (existedCategory) {
        res.status(400)
        throw new Error("Category already exist")
    }
    
    const category = new Category({name})
    await category.save()
    res.status(201).json(category)
} catch (error) {
    console.log(error.message);
    
}
})

export const updateCategory = asyncHandler(async(req,res,next)=>{
    try {
        const {name} = req.body;
    const {id} = req.params;
        const category = await Category.findOne({_id : id})
        if (!category) {
            res.status(400)
            throw new Error("category not found")
        }
        category.name = name
        const updatedCategory = await category.save()
        res.json(updatedCategory)
    } catch (error) {
console.log(error.message);
res.status(500).json({message : "Internal server error"})

    }
})

export const removeCategory = asyncHandler(async(req,res,next)=>{
try {
        const {categoryId} = req.params;
        const removed = await Category.findByIdAndDelete(categoryId)
        res.json(removed)
} catch (error) {
    console.log(error);
    res.status(500).json({message : "Internal server error"})
    
}

})

export const listCategory = asyncHandler(async(req,res,next)=>{
    try {
        const category = await Category.find({})
        res.json(category)
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal server error"})
        
    }
})

export const readCategory = asyncHandler(async(req,res,next)=>{
    try {
        const {id} = req.params
        const category = await Category.findOne({_id : id})
        res.json(category)
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Internal server error"})
        
    }
})