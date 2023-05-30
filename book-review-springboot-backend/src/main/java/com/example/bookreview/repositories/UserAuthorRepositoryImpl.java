package com.example.bookreview.repositories;

import com.example.bookreview.exceptions.BadRequestException;
import com.example.bookreview.exceptions.ResourceNotFoundException;
import com.example.bookreview.models.UserAuthor;
import com.example.bookreview.models.UserBook;
import com.example.bookreview.models.UserReview;
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
public class UserAuthorRepositoryImpl implements  UserAuthorRepository{
    private static final String SQL_CREATE = "INSERT INTO USER_AUTHORS(USER_AUTHOR_ID, USER_BOOKS_ID, BOOK_TITLE, AUTHOR_NAME) VALUES(NEXTVAL('USER_AUTHORS_SEQ'),?,?,?)";
    private static final String SQL_FIND_BY_ID ="SELECT USER_AUTHOR_ID, USER_BOOKS_ID, BOOK_TITLE, AUTHOR_NAME FROM USER_AUTHORS WHERE USER_AUTHOR_ID = ?";
    private static final String SQL_FIND_BY_USER_BOOK_ID = "SELECT USER_AUTHOR_ID, USER_BOOKS_ID, BOOK_TITLE, AUTHOR_NAME FROM USER_AUTHORS WHERE USER_BOOKS_ID = ?";
    private static final String SQL_FIND_ALL = "SELECT UA.USER_AUTHOR_ID, UA.USER_BOOKS_ID, UA.BOOK_TITLE, UA.AUTHOR_NAME " +
            "FROM USER_AUTHORS UA LEFT OUTER JOIN USER_BOOKS UB ON UA.USER_BOOKS_ID = UB.USER_BOOKS_ID WHERE UB.USER_ID = ?";
    private static final String SQL_DELETE_BY_ID = "DELETE FROM USER_AUTHORS WHERE USER_AUTHOR_ID = ?";

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Integer create(Integer userBookId, String bookTitle, String authorName) throws BadRequestException {
        try{
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection->{
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
                ps.setInt(1, userBookId);
                ps.setString(2, bookTitle);
                ps.setString(3, authorName);
                return ps;
            },keyHolder);
            return (Integer) keyHolder.getKeys().get("USER_AUTHOR_ID");
        }catch(Exception e){
            throw new BadRequestException("Invalid request");
        }
    }

    @Override
    public UserAuthor findById(Integer userAuthorId) throws ResourceNotFoundException {
        try{
            return jdbcTemplate.queryForObject(SQL_FIND_BY_ID,new Object[]{userAuthorId},userRowMapper);
        }catch(Exception e){
            return null;
        }
    }

    @Override
    public UserAuthor findByUserBookId(Integer userBookId) {
        try{
            return jdbcTemplate.queryForObject(SQL_FIND_BY_USER_BOOK_ID,new Object[]{userBookId},userRowMapper);
        }catch(Exception e){
            return null;
        }
    }

    @Override
    public List<UserAuthor> findAll(Integer userId){
        try {
            return jdbcTemplate.query(SQL_FIND_ALL, new Object[]{userId}, userRowMapper);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public void removeById(Integer userAuthorId) throws BadRequestException {
        jdbcTemplate.update(SQL_DELETE_BY_ID, new Object[]{userAuthorId});
    }

    private RowMapper<UserAuthor> userRowMapper = ((rs, rowNum)->{
        return new UserAuthor(rs.getInt("USER_AUTHOR_ID"),
                rs.getInt("USER_BOOKS_ID"),
                rs.getString("BOOK_TITLE"),
                rs.getString("AUTHOR_NAME")
        );
    });
}
