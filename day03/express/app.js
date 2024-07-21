import express from "express"  //-->  "type": "module" 작성해줘서 import 사용해준 것이다

// const express = require('express')
//-->  package.json  -->  "type": "module"  -->  import 사용할 수 있다 (대신, 이제부턴 require 사용할 수 없다)

const app = express()

app.get("/test", (req, res) => {
    console.log(req)
    res.json({
        name: "junseok"
    })
})

// listen 안에 port 를 적는다  -->  port 를 정할 때 기준이 있는데, 이미 사용 중인 포트는 사용하면 안된다
// MySQL 설치할 때 포트 3306 으로 해줬기에, 여기서 3306 으로 해주면 안되는 것이다
app.listen(3030, () => {
    console.log("start server : 3030")
})
//-->  이제 http://localhost:3030  -->  여기로 서버에 접근할 수 있다 (아직 밖으로 내보내지 않았기 때문에 local 인 것이다)
//-->  이 주소에다가 "/test" 붙여주면 get 요청이 화면에 보인다

