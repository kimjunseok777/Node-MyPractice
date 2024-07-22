import express from "express"
import Users from "../models/user.model.js"
import bcrypt from "bcrypt"


const router = express.Router()

router.post("/sign-up", async (req, res) => {
    const {email, password} = req.body
    const existUser = await Users.findOne({ //-->  findOne 은 하나만 찾겠다는 의미이다
        where: {
            email
        }
    }
)
    if(existUser) return res.json({
        ok: false,
        message: "이미 존재하는 이메일입니다"
    }
)
    const hashedPassword = await bcrypt.hash(password, 12)
    //-->  여기서 12 는 몇번 솔트할건지이다 (솔트가 크면 클 수록 암호화를 더 많이 해서 보안이 높아지는 대신에, 서버의 부담이 커진다)
    await Users.create({ //-->  여기는 insert 랑 똑같다
        email,
        password: hashedPassword
    })

    res.json({
        ok: true,
        message: "회원가입을 축하합니다"
    })
})

export default router