CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    release_year INTEGER,
    developer VARCHAR(255),
    description TEXT,
    image_url TEXT,
    trailer_youtube_id VARCHAR(50),
    banner_url TEXT,
    avg_rating DECIMAL(3, 1) DEFAULT 0
);
