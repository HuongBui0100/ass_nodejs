var express = require('express');
const mongoose = require("mongoose");
var router = express.Router();

const db = "mongodb+srv://buihuong:uL6utbmVcMuFeZ8t@duan1.o5lxi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(db).catch(err => console.log("có lôi xay ra"))

var hinhanh = new mongoose.Schema({
  noidung: 'string',
  linkanh: 'string',
  date: 'string'
})

var database = mongoose.model('ass', hinhanh);
/* GET home page. */
router.get('/', function(req, res, next) {
  database.find({}, function(err, data){
    res.render('index', { title: 'Express' , data: data});
  })


});
router.get('/form', function(req, res, next) {
  res.render('form', { title: 'Express' });
});
router.post('/data', function(req, res){
  var nd = req.body.noidung;
  var link = req.body.link;
  var date = req.body.date;
  const data = new database({
    noidung: nd,
    linkanh: link,
    date: date
  })

  data.save(function(err){
    if(err){
      console.error(err)
    }else {
      console.log('thanh cong')
      res.redirect('/')
    }
  })

});
router.post('/delete',function(req, res){
  var id = req.body.id;
  database.deleteOne({_id:id}, function(err){
    if(err){
      console.error(err)
    }else {
      console.log('xoa thanh cong')
      res.redirect('/')
    }
  })
})
router.post('/update',function (req, res) {
  var id = req.body.id;
  database.find({_id:id},function (err,data){
    res.render('edit', {data:data});
  })
})

router.post('/sua', function(req, res){
  var nd = req.body.noidung;
  var link = req.body.link;
  var date = req.body.date;
  var id = req.body.id;
  database.updateOne({_id:id}, {noidung: nd, linkanh:link, date:date},function (err){
    if(err){
      console.error(err)
    }else {
      console.log('sua thanh cong')
      res.redirect('/')
    }
  })
})
router.get('/json', function (req, res){
  database.find({}, function(err, data){
    res.send(data)
  })
})

module.exports = router;
