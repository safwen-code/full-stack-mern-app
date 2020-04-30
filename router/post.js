const express = require('express')
const router = express.Router()
const auth = require('../middelware/auth')
const { check, validationResult } = require('express-validator');
const Post = require('../Model/Post')
const User = require('../Model/User')
const Profile = require('../Model/Profile')

// add post
router.post('/',[auth,[
    check('text','text is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post({
        text:req.body.text,
        name:user.name,
        user:user.id
    })
    const post = await newPost.save()
    res.json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
   
})

router.get('/',auth,async(req,res)=>{
    try {
        const postes = await Post.find().sort({date:-1})
        res.json(postes)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// get post by id
router.get('/:id',auth,async(req,res)=>{
    try {
        const poste = await Post.findById(req.params.id)
        if(!poste){
            return res.status(404).send({msg:'no post for this user'})
        }
        res.json(poste)
    } catch (err) {
        console.error(err.message)
        if(err.kind ==='ObjectId'){
            return res.status(404).send({msg:'no post for this user'})
        }
        res.status(500).send('Server Error')
    }
})

// delete post by id
router.delete('/:id',auth,async(req,res)=>{
    try {
    const post = await Post.findById(req.params.id)
     if(!post){
         return res.status(404).send({msg:'post not found'})

     }
     if(post.user.toString()!==req.user.id){
         return res.status(401).json('user is not autorisated')
     }
     await post.remove()
     res.json({msg:`${post._id} is removed`})
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

//Like a post
//put post/like/:id
router.put('/like/:id',auth,async(req,res)=>{
    try {
         const post = await Post.findById(req.params.id)
          //check if the post has all ready liked
         if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
             return res.status(400).send({msg:' user has all ready liked'})
         } 
        post.likes.unshift({user:req.user.id})
        await post.save()
        res.json(post.likes)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// post comment by post id 
router.post('/comment/:id',[auth,[
    check('text','text is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)
        const newComment = {
        text:req.body.text,
        name:user.name,
        user:user.id
    }
    post.comments.unshift(newComment)
    await post.save()
    res.json(post.comments)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
   
})

// delet post comment/:id/comment_id
router.delete('/comment/:id/:comment_id', auth , async(req,res)=>{
    try {
         const post = await Post.findById(req.params.id)
         //pull out comment
         const comment = post.comments.find(comment=> comment.id === req.params.comment_id)
         // make shure comment exsit
         if(!comment){
             return res.status(404).send({msg:'comment does not found'})
         }
         //check user is exsit
         if(comment.user.toString() !== req.user.id){
             return res.status(404).send({msg:'user is not authorized'})
         }

         // get remove Index
         const removeIndex = post.comments.map(comment=> comment.user.toString()).indexOf(req.user.id)
         post.comments.splice(removeIndex,1)
         await post.save()
         res.json(post.comments)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// delet post unlike/:id
router.put('/unlike/:id', auth , async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        
        // check the user that has been liked 
        if(post.likes.filter(like=> like.user.toString() === req.user.id).length===0)
        {
            return res.status(400).send({msg:'post has not been unliked'})
        }

        // get remove index
         const removeIndex = post.likes.map( like => like.user.toString()).indexOf(req.user.id)
         post.likes.splice(removeIndex, 1)
         await post.save()
         res.json(post.likes)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router