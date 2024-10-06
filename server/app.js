const express= require('express');
const app =express();
const dotevn = require('dotenv');
dotevn.config();

const mongoConnect = require('./db/connection');

const router = require('./routes/routers');
 const authrouter = require ('./routes/authRoutes')

app.use(express.static("../client"));
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(router);
mongoConnect();
app.use(authrouter);



app.listen(process.env.PORT,() =>{
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})
