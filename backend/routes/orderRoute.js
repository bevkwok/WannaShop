import express from 'express';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get("/mine", isAuth, async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
});