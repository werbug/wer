var express = require('express');
var router = express.Router();
var async = require('async');
//创建mongodb客户端
var MongoClient = require('mongodb').MongoClient;
//定义一个连接字符串
var DB_CONN_STR = 'mongodb://localhost:27017/new';

/* GET users listing. */
router.get('/aaa', function(req, res, next) {
  //res.send('respond with a resource');
  
  
  //查找数据函数
  var findData = function(db,callback){
    var conn = db.collection('user')
   
    conn.find({}).toArray(function(err,results){
      callback(results)
    })
  }
  //连接数据库
  MongoClient.connect(DB_CONN_STR,function(err,db){
    if(err){
      console.log(err);
    }else{
      findData(db,function(results){
        res.send(results);
      })
    }
  })


});

/* GET new swip */
router.all('/indexswip', function(req, res, next) {
  //res.send('respond with a resource');
  
  
  //查找数据函数
  var findData = function(db,callback){
    var conn = db.collection('swip')
   
    conn.find({}).toArray(function(err,results){
      callback(results)
    })
  }
  //连接数据库
  MongoClient.connect(DB_CONN_STR,function(err,db){
    if(err){
      console.log(err);
    }else{
      findData(db,function(results){
        //console.log(results);
        res.send(results[0]["swip"]);
      })
    }
  })


});

/* GET new iscroll */
router.all('/iscroll', function(req, res, next) {
  var pageSize = parseInt(req.body['len'], 10) || 1
  //console.log(pageSize)
  var count = 0
  var totalPage = 0
  var n= parseInt(req.body['n'], 10) || 0
  //console.log(n)

  //查找数据函数
  var findData = function(db,cb){
    var conn = db.collection('iscroll')
   
    async.series([
      function (callback) {
        conn.find({}).toArray(function (err, results) {
          if (err) {
            console.log(err);
          } else {
            count = results.length
            totalPage = Math.ceil(count/pageSize)
            callback(null, '')
          }
        })
      },
      function (callback) {
        conn.find({}).sort({_id: 1}).skip(n*pageSize).limit(pageSize).toArray(function (err, results) {
          if (err) {
            console.log(err);
          } else {
            callback(null, results)
          }
        })
      }
    ], function (err, results) {
      //console.log(results)
      cb(results[1])
    })

  }
  //连接数据库
  MongoClient.connect(DB_CONN_STR,function(err,db){
    if(err){
      console.log(err);
    }else{
      findData(db,function(results){
        //console.log(results);
        if(n<=totalPage){
          //console.log(n)
          //console.log(results)
          res.send(results);
        }
        
      })
    }
  })
  

});
/* GET new essay */
router.all('/essay', function(req, res, next) {
  var essayid = req.body['id']
  // console.log(essayid) // css0
  var essayname = essayid.replace(/\d/ig,'')
  // console.log(essayname)

  //查找数据函数
  var findData = function(db,callback){
    var conn = db.collection(essayname)
    conn.find({id:essayid}).toArray(function (err, results) {
      if (err) {
        console.log(err);
      } else {
        callback(results)
      }
    })
  }
  //连接数据库
  MongoClient.connect(DB_CONN_STR,function(err,db){
    if(err){
      console.log(err);
    }else{
      findData(db,function(results){
          // console.log(results);     
          res.send(results[0]['data']);    
      })
    }
  })
  

})
/* registor*/
router.post('/registor',function(req,res){
  //前端过来的信息通过request对象，request中有个body对象存着数据（body存着的数据是通过APP.js中的bodyParser存入的）
 // console.log(req.body['username']+".....................")
  var username = req.body['username'];
  var password = req.body['password'];
  //插入数据函数
  var insertData = function(db,callback){
    //连接集合（collection）users
    var conn = db.collection('users')
    //获得前端提交的数据并格式化
    var data = [{
      username:username,
      password:password
    }]
    //插入数据
    conn.insert(data,function(err,results){
      if(err){
        console.log(err);
      }else{
       callback(results) 
      }
    })
  }

  //数据库连接
  MongoClient.connect(DB_CONN_STR,function(err,db){
    if(err){
      console.log(err)
    }else{
      // console.log('数据库连接成功')
      insertData(db,function(results){
        // console.log(results);
        // 往前端显示注册成功
        // res.send('注册成功');
        // 重定向
        res.redirect('/#/login')
        db.close()
      })
    }
  });
  
})

/*login*/
router.post('/login',function(req,res){
  var username = req.body['username']
  var password = req.body['password']
  // console.log(username+"............")
  // console.log(password+"..........")
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
          res.send(req.session.username)
        }else{
          //res.send('登录失败')
          res.redirect('/#/login')
        }
      })
    }
  })

})
/*logout*/
router.all('/logout',function(req,res){
  // 方法一
  // console.log(req.session.username+'logout')
  // req.session.username = undefined
  // console.log(req.session.username+'zhilogout')
  // res.redirect('/')
  // 方法二
  // console.log(req.session.username+'logout')
  req.session.destroy(function(req,err){
    // console.log('zhilogout')
    // res.redirect('/') 
  })
})
/*校验session*/
router.all('/testsession',function(req,res){
  if (req.session.username) {
    res.send(req.session.username)
    // console.log(req.session.username+'session')
  }
})
/*list*/
router.all('/list',function(req,res){
  //构建分页信息
  //拿到前端post数据req.body;拿到前端get数据req.query
  var dataId = req.body['dataId']
  // console.log(dataId+"list")
  var findData = function (db, callback) {
    var conn = db.collection(dataId)
    conn.find({}).sort({_id: -1}).toArray(function (err, results) {
      if (err) {
        console.log(err);
      } else {
        callback(results)
      }
    })
    
  }
  setTimeout(function () {
    //连接数据库
    MongoClient.connect(DB_CONN_STR,function(err,db){
      if(err){
        console.log(err);
      }else{
        findData(db,function(results){
            // console.log(results)
            // console.log("jjjjjjjjjjjjjjjjj")
            res.send(results)
        })
      }
    })
  },1000)
  
})
/*new submit*/
router.post('/submit',function(req,res){
    var content = req.body['content']
    var connName = req.body['connName']
    var usName = req.body['usn']
    // console.log(connName)

    var insertData = function(db,callback){
        var comment = db.collection(connName)
        // 数据库中的操作db.ids.insert({name:'comment',id:0})
        var ids = db.collection('ids')
        
       async.waterfall([
          function(callback){
            ids.findAndModify(
              {name:connName},
              //desc降序排序
              [['_id','desc']],
              {$inc:{id:1}},
              function(err,results){
                  callback(null,results)
              }
            )
          },function(results,callback){
            var data = {uid:results.value.id,usName:usName,content:content}
            comment.insertOne(data,function(err,results2){
              if(err){
                console.log(err);
              }else{
                callback(null,results,results2)
              }
            })
          },function(results,results2,callback){
            comment.find({}).sort({_id: -1}).toArray(function (err, results3) {
              if (err) {
                console.log(err);
              } else {
                callback(null,[results,results2,results3])
              }
            })
          }
        ],function(err,results3){
          callback(results3)
        })
    }

    MongoClient.connect(DB_CONN_STR,function(err,db){
      if(err){
        console.log(err);
      }else{
        insertData(db,function(results){
          // console.log(results+"finally");
          // console.log(results);console.log(results[2]);
          res.send(results[2])
          //res.redirect('./list')
        })
      }
    })
})
//
module.exports = router;
