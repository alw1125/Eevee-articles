-- TODO Replace this SQL initialization script with an init script for your own database schema.

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Articles;
DROP TABLE IF EXISTS UserLikedArticles;
DROP TABLE IF EXISTS Comments;

-- Create messages table
CREATE TABLE Users (
    user_name VARCHAR(50) PRIMARY KEY NOT NULL,
    real_name VARCHAR(100),
    dob DATE,
    is_admin INTEGER,
    desc TEXT,
    avatar TEXT,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Articles (
    article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    image TEXT,
    user_name VARCHAR(50),
    text TEXT,
    date DATE,
    FOREIGN KEY (user_name) REFERENCES Users (user_name)
);

CREATE TABLE UserLikedArticles (
    user_name VARCHAR(50),
    article_id INTEGER,
    FOREIGN KEY (user_name) REFERENCES Users (user_name),
    FOREIGN KEY (article_id) REFERENCES Articles (article_id),
    PRIMARY KEY (user_name, article_id)
);

CREATE TABLE Comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    desc TEXT,
    date DATE,
    time TIME,
    article_id INTEGER,
    user_name VARCHAR(50),
    parent_comment_id INTEGER,
    FOREIGN KEY (article_id) REFERENCES Articles (article_id),
    FOREIGN KEY (user_name) REFERENCES Users (user_name),
    FOREIGN KEY (parent_comment_id) REFERENCES Comments (comment_id)
);

-- Dummy messages data
INSERT INTO Users (user_name, real_name, dob, is_admin, desc, avatar, password) VALUES
('johndoe', 'John Doe', '1990-01-15', 1, 'Tech enthusiast and blogger.', 'avatar1.jpg', 'password123'),
('janedoe', 'Jane Doe', '1985-05-20', 0, 'Health and wellness coach.', 'avatar2.jpg', 'Password!');

INSERT INTO Articles (title, image, user_name, text, date) VALUES
('The Future of Technology', 'tech_future.jpg', 'johndoe', 'Technology is advancing at an unprecedented rate...', '2024-05-01'),
('Healthy Eating Habits', 'healthy_eating.jpg', 'janedoe', 'Adopting healthy eating habits can significantly improve...', '2024-05-05');

INSERT INTO Comments (desc, date, time, article_id, user_name) VALUES
('Great insights on technology!', '2024-05-02', '10:30:00', 1, 'johndoe'),
('Very informative article.', '2024-05-06', '12:15:00', 2, 'janedoe');