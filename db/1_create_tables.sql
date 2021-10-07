DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS habits;

CREATE TABLE users (
    userId serial PRIMARY KEY,
    userName varchar(50) UNIQUE,
    passwordHash varchar(255),
    badgePoints int
);

CREATE TABLE habits (
    habitid serial PRIMARY KEY,
    habitName varchar(50),
    frequency int,
    startDate date,
    targetDate date,
    habitType boolean,
    userId INT
);
