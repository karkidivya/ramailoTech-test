/**
 * TODO
 * create a utils files that saves the documents
 * 
 * Maybe reviews are not suited here
 */
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import dotenv from  'dotenv';
import { createCustomToken } from "../auth/index.js";
// import Product from "../../models/Product.js";
import mongoose from "mongoose";

dotenv.config();
const SALT_ROUND = parseInt( process.env.SALT_ROUND )
const SECRET = process.env.SECRET

/**
 * 
 * @param { string } password - Password to be hashed
 * @param { Number } SALT_ROUND - No. of salt rounds to be used for hashing
 * @returns { string } > Returns promise which resolves with hashed Password
 */
const hashPassword = async (password, SALT_ROUND) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_ROUND, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
};


const createUser = async (user, token) => {
    const newUser = new User(user);
    const result = await newUser.save();
    return { status: 'successful', task: 'addUser', payload: {...result._doc, token } };
};

const userController = {
    //create user

    registerUser: async(req, res ) =>{
        try{
            const { accessToken , ...user } = req.body;
            console.log( user )            

            if( user.password ){
                user.password = await hashPassword( user.password, SALT_ROUND );
            }

            const token = createCustomToken( user, SECRET)
            const result = await createUser( user, token );
            
            res.status( 200 ).json( result )

        }catch( error ){
            console.log('An error occurred at registerUser', error)
            res.status( 500 ).json( {status: 'unsuccessful', task: 'getUser', reason: 'Internal Server Error'} )
        }
    },

    /**
     * 
     * @param { * } res - response object
     * @param { * } req - request object
     * @param { string } req.body.email - user email
     * @param { stirng } req.body.password - user password 
     * 
     * @description does something i dont konw about
     */

    login: async( req, res ) =>{
        try{            
            const user = await User.findOne( {fullName: req.body.fullName} ).select('+password').lean()
            // console.log( 'User object', user );
            if( !user ) return res.status( 401 ).json( {status: 'unsuccessful', task: 'login', reason: 'Invalid Credentials'} )
            
            const result = await bcrypt.compare( req.body.password, user.password)
        
            if ( !result ) return res.status( 401 ).json( { status: 'unsuccessful', task: 'login', reason: 'Incorrect Password'})
            
            //generate the access Token for the corresponding user
            const { _id, uid, email,  fullName, cart, wishList } = user
            
            const token = await createCustomToken( { _id, fullName } , SECRET );
            res.status( 200 ).json( { status: 'successful', task: 'login', payload: {...user , token } })

        }catch( error ) {
            console.log('An error occurred', error)
        }
    },


  
}

export default userController