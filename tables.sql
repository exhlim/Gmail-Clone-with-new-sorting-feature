CREATE TABLE IF NOT EXISTS userdb (
	id SERIAL PRIMARY KEY,
	username TEXT,
	password TEXT
);

CREATE TABLE IF NOT EXISTS keyworddb (
	id SERIAL PRIMARY KEY,
	username TEXT,
	keywords TEXT,
	tabname TEXT
);