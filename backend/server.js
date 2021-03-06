import express from 'express';
import dotnev from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';


dotnev.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/build/index.html')));

// app.get("/api/products", (req, res) => {
//     res.send(data.products);
// })

// app.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find(x=>x._id === productId);
//     if(product)
//         res.send(product);
//     else
//         res.status(404).send({msg: "Product Not Found."})
// })

app.listen(8000, () => {console.log("Server started at port 8000")});