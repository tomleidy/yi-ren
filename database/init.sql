-- Historical context: context_id, hexagram_id, historical information, cultural notes

-- Lines: line_id, position (1-6), nature, changed nature (if changed), description, interpretation
-- Images: image_id, hexagram_id, image file, description
-- Changes: change_id, reading_id, original line_nature, changed_line_nature
-- Journal entries: entry_id, reading_id, text, date, user_id
-- Relationships:
--      reading-to-changes
--      hexagram-to-commentaries
--      reading-to-journal-entries


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email NOT NULL,
    profession NOT NULL,
    role NOT NULL--,
    --password TEXT
    -- Don't know how to do passwords securely in SQL.
);
CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    date_of_birth DATE,
    client_notes TEXT
);
CREATE TABLE readings (
    reading_id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    time TIMESTAMP NOT NULL,
    question TEXT NOT NULL,
    hexagram_original INT NOT NULL,
    hexagram_alternate INT
);

CREATE TABLE clients_readings (
    client_id INT,
    reading_id INT,
    PRIMARY KEY (client_id, reading_id)
);

CREATE TABLE users_readings (
    user_id INT,
    reading_id INT,
    PRIMARY KEY (user_id, reading_id)
);


CREATE TABLE hexagrams (
    hexagram_id SERIAL PRIMARY KEY,
    english_name TEXT NOT NULL,
    pinyin_name TEXT NOT NULL,
    chinese_name TEXT NOT NULL,
    interpretation TEXT NOT NULL,
    lower_trigram INT,
    upper_trigram INT,
    UNIQUE (lower_trigram, upper_trigram)
);

CREATE TABLE trigrams (
    trigram_id SERIAL PRIMARY KEY,
    trigram_name TEXT NOT NULL,
    attributes TEXT,
    description TEXT
);

CREATE TABLE commentaries (
    commentary_id SERIAL PRIMARY KEY,
    hexagram_id INT NOT NULL,
    commentary_text TEXT NOT NULL,
    book TEXT NOT NULL,
    author TEXT NOT NULL,
    year CHARACTER(4) NOT NULL
);

CREATE TABLE historical_context (
    context_id SERIAL PRIMARY KEY,
    hexagram_id INT NOT NULL,
)

ALTER TABLE readings
ADD CONSTRAINT fk_readings_hexagram_original
FOREIGN KEY (hexagram_original)
REFERENCES hexagrams;

ALTER TABLE readings
ADD CONSTRAINT fk_readings_hexagram_alternate
FOREIGN KEY (hexagram_alternate)
REFERENCES hexagrams;
ALTER TABLE clients_readings
ADD CONSTRAINT fk_clients_readings_clients
FOREIGN KEY (client_id)
REFERENCES clients;

ALTER TABLE clients_readings
ADD CONSTRAINT fk_clients_readings_readings
FOREIGN KEY (reading_id)
REFERENCES readings;

ALTER TABLE users_readings
ADD CONSTRAINT fk_users_readings_users
FOREIGN KEY (user_id)
REFERENCES users;

ALTER TABLE users_readings
ADD CONSTRAINT fk_users_readings_readings
FOREIGN KEY (reading_id)
REFERENCES readings;

ALTER TABLE hexagrams
ADD CONSTRAINT fk_hexagrams_trigrams_lower
FOREIGN KEY (lower_trigram)
REFERENCES trigrams;

ALTER TABLE hexagrams
ADD CONSTRAINT fk_hexagrams_trigrams_upper
FOREIGN KEY (upper_trigram)
REFERENCES trigrams;

ALTER TABLE commentaries
ADD CONSTRAINT fk_commentaries_hexagrams
FOREIGN KEY (hexagram_id)
REFERENCES hexagrams;