const express = require("express")
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req,res)=>{
    if(!req.user) return res.redirect("/login");
    const allUser = await URL.find({ createdBy : req.user._id });
    return res.render("home",
        {
            urls:allUser,
        }
    );
})

router.get("/signup", (req,res)=>{
    return res.render("signup");
})
router.get("/login",(req,res)=>{
    return res.render("login");
})



//exports
module.exports= router;