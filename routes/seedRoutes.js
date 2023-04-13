import  express  from "express";
import data from "../data.js";
import Product from "../model/ProductModel.js";
import User from "../model/userModel.js";


const seedRouter = express.Router();

seedRouter.get('/',async(req,res)=>{
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);

    await User.remove({});
    const createduser = await User.insertMany(data.users);

    res.send({createdProducts,createduser})
    
})

export default seedRouter;