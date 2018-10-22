-- SET UP SCHEMA HERE
DROP DATABASE movies;
CREATE DATABASE IF NOT EXISTS movies;
USE movies;

CREATE TABLE IF NOT EXISTS movie (
  id            INT NOT NULL AUTO_INCREMENT,
  title         VARCHAR(50) NOT NULL,
  image_url     VARCHAR(50),
  movie_year    INT,
  rating        INT,
  PRIMARY KEY (id)
);

