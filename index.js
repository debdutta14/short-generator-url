const express=require("express")
const app=express();
const path=require("path");
const PORT=8001;
const urlRoute= require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const {connectMongoDb} = require("./connect");


//connection
connectMongoDb("mongodb://localhost:27017/short-url-Db")
.then(()=>{
    console.log("mongoDb connected successfully");
});

//engine
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended : false }));

//routes
app.use("/url",urlRoute);
app.use("/",staticRoute);


app.listen(PORT, ()=>{
    console.log(`Server started at : ${PORT}`);
})