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

//SignIn
app.post("/signin",async(req,res)=>{
      let input=req.body
      let result=userModel.find({email:req.body.email}).then(
        (items)=>{
            if (items.length>0) {
                const passwordValidator=Bcrypt.compareSync(req.body.password,items[0].password)
                if (passwordValidator) {
                    Jsonwebtoken.sign({email:req.body.email},"blogApp",{expiresIn:"1d"},
                        (error,token)=>{
                            if (error) {
                                res.json({"status":"error","error":error})
                            } else {
                                res.json({"status":"success","token":token,"userId":items[0]._id})
                            }
                        })

                } else {
                    res.json({"status":"Incorrect password"})
                }
            } else {
                res.json({"status":"Invalid email ID"})
            }
        }
      )
})


//SignUp
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