import {model, Schema} from 'mongoose'

const blogSchema = new Schema({
    title :{
        type: String,
        required : true
    },
    content :{
        type: String,
        required : true
    },
    author :{
        type: String,
        required : true
    },
    category :{
        type: String,
        required : true
    },
    tags :[{
        type: String,
        required : true
    }],
    creationdate : { type : Date, default: Date.now },
    comment : 
        [{
        userName: String , 
        comment : String 
    }]
    

})

const Blog = model('blog', blogSchema);

export default Blog
