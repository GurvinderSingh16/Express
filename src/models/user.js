const mongoose= require("mongoose")

const UsersSchema= mongoose.Schema({

    username:{
      type: String,
      required:true  
    },
    password:{
        type: String,
        required:true  
      },
      email:{
        type: String,
        required:true  
      },
      user_file: {
        type: [String], // This is an array of strings
        // type: String, 
        required: true,
    },
},{timestamps:true}); // this timestamps create two fileds created at and modified at

module.exports = mongoose.model("User",UsersSchema)