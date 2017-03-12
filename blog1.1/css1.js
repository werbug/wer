//创建mongodb客户端
var MongoClient = require('mongodb').MongoClient;
//定义一个连接字符串
var DB_CONN_STR = 'mongodb://localhost:27017/new';
var data = {
    "name":"sass基础",
    "con":[
        {
            "title":"定义变量",
            "content":"在sass中定义一个变量使用$开头，然后用冒号赋值；如：$width : 20px;",
            "src":"" 
        },
        {
            "title":"运算",
            "content":"（1）如普通运算：width:$width*2;（2）再者字符串拼接变量：$path：'/img';background:url('#{$path}/tu.png') no-repeat;",
            "src":""    
        },
        {
            "title":"@mixin混合",
            "content":"用'.'开头，可以理解为CSS函数,mixin 定义一段代码集合, 且可以选择传参,有默认值可以不用传入参数.",
            "src":"/static/images/sassmixin.png"
        },
        {
            "title":"extend继承",
            "content":"其中涉及到一个占位符‘%’，使用 % 声明的选择器编译时不会出现在 css 文件中",
            "src":"/static/images/sassextend.png" 
        },
        {
            "title":"@if @else",
            "content":"和js语法类似",
            "src":"/static/images/sassif.png"   
        },
         {
            "title":"@if @else",
            "content":"和js语法类似",
            "src":"/static/images/sassif.png"    
        },
        {
            "title":"map对象和array的循环",
            "content":"定义map使用'（）'符号，其中的内容与json格式一样，而array使用逗号分隔，两者都可以用@each来循环",
            "src":"/static/images/sassmap.png"   
        }
    ]
}





//插入数据函数
var insertData = function(db,callback){
    var conn = db.collection('css')
    conn.insert([{"id":"css1","data":data}])
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
