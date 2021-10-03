DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS loginTable;
DROP TABLE IF EXISTS habits;

CREATE TABLE users (
    userId serial PRIMARY KEY,
    userName varchar(50) UNIQUE,
    badgePoints int
);

CREATE TABLE loginTable (
    userId serial PRIMARY KEY,
    passwordHash varchar(50)
);

CREATE TABLE habits (
    userId serial PRIMARY KEY,
    habitName varchar(50),
    frequency int,
    startDate date,
    targetData date,
    habitType boolean
)