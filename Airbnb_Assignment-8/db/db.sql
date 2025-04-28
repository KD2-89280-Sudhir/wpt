-- database schema for airbnb application
DROP DATABASE IF EXISTS airbnb_db;
create database airbnb_db;
use airbnb_db;

-- user table
create table user(
    id integer primary key auto_increment,
    firstName varchar(20),
    lastName varchar(20),
    email varchar(50),
    password varchar(100),
    phoneNumber varchar(15),
    isDeleted integer(1) default 0, -- 0: not deleted, 1: deleted
    createdTimestamp DATETIME default CURRENT_TIMESTAMP
);

-- category table
create table category (
    id integer primary key auto_increment,
    title varchar(20),
    details varchar(1000),
    image VARCHAR(200),
    createdTimestamp DATETIME default CURRENT_TIMESTAMP
);

-- property table
create table property (
    id integer primary key auto_increment,
    categoryId INTEGER,
    title varchar(100),
    details varchar(1000),
    address varchar(1000),
    contactNo VARCHAR(15),
    ownerName VARCHAR(50),
    isLakeView integer(1) default 0,
    isTV integer(1) default 0,
    isAC integer(1) default 0,
    isWifi integer(1) default 0,
    isMiniBar integer(1) default 0,
    isBreakfast integer(1) default 0,
    isParking integer(1) default 0,
    guests INTEGER(1),
    bedrooms INTEGER(1),
    beds INTEGER(1),
    bathrooms INTEGER(1),
    rent FLOAT,

    profileImage VARCHAR(100),
    createdTimestamp DATETIME default CURRENT_TIMESTAMP
);

-- review table
create table reviews (
    id integer primary key auto_increment,
    userId INTEGER,
    propertyId INTEGER,
    review VARCHAR(1000),
    rating FLOAT,
    image VARCHAR(100),
    createdTimestamp DATETIME default CURRENT_TIMESTAMP
);

-- bookings table
create table bookings (
    id integer primary key auto_increment,
    userId integer,
    propertyId integer,
    fromDate varchar(50),
    toDate varchar(50),
    total float,
    createdTimestamp DATETIME default CURRENT_TIMESTAMP
);