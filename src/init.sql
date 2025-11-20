DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    release_year INTEGER,
    developer VARCHAR(255),
    description TEXT,
    image_url TEXT,
    avg_rating DECIMAL(3, 1) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
    author_name VARCHAR(100),
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO games (title, genre, release_year, developer, description, avg_rating, image_url) 
VALUES 
('The Witcher 3', 'RPG', 2015, 'CD Projekt Red', 'Geralt of Rivia searches for his adopted daughter.', 9.8, 'https://placehold.co/600x400/333/fff?text=Witcher+3'),
('Cyberpunk 2077', 'Action RPG', 2020, 'CD Projekt Red', 'A mercenary outlaw stuck in a city of dreams.', 8.5, 'https://placehold.co/600x400/f3e600/000?text=Cyberpunk');
