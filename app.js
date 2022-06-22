const express = require('express');   //express 함수 반환값 변수에 저장
const { engine } = require("express/lib/application");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

const homes = require('./routes/route.js');

app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(logger('dev'));
app.use('/', homes); //미들웨어(중간다리 역할) 등록

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.set('layout extractScripts', true);




//app.engine('html', require('ejs').renderFile);



//css, img, js의 파일 사용을 위한 경로 설정
app.use(express.static(__dirname + '/public'));
module.exports = app;
