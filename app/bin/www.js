"use strict";


const app = require('../app');
const PORT = process.env.PORT || 3000;

//서버연결
app.listen(PORT, () => {
    console.log('login-lecture 서버 가동');
});