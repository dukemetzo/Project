// 1. import any needed libraries
const express = require("express");
const Post = require("../models/post"); //accesses functions in post model file
const router = express.Router();

// 2. create all routes to access database
router
    .post('/create', async (req, res) => {
        try {
            const post = await Post.createPost(req.body.userId, req.body.postContent);
            res.send({...post});
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    .post('/read', async (req, res) => {
        try {
            const post = await Post.readPost(req.body.postId);
            res.send({...post});
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    .post('/getAll', async (req, res) => {
        try {
            const posts = await Post.getAllPosts(req.body.userId);
            res.send({...posts});
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    .put('/like', async (req, res) => {
        try {
            const post = await Post.likePost(req.body.postId);
            res.send({ success: "Liked Post" });
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    .delete('/delete', async (req, res) => {
        try {
            await Post.deletePost(req.body.postId);
            res.send({ success: "Post deleted" });
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    // 3. export router for use in index.js
    module.exports = router;