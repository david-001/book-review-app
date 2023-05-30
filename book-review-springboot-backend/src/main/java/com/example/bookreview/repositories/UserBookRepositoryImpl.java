package com.example.bookreview.repositories;

import com.example.bookreview.exceptions.ResourceNotFoundException;
import com.example.bookreview.models.UserBook;
import com.example.bookreview.exceptions.BadRequestException;
import com.example.bookreview.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class UserBookRepositoryImpl implements UserBookRepository{
    private static final String SQL_CREATE = "INSERT INTO USER_BOOKS(USER_BOOKS_ID, USER_ID, BOOK_TITLE, BOOK_KEY, BOOK_ISBN, AUTHOR_NAME, FIRST_YR_PUBLISH) VALUES(NEXTVAL('USER_BOOKS_SEQ'),?,?,?,?,?,?)";
    private static final String SQL_FIND_BY_ID = "SELECT USER_BOOKS_ID, USER_ID, BOOK_TITLE, BOOK_KEY, BOOK_ISBN, AUTHOR_NAME, FIRST_YR_PUBLISH FROM USER_BOOKS WHERE USER_ID=? AND USER_BOOKS_ID = ?";
    private static final String SQL_FIND_BY_ISBN = "SELECT USER_BOOKS_ID, USER_ID, BOOK_TITLE, BOOK_KEY, BOOK_ISBN, AUTHOR_NAME, FIRST_YR_PUBLISH FROM USER_BOOKS WHERE USER_ID=? AND BOOK_ISBN = ?";
    private static final String SQL_FIND_ALL = "SELECT USER_BOOKS_ID, USER_ID, BOOK_TITLE, BOOK_KEY, BOOK_ISBN, AUTHOR_NAME, FIRST_YR_PUBLISH FROM USER_BOOKS WHERE USER_ID=?";
    private static final String SQL_DELETE_USER_BOOK = "DELETE FROM USER_BOOKS WHERE USER_ID = ? AND USER_BOOKS_ID = ?";
    private static final String SQL_DELETE_ALL_USER_REVIEWS = "DELETE FROM USER_REVIEWS WHERE USER_BOOKS_ID = ?";
    private static final String SQL_DELETE_ALL_USER_AUTHORS = "DELETE FROM USER_AUTHORS WHERE USER_BOOKS_ID = ?";

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Integer create(Integer userId, String bookTitle, String bookKey, String bookIsbn, String authorName, Integer firstYrPublish) throws BadRequestException {
        try{
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection->{
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
                ps.setInt(1, userId);
                ps.setString(2, bookTitle);
                ps.setString(3, bookKey);
                ps.setString(4, bookIsbn);
                ps.setString(5, authorName);
                ps.setInt(6, firstYrPublish);
                return ps;
            },keyHolder);
            return (Integer) keyHolder.getKeys().get("USER_BOOKS_ID");
        }catch(Exception e){
            throw new BadRequestException("Invalid request");
        }
    }

    @Override
    public List<UserBook> findAll(Integer userId) {
        try {
            return jdbcTemplate.query(SQL_FIND_ALL, new Object[]{userId}, userRowMapper);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public UserBook findById(Integer userId, Integer userBookId) {
        try{
            return jdbcTemplate.queryForObject(SQL_FIND_BY_ID,new Object[]{userId, userBookId},userRowMapper);
        }catch(Exception e){
            throw new ResourceNotFoundException("User book not found");
        }

    }

    @Override
    public UserBook findByIsbn(Integer userId, String isbn){
        try{
            return jdbcTemplate.queryForObject(SQL_FIND_BY_ISBN,new Object[]{userId, isbn},userRowMapper);
        }catch(Exception e){
            return null;
        }
    }

    @Override
    public void removeById(Integer userId, Integer userBookId) {
        this.removeAllReviews(userBookId);
        this.removeAllAuthors(userBookId);
        jdbcTemplate.update(SQL_DELETE_USER_BOOK, new Object[]{userId, userBookId});
    }

    private void removeAllReviews(Integer userBookId){
        jdbcTemplate.update(SQL_DELETE_ALL_USER_REVIEWS, new Object[]{userBookId});
    }

    private void removeAllAuthors(Integer userBookId){
        jdbcTemplate.update(SQL_DELETE_ALL_USER_AUTHORS, new Object[]{userBookId});
    }

    private RowMapper<UserBook> userRowMapper = ((rs, rowNum)->{
        return new UserBook(rs.getInt("USER_BOOKS_ID"),
                rs.getInt("USER_ID"),
                rs.getString("BOOK_TITLE"),
                rs.getString("BOOK_KEY"),
                rs.getString("BOOK_ISBN"),
                rs.getString("AUTHOR_NAME"),
                rs.getInt("FIRST_YR_PUBLISH")
                );
    });
}
