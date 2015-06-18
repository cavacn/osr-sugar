var Sugar = require("../");

var sugar = new Sugar(require("./data"));

sugar.run(__dirname+"/code.js",function(err,result){
    if(!!err){
        console.log(err);
        !err.stack||console.log(err.stack);
    }
    if(result){
        console.log("-->",result);
    }
})