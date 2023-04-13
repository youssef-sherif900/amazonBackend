import  express  from "express";
import {isAuth} from "../utils.js";
import expressAsyncHanlder from "express-async-handler"
import Order from "../model/orderModel.js";

const orderRouter = express.Router()

orderRouter.post("/",isAuth,expressAsyncHanlder(async(req,res)=>{
  const newOrder = new Order({
    orderItems: req.body.orderItems.map((x) => ({...x, product: x._id})),
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id
  })
  
  const order = await newOrder.save()
  res.status(201).send({message: 'New Order Created',order})

}));


orderRouter.get("/:id",isAuth,expressAsyncHanlder(async(req,res)=>{
  const order = await Order.findById(req.params.id) 
  if (order) {
    res.send(order)
  } else {
    res.status(404).send({message: 'Order Not Found'})
  }
}))

orderRouter.put("/:id/pay",isAuth,expressAsyncHanlder(async function (req,res){
  const order = await Order.findById(req.params.id) 
if (order) {
  order.isPaid = true
  order.paidAt = Date.now();
  order.PaymentResult={
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.email_address,
  }

  const updateOrder = await order.save()
  res.send({message:'order is Paid', order:updateOrder})
} else{
  res.status(404).send({message: "Order Not Found"})
}
}))

export default orderRouter;