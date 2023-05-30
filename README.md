# Book Review App in Spring Boot and React

See the pdf file for the complete details. Here is a summary of the project details:

1. Fetch book data from the Open Library API and save it to the PostgreSQL database.
2. Use Spring Boot (Java) to expose RESTful API.
3. Test the API in Postman and test the React front-end UI.

## Running the project

Need to open two command terminals, one for the frontend and one for the backend.

In the book-review-react-frontend directory, run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

In the book-review-springboot-backend directory, run

### `docker-compose up`

Copy sql file into the docker container. In another command terminal, run

### `docker cp bookreview_db.sql bookreview:/`

Run docker container

### `docker container exec -it bookreview bash`

Execute sql file

### `psql -U postgres --file bookreview_db.sql`

## Interacting directly with the database

Login to database

### `psql -U postgres`

Connect to database

### `\connect bookreviewdb`

Run postgresql statements
