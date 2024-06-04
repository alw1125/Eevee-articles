-- TODO Replace this SQL initialization script with an init script for your own database schema.

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Articles;
DROP TABLE IF EXISTS UserLikedArticles;
DROP TABLE IF EXISTS Comments;

-- Create messages table
CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    dob DATE,
    is_admin INTEGER,
    desc TEXT,
    avatar TEXT,
    password VARCHAR(1000) NOT NULL
);

CREATE TABLE Articles (
    article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    image TEXT,
    image_width INTEGER,
    image_height INTEGER,
    user_id INTEGER,
    text TEXT,
    date DATE,
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE
);

CREATE TABLE UserLikedArticles (
    user_id  INTEGER,
    article_id INTEGER,
    FOREIGN KEY (user_id ) REFERENCES Users (user_id ) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES Articles (article_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, article_id)
);

CREATE TABLE Comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    desc TEXT,
    date DATE,
    time TIME,
    article_id INTEGER,
    user_id INTEGER,
    parent_comment_id INTEGER,
    FOREIGN KEY (article_id) REFERENCES Articles (article_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES Comments (comment_id) ON DELETE CASCADE
);


INSERT INTO Users (username, firstName, lastName, dob, is_admin, desc, avatar, password) VALUES
('johndoe', 'John','Doe', '1990-01-15', 1, 'Tech enthusiast and blogger.', 'avatar1.jpg', '$2b$10$vg8railKesnzAEd30VPEYOIgvyWPutHWdYwbDgG78rppc.cjLQ5zW'),
('janedoe', 'Jane','Doe', '1985-05-20', 0, 'Health and wellness coach.', 'avatar2.jpg', '$2b$10$vg8railKesnzAEd30VPEYOIgvyWPutHWdYwbDgG78rppc.cjLQ5zW'),
('alicew', 'Alice', 'Williams', '1992-03-12', 0, 'Lover of all things nature.', 'avatar3.jpg', '$2b$10$vg8railKesnzAEd30VPEYOIgvyWPutHWdYwbDgG78rppc.cjLQ5zW'),
('bobj', 'Bob', 'Johnson', '1988-07-22', 0, 'Fitness enthusiast and personal trainer.', 'avatar4.jpg', '$2b$10$vg8railKesnzAEd30VPEYOIgvyWPutHWdYwbDgG78rppc.cjLQ5zW'),
('charlottek', 'Charlotte', 'King', '1995-11-30', 0, 'Bookworm and aspiring author.', 'avatar5.jpg', '$2b$10$vg8railKesnzAEd30VPEYOIgvyWPutHWdYwbDgG78rppc.cjLQ5zW'),
('davem', 'Dave', 'Miller', '1991-06-18', 0, 'Gadget reviewer and tech geek.', 'avatar6.jpg', '$2b$10$vg8railKesnzAEd30VPEYOIgvyWPutHWdYwbDgG78rppc.cjLQ5zW'),
('evat', 'Eva', 'Turner', '1983-02-14', 0, 'Travel blogger and photographer.', 'avatar7.jpg', '$2b$10$vg8railKesnzAEd30VPEYOIgvyWPutHWdYwbDgG78rppc.cjLQ5zW');

INSERT INTO Articles (title, image, image_width, image_height, user_id, text, date) VALUES
('The Future of Technology', 'images/tech.jpg', 400, 200,  1, 'Technology is advancing at an unprecedented rate...', '2024-05-01'),
('Healthy Eating Habits', 'images/diet.jpg',400, 200, 2, 'Adopting healthy eating habits can significantly improve...', '2024-05-05'),
('The Wonders of Nature', 'images/odi.jpg', 150, 200, 3, 'Exploring the beauty of the natural world...', '2024-05-10'),
('Top Fitness Tips', 'images/fitness.jpg', 400, 200, 4, 'Here are some top tips to help you stay fit...', '2024-05-12'),
('Best Books of 2024', 'images/man.jpg', 180, 200, 5, 'A review of the best books released in 2024...', '2024-05-14'),
('Latest Gadget Reviews', 'images/gadget.jpg', 300, 300, 6, 'In-depth reviews of the latest gadgets...', '2024-05-16'),
('Traveling on a Budget', 'images/OIG2.jpg', 300, 300, 7, 'How to travel the world without breaking the bank...', '2024-05-18');

