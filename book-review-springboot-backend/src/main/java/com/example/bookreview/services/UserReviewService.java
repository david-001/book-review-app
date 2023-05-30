package com.example.bookreview.services;

import com.example.bookreview.exceptions.BadRequestException;
import com.example.bookreview.exceptions.ResourceNotFoundException;
import com.example.bookreview.models.UserBook;
import com.example.bookreview.models.UserReview;

import java.util.List;

public interface UserReviewService {
    UserReview addReview(Integer userBookId , String bookTitle, Integer rating, String review) throws BadRequestException;
    List<UserReview> fetchUserReviews(Integer userId);
    UserReview fetchReviewByBookId(Integer userId, Integer userBookId);
    UserReview fetchUserReviewById(Integer userReviewId);
    void updateReview(Integer userReviewId, Integer rating, String review) throws BadRequestException;
    void deleteReview(Integer userReviewId) throws BadRequestException;
}
