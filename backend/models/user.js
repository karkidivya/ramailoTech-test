import {model, Schema} from 'mongoose'
const userSchema = new Schema( { 
    uid:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        select: false
    },
    fullName:{
        type: String,
        required: true,
    },

}, { timestamps: true } )

const User = model( 'User', userSchema )
export default User