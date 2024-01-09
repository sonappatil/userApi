const express = require ("express");
require("./db/conn");
const cors = require('cors');
const router = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const adminRouter =  require("./routes/adminRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(router);
app.use(userRouter);
app.use(adminRouter);

app.listen(port, ()=>{
    console.log(`app listen to the ${port}`);
})