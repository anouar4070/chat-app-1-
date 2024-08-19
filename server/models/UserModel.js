import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
email:{
  type: String,
  required:[true,"Email is Required"],
  unique: true
},
password:{
  type: String,
 required: true,
},
firstName:{
  type: String,
required:false,
 },
lastName:{
  type: String,
 required:false,
 },
image:{
  type: String,
  required: false
},
profileSetup:{
  type: Boolean,
  default: false
},
color:{
  type: Number,
  required: false
}
},
{timestamps: true});

userSchema.pre("save", async function(next) {
  const salt= await bcrypt.genSalt()
  this.password= await bcrypt.hash(this.password, salt)
  next();

}
)
 const User = mongoose.model("user", userSchema);
 export default User;