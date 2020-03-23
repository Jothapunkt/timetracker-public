DROP TABLE arbeitsblock;
DROP TABLE token;
DROP TABLE benutzer;
DROP TABLE project;

CREATE TABLE arbeitsblock (
	id INT AUTO_INCREMENT,
	user_id INT NOT NULL,
	project VARCHAR(255) NOT NULL,
	day INT NOT NULL,
	month INT NOT NULL,
	year INT NOT NULL,
	duration DOUBLE NOT NULL,
	description VARCHAR(512) NOT NULL,
	highlighted BOOLEAN NOT NULL,
	strike BOOLEAN NOT NULL,
	deleted BOOLEAN NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE token (
    id INT AUTO_INCREMENT,
    token VARCHAR(64) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE project (
    id INT AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL,
    invoice_template VARCHAR(255) NOT NULL,
    hours_template VARCHAR(255) NOT NULL,
    rate INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE benutzer (
    id INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    hash VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
