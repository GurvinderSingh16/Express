const userModel= require("../models/user");
const bcrypt =require("bcrypt")
const jwt= require("jsonwebtoken")
const SECRET_KEY="NOTESAPI"

const multer = require('multer');

const upload=multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'./uploads')  //this is folder name where images store after upload
    },
    filename:(req,file,cb)=>{
    cb(null, file.fieldname + "-" + Date.now() + ".jpg" )   // date.now use if user upload images with same names  
    },
})
})
//signup
const signup= async(req,res)=>{
    const userFiles = req.files;
const{username,email,password,}=req.body; //declare here parameters which is required for signup
    //for Existing user
try{
    const existingUser= await userModel.findOne({email :email}); // usermodel.findone connect with database and filter email
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"Email already exists"})
    }
 //hashed password
const hashedPassword = await bcrypt.hash(password,10); // this hash work 10 times then store password in database
   // user create
   const result= await userModel.create({
    email:email,
    password:hashedPassword,
    username:username,
    user_file: userFiles.map(file => file.filename), // Assuming you want to store filenames
    // user_file: userFiles.map(file => file.filename).join(', '), // Convert array to string
})
const token=jwt.sign({email: result.email, id:result._id},SECRET_KEY)
res.status(201).json({
    success:true,
    message:"User Register Successfully",
    data:{
    user: result, token : token},
});
} catch(error){
    console.log(error)
    res.status(500).json({message:"Something went wrong"})
}
}

//signin
const signin= async(req,res)=>{

    const {email,password}= req.body;
    try{
        const existingUser= await userModel.findOne({email :email}); // usermodel.findone connect with database and filter email
        if(!existingUser){
            return res.status(404).json({message:"Email not found"})
        }
          
        const isValidated=await bcrypt.compare(password, existingUser.password);
if(!isValidated){
    return  res.status(400).json({
        success:false,
        message:"Invalid Password"})
}
const token=jwt.sign({email: existingUser.email, id:existingUser._id},SECRET_KEY)
res.status(200).json({
    success:true,
    message:"user signin successfully",
    data:{
    user: existingUser, 
    token : token},
})
 }catch(error){
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }
}
module.exports={signup, signin,upload}