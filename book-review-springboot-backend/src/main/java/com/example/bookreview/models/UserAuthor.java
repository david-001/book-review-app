package com.example.bookreview.models;

public class UserAuthor {

    private Integer userAuthorId;
    private Integer userBookId;
    private String bookTitle;
    private String authorName;

    public UserAuthor(Integer userAuthorId, Integer userBookId, String bookTitle, String authorName) {
        this.userAuthorId = userAuthorId;
        this.userBookId = userBookId;
        this.bookTitle = bookTitle;
        this.authorName = authorName;
    }

    public Integer getUserAuthorId() {
        return userAuthorId;
    }

    public void setUserAuthorId(Integer userAuthorId) {
        this.userAuthorId = userAuthorId;
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

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }
}
