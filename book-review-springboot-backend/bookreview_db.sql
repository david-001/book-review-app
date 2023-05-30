drop database bookreviewdb;
drop user bookreviewer;
create user bookreviewer with password 'password';
create database bookreviewdb with template=template0 owner=bookreviewer;
\connect bookreviewdb;
alter default privileges grant all on tables to bookreviewer;
alter default privileges grant all on sequences to bookreviewer;

create table users(
user_id integer primary key not null,
username varchar(255) not null,
email varchar(255) not null unique,
password varchar(255) not null
);

create table user_books(
user_books_id integer primary key not null,
user_id integer not null,
book_title varchar(255) not null,
book_key varchar(255) not null,
book_isbn varchar(255) not null,
author_name varchar(255) not null,
first_yr_publish integer not null
);

create table user_reviews(
    user_reviews_id integer primary key not null,
    user_books_id integer not null,
    book_title varchar(255) not null,
    rating integer not null,
    review varchar(255)
);

create table user_authors(
    user_author_id integer primary key not null,
    user_books_id integer not null,
    book_title varchar(255) not null,
    author_name varchar(255) not null
);

alter table user_books add constraint user_books_fk
foreign key (user_id) references users(user_id);

alter table user_reviews add constraint user_reviews_fk
foreign key (user_books_id) references user_books(user_books_id);

alter table user_authors add constraint user_authors_fk
foreign key (user_books_id) references user_books(user_books_id);

create sequence users_seq increment 1 start 1;
create sequence user_books_seq increment 1 start 1;
create sequence user_reviews_seq increment 1 start 1;
create sequence user_authors_seq increment 1 start 1;



