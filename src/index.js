const express = require("express");
const app =express();
const userRouter = require("./routes/userRoutes");
const notesRouter = require("./routes/noteRoutes");

const mongoose= require("mongoose");

app.use(express.json()) // convert body string(username,email etc) into json
app.use("/users", userRouter)  // which routes start with users define inside userRoutes eg.4000/users/signup
app.use("/notes", notesRouter)
app.get("/",(req,res)=>{
    res.send("Hello");
});
mongoose.connect("mongodb://127.0.0.1:27017/express-db").then((res)=>{
    app.listen(4000,()=>{
        console.log("server started on Port 4000")
    })
}).catch((error)=>{
console.log(error,"database error")
})
