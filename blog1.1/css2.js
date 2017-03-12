//创建mongodb客户端
var MongoClient = require('mongodb').MongoClient;
//定义一个连接字符串
var DB_CONN_STR = 'mongodb://localhost:27017/new';
var data = {
    "name":"弹性盒模型",
    "con":[
        {
            "title":"flex",
            "content":"flex为flex-grow、flex-shrink 和 flex-basis 属性的简写属性。默认值0 1 auto,常见用法子元素平分父元素的宽度:父元素设置display : flex;子元素设置flex : 1 / auto;",
            "src":"" 
        },
        {
            "title":"flex-grow、flex-shrink 和 flex-basis",
            "content":"（1）flex-grow为设置弹性盒的伸张量的数字（2）flex-shrink为设置弹性盒的收缩量的数字（3）flex-basis为设置弹性盒的伸缩基准值和项目的长度",
            "src":""    
        },
        {
            "title":"flex-flow",
            "content":"flex-flow是flex-direction和flex-wrap的简写属性。如让弹性盒的元素以相反的顺序显示，且在必要的时候进行拆行：display:flex;flex-flow:row-reverse wrap;",
            "src":""
        },
        {
            "title":"flex-direction",
            "content":"设置弹性盒内项目的显示方式，设置为column时会调换横纵轴，使得控制水平和垂直的justify-content和align-content互换。属性值：row水平显示；row-reverse与row 相同，但是以相反的顺序显示；column垂直显示；column-reverse 与 column 相同，但是以相反的顺序显示。",
            "src":""  
        },
        {
            "title":"flex-wrap",
            "content":"设置弹性盒是否拆行，属性值：nowrap wrap wrap-reverse 分别为不拆行，拆行和反向拆行",
            "src":""    
        },
         {
            "title":"align-content",
            "content":"设置弹性盒的垂直对齐方式，属性值：（1）stretch默认值。项目被拉伸以适应容器。（2）center居中（3）flex-start向开头对齐（4）flex-end向结尾对齐（5）space-between首尾不留间隙各子元素之间留有间隙（6）space-around首尾、子元素之间都留有空隙",
            "src":""   
        },
        {
            "title":"justify-content",
            "content":"同align-content，但是其控制为水平轴显示",
            "src":""   
        },
        {
            "title":"align-items",
            "content":"设置项目垂直显示，属性值：（1）stretch默认值。项目被拉伸以适应容器。（2）center居中（3）flex-start项目位于容器的开头（4）flex-end项目位于容器的结尾（5）baseline项目位于容器的基线上。",
            "src":""  
        },
        {
            "title":"align-self",
            "content":"设置弹性盒子元素垂直显示方式，align-self 属性可重写灵活容器的 align-items 属性。",
            "src":"" 

        },
        {
            "title":"order",
            "content":"设置或检索弹性盒模型对象的子元素出现的順序,子元素要都设置order否则子元素按 未设置——设置的序号大小排列如：fu{display:flex;} zi{order:2;}",
            "src":"" 
        }
    ]
}


         
       
       
       




//插入数据函数
var insertData = function(db,callback){
    var conn = db.collection('css')
    conn.insert([{"id":"css2","data":data}])
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
