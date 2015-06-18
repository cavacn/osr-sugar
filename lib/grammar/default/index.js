var Script = require("vm").Script;
var DefaultGrammar = function(){
    
}

DefaultGrammar.prototype.parse = function(editCode){
    this.editCode = editCode;
    this.editCode = "var Fn = " +this.editCode;
    return this.editCode;
}

DefaultGrammar.prototype.run = function(array){
    var script = new Script(this.editCode);
    var obj = script.runInThisContext();
    var fn = new Fn();
    if(fn.init){
        fn.init();
    }
    var result = [];
    array.forEach(function(item,index){
        result.push(fn.everyCycle(item));
        //console.log(fn.everyCycle(item));
        if(index == array.length-1){
            //console.log(result,result.length,array.length);
            process.exit();
        }
    })
}

module.exports = DefaultGrammar;