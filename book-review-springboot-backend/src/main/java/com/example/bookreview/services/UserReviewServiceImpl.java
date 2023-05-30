package com.example.bookreview.services;

import com.example.bookreview.exceptions.BadRequestException;
import com.example.bookreview.models.UserReview;
import com.example.bookreview.repositories.UserReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserReviewServiceImpl implements UserReviewService{

    @Autowired
    UserReviewRepository userReviewRepository;

    @Override
    public UserReview addReview(Integer userBookId, String bookTitle, Integer rating, String review) throws BadRequestException {
        int userReviewId = userReviewRepository.create(userBookId, bookTitle, rating, review);
        return userReviewRepository.findById(userReviewId);
    }
    @Override
    public List<UserReview> fetchUserReviews(Integer userId) {

        return userReviewRepository.findAll(userId);
    }

    @Override
    public UserReview fetchReviewByBookId(Integer userId, Integer userBookId) {
        return userReviewRepository.findByUserBookId(userId, userBookId);
    }

    @Override
    public UserReview fetchUserReviewById(Integer userReviewId) {
        return userReviewRepository.findById(userReviewId);
    }

    @Override
    public void updateReview(Integer userReviewId, Integer rating, String review) throws BadRequestException {
        userReviewRepository.update(userReviewId,rating,review);
    }

    @Override
    public void deleteReview(Integer userReviewId) throws BadRequestException {
        userReviewRepository.removeById(userReviewId);
    }


}
