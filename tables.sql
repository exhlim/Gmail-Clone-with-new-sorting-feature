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
	log TEXT,
	email_input TEXT
);