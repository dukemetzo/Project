// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for entity
const commentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    postId: { type: String, required: true },
    commentContent: { type: String, required: true },
    commentLikes: { type: Number, required: true, default: 0 }
})

// 3. create model of schema
const Comment = mongoose.model("Comment", commentSchema);

// 4. create CRUD functions on model
// CREATE a comment
async function createComment(userId, postId, commentContent) {
    const newComment = await Comment.create({
        userId: userId,
        postId: postId,
        commentContent: commentContent
    });

    return newComment;
}

// READ a comment
async function loadComment(commentId) {
    const comment = await Comment.findById({"_id": commentId});
    if(!comment) throw Error("Comment not found");

    return comment;
}

// READ ALL comments
async function getAllComments(userId) {
    const comments = await Comment.find({"userId": userId});
    if(!comments) throw Error("No comments found");

    return comments;
}

// UPDATE
async function likeComment(commentId) {
    const comment = await Comment.findById({"_id": commentId});
    ++comment.commentLikes;
    await comment.save();
    if(!comment) throw Error("Comment not found");

    return comment;
}

// DELETE
async function deleteComment(commentId) {
    await Comment.deleteOne({"_id": commentId});
}

// 5. export all functions we want to access in route files
module.exports = {
    createComment, loadComment, getAllComments, likeComment, deleteComment
};
