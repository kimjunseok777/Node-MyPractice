import jwt from "jsonwebtoken"


export const JwtAuth = (req, res, next) => {

    try{

        // next 는 어떤 데이터들을 다음으로 전달해줄 건지가 담겨있다  -->  미들웨어 이기에 next 가 있는 것이다 (얘가 끝나면 그 다음 함수로 넘어가는 것이다)

        // console.log(req.headers.authorization) //-->  찾고자 하는 토큰값이 찍힌다  -->  Auth 에서 Bearer 에 토큰값 복사해서 전달하면 찍힌다
        // console.log(req.body, "body")

        //-->  "/todo" 로 post 보냈는데, 이 콘솔들 잘 찍히면 미들웨어로 잘 작동하고 있는 것이다 (중간에서 값을 컨트롤할 수 있는 것이다)

        // jwt 를 디코드하고, req 의 user 값에 id 라는 값을 넘겨줄 것이다 :
        // jwt decode  -->  { id } 이렇게 디코드를 하면 id 가 나온다
        // req.user = { id }  -->  req.user 에다가 id 값을 추가해준 객체를 넣어서 next 로 넘겨주는 것이다

        //-->  다음에 받은 콜백함수가, req.user 에 id 가 포함되어있는 값을 받게 되는 것이다

        //------------------------------------------------------------------------------------------------------------------------------------------
        
        const token = req.headers.authorization.split(" ")[1] //-->  Bearer 스트링을 분리해서, 온전한 토큰값만을 가져올 수 있다

        const user = jwt.verify(token, process.env.JWT_SECRET) //-->  토큰 디코드 해준 것이다
        console.log(user) //-->  디코드 했기에 유저의 고유한 정보가 잘 찍히는 것을 확인할 수 있다 (send 보내보면 확인할 수 있다)
        //-->  여기서 exp 는 유닉스타임에서 몇 ms 지났는지 검사하는 표이다  -->  즉, 현재 시간이랑 비교해서 exp 가 현재시간보다 전이면 인증되지 않은 회원이라고 뜨는 것이다
        // exp < now  -->  exp 보다 now 가 더 크다면 throw err 을 해주면 좋다
        //-->  if(exp < now) throw Error()

        req.user = {
            id: user.id
        } //-->  이러면 request 의 user 에 id 가 생겨지는 것이다  -->  제대로 id 가 추가됐는지 확인하기 위해 todo.js 에서 res 에 id 작성해보자

        next() //-->  이 함수의 값 그대로 다음으로 넘기겠다는 의미

    } catch(err) {
        res.status(401).json({
            message: "인증되지 않은 회원입니다"
        })
    }
}