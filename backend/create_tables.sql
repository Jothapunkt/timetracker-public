DROP TABLE arbeitsblock;

CREATE TABLE arbeitsblock (
	id INT AUTO_INCREMENT,
	day INT NOT NULL,
	month INT NOT NULL,
	year INT NOT NULL,
	duration DOUBLE NOT NULL,
	description VARCHAR(512) NOT NULL,
	highlighted BOOLEAN NOT NULL,
	strike BOOLEAN NOT NULL,
	PRIMARY KEY (id)
);
	