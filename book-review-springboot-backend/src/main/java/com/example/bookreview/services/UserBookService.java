package com.example.bookreview.services;


import com.example.bookreview.exceptions.BadRequestException;
import com.example.bookreview.exceptions.ResourceNotFoundException;
import com.example.bookreview.models.User;
import com.example.bookreview.models.UserBook;

import java.util.List;

public interface UserBookService {
    UserBook addBook(Integer userId, String bookTitle, String bookKey, String bookIsbn, String authorName, Integer firstYrPublish) throws BadRequestException;
    UserBook fetchUserBookById(Integer userId, Integer userBookId);
    UserBook fetchUserBookByIsbn(Integer userId, String isbn);
    List<UserBook> fetchAllUserBooks(Integer userId);
    void removeUserBook(Integer userId, Integer userBookId) throws ResourceNotFoundException;
}
