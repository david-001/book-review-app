package com.example.bookreview.repositories;

import com.example.bookreview.exceptions.BadRequestException;
import com.example.bookreview.exceptions.ResourceNotFoundException;
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
public class UserReviewRepositoryImpl implements UserReviewRepository {
    private static final String SQL_CREATE = "INSERT INTO USER_REVIEWS(USER_REVIEWS_ID, USER_BOOKS_ID, BOOK_TITLE, RATING, REVIEW) VALUES(NEXTVAL('USER_REVIEWS_SEQ'),?,?,?,?)";
    private static final String SQL_FIND_BY_ID = "SELECT USER_REVIEWS_ID, USER_BOOKS_ID, BOOK_TITLE, RATING, REVIEW FROM USER_REVIEWS WHERE USER_REVIEWS_ID = ?";
    private static final String SQL_FIND_BY_USER_BOOK_ID = "SELECT UR.USER_REVIEWS_ID, UR.USER_BOOKS_ID, UR.BOOK_TITLE, UR.RATING, UR.REVIEW " +
            "FROM USER_REVIEWS UR LEFT OUTER JOIN USER_BOOKS UB ON UR.USER_BOOKS_ID = UB.USER_BOOKS_ID WHERE UB.USER_ID = ? AND UB.USER_BOOKS_ID = ?";
    private static final String SQL_FIND_ALL = "SELECT UR.USER_REVIEWS_ID, UR.USER_BOOKS_ID, UR.BOOK_TITLE, UR.RATING, UR.REVIEW " +
            "FROM USER_REVIEWS UR LEFT OUTER JOIN USER_BOOKS UB ON UR.USER_BOOKS_ID = UB.USER_BOOKS_ID WHERE UB.USER_ID = ?";
    private static final String SQL_UPDATE = "UPDATE USER_REVIEWS SET RATING = ?, REVIEW = ? WHERE USER_REVIEWS_ID = ?";
    private static final String SQL_DELETE_REVIEW = "DELETE FROM USER_REVIEWS WHERE USER_REVIEWS_ID = ?";


    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Integer create(Integer userBookId, String bookTitle, Integer rating, String review) throws BadRequestException {
        try{
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection->{
                PreparedStatement ps = connection.prepareStatement(SQL_CREATE, Statement.RETURN_GENERATED_KEYS);
                ps.setInt(1, userBookId);
                ps.setString(2, bookTitle);
                ps.setInt(3, rating);
                ps.setString(4, review);
                return ps;
            },keyHolder);
            return (Integer) keyHolder.getKeys().get("USER_REVIEWS_ID");
        }catch(Exception e){
            throw new BadRequestException("Invalid request");
        }
    }

    @Override
    public UserReview findById(Integer userReviewId) {
        try{
            return jdbcTemplate.queryForObject(SQL_FIND_BY_ID,new Object[]{userReviewId},userRowMapper);
        }catch(Exception e){
            return null;
        }
    }

    @Override
    public UserReview findByUserBookId(Integer userId, Integer userBookId) {
        try{
            return jdbcTemplate.queryForObject(SQL_FIND_BY_USER_BOOK_ID,new Object[]{userId, userBookId},userRowMapper);
        }catch(Exception e){
            return null;
        }
    }

    @Override
    public List<UserReview> findAll(Integer userId){
        try {
            return jdbcTemplate.query(SQL_FIND_ALL, new Object[]{userId}, userRowMapper);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public void update(Integer userReviewId, Integer rating, String review) throws BadRequestException {
        try{
            jdbcTemplate.update(SQL_UPDATE, new Object[]{rating,review,userReviewId});
        }catch(Exception e){
            throw new BadRequestException("Invalid request");
        }
    }

    @Override
    public void removeById(Integer userReviewId) throws BadRequestException {
        try{
            jdbcTemplate.update(SQL_DELETE_REVIEW, new Object[]{userReviewId});
        }catch(Exception e){
            throw new BadRequestException("Invalid request");
        }
    }


    private RowMapper<UserReview> userRowMapper = ((rs, rowNum)->{
        return new UserReview(rs.getInt("USER_REVIEWS_ID"),
                rs.getInt("USER_BOOKS_ID"),
                rs.getString("BOOK_TITLE"),
                rs.getInt("RATING"),
                rs.getString("REVIEW")
        );
    });

}
