const express =require("express")
const bodyParser =require("body-parser")
const mongoose = require("mongoose")

// require item router
const document =require("./router/item")
const User = require('./router/user')
const Auth =require('./router/Auth')
const Profile = require('./router/profile')
const Post = require('./router/post')

const app =express()

//bodyparser middelware
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

 //DB config 
const db=require('./config/default').mongoURI

//connect to our db
mongoose.connect(db ,{ useNewUrlParser: true ,useUnifiedTopology: true, useCreateIndex: true , useFindAndModify: false })
.then(()=>console.log("mongo connected....."))
.catch(err=>console.log(err))

// user router 
app.use("/document",document)
app.use('/user',User)
app.use('/auth',Auth)
app.use('/profile',Profile)
app.use('/post',Post)



const port = process.env.Port || 5000

app.listen(port ,()=> console.log(`port work in ${port}`))