//const { Result } = require('express-validator');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b231e8080c657a',
    password: '56ac674b',
    port: 3306,
    database: 'heroku_f1f3904780a8ce1',
    dateStrings: 'date' //dateString은 날짜 시간 출력
    //원래는 이렇게 쓰면 안 되고 다른데에 옮긴 후 연결하는 방식으로 해야 함
})


//리스트 전체를 불러오는 함수
function getAllBoard(callback) {
    connection.query(`SELECT * FROM board ORDER BY id DESC`, (err, rows, fields) => {
        if(err) throw err;
        callback(rows);  //모든 줄들을 받아오게 지정(표 3줄)
    });
}

//리스트에 새로운 내용을 추가하는 함수
function insertBoard(content, callback) {
    connection.query(`INSERT INTO board(content, writer, DATE, view) VALUES('${content}', '마스터', now(), '0')`, (err, result) => {
        if(err) throw err;
        callback();
    });
}

//리스트 중 ID값이 일치하는 row만 불러오는 함수
function getBoardById(id, callback) {
    connection.query(`select * from board WHERE id = ${id}`, (err, row, fields) => {
        if(err) throw err;
        callback(row);
    });
}


//리스트를 수정하고 싶을 때 id값이 일치하는 부분을 수정하는 함수
function updateBoardById(id, content, callback) {
    connection.query(`UPDATE board set content='${content}', DATE = now() WHERE id=${id}`, (err, result) => {
        if(err) throw err;
        callback();
    });
}


//리스트 중 ID값이 일치하는 부분을 삭제하는 함수
function deleteBoardById(id, callback) {
    connection.query(`DELETE from board WHERE id = ${id}`, (err, result) => {
        if(err) throw err;
        callback();
    });
}

//상세페이지 불러오는 함수
// function getListBoard(callback) {
//     connection.query(`SELECT * FROM board ORDER BY id DESC`, (err, rows, fields) => {
//         if(err) throw err;
//         callback(rows);
//     });
// }

//id값이 일치한 값의 모든 값을 가져오는 함수
function getListBoard(id, callback){
    connection.query(`SELECT * FROM board WHERE id = '${id}'`, (err, row, fields) =>{
        if(err) throw err;
        callback(row);
    })
}

module.exports = {
    getAllBoard,
    insertBoard, 
    getBoardById,
    updateBoardById,
    deleteBoardById,
    getListBoard
}