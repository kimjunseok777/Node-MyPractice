
create database kjs;
/* 데이터베이스를 만들어준 것  -->  보통 프로젝트명으로 정해준다 */
use kjs;
/* kjs 데이터베이스를 사용하겠다고 명시한 것  -->  왼쪽에 사용하는 데이터베이스 글씨 진하게 뜬다 */


create table users (
	id bigint primary key auto_increment,
    /*auto_increment 는 숫자 자동으로 1씩 증가시키는 것  -->  default value 이다*/
    name varchar(100) not null,
    /*100byte 를 넘지만 않으면 되는 것이다  -->  100byte 를 차지한다는 게 아니다*/
    email varchar(100) not null unique,
    passwrod varchar(100) not null
);


alter table users change column passwrod password varchar(100);
/*users 라는 테이블에서 컬럼명 passwrod 의 이름을 변경시켜준 것*/

insert into users (name, email, password)
values('김사과', 'apple@apple.com', '1234');

insert into users (name, email, password)
values ('이멜론', 'melon@melon.com', '1234');

insert into users (name, email, password)
values('반하나', 'banana@banana.com', '1234');

delete from users where id = 1;
/*그냥 delete from users 하게 되면 데이터 다 날아간다  -->  뭐 지울지 where 로 명시해주자*/
update users set email = "kjs@kjs.com" where id = 3;

select * from users;
select name from users;
select * from users where id = 1; /*--> id가 1인 김사과 삭제했기에 null 로 비어있다*/

/*--------------------------------------------------------------------------------------*/

create table product (
	id bigint primary key auto_increment,
    price varchar(100) not null,
    name varchar(1000) not null
);
insert into product (name, price)
values('기계식 키보드', '30000');
insert into product (name, price)
values('기계식 마우스', '20000');

select * from product;

/*--------------------------------------------------------------------------------------*/
/*구매내역 만들기*/

create table purchase_histories(
	id bigint primary key auto_increment,
    userId bigint,
    productId bigint,
    foreign key (userId) references users(id),
    foreign key (productId) references product(id)
    /*productId 와 product 테이블의 id 와 관계지어준 것이다*/
);

insert into purchase_histories (userId, productId) values(2, 1);
/*users의 id 1번인 김사과는 delete했으니, users는 2번 설정해준 것*/

/*
join 의 종류 :
	1. inner -- a(prodcutId=3, 5, 7), b(id=1, 3, 5) --> 겹치는 id 인 3, 5 만 가져온다
		--> a 테이블에도 prodcutId 가 있다면, b 테이블에도 id 가 있는 친구들만 가져온다
        
    2. outer join -- a(prodcutId=3, 5, 7), b(id=1, 3, 5) --> 겹치든 안겹치든 데이터 다 가져온다
		--> 1, 3, 5, 7 다 가져오는데, 1번은 a의 prodcutId에 없기에 null 로 가져온다
        
	--> inner 는 null 이 아닌 것들만 가져오는 것, outer 는 null 인 것들까지 다 가져오는 것
    
ex) 게시판 --> 이미지(boardId)
inner :
게시판(1, 2, 3, 4, 5) -- 이미지(boardId = 1, 2, 3) --> inner join --> 1, 2, 3

outer : 이미지 다 가져오고 싶은데, 없는 건 그냥 null 로 보여주면 돼
게시판(1, 2, 3, 4, 5) -- 이미지(boardId = 1, 2, 3) --> outer join --> 1, 2, 3(image), 4, 5(null)
*/

select * from purchase_histories;
/*join query 사용한 것*/
select * from purchase_histories inner join product
on purchase_histories.productId = product.id;
/*purchase_histories 의 productId 와 product 테이블의 id가 같은 값 가져오는 것*/


