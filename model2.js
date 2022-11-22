const { Schema , model, mongoose}= require ("mongoose")

const UserSchema=new Schema({

    username: String,
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    todo:[{
        type:Schema.Types.ObjectId,
        ref:"Todo"
    }]
})


const Users=model('Users',UserSchema)


module.exports=Users