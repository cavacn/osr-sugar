var spawn   = require("child_process").spawn;
var Redis = require("ioredis");
var UUID = require("uuid");
var Sugar = function(data,grammar){
    this.isRunning = false;
    this.data = data;
    this.client = new Redis();
    this.grammar = grammar||"default";
    this.client.select(2);
    this.cmd = "node8.bat";
}

Sugar.prototype.run = function(path,cb){
    var key = UUID.v4()+"@"+Date.now();
    var _this = this;
    this.client.set(key,JSON.stringify(this.data),function(err,result){
        _this.isRunning = true;
        _this.process = spawn('node',[__dirname+"/runContext.js",_this.grammar,path,key]).on("error",function(err){
            _this.isRunning = false;
            cb(err);
        });
        var _data = "";
        _this.process.stdout.on("data",function(data){
            _data+=data.toString();
        });
        _this.process.stderr.on("data",function(data){
            _this.isRunning = false;
            cb(data.toString());
        });
        _this.process.on("exit",function(code){
            cb(null,_data);
        })
    })
}

Sugar.prototype.stop = function(){
    if(this.process&&this.isRunning){
        this.process.kill("SIGHUP");
        return true;
    }
    return false;
}

module.exports = Sugar;