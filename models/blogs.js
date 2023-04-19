const mongoose = require('mongoose');
const {Schema} = mongoose;

const blogSchema = new Schema({
    image : {
        type : String,
        require : true
    },
    title : {
        type: String,
        require : true
    },
    subTitle : {
        type: String,
        require : true
    },
    description :{
        type: String,
        require : true
    },
    dateCreated :{
        type: Date,
        default: Date.now()
    },
    createdBy :{
        type : Schema.Types.ObjectId,
        ref : 'User' 
    },
    comment : [{
        content :{
            type : String,
            require : true,
        },
        postedBy : {
            type : Schema.Types.ObjectId,
            ref : 'User'
        },
        datePosted: {
            type : Date,
            default : Date.now()
        }
    }]
});

const Blog = mongoose.model("Blog", blogSchema)
module.exports= Blog

