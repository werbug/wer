//创建mongodb客户端
var MongoClient = require('mongodb').MongoClient;
//定义一个连接字符串
var DB_CONN_STR = 'mongodb://localhost:27017/new';
var data = { 
    "name": "Less基础", 
    "con" : [ 
        { 
            "title" : "定义变量", 
            "content" : "在less中定义一个变量使用@开头，然后用冒号赋值；如：@width : 20px;", 
            "src" : "" 
        }, { 
            "title" : "运算", 
            "content" : "（1）如普通运算：width:@width*2;（2）再者字符串拼接变量：@path：'/img';background:url('#{@path}/tu.png') no-repeat;",
             "src" : ""
        }, { 
            "title": "混合", 
            "content" : "用'.'开头，可以理解为CSS函数", 
            "src" : "/static/images/lessmixin.png" 
        }, { 
            "title" : "与或非", 
            "content" : "虽然在less中没有if-else,但是可以用when来替代，如下为带条件的混合", 
            "src" : "/static/images/lessyu.png" 
        } 
    ]
 }





//插入数据函数
var insertData = function(db,callback){
    var conn = db.collection('css')
    conn.insert([{"id":"css0","data":data}])
    console.log("end")
}
//连接数据库
MongoClient.connect(DB_CONN_STR,function(err,db){
    if(err){
        console.log(err);
    }else{
        insertData(db);
    }
})
