


export const JwtAuth = (req, res, next) => {
    // next 는 어떤 데이터들을 다음으로 전달해줄 건지가 담겨있다  -->  미들웨어 이기에 next 가 있는 것이다 (얘가 끝나면 그 다음 함수로 넘어가는 것이다)

    console.log(req.headers.authorization) //-->  찾고자 하는 토큰값이 찍힌다
    console.log(req.body, "body")
    //-->  /todo 로 post 보냈는데, 이 콘솔들 잘 찍히면 미들웨어로 잘 작동하고 있는 것이다 (중간에서 값을 컨트롤할 수 있는 것이다)

    // jwt 를 디코드하고, req 의 user 값에 id 라는 값을 넘겨줄 것이다 :
    // jwt decode  -->  { id } 이렇게 디코드를 하면 id 가 나온다
    // req.user = { id }  -->  req.user 에다가 id 값을 추가해준 객체를 넣어서 next 로 넘겨주는 것이다

    //-->  다음에 받은 콜백함수가, req.user 에 id 가 포함되어있는 값을 받게 되는 것이다

    next() //-->  이 함수의 값 그대로 다음으로 넘기겠다는 의미
}