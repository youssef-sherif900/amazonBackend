import  express, { urlencoded }  from "express";
import path from "path";
import mongoose from "mongoose"; 
import dotenv from "dotenv"                         
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/ProductsRoutes.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cors from "cors";




dotenv.config()
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Database is connected!"))
.catch(err=>console.log(err.message))

const app = express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/seed', seedRouter);
app.use('/api/product',productRouter)
app.use('/api/users',userRouter)
app.use('/api/order',orderRouter)

// app.get('/api/keys/paypal', (req, res) => {
//     res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
//   });


// preparing for deploying heroku server
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,'/frontend/build')))
app.get("*",(req,res)=>{
    res,sendFile(path.join(__dirname,'/frontend/build/index.html'))
})

app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})

const port = process.env.PORT || 3000
app.listen(port ,()=>{
    console.log(`server launched at ${port}`)
})