const mongoose = require("mongoose");

async function connectMongoDb(url){
    return mongoose.connect(url);
}


//exports
module.exports={
    connectMongoDb,
}