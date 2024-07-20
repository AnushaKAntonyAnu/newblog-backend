const Express = require("express")
const Mongoose = require("mongoose")
const Cors = require("cors")
const Jsonwebtoken = require("jsonwebtoken")
const Bcrypt = require("bcrypt")

let app=Express()

app.get("/",(req,res)=>{
    res.send("hi")
})

app.listen(3031,()=>{
    console.log("Server started")
})