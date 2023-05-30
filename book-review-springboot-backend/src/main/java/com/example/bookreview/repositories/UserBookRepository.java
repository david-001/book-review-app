package com.example.bookreview.repositories;

import com.example.bookreview.exceptions.ResourceNotFoundException;
import com.example.bookreview.models.UserBook;
import com.example.bookreview.exceptions.BadRequestException;
import com.example.bookreview.exceptions.ResourceNotFoundException;

import java.util.List;

public interface UserBookRepository {
    Integer create(Integer userId, String bookTitle, String bookKey, String bookIsbn, String authorName, Integer firstYrPublish) throws BadRequestException;
    UserBook findById(Integer userId,Integer userBookId) throws ResourceNotFoundException;
    UserBook findByIsbn(Integer userId, String isbn);
    List<UserBook> findAll(Integer userId);
    void removeById(Integer userId, Integer userBookId);
}
