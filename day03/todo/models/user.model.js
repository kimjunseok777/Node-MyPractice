import Sequelize, { Model } from "sequelize";


class Users extends Model {
    //-->  객체에 함수가 있으면 메소드이다
    // 이 init 은 객체의 key 값이다
    static init(sequelize) {
        // super : Users 자기 자신을 뜻한다  -->  extends 로 Model 을 상속받았기에, init 이라는 메소드가 있다 (즉, super 는 Users 자기 자신이다)
        // 이 init 은 Model 에 속해있는 init 이다
        super.init({ //-->  이 init 안에다가 컬럼명을 작성하면 된다
            email: {
                type: Sequelize.STRING(100),
                allowNull: false, //-->  null 을 허용하지 않겠다는 의미
                unique: true
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        }, {
            modelName: "Users", //-->  Sequelize 에서 구분하는 키값이다
            tableName: "users", //-->  DB 에 create table 로 생성될 테이블 명이다
            charset: "utf8", //-->  전세계의 모든 언어를 지원하겠다는 의미
            timestamps: true, //-->  언제 가입했고, 언제 수정했는지에 대한 정보가 자동으로 생기는 것이다 (create At, update At 컬럼 자동생성)
            sequelize,
        })
    }

    // 이렇게 투두 테이블 모두 만들었으면, 이제 관계지어주자
    static associate(db) {
        db.Users.hasMany(db.Todo, { //-->  이렇게 Users 에 hasMany 가 걸려있어야 투두를 여러개 가져올 수 있는 것이다
            foreignKey: {name: "userId", allowNull: false},
        })
    }

}

// 위에 static 을 안해주면 -->  Users.init() 이렇게 접근 못한다  -->  다른 곳에다가 데이터를 받고 새로운 연산자가 생성이 되어야지만 init 할 수 있다
//-->  ex)  const users = new Users()  -->  users.init()  -->  static 안쓰면 이렇게 해야한다

export default Users