// 1. import any needed libraries
const express = require("express");
const Comment = require("../models/comment"); //accesses functions in comment model file
const router = express.Router();

// 2. create all routes to access database
router
    .post('/create', async (req, res) => {
        try {
            const comment = await Comment.createComment(req.body.userId, req.body.postId, req.body.commentContent);
            res.send({...comment});
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    .get('/load', async (req, res) => {
        try {
            const comment = await Comment.loadComment(req.body.commentId);
            res.send({...comment});
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    .put('/like', async (req, res) => {
        try {
            const comment = await Comment.likeComment(req.body.commentId);
            res.send({ success: "Liked Comment" });
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    .delete('/delete', async (req, res) => {
        try {
            await Comment.deleteComment(req.body.commentId);
            res.send({ success: "Comment deleted" });
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    // 3. export router for use in index.js
    module.exports = router;