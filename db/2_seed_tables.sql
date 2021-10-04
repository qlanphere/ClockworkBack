INSERT INTO users (userName, passwordHash, badgePoints )
VALUES 
    (1,'PujaT','abc',0),
    (2,'Sam','efgh',5 ),
    (3,'Ria','123',3),
    (4,'Quinn','12345',2);
    

-- INSERT INTO habits (habitName, frequency, startDate, targetDate,habitType,userId)
-- VALUES 
--     ('PujaT',"abc",0 ),
--     ('Sam',"efgh",5 ),
--     ('Ria',"123",3),
--     ('Quinn',"12345",2);

-- CREATE TABLE habits (
--     habitId serial PRIMARY KEY,
--     habitName varchar(50),
--     frequency int,
--     startDate date,
--     targetDate date,
--     habitType boolean,
--     userId INT
-- )