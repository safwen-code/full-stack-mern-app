const express =require("express")
const router =express.Router()

//item model
const documents =require("../Model/Item")

//router get 
router.get("/",(req,res)=>{
    documents.find()
    .sort({date:-1})
    .then(documents=>res.json(documents)
    )
})

//router post 
router.post("/",(req,res)=>{
   const newDocument =new documents({
       avatar:req.body.avatar,
       titel:req.body.titel,
       description:req.body.description,
       link:req.body.link
   })

   newDocument.save().then(documents => res.json(documents))
})

//router delete :id
router.delete('/:id',(req,res)=>{
    documents.findById(req.params.id)
        .then(documents=>documents.remove().then(()=>res.json({success:true})))
        .catch(err=>res.status(404).json({success:false}))
  })
  
 // Update Documents
 router.route('/update_document/:id').put((req,res,next)=>{
    documents.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },(error,data)=>{
        if(error){
            return next(error)
            console.log(error)
        }else{
            res.json(data)
            console.log('document updated successfully')
        }
    })

})




module.exports =router