const notesModel=require("../models/notes")

const createNotes= async(req,res)=>{
console.log("id",req.userId)
const {title,description}= req.body;

try{
    const newNote= await notesModel.create({
        title:title,
        description:description,
        userId:req.userId
    })
    console.log("create note data",newNote)
    res.status(201).json({
        success:true,
        message:"New Note Created Successfully",
    data:{
       newNote
    }
    })

}catch(error){
    console.log(error)
    res.status(500).json({
        success:false,
        message:'Server Error'
    })
}

}
const getNotes= async(req,res)=>{
try{
    const noteList = await notesModel.find({userId:req.userId})
    if(noteList){
    console.log("get notes",noteList)
res.status(200).json({
    success:true,
    message:"Notes get Successfully",
        noteList
})
}
}catch(error){
    console.log(error);
    res.status(500).json({
        success:false,
        message:'Server Error'
    })
}
}
const deleteNotes=async(req,res)=>{
    const id= req.params.id;
    try{
const deleteNote= await notesModel.findByIdAndDelete(id);
res.status(201).json({
    success:true,
    message:"Note Deleted successfullly",
    deleteNote
})
console.log("deletenotes",deleteNote)
    }catch(error){
        console.log(error,"server error")
        res.status(500).json({
            success:false,
            message:'Server Error...'
        }) 
    }
}
const updateNotes= async(req,res)=>{
const id= req.params.id;
const {title,description}=req.body;
const newNote={
    title:title,
    description:description,
    userId:req.userId
}
try{
await notesModel.findByIdAndUpdate(id,newNote,{new:true})
res.status(200).json({
    success:true,
        message:'Notes Updated successfully',
        newNote
})
console.log("updated notes",newNote)
}catch(error){
    console.log(error);
    res.status(500).json({
        success:false,
        message:'Server Error'
    })
}
}
module.exports={
    createNotes,
    getNotes,
    deleteNotes,
    updateNotes
}