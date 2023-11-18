-- Users: user_id, name, email, profession, role, password
-- Clients: client_id, name, email, phone, DoB, notes
-- Hexagrams: hexagram_id, name, symbol (gua), description, traditional interpretation
-- Trigrams: trigram_id, name, symbol (gua), attributes (elements?), description
-- Lines: line_id, position (1-6), nature, changed nature (if changed), description, interpretation
-- Readings: reading_id, date, time, question, user_id, client_id, original hexagram_id, changed_hexagram_id (if applicable)
-- Changes: change_id, reading_id, original line_nature, changed_line_nature
-- Commentaries: commentary_id, hexagram_id, text, author, date
-- Journal entries: entry_id, reading_id, text, date, user_id
-- Historical context: context_id, hexagram_id, historical information, cultural notes
-- Images: image_id, hexagram_id, image file, description
-- Relationships:
--      hexagram to trigram
--      reading-to-hexagram
--      user-to-readings
--      client-to-readings
--      reading-to-changes
--      hexagram-to-commentaries
--      reading-to-journal-entries



CREATE TABLE readings