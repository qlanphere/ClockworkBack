INSERT INTO users (userName, passwordHash, badgePoints )
VALUES 
    ('PujaT','abc',0),
    ('Sam','efgh',5 ),
    ('Ria','123',3),
    ('Quinn','12345',2);

INSERT INTO habits (habitName, frequency, startDate, targetDate, habitType, userId)
VALUES
(
    'water',
    8,
    '2021-10-04',
    '2021-10-05',
    true,
    1
),
(
    'sleep',
    12,
    '2021-10-04',
    '2021-10-05',
    true,
    1
);

INSERT INTO frequencytable (habitid, frequencyType, frequency, streak, freqStreak)
VALUES
(
    1,
    'daily',
    3,
    0,
    0
);
