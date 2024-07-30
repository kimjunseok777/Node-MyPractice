// import config from '../config/config.json' assert{type: "json"} //-->  json 파일 import 할때 타입을 json 으로 명시해줘야한다
import { Sequelize } from 'sequelize'
import Users from './user.model.js'
import dbConfig from '../config/config.js'
import Todo from './todo.model.js'


// const database = config['development']
const database = dbConfig['development']
const db = {} //-->  밑에서 export default 로 export 시켜줬다  -->  app.js 에서 객체와 이 db 가 맵핑된다 (ORM 중 sequelize 가 사용된다)

const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  database
)

//---------------------------------------------------------------

db.Users = Users
//-->  user.model.js 에서 만들어준 테이블 설치해준 것이다  -->  users 라는 이름으로 테이블이 생성된다
db.Todo = Todo
//-->  todo 테이블 생성해준 것이다

// db.Users.init(sequelize)  -->  테이블이 투두만 생기고 끝나는 것이 아니라, 다른 테이블도 계속 생길 수 있기 때문에,
// 아래처럼 forEach 돌려서 순회해서 실행시켜주는 것이 좋다

// key 를 가져오면 [Users] 가 오고, db 의 Users 를 순회해서 실행시켜주는 요직이다
Object.keys(db).forEach((modal) => {
  db[modal].init(sequelize)
})

//---------------------------------------------------------------
// 위에 init 이 먼저 실행되고 만들어지는 것이기에, 다음에 만들어준 것이다

Object.keys(db).forEach((model) => {
  if(db[model].associate) { //-->  만약 db 의 model 에 associate 함수가 존재한다면
    db[model].associate(db) //-->  db 의 model 에 associate 의 db 를 넣어서 실행하겠다는 의미이다
  }
})

//---------------------------------------------------------------

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
//-->  이렇게 까지 하면 db 설정하는 것 모두 마친 것이다  -->  이걸 이제 app.js 에서 import 받아서 사용하면 db 가 연결된 것이다