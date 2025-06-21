// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for entity
const postSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    postContent: { type: String, required: true },
    postLikes: { type: Number, required: true, default: 0 }
})

// 3. create model of schema
const Post = mongoose.model("Post", postSchema);

// 4. create CRUD functions on model
// CREATE a post
async function createPost(userId, postContent) {
    const newPost = await Post.create({
        userId: userId,
        postContent: postContent
    });

    return newPost;
}

// READ a post
async function readPost(postId) {
    const post = await Post.findById({"_id": postId});
    if(!post) throw Error("Post not found");

    return post;
}

// UPDATE
async function likePost(postId) {
    const post = await Post.findById({"_id": postId});
    ++post.postLikes;
    await post.save();
    if(!post) throw Error("Post not found");

    return post;
}

// DELETE
async function deletePost(postId) {
    await Post.findByIdAndDelete({"_id": postId});
}

// 5. export all functions we want to access in route files
module.exports = {  
    createPost, readPost, likePost, deletePost
};
