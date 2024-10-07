const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/courseapp");
const adminschema=new mongoose.Schema({
    username:String,
    password:String
});
const userschema=new mongoose.Schema({
    username:String,
    password:String,
    purchasedcources:[{
        type:mongoose.Types.ObjectId,
        ref:'courses'
    }]
});
const courseschema=new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    imagelink:String
});
const admin=mongoose.model('Admin',adminschema);
const user=mongoose.model('user',userschema);
const course=mongoose.model('courses',courseschema);
module.exports={
    admin,
    user,
    course
}