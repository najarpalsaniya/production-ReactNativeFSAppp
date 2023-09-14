const postModel = require("../models/postModel")

// Create post Controller
const createPostController = async (req,res) => {
    try {
        const { title, description } = req.body
        // Validation
        if (!title || !description) { 
            res.status(500).send({
            success: false,
            message: 'Please Provide All Field',
            error
        })
        }
        const post = await postModel({
            title, description,
            postedBy: req.auth._id
        }).save();
        res.status(201).send({
            success: true,
            message: 'Post Create Successfully',
            post, 
        })
        console.log(req)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: 'Error In Create Post Api',
            error
        })
    }
}
const getAllPostController = async (req, res) => {
    try {
        const posts = await postModel.find().populate('postedBy', '_id name').sort({createdAt : -1});
        res.status(200).send({
            success: true,
            message: "All Post Data",
            posts,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
             success: false,
            message: "Error in Get All Post API",
            error
     })
     }
} 
  
// Get Use Post

const getUserPostsController = async(req, res) => { 
    try {
        const userPosts = await postModel.find({ postedBy: req.auth._id }) 
        res.status(200).send({
            success: true,
            message: "User Post",
            userPosts,
        })
    
} catch (error) {
    console.log(error)
    return res.status(500).send({
        success: false,
        message:"Error In User Post API "
    })
    
}
}

// Delete Post Data

const deletePostController = async(req, res) => { 
try {
    const { id } = req.params
    await postModel.findByIdAndDelete({ _id: id })
    res.status(200).send({
        success: true,
        message:"Your Post been Deleted"
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: "Error In Delete Post API",
        error,
    })
}
}

// Update Post data Controller

const updatePostController = async (req,res) => { 
    try {
        const { title, description } = req.body
        // post data find
        const postData = await postModel.findById({ _id: req.params.id})
        
        // Validation
        if (!title) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Post Title",
            
            })
        }
        if (!description) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Post Description",
            
            })
        }

        // Update Post Data
        const updatePost = await postModel.findByIdAndUpdate({ _id: req.params.id },
            {
                title: title || postData?.title,
                description:description || postData?.description
            }, { new: true })
        res.status(200).send({
            success: true,
            message: 'Post Updated Successfully',
            updatePost,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error In Update Post API",
            error,
        })
    }
}

module.exports = {createPostController, getAllPostController, getUserPostsController, deletePostController, updatePostController}