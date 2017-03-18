var express = require('express');
var router = express.Router();
//创建mongodb客户端
var MongoClient = require('mongodb').MongoClient;
//定义一个连接字符串
var DB_CONN_STR = 'mongodb://localhost:27017/new';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',
    username:req.session.username  
  });
});

// router.all('/logout',function(req,res){
//   //方法一
//   //req.session.username = undefined
//   //res.redirect('/')
//   //方法二
//   console.log('log')
//   req.session.destroy(function(err){
//     console.log('zhilogout')
//     res.redirect('/') 
//   })
// })
router.all('/login',function(req,res){
  var username = '33333333333'
  var password = '33333333333'
  //查找数据函数
  var findData = function(db,callback){
    var conn = db.collection('users')
    var data = {username:username,password:password}
    conn.find(data).toArray(function(err,results){
      callback(results)
    })
  }
  //连接数据库
  MongoClient.connect(DB_CONN_STR,function(err,db){
    if(err){
      console.log(err);
    }else{
      findData(db,function(results){
        //如果在数据库中查询到数据了results.length > 0
        if(results.length > 0){
          //res.send('登录成功')
          req.session.username = results[0].username
          
          //重定向
          res.redirect('/')
        }else{
          res.send('登录失败')
          ///res.redirect('/login')
        }
      })
    }
  })

})

module.exports = router;
