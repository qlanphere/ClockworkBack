TRUNCATE  TABLE users, habits, frequencytable RESTART IDENTITY;

INSERT INTO users (userName, passwordHash, badgePoints) 
VALUES 
('user1', 'abcd', 5),
('user2', '1234', 9);

INSERT INTO habits (habitName, frequency, startDate, targetDate, habitType, userId)
VALUES 
(
    'drinking water',
    '8',
    '2021-10-04',
    '2021-10-05',
    true,
    1
),
(
    'smoking',
    0,
    '2021-10-04',
    '2021-12-31',
    false,
    2
);

INSERT INTO frequencytable (habitId, frequencyType, frequency, streak)
VALUES
(
    1,
    'daily',
    3,
    0
),
(
    2,
    'weekly',
    5,
    0
);