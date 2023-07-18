CREATE DATABASE library_system;

USE library_system;

CREATE TABLE book (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    author VARCHAR(255) NOT NULL,
    cover VARCHAR(255) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    available_quantity INT NOT NULL,
    borrowed_quantity INT DEFAULT 0,
    is_deleted TINYINT DEFAULT 0
);

CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    position VARCHAR(255) NOT NULL,
    faculty VARCHAR(255) NOT NULL,
    major VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE borrow (
    borrow_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    book_id INT,
    book_quantity INT NOT NULL,
    borrow_date DATE NOT NULL,
    return_date DATE NOT NULL,
    actual_return_date DATE DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (book_id) REFERENCES book (book_id)
);

INSERT INTO book (title, author, cover, publisher, available_quantity)
    VALUES
        ('Harry Potter', 'J.K. Rowling', 'Hard Cover', 'Bloomsbury', 10),
        ('The Lord Of The Rings', 'J.R.R. Tolkien', 'Hard Cover', 'HarperCollins', 6),
        ('Naruto Shippuden', 'Masashi Kishimoto', 'Soft Cover', 'Shueisha', 7);

INSERT INTO `user` (`user_id`, `name`, `email`, `position`, `faculty`, `major`, `password`) 
    VALUES
    (1, 'henry', 'henry@gmail.com', 'admin', 'engineering', 'computer science', 'lol'),
    (2, 'budi', 'budi@gmail.com', 'student', 'engineering', 'computer science', 'lol');