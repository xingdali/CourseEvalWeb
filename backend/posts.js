const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const Post = require('./model/Posts')

router.get('/', async (req, res) => {
    try{
        const posts = await Post.find().sort({_id: -1}).limit(25);
        res.json(posts);
    }catch(err){
        res.json({message: err})
    }
})

router.post('/', async (req, res) => {
    const post = new Post({
        className: req.body.className,
        subject: req.body.subject,
        courseNum: req.body.courseNum,
        body: req.body.body
    })

    const savePost = await post.save();
    try {
        res.json(savePost)
    } catch (err) {
        res.json({message: err});
    }
})

router.delete('/:postId', async (req, res) => {
    try {
        const removePost = await Post.remove({_id: req.params.postId})
        res.json(removePost)
    } catch (err) {
        res.json({message: err})
    }
}) 
module.exports = router;