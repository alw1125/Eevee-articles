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
    user_id INTEGER,
    text TEXT,
    date DATE,
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

CREATE TABLE UserLikedArticles (
    user_id  INTEGER,
    article_id INTEGER,
    FOREIGN KEY (user_id ) REFERENCES Users (user_id ),
    FOREIGN KEY (article_id) REFERENCES Articles (article_id),
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
    FOREIGN KEY (user_id) REFERENCES Users (user_id),
    FOREIGN KEY (parent_comment_id) REFERENCES Comments (comment_id)
);

-- Dummy messages data
INSERT INTO Users (username, firstName, lastName, dob, is_admin, desc, avatar, password) VALUES
('johndoe', 'John','Doe', '1990-01-15', 1, 'Tech enthusiast and blogger.', 'avatar1.jpg', '$2b$10$vg8railKesnzAEd30VPEYOIgvyWPutHWdYwbDgG78rppc.cjLQ5zW'),
('janedoe', 'Jane','Doe', '1985-05-20', 0, 'Health and wellness coach.', 'avatar2.jpg', 'Password!');

INSERT INTO Articles (title, image, user_id, text, date) VALUES
('The Future of Technology', 'tech_future.jpg', 1, 'Technology is advancing at an unprecedented rate...', '2024-05-01'),
('Healthy Eating Habits', 'healthy_eating.jpg',2, 'Adopting healthy eating habits can significantly improve...', '2024-05-05');

INSERT INTO Comments (desc, date, time, article_id, user_id) VALUES
('Great insights on technology!', '2024-05-02', '10:30:00', 1, 2),
('Very informative article.', '2024-05-06', '12:15:00', 2, 1);