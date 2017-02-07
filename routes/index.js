var express = require('express');
var router = express.Router();
var moment = require('moment');

var Questionbank = require('../models/questionbank');
var Result = require('../models/result');

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log('hi');
  Questionbank.find({}).exec(function(err, questionbanks){
    if(err) return res.json({error : true , reason : err});
    return   res.render('test',{ title: 'Online Test' , questionbank : questionbanks});
  //  return res.json(questionbanks);
  });
});
 /*   leaderboard   */
router.get('/leaderboard/:id?', function(req, res, next) {
  //console.log('hi');
  var cid = req.params.id;
  Result.find({}).sort({number : -1}).exec(function(err, results){
    if(err) return res.json({error : true , reason : err});
    return   res.render('leaderboard',{ title: 'Leaderboard' , result : results, cid: cid});
  //  return res.json(questionbanks);
  });
});

router.post('/', function(req, res, next) {          //recieving data from add.ejs
  //var result = req.body.
  //res.send(req.body);
  //console.log(req.body);
  var data = req.body.res;
  var cname = req.body.name;
  //  var date = req.body.submittime;
    var ctime = moment().format('LLL');
    console.log(ctime);
   //console.log(data);
  //  console.log(date);
  var score = 0;
//  console.log(data.studentans[1]);
  Questionbank.find({}).select({correct : 1 , _id : 1}).exec(function(err, questions) {
        //  if(err) return res.json({error : true , reason : err});
    //   return res.json({error : false});
    if(err){
            console.log(err);
          }
    if(questions.length == 5){
         questions.forEach( function (el){

             data.forEach( function (ele){

               if(el._id == ele.i){
                 if(el.correct == ele.q){
                   score += 1;
                 }
               }
             });
           });
       }
       console.log(score);
       var candiadtedetail = {
                   name : cname,
                   number : score,
                   time : ctime
       }

        console.log(candiadtedetail);
        var detail = new Result(candiadtedetail);
        detail.save(function(err, result){
        if(err) return res.json({error : true , reason : err});
        return res.json({error : false, cid : result._id});
  });
  });

});

module.exports = router;
