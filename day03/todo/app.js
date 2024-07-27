import express from "express"
import cookieParser from "cookie-parser"
import db from './models/index.js'
import User from "./routes/user.js"


const app = express()
db.sequelize.sync().then(() => {
    // sequelize : 객체와 관계형 DB를 맵핑
    console.log('연결 성공')
})

app.use(express.json()) //-->  json 사용해서 쓴다는 의미
app.use(cookieParser()) //-->  cookieParser 사용한다는 의미

//----------------------------------------------------------------------------------------------

app.use("/user", User) //-->  주소 기본값과, User 를 등록시켜준 것이다
// User 는 회원가입 요직이 있는 router 를 import 받아준 것이다  -->  메소드 : post / 주소 : "/sign-up"

//----------------------------------------------------------------------------------------------

app.listen(3040, () => {
    console.log("start server port : 3040")
})