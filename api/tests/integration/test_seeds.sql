TRUNCATE users, loginTable, habits RESTART IDENTITY;

INSERT INTO users (userName, badgePoints) 
VALUES 
('user1', 5),
('user2', 9);

INSERT INTO habits (habitName, frequency, startDate, targetDate, habitType, userId)
VALUES 
(
    'drinking water',
    '8',
    2021-10-04,
    2021-10-05,
    true,
    1
),
(
    'smoking',
    0,
    2021-10-04,
    2021-12-31,
    false,
    2
);