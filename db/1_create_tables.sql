DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS loginTable;
DROP TABLE IF EXISTS habits;

CREATE TABLE users (
    userId serial PRIMARY KEY,
    badgePoints int
);

CREATE TABLE loginTable (
    loginId serial PRIMARY KEY,
    userName varchar(50) UNIQUE,
    passwordHash varchar(50),
    userId INT
);

CREATE TABLE habits (
    habitId serial PRIMARY KEY,
    habitName varchar(50),
    frequency int,
    startDate date,
    targetDate date,
    habitType boolean,
    userId INT
)