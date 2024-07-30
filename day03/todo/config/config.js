import dotenv from 'dotenv'
dotenv.config() //-->  dotenv 실행시켜준 것이다 (app.js 보다 먼저 실행하기에, 여기서도 import 받아서 실행시켜준 것이다)


const dbConfig = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_HOST, //-->  다 .env 에 적은 데이터로 바꿔준 것이다 (환경변수를 로컬환경에 쉽게 적용시켜준 것)
    dialect: "mysql"
  },
}

export default dbConfig
