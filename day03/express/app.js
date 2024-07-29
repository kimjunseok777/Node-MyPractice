import express from "express"  //-->  "type": "module" 작성해줘서 import 사용해준 것이다
import user from "./routes/user.js"

// const express = require('express')
//-->  package.json  -->  "type": "module"  -->  import 사용할 수 있다 (대신, 이제부턴 require 사용할 수 없다)


const app = express()
app.use(express.json()) //-->  이제 바디데이터로 보낸 데이터를 파싱할 수 있게 된다  -->  바디 관련 데이터를 보내거나 콘솔 찍어도 데이터가 잘 찍힌다

//------------------------------------------------------------------------------------
// 기본 경로 설정 , user 등록 :

// user 는 router (user.js) export 해준 것이다 (주소와, 회원가입했을 때의 메세지가 담겨있다)
app.use('/user', user) //-->  이렇게 "/user" 해주면 얘가 디폴트 주소로 앞에 붙는 것이다  -->  ex) "/user/sign-up"

//------------------------------------------------------------------------------------
// get :

//-->  /test 주소에 get 메소드로 요청하면 name : junseok 응답값을 보내주는 것이다
//-->  밑에 작성해준 포트번호 (http://localhost:3040) 여기다가 "/test" 붙이고 get 매소드로 전송하면 된다 (thunder client 에서 해보자)
app.get("/test/:testId", (req, res) => {

    console.log(req.params.testId) //--> "/test/3"

    res.json({
        name: req.params.testId
    })
})

//------------------------------------------------------------------------------------
// post :

app.post("/test", (req, res) => {

    console.log(req.query.testId) //-->  "/test?testId=2"
    console.log(req.body) //-->  위에 app.use( express.json() ) 코드 작성하지 않으면 undefined 가 찍힌다
    //-->  바디데이터로 보낸 데이터를 파싱할 수 있게 해준 것이다  -->  app.use( express.json() )

    res.json({
        name: req.query.testId
    })
})

//------------------------------------------------------------------------------------

// listen 안에 port 를 적는다  -->  port 를 정할 때 기준이 있는데, 이미 사용 중인 포트는 사용하면 안된다
// MySQL 설치할 때 포트 3306 으로 해줬기에, 여기서 3306 으로 해주면 안되는 것이다
//-->  실제 수업에서 포트를 3030 으로 작성했기에, 여기에선 다른 포트번호인 3040 으로 작성해줬다
app.listen(3040, () => {
    console.log("start server : 3040")
})
//-->  이제 http://localhost:3040  -->  여기로 서버에 접근할 수 있다 (아직 밖으로 내보내지 않았기 때문에 local 인 것이다)
//-->  이 주소에다가 "/test" 붙여주면 get 요청이 화면에 보인다

