var fs = require("fs");
var Redis = require("ioredis");

var Context = function(context){
    this.grammar = context.grammar||"default";
    this.codefile = context.codefile||"";
    this.client = new Redis();
    this.client.select(context.db||2);
    this.key = context.key;
    var Grammar = require("./grammar/"+this.grammar);
    this.Grammar = new Grammar();
    this.editCode = fs.readFileSync(this.codefile).toString();
    this.jsCode = this.Grammar.parse(this.editCode);
}

Context.prototype.run = function(){
    var _this = this;
    this.client.get(this.key,function(err,result){
        if(err){
            throw err;
        }
        var array = JSON.parse(result||[]);
        _this.Grammar.run(array);
    });
}

new Context({
    grammar:        process.argv[2],
    codefile:       process.argv[3],
    key:            process.argv[4],
    db:             process.argv[5],
}).run();