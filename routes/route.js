const express = require('express');
var expressLayouts = require('express-ejs-layouts');
const router = express.Router();
const {check, validationResult} = require('express-validator');



router.use(expressLayouts);
//route 혹은 routing이라 부름

router.get('/', (req, res) => {
    res.render('index'); //서문시장야시장 메인페이지 html 파일명 쓰기
});

const db = require('./../db.js');

router.get('/intro', (req, res) => {
    res.render('intro');
});
router.get('/join', (req, res) => {
    res.render('join');
});
router.get('/join_sub', (req, res) => {
    res.render('join_sub');
});
router.get('/login', (req, res) => {
    res.render('login');
});


router.get('/notice', function(req, res) {

    db.getAllBoard((rows) => {
        res.render('notice', {rows : rows})  
    });
})

router.get('/notice_write', function(req, res){
    res.render('notice_write');
  });

  router.post('/store', check('content').isLength({min: 1, max: 500}),
  function (req, res, next) {
      let errs = validationResult(req);
      console.log(req.body);
      console.log(errs); //콘솔 에러 출력하기
      if(errs['errors'].length > 0) {  //화면에 에러 출력하기
          res.render('notice_write', {errs:errs['errors']});
      } else {
          let param = JSON.parse(JSON.stringify(req.body));
         
          let content = param['content'];
          db.insertBoard(content, () => {
              res.redirect('/notice');
          });
      }
  });

  router.get('/updateBoard', (req, res) => {
    let id= req.query.id;

    db.getBoardById(id, (row) => {
        if (typeof id === 'undefined' || row.length <= 0) {
            res.status(404).json({error: 'undefined board'});
        } else {
            res.render('updateBoard', {row:row[0]}); //최신걸 위로 올리는 방법
        }
    });
});

router.post('/updateBoard',
    [check('content').isLength({min: 1, max: 500})],
    (req, res) => {
        let errs = validationResult(req);
        let param = JSON.parse(JSON.stringify(req.body));
        let id = param['id'];
        let content = param['content'];
        if (errs['errors'].length>0) {
            db.getBoardById(id, (row) => { //유효성 검사에 적합하지 않으면 정보를 다시 조회 후, updateMemo 페이지를 다시 랜더링한다.
                res.render('updateBoard', {row:row[0], errs:errs['errors']});
            });
        } else {
            db.updateBoardById(id, content, () => {   //12번줄 db.getAllBoard((rows)랑 같은 말
                res.redirect('/notice');
            });
        }
    });
    router.get('/deleteBoard', (req, res) => {
        let id = req.query.id;
        db.deleteBoardById(id, () => {
            res.redirect('/notice');
        });
});


router.get('/notice_read', function(req, res) {
    let id = req.query.id;

    db.getListBoard(id, (row)=>{
        if(typeof id === 'undefined' || row.length <= 0){
            res.status(404).json({error:'undefind memo'});
        } else {
            res.render('notice_read',{row:row[0]});
        }
    });
});

module.exports = router;