const shortid = require("shortid");
const URL = require("../models/url");


async function handleGenerateShortURL(req,res){
    const body=req.body;
    
    if(!body.url) return res.status(400).json({"err" : "url is required"});

    const shortID=shortid();

    await URL.create({
        shortId:shortID,
        redirectURL : body.url,
        visitedHistory:[],
        createdBy: req.user._id,
    });
    return res.render("home", {"id":shortID,})
    //return res.status(201).json({"id":shortID});
}

async function handleGetUrlById(req,res){
    const shortId=req.params.shortId;

    const result = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push:{
                visitedHistory: {
                    timestamp:Date.now(),
                },
            },
        }
    );
    
    res.redirect(result.redirectURL);
}


async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitedHistory.length,
        analytics: result.visitedHistory,
    });
};

//exports
module.exports={
    handleGenerateShortURL,
    handleGetUrlById,
    handleGetAnalytics,
}