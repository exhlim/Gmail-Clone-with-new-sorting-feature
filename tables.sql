CREATE TABLE IF NOT EXISTS userdb (
	id SERIAL PRIMARY KEY,
	username TEXT,
	password TEXT,
	email_input TEXT
);

CREATE TABLE IF NOT EXISTS emaildb (
	id SERIAL PRIMARY KEY,
	sender TEXT,
	subject TEXT,
	content TEXT,
	snippet TEXT,
	log TEXT,
	raw_date TEXT,
	email_input TEXT
);