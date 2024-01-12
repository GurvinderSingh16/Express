const express = require("express");
const { signup, signin,upload } = require("../controllers/userController");
const usersRouter= express.Router();

usersRouter.post("/signup", upload.array('user_file', 12), signup, );
usersRouter.post("/signin",signin);

usersRouter.post('/uploadimages',upload.array('user_file', 12),(req, res) => {
    res.status(200).json({
        success:true,
        message:"Images Uploaded successfully",
        data:{
            images:req.files
        }
    })
    console.log("user upload file",req.files)
  });
module.exports= usersRouter //for use in another component