const express = require("express")
const router = express.Router();
const {
    handleGenerateShortURL,
    handleGetUrlById,
    handleGetAnalytics,
} = require("../controller/url");

//routes

router.post("/",handleGenerateShortURL);
router.get("/:shortId",handleGetUrlById);
router.get("/analytics/:shortId",handleGetAnalytics);


//exports
module.exports=router;