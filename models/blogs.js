const mongoose = require('mongoose');
const {Schema} = mongoose;

const blogSchema = new Schema({
    title : {
        type: String,
        require : true
    },
    author : {
        type: String,
        require : true
    },
    content : {
        type: String,
        require : true
    },
    CreatedAt :{
        type: Date,
        default: Date.now()
    },
    UpdatedAt :{
        type: Date,
        default: Date.now()
    },
    createdBy :{
        type : Schema.Types.ObjectId,
        ref : 'User' 
    },
});

const Blog = mongoose.model("Blog", blogSchema)
module.exports= Blog

