package com.example.bookreview.repositories;

import com.example.bookreview.exceptions.BadRequestException;
import com.example.bookreview.exceptions.ResourceNotFoundException;
import com.example.bookreview.models.UserReview;

import java.util.List;

public interface UserReviewRepository {
    Integer create(Integer userBookId, String bookTitle, Integer rating, String review) throws BadRequestException;
    UserReview findById(Integer userReviewId);
    UserReview findByUserBookId(Integer userId, Integer userBookId);
    List<UserReview> findAll(Integer userId);
    void update(Integer userReviewId, Integer rating, String review) throws BadRequestException;
    void removeById(Integer userReviewId) throws BadRequestException;

}
