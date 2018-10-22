-- SET UP SCHEMA HERE
DROP DATABASE movies;
CREATE DATABASE IF NOT EXISTS movies;
USE movies;

CREATE TABLE IF NOT EXISTS movie (
  id            INT NOT NULL AUTO_INCREMENT,
  title         VARCHAR(20) NOT NULL,
  image_url     VARCHAR(20),
  movie_year    INT,
  rating        INT,
  PRIMARY KEY (id)
);