-- Initial Comments
INSERT INTO Comments (desc, date, time, article_id, user_id) VALUES
('Great insights on technology!', '2024-05-02', '10:30:00', 1, 2),
('Very informative article.', '2024-05-06', '12:15:00', 2, 1),
('This article about nature is amazing!', '2024-05-11', '09:45:00', 3, 4),
('Very helpful fitness tips!', '2024-05-13', '11:00:00', 4, 5),
('I love the book recommendations.', '2024-05-15', '08:30:00', 5, 6),
('Great reviews on the latest gadgets.', '2024-05-17', '14:20:00', 6, 7),
('Traveling on a budget is definitely possible.', '2024-05-19', '16:45:00', 7, 3);

-- Replies to Comments
INSERT INTO Comments (desc, date, time, article_id, user_id, parent_comment_id) VALUES
('I totally agree with you!', '2024-05-02', '11:00:00', 1, 1, (SELECT comment_id FROM Comments WHERE desc = 'Great insights on technology!')),
('Thanks for the feedback!', '2024-05-06', '12:30:00', 2, 2, (SELECT comment_id FROM Comments WHERE desc = 'Very informative article.')),
('This really made me think.', '2024-05-02', '11:45:00', 1, 2, (SELECT comment_id FROM Comments WHERE desc = 'Great insights on technology!')),
('Glad you found it useful.', '2024-05-06', '12:45:00', 2, 1, (SELECT comment_id FROM Comments WHERE desc = 'Very informative article.')),
('Nature is indeed wonderful!', '2024-05-11', '10:00:00', 3, 4, (SELECT comment_id FROM Comments WHERE desc = 'This article about nature is amazing!')),
('Fitness tips are always welcome.', '2024-05-13', '11:15:00', 4, 5, (SELECT comment_id FROM Comments WHERE desc = 'Very helpful fitness tips!')),
('Books are the best!', '2024-05-15', '09:00:00', 5, 6, (SELECT comment_id FROM Comments WHERE desc = 'I love the book recommendations.')),
('Gadgets make life easier.', '2024-05-17', '14:30:00', 6, 7, (SELECT comment_id FROM Comments WHERE desc = 'Great reviews on the latest gadgets.')),
('Budget travel is the way to go.', '2024-05-19', '17:00:00', 7, 3, (SELECT comment_id FROM Comments WHERE desc = 'Traveling on a budget is definitely possible.'));

-- Additional Comments
INSERT INTO Comments (desc, date, time, article_id, user_id) VALUES
('Fascinating read!', '2024-05-07', '14:20:00', 1, 2),
('Loved the tips on healthy eating.', '2024-05-07', '14:50:00', 2, 1);

-- Additional Replies to Comments
INSERT INTO Comments (desc, date, time, article_id, user_id, parent_comment_id) VALUES
('Absolutely!', '2024-05-07', '14:30:00', 1, 1, (SELECT comment_id FROM Comments WHERE desc = 'Fascinating read!')),
('I will definitely try them out.', '2024-05-07', '15:00:00', 2, 2, (SELECT comment_id FROM Comments WHERE desc = 'Loved the tips on healthy eating.')),
('Good point!', '2024-05-07', '14:35:00', 1, 2, (SELECT comment_id FROM Comments WHERE desc = 'Fascinating read!')),
('Thank you for the encouragement!', '2024-05-07', '15:10:00', 2, 1, (SELECT comment_id FROM Comments WHERE desc = 'Loved the tips on healthy eating.')),
('Technology is evolving rapidly.', '2024-05-07', '14:40:00', 1, 1, (SELECT comment_id FROM Comments WHERE desc = 'Fascinating read!')),
('Health is wealth!', '2024-05-07', '15:20:00', 2, 2, (SELECT comment_id FROM Comments WHERE desc = 'Loved the tips on healthy eating.'));
