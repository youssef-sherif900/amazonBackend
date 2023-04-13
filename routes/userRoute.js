import  express  from "express";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs"
import { genrateTokens } from "../utils.js";
import expressAsyncHanlder from "express-async-handler"

const userRouter = express.Router()

userRouter.post('/signin',expressAsyncHanlder(async(req,res)=>{
    const user = await User.findOne({email: req.body.email});
    
    if(user)
    {
      if(bcrypt.compareSync(req.body.password, user.password)){
        res.send({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:genrateTokens(user)
        })
        return;
      }
    }
        res.status(401).send({message:'invaild email or password'})
}))

userRouter.post('/signup',expressAsyncHanlder(async(req,res)=>{

const newUser = new User({
  name:req.body.name,
  email:req.body.email,
  password:bcrypt.hashSync(req.body.password)
});

const user = await newUser.save()

res.send({
  _id:user._id,
  name:user.name,
  email:user.email,
  isAdmin:user.isAdmin,
  token:genrateTokens(user)
})

}))

export default userRouter;