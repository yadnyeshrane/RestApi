const Mongoose=require('mongoose');
const Schema=Mongoose.Schema;
const refreshTokenSchema=Schema({
    token:{type:String,unique:true},
},{timestamps:false})

export default Mongoose.model('RefreshToken',refreshTokenSchema,'refreshTokens')