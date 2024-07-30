import express from "express"
import Users from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JwtAuth } from "../middleware/jwtAuth.js"


const router = express.Router()

//-----------------------------------------------------------------------------------------------------------------------
// 회원가입 :

router.post("/sign-up", async (req, res) => {
    const {email, password} = req.body
    const existUser = await Users.findOne({ //-->  findOne 은 하나만 찾겠다는 의미이다
        where: {
            email //-->  위의 body 에서 객체구조분해할당 해준 email 이다  -->  즉, 사용자가 입력한 이메일과 db 에 일치하는 이메일이 있는지 찾는 것이다
        }
    })

    if(existUser) return res.json({
        ok: false,
        message: "이미 존재하는 이메일입니다"
    })

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

//-----------------------------------------------------------------------------------------------------------------------
// 로그인 :

router.post("/sign-in", JwtAuth, async(req, res) => {
    // 미들웨어 JwtAuth 사이에 끼워주었다  -->  jwt 를 디코드하고, req.user 에 id 값을 넣어서 전달해준다 (req 데이터를 중간에서 가공해준 것이다)
    
    const {email, password} = req.body
    //-->  회원가입에서 bcrypt 로 비밀번호를 암호화했었다  -->  이 bcrypt 를 반드시 풀어야한다

    const user = await Users.findOne({
        where: {
            email
        }
    }) //-->  회원가입으로 등록된 이메일이 있는지 Users 테이블에서 찾는 것이다  -->  값이 없다면 존재하지 않는 회원으로 로그인하려 한 것이된다

    // user 의 값은 있을 수도 있고, 없을 수도 있다  -->  회원가입이 안된 이메일이면 없을 수 있다  -->  user 가 없다면 어떻게 할건지 정의해야된다
    if(!user) { //-->  user 가 존재하지 않다면 아래의 json 데이터로 res 보내주는 것이다
        return res.json({
            ok: false, //-->  유효성을 어긴 것도 아니고, 요청은 성공 했기에, 에러를 던지는 것이 아니라 ok 에 false 값을 넣어서 res 보내는 것이다 (에러 보내도 된다)
            message: "존재하지 않는 사용자입니다"
            //-->  에러가 난 것은 아니고, 맞지 않다라는 응답을 보내는 것이니 일반 응답값으로 보내준 것 (백엔드마다 다르다  -->  에러로 간주해도 된다)
            //-->  return res.status(400).json({ ... })  -->  이렇게 에러로 보내도 된다
        })
    }

    // 여기서 email 에서 찾은 DB 에 있는 비밀번호 값과 요청받은 비밀번호 값이 일치한지 확인해볼 것이다
    const isMatchPassword = await bcrypt.compare(password, user.password) //-->  일치하면 true 가 할당된다 / 불일치하면 false 가 할당된다
    //                                                                                 ( 입력한 비번 , DB 에 저장된 비번 --> 위에서 입력한 이메일과 일치하는 db 에 있는 이메일 찾은 것이다 )
    //-->  위에서 찾은 user 의 비밀번호와, 사용자가 입력한 비밀번호가 일치한지 비교하는 것이다  -->  일치하면 true 가 뜬다
    //-->  1번째는 사용자가 요청한 (로그인에서 입력한) 비번, 2번째는 비밀번호는 db 에 저장되어 있는 값  -->  이 두개가 일치하는지 비교하는 것이다
    if(!isMatchPassword) {
        return res.json({
            ok: false,
            message: "비밀번호를 다시 확인해주세요"
        })
    } //-->  이렇게 유저가 존재하지 않거나, 비밀번호가 일치하지 않을 때 예외처리를 해주면 된다  -->  여기에 예외처리 되지 않으면 성공적으로 로그인 되는 것이다

    //----------------------------------------------------------------------------------------
    // jwt :
    const token = jwt.sign({
        id: user.id, //-->  이 유저를 의미하는 고유한 값
    }, process.env.JWT_SECRET, {
        expiresIn: 1000 * 60 * 5, //-->  밀리세컨즈이다  -->  1초 x 60 x 5  -->  5분이다  -->  expiresIn : 토큰을 얼마나 유지시킬 것인지 적으면 된다
        // 이렇게 하면 토큰이 생성이 된다
    })

    //----------------------------------------------------------------------------------------

    return res.json({
        ok: true,
        message: `${user.email}님 환영합니다`, //-->  메세지는 굳이 안보내도 된다 (삭제해도 된다)
        info: {
            email: user.email,
            // nickName, profile_url, token ... 등등 을 전달하면 된다
        },
        // token : "123"
        token
        //-->  로그인 로직 모두 작성했고, 이제 토큰만 만들어주면 된다
        //-->  token: "123"  -->  위에서 만든 token 변수로 바꿔주었다 (jwt 적용시킨 token)
    })
})

export default router