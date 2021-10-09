DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS habits;
DROP TABLE IF EXISTS frequencytable;

CREATE TABLE users (
    userId serial PRIMARY KEY,
    userName varchar(50) UNIQUE,
    passwordHash varchar(255),
    badgePoints int
);

CREATE TABLE frequencytable (
    habitid int,
    frequencyType varchar(50),
    frequency int,
    periodStart date,
    streak int,
    freqStreak int,
    streakAdded boolean
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
