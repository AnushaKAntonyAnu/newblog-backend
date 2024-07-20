const Express = require("express")
const Mongoose = require("mongoose")
const Cors = require("cors")
const Jsonwebtoken = require("jsonwebtoken")
const Bcrypt = require("bcrypt")
const userModel=require("./models/users")

let app=Express()

app.use(Express.json())
app.use(Cors())

Mongoose.connect("mongodb+srv://anusha:anusha13@cluster0.hyxpaoy.mongodb.net/newblogDB?retryWrites=true&w=majority&appName=Cluster0")


app.post("/signup",async(req,res)=>{
     let input=req.body
     let hashedPassword = Bcrypt.hashSync(req.body.password,10)
     console.log(hashedPassword)
     req.body.password=hashedPassword
    

     userModel.find({email:req.body.email}).then(
        (items)=>{

        if (items.length>0) {
            res.json({"status":"email ID is already exist"})
        } else {
            let result=new userModel(input)
            result.save()
            res.json({"status":"success"})
        }
     }
    ).catch(
        (error)=>{}
    )

})

app.listen(3031,()=>{
    console.log("Server started")
})