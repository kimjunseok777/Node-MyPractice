import express from "express"


const router = express.Router()
router.post("/sign-up", (req, res) => {
    // 백엔드는 DB 에 data 를 insert 한다
    //-->  insert 전에 중복되는 계정이 있는지 검사해야한다
    //-->  지금은 안 할 거지만, 백엔드도 유효성 검사를 해야한다 (악의적인 공격을 방지하기 위함)
    console.log(req.body) //-->  req 의 body 의 내용을 DB 에 inset 하는 것이 백엔드의 역할이다
    res.json({
        ok: true,
        message: "회원가입을 축하합니다!"
    })
})


export default router
