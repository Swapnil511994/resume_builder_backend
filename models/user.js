const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//User Schema
const UserSchema = new mongoose.Schema({
    email:{
        unique: true,
        required: true,
        maxlength: 100,
        index: true,
        type: String,
    },
    mobile:
    {
        maxlength: 15,
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    verified:{
        type: Boolean,
    }
});

//Model
const User = mongoose.model("User",UserSchema);

//find by id
User.findById = async (id)=>
{
    try {
        const userToReturn = await User.findById(id);
        if(!userToReturn) return userToReturn;
        else return null;
    } 
    catch (error) 
    {
        console.log(error);
        return null;    
    }
}

//find by email
User.findByEmail = async(emailVal)=>
{
    try {
        const query = {email: emailVal};
        await User.findOne(query,function(err,result){
            if(err) throw err;
            return result
        });
    } 
    catch (error) 
    {
        console.error(error);
        return null;    
    }
}

//delete
User.removeUser = async (id)=>{
    try {
        const result = await User.findByIdAndRemove(id);
        if(result) return true;
        else return false;
    } 
    catch (error) {
        console.error(error);    
        return false;
    }
}

//update
User.updateUser = async(userObj)=>{
    try {
        const result = await User.findByIdAndUpdate(userObj.id,userObj);
        if(result)
        {
            return result;
        }
        else return null;
    } 
    catch (error) {
        console.error(error);
        return null;
    }
}

//create
User.addUser = async (email, mobile, password) => {
  try {
    password = await bcrypt.hash(password, 10);
    const addedUser = await new User({ email, mobile, password }).save();
    return addedUser;
  } 
  catch (error) {
    console.log(error);
    return null;
  }
};

//exports
module.exports = User;