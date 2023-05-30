package com.example.bookreview.models;

public class UserBook {
    private Integer userBookId;
    private Integer userId;
    private String bookTitle;
    private String bookKey;
    private String bookIsbn;
    private String authorName;
    private Integer firstYrPublish;

    public UserBook(Integer userBookId, Integer userId, String bookTitle, String bookKey, String bookIsbn, String authorName, Integer firstYrPublish) {
        this.userBookId = userBookId;
        this.userId = userId;
        this.bookTitle = bookTitle;
        this.bookKey = bookKey;
        this.bookIsbn = bookIsbn;
        this.authorName = authorName;
        this.firstYrPublish = firstYrPublish;
    }

    public Integer getUserBookId() {
        return userBookId;
    }

    public void setUserBookId(Integer userBookId) {
        this.userBookId = userBookId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getBookKey() {
        return bookKey;
    }

    public void setBookKey(String bookKey) {
        this.bookKey = bookKey;
    }

    public String getBookIsbn() {
        return bookIsbn;
    }

    public void setBookIsbn(String bookIsbn) {
        this.bookIsbn = bookIsbn;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public Integer getFirstYrPublish() {
        return firstYrPublish;
    }

    public void setFirstYrPublish(Integer firstYrPublish) {
        this.firstYrPublish = firstYrPublish;
    }
}
