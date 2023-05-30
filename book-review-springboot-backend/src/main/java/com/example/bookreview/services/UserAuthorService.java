package com.example.bookreview.services;

import com.example.bookreview.exceptions.BadRequestException;
import com.example.bookreview.exceptions.ResourceNotFoundException;
import com.example.bookreview.models.UserAuthor;

import java.util.List;

public interface UserAuthorService {
    UserAuthor addAuthor(Integer userBookId, String bookTitle, String authorName) throws BadRequestException;
    List<UserAuthor> fetchUserAuthors(Integer userId);
    UserAuthor fetchAuthorByBookId(Integer userBookId);
    void removeUserAuthor(Integer userAuthorId) throws ResourceNotFoundException;
}
