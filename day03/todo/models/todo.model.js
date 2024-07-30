import Sequelize, { Model } from "sequelize";


class Todo extends Model {

    static init(sequelize) {
        super.init({
            title: {
                type: Sequelize.STRING(300), //-->  이거 스트링 갯수 너무 많이 할당되면 오류 뜰 수도 있다  -->  많이 쓸거면 그냥 TEXT 로 바꿔주자
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT(),
                allowNull: false
            },
            state: {
                type: Sequelize.BOOLEAN(),
                defaultValue: false
            }
        }, {
            modelName: "Todos",
            tableName: "todos", //-->  테이블 명 지어준 것
            charset: "utf8mb4", //-->  mb4 까지 붙여주면 이모지까지 지원을 하겠다는 의미이다
            timestamps: true,
            sequelize,
        })
    }
    
    // 이렇게 투두 테이블 모두 만들었으면, 이제 관계지어주자
    static associate(db) {
        db.Todo.belongsTo(db.Users, {
            foreignKey: {name: "userId", allowNull: false},
            onDelete: "CASECADE"
            //-->  이 CASECADE 걸어준 것은, 유저가 삭제되면, 애도 다 삭제시키겠다는 얘기이다
            //-->  유저가 회원 탈퇴를 했을 때, 이 유저가 작성한 글도 같이 삭제가 되는 것이다
        })
    }
    // class 로 만들어준 Todo 라는 객체에 associate 라는 key 에다가 함수를 넣어준 것이다
    // 이 함수는 db 라는 매개변수를 가지고 와서 관계를 지어주는 기능을 하고 있다
}

export default Todo


