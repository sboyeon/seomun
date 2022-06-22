var app = require('../app.js');
var port = 3001;



app.listen(port, () => {
    console.log(`express 실행 ${port}`);
})

//port 부르기 위해선 ``백틱으로 부르기