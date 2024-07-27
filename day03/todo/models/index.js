import config from '../config/config.json' assert{type: "json"} //-->  json 파일 import 할때 타입을 json 으로 명시해줘야한다
import { Sequelize } from 'sequelize'
import Users from './user.model.js'


const database = config['development']
const db = {}

const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  database
)

//---------------------------------------------------------------

db.Users = Users
//-->  user.model.js 에서 만들어준 테이블 설치해준 것이다

// db.Users.init(sequelize)  -->  테이블이 투두만 생기고 끝나는 것이 아니라, 다른 테이블도 계속 생길 수 있기 때문에,
// 아래처럼 forEach 돌려서 순회해서 실행시켜주는 것이 좋다

// key 를 가져오면 [Users] 가 오고, db 의 Users 를 순회해서 실행시켜주는 요직이다
Object.keys(db).forEach((modal) => {
  db[modal].init(sequelize)
})

//---------------------------------------------------------------

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
//-->  이렇게 까지 하면 db 설정하는 것 모두 마친 것이다  -->  이걸 이제 app.js 에서 import 받아서 사용하면 db 가 연결된 것이다