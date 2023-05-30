package com.example.bookreview.models;

public class UserReview {
    private Integer userReviewId;
    private Integer userBookId;
    private String bookTitle;
    private Integer rating;
    private String review;

    public UserReview(Integer userReviewId, Integer userBookId, String bookTitle, Integer rating, String review) {
        this.userReviewId = userReviewId;
        this.userBookId = userBookId;
        this.bookTitle = bookTitle;
        this.rating = rating;
        this.review = review;
    }

    public Integer getUserReviewId() {
        return userReviewId;
    }

    public void setUserReviewId(Integer userReviewId) {
        this.userReviewId = userReviewId;
    }

    public Integer getUserBookId() {
        return userBookId;
    }

    public void setUserBookId(Integer userBookId) {
        this.userBookId = userBookId;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
