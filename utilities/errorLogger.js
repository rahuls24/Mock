var fs = require('fs');

/*

All the errors thrown is directed to errorLogger.
errorLogger should log the error in errorLogger.txt file.
And should send the 400 HTTP response code and error message as response 

*/

var logger = function (err,req, res, next) {
    let msg=`${new Date()} - ${req.method} - ${err}\n`;
    fs.appendFile('errorLogger.txt',msg,(error)=>{
        if(error)
            console.log(`Logging Failed!`);
    })
    res.status(err.status).json({
        message: err.message
    })
}

module.exports = logger;