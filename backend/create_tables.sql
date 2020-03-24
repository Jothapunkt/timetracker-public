DROP TABLE arbeitsblock;
DROP TABLE token;
DROP TABLE project;
DROP TABLE contact;

CREATE TABLE arbeitsblock (
	id INT AUTO_INCREMENT,
	project VARCHAR(255) NOT NULL,
	day INT NOT NULL,
	month INT NOT NULL,
	year INT NOT NULL,
	duration DOUBLE NOT NULL,
	description VARCHAR(512) NOT NULL,
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
    invoiceTemplate VARCHAR(255) NOT NULL,
    hoursTemplate VARCHAR(255) NOT NULL,
    rate INT NOT NULL,
    sender VARCHAR(255) NOT NULL,
    recipient VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE contact (
    id INT AUTO_INCREMENT,
    code VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
