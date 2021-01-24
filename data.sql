DROP DATABASE IF EXISTS eventcal;

CREATE DATABASE eventcal;

\c eventcal;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  email VARCHAR(40) NOT NULL,
  full_name VARCHAR(30) NOT NULL,
  zip_code INT NOT NULL,
  interests VARCHAR,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO users 
(username, password, email, full_name, zip_code, interests) 
VALUES 
('John', 'John', 'John@john.com', 'John', '11111', 'sports, books, tech'),
('Terry', 'Terry', 'Terry@a.com', 'Terry', '22222', 'books, tech'),
('Sohee', 'Sohee', 'Sohee@a.com', 'Sohee', '33333', 'origami, books'),
('Greyson', 'Greyson', 'Greyson@a.com', 'Greyson', '44444', 'tech'),
('David', 'David', 'David@a.com', 'David', '55555', 'business, books'),
('Curry', 'Curry', 'Curry@a.com', 'Curry', '66666', 'family, children');

DROP TABLE IF EXISTS events;

CREATE TABLE events (
  id VARCHAR(50),
  title VARCHAR(50) NOT NULL,
  details VARCHAR,
  location VARCHAR(50) NOT NULL,
  start_date VARCHAR(50) NOT NULL,
  end_date VARCHAR(50) NOT NULL,
  start_time VARCHAR(50),
  end_time VARCHAR(50),
  event_url VARCHAR NOT NULL
);

INSERT INTO events 
(id,title, details, location, start_date, end_date, start_time, end_time, event_url) 
VALUES 
('1', 'Soccer', 'Play Soccer at stadium', 'Stadium', '20210211', '20210211', '', '', 'www.soccer.com'),
('2', 'Basketball', 'Play basketball at stadium', 'Stadium', '20210214', '20210214', '', '', 'www.basketball.com'),
('3', 'volleyball', 'Play volleyball at stadium', 'Stadium', '20210215', '20210215', '', '', 'www.volleyball.com'),
('4', 'tennis', 'Play tennis at stadium', 'Stadium', '20210216', '20210216', '', '', 'www.tennis.com');


DROP TABLE IF EXISTS friends;

CREATE TABLE friends (
  username1 VARCHAR(30) NOT NULL,
  username2 VARCHAR(30) NOT NULL,
  friended_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO friends 
(username1, username2)
VALUES
('Terry', 'Sohee'),
('David', 'Greyson'),
('Sohee', 'Greyson'),
('Sohee', 'Terry'),
('Greyson', 'Sohee'),
('Terry', 'Sohee'),
('Greyson', 'David'),
('John', 'Greyson'),
('Greyson', 'John');

DROP TABLE IF EXISTS event_invites;

CREATE TABLE event_invites (
  event_id VARCHAR(50) NOT NULL,
  invitee VARCHAR(30) NOT NULL,
  invited VARCHAR(30) NOT NULL
);

INSERT INTO event_invites
(event_id, invitee, invited)
VALUES
('1', 'Terry', 'Sohee, John'),
('4', 'David', 'John, Greyson'),
('2', 'Sohee', 'Greyson, Terry'),
('3', 'Greyson', 'Terry, Sohee');


DROP TABLE IF EXISTS vacations;

CREATE TABLE vacations (
  host VARCHAR(30) NOT NULL,
  invited VARCHAR(30) NOT NULL,
  details VARCHAR NOT NULL,
  destination VARCHAR(50) NOT NULL
);

INSERT INTO vacations
(host, invited, details, destination)
VALUES
('Terry', 'Sohee, Greyson', 'Go to Hawaii', 'Hawaii'),
('David', 'John, Greyson', 'Go to New York', 'New York');

DROP TABLE IF EXISTS event_attendees;

CREATE TABLE event_attendees (
  event_id INT NOT NULL,
  username TEXT NOT NULL
);

INSERT INTO event_attendees
(event_id, username)
VALUES
('1', 'Terry, Sohee'),
('4', 'David, Greyson'),
('3', 'Greyson'),
('2', 'Sohee');
