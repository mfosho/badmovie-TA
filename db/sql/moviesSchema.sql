-- SET UP SCHEMA HERE
-- DROP DATABASE movies;
CREATE DATABASE IF NOT EXISTS movies;
USE movies;

CREATE TABLE IF NOT EXISTS movie (
  id            INT NOT NULL AUTO_INCREMENT,
  movie_name    VARCHAR(20) NOT NULL,
  genre         VARCHAR(20),
  rating        INT,
  PRIMARY KEY (id)
);

