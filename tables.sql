CREATE TABLE IF NOT EXISTS userdb (
	id SERIAL PRIMARY KEY,
	username TEXT,
	password TEXT,
	email_input TEXT
);

CREATE TABLE IF NOT EXISTS keyworddb (
	id SERIAL PRIMARY KEY,
	username TEXT,
	keywords TEXT,
	tabname TEXT
);