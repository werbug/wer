var async = require('async')
//异步多ajax嵌套
//需安装$ npm i async -D
//运行$ node day03/async.js
//Vue react 直接把dist中js引入即可
//串行无关联
console.time('test')
async.series([
    function(callback){
        setTimeout(function(){
            //
            callback(null,'one')   
        },1000)
    },

    function(callback){
        setTimeout(function(){
            callback(null,'two')
        },2000)
    }
],function(err,results){
    console.log(results)
    console.timeEnd('test')
})
console.time('test2')
//对象书写模式
async.series({
    one:function(callback){
        setTimeout(function(){
            //
            callback(null,'one')   
        },1000)

    },
    two:function(callback){
        setTimeout(function(){
            callback(null,'two')
        },2000)
    }
},function(err,results){
    console.log(results)
    console.timeEnd('test2')
})


//并行
console.time('test3')
async.parallel([
    function(callback){
        setTimeout(function(){
            callback(null,'one')
        },1000)
    },
    function(callback){
        setTimeout(function(){
            callback(null,'two')
        },2000)
    }
],function(err,results){
    console.log(results)
    console.timeEnd('test3')
})

//串行有关联
console.time('test4')
async.waterfall([
    function(callback){
        callback(null,'one','two')
    },function(arg1,arg2,callback){
        callback(null,arg1,arg2,'three')

    },function(arg1,arg2,arg3,callback){
        callback(null,[arg1,arg2,arg3,'done'])
    }
],function(err,results){
    console.log(results)
    console.timeEnd('test4')
})
//rsync Linux 中命令  类似于stp 往服务器里进行一次增量传输（例如服务器里有5个文件，然后增加了一个，在另一台服务器上通过rsync就可以把最新的文件传上去）


