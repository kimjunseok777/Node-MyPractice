import express from "express"
import { JwtAuth } from "../middleware/jwtAuth.js"
import Todo from "../models/todo.model.js"
import Users from "../models/user.model.js"


const router = express.Router()

//-----------------------------------------------------------------------------------
// 투두 조회 :

//-->  로그인 안한 사람은 인증토큰이 없기 때문에, 여기에는 JwtAuth 미들웨어를 걸어주면 안된다 (유저가 나임을 증명해야할 때는 JwtAuth 가 필요하다)
router.get("/", async (req, res) => {

    const {page, per_page} = req.query //-->  프론트가 페이지 1, 2, 3, ... 준것이다
    //-->  http://localhost:3040/todo?page=1
    //-->  page 는 몇부터 보여줄 것인지, per_page 는 몇개씩 보여줄 건지이다
    const perPage = parseInt(per_page) ?? 10
    const pageOffset = (page ?? 1) - 1

    const todos = await Todo.findAll({ //-->  이러면 모든 투두를 전부 다 가져온다

        // limit: 10, //-->  10개만 가져오겠다는 것이다
        limit: perPage,

        // offset: (page - 1) * 10, //-->  offset 은 건너뛰겠다는 의미이다
        // 페이지 1을 주면 0 개부터 (처음부터) 시작하고, 페이지 2를 주면 10 개를 건너뛰는 것이다  -->  이런식으로 페이지네이션이 이뤄지는 것이다
        //-->  이렇기에 프론트가 백엔드에게 페이지값을 전달해줘야 하는 것이다
        offset: pageOffset * perPage,
    })

    res.json(todos)
})

//-----------------------------------------------------------------------------------
// 투두 작성 :

router.post("/", JwtAuth, async (req, res) => {

    // res.json({
    //     ok: true,
    //     id: req.user.id //-->  JwtAuth 에서 user 의 id 추가해준 것 확인하기 위해 작성해준 것
    // })

    const {title, content} = req.body
    if(!title || !content){
        return res.status(400).json({
            message: "양식을 입력해주세요"
        })
    }

    const todo = await Todo.create({
        userId: req.user.id,
        title,
        content
    })

    // res 에서 userId 빼는 방법 :
    const findTodo = await Todo.findOne({
        where: {
            id: todo.id, //-->  등록된 투두 아이디 찾아서 가져올 수 있다
        },
        attributes: ["id", "title", "content"], //--> id, title, content 만 가져오겠다는 의미이다  -->  select colum 한 것이다
        include: [ //-->  include 가 join 하는 역할이다
            {
                model: Users,
                attributes: ['email'], //-->  password 오면 안되기에 attributes 설정한 것이다
            }
        ]
    })

    // res.json(todo)  //-->  userId 까지 res 에 담겨서 주석처리 해주고 findTodo 로 바꿔준 것이다
    res.json(findTodo)
    //-->  attributes 를 통해서 userId 를 빼놓고 res 할 수 있는 것이다
})

//-----------------------------------------------------------------------------------


export default router