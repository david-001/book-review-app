package com.example.bookreview.repositories;

import com.example.bookreview.exceptions.BadRequestException;
import com.example.bookreview.exceptions.ResourceNotFoundException;
import com.example.bookreview.models.UserAuthor;
import com.example.bookreview.models.UserReview;

import java.util.List;

public interface UserAuthorRepository {
    Integer create(Integer userBookId, String bookTitle, String authorName) throws BadRequestException;
    UserAuthor findById(Integer userAuthorId) throws ResourceNotFoundException;
    UserAuthor findByUserBookId(Integer userBookId);
    List<UserAuthor> findAll(Integer userId);
    void removeById(Integer userAuthorId) throws BadRequestException;
}
