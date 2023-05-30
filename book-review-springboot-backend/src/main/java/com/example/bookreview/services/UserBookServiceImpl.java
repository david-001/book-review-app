package com.example.bookreview.services;

import com.example.bookreview.exceptions.AuthException;
import com.example.bookreview.exceptions.BadRequestException;
import com.example.bookreview.exceptions.ResourceNotFoundException;
import com.example.bookreview.models.UserBook;
import com.example.bookreview.repositories.UserBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserBookServiceImpl implements UserBookService{
    @Autowired
    UserBookRepository userBookRepository;

    @Override
    public UserBook addBook(Integer userId, String bookTitle, String bookKey, String bookIsbn, String authorName, Integer firstYrPublish) throws BadRequestException {
        int userBookId = userBookRepository.create(userId, bookTitle, bookKey, bookIsbn, authorName, firstYrPublish);
        return userBookRepository.findById(userId,userBookId);
    }

    @Override
    public UserBook fetchUserBookById(Integer userId, Integer userBookId) {
        return userBookRepository.findById(userId,userBookId);
    }

    @Override
    public UserBook fetchUserBookByIsbn(Integer userId, String isbn) {
        return userBookRepository.findByIsbn(userId, isbn);
    }

    @Override
    public List<UserBook> fetchAllUserBooks(Integer userId) {
        return userBookRepository.findAll(userId);

    }

    @Override
    public void removeUserBook(Integer userId, Integer userBookId) throws ResourceNotFoundException {
        userBookRepository.removeById(userId,userBookId);
    }


}
