import express from "express"
import cookieParser from "cookie-parser"
import db from './models/index.js'
import User from "./routes/user.js"


const app = express()
db.sequelize.sync().then(() => {
    console.log('연결 성공')
})

app.use(express.json()) //-->  json 사용해서 쓴다는 의미
app.use(cookieParser()) //-->  cookieParser 사용한다는 의미

app.use("/user", User) //-->  주소 기본값과, User 를 등록시켜준 것이다


app.listen(3040, () => {
    console.log("start server port : 3040")
})