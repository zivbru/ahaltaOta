const { client } = require('../config/db');

const createUsersTableQuery = `
CREATE TABLE users  (
    userid VARCHAR(10) NOT NULL,
    firstName VARCHAR (50) NOT NULL,
    lastName  VARCHAR (50)  NOT NULL,
    birthdate DATE  NOT NULL,
    phone VARCHAR (10) NOT NULL,
    favoritebeer VARCHAR(20),
    foods jsonb NOT NULL,
	PRIMARY KEY( userid )
);
`;

const createFoodsTableQuery = `
CREATE TABLE foods  (
    foodid SERIAL ,
    name VARCHAR(50) NOT NULL,
    userid VARCHAR(10) REFERENCES users(userid),
	PRIMARY KEY (foodid)
);
`;
const insertFoodsTableQuery = `
'insert into foods (name, userid) values ($1, $2)',
`;

const insertusersTableQuery = `
insert into  users (userid, firstname , lastname, birthdate, phone, favoritebeer,foods) 
values (3, 'ziv3', 'bru3', '2020-12-11','058589985',  'heiniken', '{ "foods":["המבורגר,עוף" ] }'  )
`;
