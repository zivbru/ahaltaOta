const { client } = require('../config/db');

const createUsersTableQuery = `
CREATE TABLE users  (
    googleId VARCHAR(50) NOT NULL,
    firstName VARCHAR (50) NOT NULL,
    lastName  VARCHAR (50)  NOT NULL,
    birthdate DATE  NOT NULL,
    phone VARCHAR (10) NOT NULL,
    favoritebeer VARCHAR(20),
    israelId VARCHAR(10) NOT NULL,
	PRIMARY KEY( googleId )
);
`;

const createFoodsTableQuery = `
CREATE TABLE foods  (
    foodid SERIAL,
    name VARCHAR(50) NOT NULL,
	PRIMARY KEY (foodid)
);
`;

const createUsersFoodsTableQuery = `
CREATE TABLE usersfoods  (
    userid VARCHAR(50) REFERENCES users(googleid),
    foodid integer REFERENCES foods(foodid)
);
`;

const insertFoodsTableQuery = `
'insert into foods (name) values ("פיצה")',
`;

const insertusersTableQuery = `
insert into users (googleId, firstname , lastname, birthdate, phone,israelId,favoritebeer) 
			values ('1', 'ziv','bru', '2020-12-11', '0528555929', '039356689', 'גולדסטאר' )
`;
