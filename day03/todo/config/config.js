import dotenv from 'dotenv'
dotenv.config() //-->  dotenv 실행시켜준 것이다


const dbConfig = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    host: process.env.DATABASE_HOST,
    dialect: "mysql"
  },
}

export default dbConfig
