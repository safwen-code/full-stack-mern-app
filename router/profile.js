const express = require('express')
const router = express.Router()
const auth = require('../middelware/auth')
const Profile = require('../Model/Profile')
const User = require('../Model/User')
const { check, validationResult } = require('express-validator');

// get the current profile if the user 
// access private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email'])
        if (!profile) {
            return res.status(400).json({ msg: 'no profile for this fucking User' })
        }
        res.json(profile)
        console.log(profile)
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('server in error')
    }
})
// post profile 
router.post('/', [auth, [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        company,
        website,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body
    const profilFiled = {};
    profilFiled.user = req.user.id
    if (company) profilFiled.company = company
    if (website) profilFiled.website = website
    // if(location) profilFiled.location= location
    if (bio) profilFiled.bio = bio
    if (status) profilFiled.status = status
    if (githubusername) profilFiled.githubusername = githubusername
    if (skills) {
        profilFiled.skills = skills.split(',').map(skills => skills.trim())
    }
    // build social object
    profilFiled.social = {}
    if (youtube) profilFiled.social.youtube = youtube
    if (twitter) profilFiled.social.twitter = twitter
    if (facebook) profilFiled.social.facebook = facebook
    if (linkedin) profilFiled.social.linkedin = linkedin
    if (instagram) profilFiled.social.instagram = instagram

    try {
        let profile = await Profile.findOne({ user: req.user.id })
        if (profile) {
            //update the profile
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profilFiled },
                { new: true }
            )
            return res.json(profile)
        }
        //create 
        profile = new Profile(profilFiled)
        await profile.save()
        res.json(profile)


    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }

})
//add experience to profile
router.put('/exprience', [auth, [
    check('titel', 'titel is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('form', 'form is required').not().isEmpty()
]], async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { titel, company, location, form, to, current, description } = req.body
        const newExp = { titel, company, location, form, to, current, description }
        try {
            const profile = await Profile.findOne({ user: req.user.id })
            profile.exprience.unshift(newExp)
            await profile.save()
            res.json(profile)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('server error')
        }
})
//delete experience from profile
router.delete('/exprience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        //get the rmove index 
        const removeIndex = profile.exprience.map(item => item.id).indexOf(req.params.exp_id)
        profile.exprience.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})
// add education
router.put('/education', [auth, [
    check('school', 'school is required').not().notEmpty(),
    check('degree', 'degree is required').not().notEmpty(),
    check('fieldofstudy', 'field of study is required').not().notEmpty(),
    check('form', 'form is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { school, degree, fieldofstudy, form, to, current, description } = req.body
    const Edu = { school, degree, fieldofstudy, form, to, current, description }
    try {

        const profile = await Profile.findOne({ user: req.user.id })
        profile.education.unshift(Edu)
        await profile.save()
        res.json(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})
// delete education from uor profile
router.delete('/education/:edu_id',auth ,async(req,res)=>{
 try {
      const profile = await Profile.findOne({user:req.user.id})
      const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.Edu_id)
      profile.education.splice(removeIndex, 1)
      await profile.save()
      res.json(profile)
 } catch (err) {
     console.error(err.message)
     res.status(500).send('server error')
 }
})
// delete profile 
router.delete('/',auth, async(req,res)=>{
    try {
         // for to do remove prst from user
            // await Post.deleteMany({user:req.user.id})

        // remove profile
        await Profile.findOneAndRemove({user:req.user.id})
        // remove user 
        await User.findOneAndRemove({_id:req.user.id})
        res.json('user and his profile are deleted')

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})
// get All profile
router.get('/',async(req,res)=>{
    try {
         const profiles = await Profile.find().populate('user',['name','email'])
         res.json(profiles)
    } catch (err) {
        console.error(err.msg)
        res.status(500).send('server error')
    }
})
// get profile/user/:user_id
router.get('/user/:user_id',async(req,res)=>{
  try {
         const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','email'])
         if(!profile) return res.status(400).json({msg:'No profile for this user'})
       res.json(profile)  
    } catch (err) {
      console.error(err.message)
      if(err.kind==='ObjectId'){ 
          return res.status(400).json({msg:'No profile for this user 3li krekeb'})
        }
      res.status(500).send('server error ')
  }    
})
module.exports = router
