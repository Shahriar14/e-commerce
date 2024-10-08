const express = require("express");
const cors = require("cors");
const app = express();

//payment intrigration
// const SSLCommerzPayment = require('sslcommerz-lts');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");






dotenv.config();

// app.use(cors({
//     origin: 'http://localhost:5173', // Frontend URL
//     credentials: true,
// }));


mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => {
        console.log(err);
    });


// const store_id = process.env.STORE_ID;
// const store_passwd = process.env.STORE_PASS;
// const is_live = false //true for live, false for sandbox


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);


// const port = process.env.PORT

// app.listen(port || 5000, () => {
//     console.log("Backend server is running! ", port);
// });

const port = parseInt(process.env.PORT, 10) || 5000;

app.listen(port, () => {
    console.log("Backend server is running on port:", port);
});